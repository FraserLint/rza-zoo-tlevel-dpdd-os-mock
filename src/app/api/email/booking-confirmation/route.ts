import { NextResponse } from 'next/server';
import { sendBookingConfirmation } from '@/lib/emailService';

export async function POST(request: Request) {
  try {
    const bookingDetails = await request.json();

    // Validate required fields
    if (!bookingDetails.email || !bookingDetails.selectedDate || !bookingDetails.tickets || !bookingDetails.total || !bookingDetails.paymentInfo) {
      return NextResponse.json(
        { error: 'Missing required booking details' },
        { status: 400 }
      );
    }

    // Send confirmation email
    const result = await sendBookingConfirmation(bookingDetails);

    return NextResponse.json(
      { success: true, messageId: result.messageId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    return NextResponse.json(
      { error: 'Failed to send booking confirmation email' },
      { status: 500 }
    );
  }
}