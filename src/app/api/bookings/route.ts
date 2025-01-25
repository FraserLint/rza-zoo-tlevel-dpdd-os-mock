import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    let authenticatedUserId = null;

    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        authenticatedUserId = payload.userId;
      }
    }

    const body = await request.json();
    const { selectedDate, tickets, total, paymentInfo, email } = body;

    if (!selectedDate || !tickets || !total || !paymentInfo?.cardLastFour || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure tickets is a valid JSON object
    let parsedTickets;
    try {
      parsedTickets = typeof tickets === 'string' ? JSON.parse(tickets) : tickets;
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid ticket format' },
        { status: 400 }
      );
    }

    // Ensure total is a valid decimal
    const parsedTotal = typeof total === 'string' ? parseFloat(total) : total;
    if (isNaN(parsedTotal)) {
      return NextResponse.json(
        { error: 'Invalid total amount' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        visitDate: new Date(selectedDate),
        ticketDetails: parsedTickets,
        totalAmount: parsedTotal,
        cardLastFour: paymentInfo.cardLastFour,
        email: email,
        userId: authenticatedUserId
      }
    });


    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Booking creation error:', error);
    if (error instanceof Error && error.message.includes('unique_booking')) {
      return NextResponse.json(
        { error: 'A booking already exists for this email and date' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create booking' },
      { status: 500 }
    );
  }
}