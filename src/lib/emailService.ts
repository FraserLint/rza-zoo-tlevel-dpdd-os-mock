import nodemailer from 'nodemailer';

interface BookingDetails {
  selectedDate: Date;
  tickets: {
    [key: string]: number;
  };
  total: number;
  cardLastFour: string;
  email: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
    console.error('Please check your SMTP configuration:');
    console.error('- SMTP_HOST:', process.env.SMTP_HOST);
    console.error('- SMTP_PORT:', process.env.SMTP_PORT);
    console.error('- SMTP_USER:', process.env.SMTP_USER ? 'Set' : 'Not set');
    console.error('- SMTP_PASS:', process.env.SMTP_PASS ? 'Set' : 'Not set');
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export const sendBookingConfirmation = async (bookingDetails: BookingDetails) => {
  try {
    // Validate SMTP configuration
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error('SMTP credentials are not configured');
    }

    if (!bookingDetails.email) {
      throw new Error('Email address is required');
    }

    const ticketsList = Object.entries(bookingDetails.tickets)
      .filter(([_, quantity]) => quantity > 0)
      .map(([type, quantity]) => `${quantity}x ${type.charAt(0).toUpperCase() + type.slice(1)}`)
      .join('\n');

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #2F5233; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; text-align: center;">Booking Confirmation</h1>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 2px solid #2F5233;">
          <h2 style="color: #2F5233; margin-top: 0;">Thank you for your booking!</h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #2F5233;">Visit Date</h3>
            <p style="margin: 5px 0;">${formatDate(bookingDetails.selectedDate)}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #2F5233;">Tickets</h3>
            <pre style="margin: 5px 0;">${ticketsList}</pre>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #2F5233;">Payment Details</h3>
            <p style="margin: 5px 0;">Total Paid: £${bookingDetails.total.toFixed(2)}</p>
            <p style="margin: 5px 0;">Card ending in: ${bookingDetails.cardLastFour}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666;">
          <p>If you have any questions about your booking, please contact us at rza.enquiries@gmail.com</p>
        </div>
      </div>
    `;

    console.log('Attempting to send email to:', bookingDetails.email);
    
    const info = await transporter.sendMail({
      from: '"RZA Zoo" <rza.enquiries@gmail.com>',
      to: bookingDetails.email,
      subject: 'Your RZA Zoo Booking Confirmation',
      html: emailContent,
    });

    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    console.error('Booking details:', {
      email: bookingDetails.email,
      date: bookingDetails.selectedDate,
      total: bookingDetails.total,
      tickets: bookingDetails.tickets
    });
    throw error;
  }
};