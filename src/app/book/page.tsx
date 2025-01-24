'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Content from '@/components/Content';
import ConfirmationModal from '@/components/ConfirmationModal';

interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'standard' | 'educational';
}

interface BookingState {
  selectedDate: Date | null;
  tickets: {
    [key: string]: number;
  };
  educationalGroup?: {
    students: number;
    teachers: number;
  };
}

const ticketTypes: TicketType[] = [
  {
    id: 'family',
    name: 'Family',
    description: '2 Adults + 2 Children',
    price: 27.99,
    type: 'standard'
  },
  {
    id: 'adult',
    name: 'Single Adult',
    description: '1 Adult',
    price: 9.99,
    type: 'standard'
  },
  {
    id: 'child',
    name: 'Single Child',
    description: '1 Child',
    price: 4.99,
    type: 'standard'
  },
  {
    id: 'pensioner',
    name: 'Pensioner',
    description: '1 Pensioner (60+)',
    price: 6.99,
    type: 'standard'
  },
  {
    id: 'educational',
    name: 'Educational Group',
    description: 'Special rate for school groups',
    price: 0, // Dynamic pricing based on group size
    type: 'educational'
  }
];

export default function BookPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    date: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({ cardLastFour: '' });
  const [userEmail, setUserEmail] = useState('');
  const [booking, setBooking] = useState<BookingState>({
    selectedDate: null,
    tickets: {},
    educationalGroup: {
      students: 0,
      teachers: 0
    }
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
          const returnUrl = encodeURIComponent('/book');
          router.push(`/signin?returnUrl=${returnUrl}`);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        const returnUrl = encodeURIComponent('/book');
        router.push(`/signin?returnUrl=${returnUrl}`);
      }
    };

    checkAuth();
  }, [router]);

  const handleBookingSuccess = async (cardLastFour: string, email: string) => {
    try {
      const bookingDetails = {
        selectedDate: booking.selectedDate || new Date(),
        tickets: booking.tickets,
        total: parseFloat(calculateTotal()),
        paymentInfo: { cardLastFour },
        email
      };

      // Send booking confirmation email
      const response = await fetch('/api/email/booking-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to send confirmation email');
      }

      setPaymentInfo({ cardLastFour });
      setUserEmail(email);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      // Still show confirmation modal even if email fails
      setPaymentInfo({ cardLastFour });
      setUserEmail(email);
      setShowConfirmation(true);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    Object.entries(booking.tickets).forEach(([ticketId, quantity]) => {
      const ticket = ticketTypes.find(t => t.id === ticketId);
      if (ticket && ticket.type === 'standard') {
        total += ticket.price * quantity;
      }
    });

    // Calculate educational group price if applicable
    if (booking.educationalGroup) {
      const { students, teachers } = booking.educationalGroup;
      // £3.99 per student, £5.99 per teacher for educational groups
      total += (students * 3.99) + (teachers * 5.99);
    }

    return total.toFixed(2);
  };

  const handleDateSelect = (date: Date) => {
    setBooking(prev => ({ ...prev, selectedDate: date }));
    setErrors(prev => ({ ...prev, date: '' }));
  };

  const handleNextStep = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!booking.selectedDate) {
        isValid = false;
        newErrors.date = 'Please select a date for your visit';
      }
    } else if (currentStep === 2) {
      const hasTickets = Object.values(booking.tickets).some(quantity => quantity > 0) ||
        (booking.educationalGroup && (booking.educationalGroup.students > 0 || booking.educationalGroup.teachers > 0));
      
      if (!hasTickets) {
        isValid = false;
        newErrors.tickets = 'Please select at least one ticket';
      }
    }

    setErrors(newErrors);

    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
  };

  return (
    <>
      <div className="my-4"></div>
      <Content>
        <div className="py-8 px-4">
          <div className="bg-white/90 p-8 rounded-lg shadow-lg max-w-xl mx-auto border-4 border-[var(--forest-green)] mb-8">
            <h2 className="text-4xl font-bold text-center text-[var(--day-text)]">Book Your Visit</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white rounded-lg shadow-lg border-4 border-[var(--forest-green)] p-8">
              {/* Stepper header */}
              <div className="flex justify-between mb-8">
                <div className={`flex-1 text-center ${currentStep >= 1 ? 'text-[var(--forest-green)]' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-[var(--forest-green)] bg-[var(--forest-green)] text-white' : 'border-gray-400'}`}>
                    1
                  </div>
                  <div className="mt-2">Select Date</div>
                </div>
                <div className={`flex-1 text-center ${currentStep >= 2 ? 'text-[var(--forest-green)]' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-[var(--forest-green)] bg-[var(--forest-green)] text-white' : 'border-gray-400'}`}>
                    2
                  </div>
                  <div className="mt-2">Choose Tickets</div>
                </div>
                <div className={`flex-1 text-center ${currentStep >= 3 ? 'text-[var(--forest-green)]' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${currentStep >= 3 ? 'border-[var(--forest-green)] bg-[var(--forest-green)] text-white' : 'border-gray-400'}`}>
                    3
                  </div>
                  <div className="mt-2">Payment</div>
                </div>
              </div>

              {/* Step content */}
              <div className="mt-8">
                {currentStep === 1 && (
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--day-text)] mb-6">Select a Date</h3>
                    {errors.date && (
                      <p className="text-red-500 mb-4">{errors.date}</p>
                    )}
                    <div className="bg-white p-8 rounded-xl shadow-lg border-4 border-[var(--forest-green)]">
                      <div className="flex items-center justify-between mb-6 bg-[var(--universal-gray)] border-4 border-[var(--day-subtext)] p-4 rounded-lg">
                        <button
                          className="p-3 bg-white rounded-full transition-colors hover:bg-[var(--forest-green)] hover:text-white"
                          onClick={() => {
                            const date = booking.selectedDate || new Date();
                            date.setMonth(date.getMonth() - 1);
                            handleDateSelect(new Date(date));
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <h4 className="text-2xl font-bold text-[var(--day-text)]">
                          {booking.selectedDate ? booking.selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' }) : new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </h4>
                        <button
                          className="p-3 bg-white rounded-full transition-colors hover:bg-[var(--forest-green)] hover:text-white"
                          onClick={() => {
                            const date = booking.selectedDate || new Date();
                            date.setMonth(date.getMonth() + 1);
                            handleDateSelect(new Date(date));
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                          <div key={day} className="text-center font-bold text-[var(--forest-green)] py-2 border-b-2 border-[var(--forest-green)]">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 35 }, (_, i) => {
                          const date = booking.selectedDate || new Date();
                          const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                          const startingDay = firstDay.getDay() || 7;
                          const d = new Date(firstDay);
                          d.setDate(i - startingDay + 2);
                          const isCurrentMonth = d.getMonth() === date.getMonth();
                          const isSelected = booking.selectedDate && d.toDateString() === booking.selectedDate.toDateString();
                          const isPast = d < new Date(new Date().setHours(0, 0, 0, 0));

                          return (
                            <button
                              key={i}
                              className={`
                                p-4 text-center rounded-lg transition-all transform
                                ${isCurrentMonth ? 'hover:bg-[var(--light-brown)] hover:scale-105' : 'text-gray-400'}
                                ${isSelected ? 'bg-[var(--forest-green)] text-white font-bold shadow-lg scale-105' : ''}
                                ${isPast ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}
                              `}
                              disabled={isPast}
                              onClick={() => {
                                if (!isPast) {
                                  setBooking(prev => ({ ...prev, selectedDate: new Date(d) }));
                                }
                              }}
                            >
                              {d.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {booking.selectedDate && (
                      <p className="mt-6 text-[var(--forest-green)] font-bold text-lg bg-[var(--light-brown)] p-4 rounded-lg">
                        Selected date: {booking.selectedDate.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    )}
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--day-text)] mb-4">Choose Your Tickets</h3>
                    {errors.tickets && (
                      <p className="text-red-500 mb-4">{errors.tickets}</p>
                    )}
                    <div className="space-y-4">
                      {ticketTypes.map((ticket) => (
                        <div key={ticket.id} className="p-4 border-2 border-[var(--forest-green)] rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-lg font-bold text-[var(--day-text)]">{ticket.name}</h4>
                              <p className="text-[var(--day-subtext)]">{ticket.description}</p>
                              {ticket.type === 'standard' && (
                                <p className="text-[var(--forest-green)] font-bold">£{ticket.price}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              {ticket.type === 'educational' ? (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <label className="text-sm">Students (£3.99 each):</label>
                                    <input
                                      type="number"
                                      min="0"
                                      value={booking.educationalGroup?.students || 0}
                                      onChange={(e) => setBooking(prev => ({
                                        ...prev,
                                        educationalGroup: {
                                          ...prev.educationalGroup!,
                                          students: parseInt(e.target.value) || 0
                                        }
                                      }))}
                                      className="w-20 px-2 py-1 border border-[var(--forest-green)] rounded"
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <label className="text-sm">Teachers (£5.99 each):</label>
                                    <input
                                      type="number"
                                      min="0"
                                      value={booking.educationalGroup?.teachers || 0}
                                      onChange={(e) => setBooking(prev => ({
                                        ...prev,
                                        educationalGroup: {
                                          ...prev.educationalGroup!,
                                          teachers: parseInt(e.target.value) || 0
                                        }
                                      }))}
                                      className="w-20 px-2 py-1 border border-[var(--forest-green)] rounded"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setBooking(prev => ({
                                      ...prev,
                                      tickets: {
                                        ...prev.tickets,
                                        [ticket.id]: Math.max((prev.tickets[ticket.id] || 0) - 1, 0)
                                      }
                                    }))}
                                    className="w-8 h-8 rounded-full bg-[var(--forest-green)] text-white flex items-center justify-center"
                                  >
                                    -
                                  </button>
                                  <span className="w-8 text-center">{booking.tickets[ticket.id] || 0}</span>
                                  <button
                                    onClick={() => setBooking(prev => ({
                                      ...prev,
                                      tickets: {
                                        ...prev.tickets,
                                        [ticket.id]: (prev.tickets[ticket.id] || 0) + 1
                                      }
                                    }))}
                                    className="w-8 h-8 rounded-full bg-[var(--forest-green)] text-white flex items-center justify-center"
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--day-text)] mb-4">Payment Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-[var(--day-text)] font-medium mb-2">
                          Card Number:
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          className="w-full px-4 py-2 border-2 border-[var(--forest-green)] rounded-lg focus:outline-none focus:border-[var(--day-text)]"
                          placeholder="1234 5678 9123 4567"
                        />
                        {errors.card && (
                          <p className="text-red-500 text-sm mt-1">{errors.card}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-[var(--day-text)] font-medium mb-2">
                            Expiry Date:
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            className="w-full px-4 py-2 border-2 border-[var(--forest-green)] rounded-lg focus:outline-none focus:border-[var(--day-text)]"
                            placeholder="MM/YY"
                          />
                          {errors.expiry && (
                            <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="cvc" className="block text-[var(--day-text)] font-medium mb-2">
                            CVC:
                          </label>
                          <input
                            type="text"
                            id="cvc"
                            className="w-full px-4 py-2 border-2 border-[var(--forest-green)] rounded-lg focus:outline-none focus:border-[var(--day-text)]"
                            placeholder="123"
                          />
                          {errors.cvc && (
                            <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[var(--day-text)] font-medium mb-2">
                          Email for Receipt:
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-2 border-2 border-[var(--forest-green)] rounded-lg focus:outline-none focus:border-[var(--day-text)]"
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <button
                    onClick={handlePreviousStep}
                    className="px-6 py-2 bg-[var(--light-brown)] text-[var(--day-text)] rounded-lg hover:bg-[var(--dark-brown)] transition-colors"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 3 && (
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-[var(--forest-green)] text-white rounded-lg hover:bg-[var(--dark-brown)] transition-colors ml-auto"
                  >
                    Next
                  </button>
                )}
                {currentStep === 3 && (
                  <button
                    onClick={() => {
                      const cardInput = document.getElementById('cardNumber') as HTMLInputElement;
                      const expiryInput = document.getElementById('expiryDate') as HTMLInputElement;
                      const cvcInput = document.getElementById('cvc') as HTMLInputElement;
                      const emailInput = document.getElementById('email') as HTMLInputElement;

                      // Reset any previous errors
                      setErrors({});
                      const newErrors: { [key: string]: string } = {};

                      // Validate card number (simple 16-digit check)
                      if (!cardInput?.value?.replace(/\s/g, '').match(/^\d{16}$/)) {
                        newErrors.card = 'Please enter a valid 16-digit card number';
                      }

                      // Validate expiry date (MM/YY format)
                      if (!expiryInput?.value?.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
                        newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
                      } else {
                        const [month, year] = expiryInput.value.split('/');
                        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
                        if (expiry < new Date()) {
                          newErrors.expiry = 'Card has expired';
                        }
                      }

                      // Validate CVC (3-4 digits)
                      if (!cvcInput?.value?.match(/^\d{3,4}$/)) {
                        newErrors.cvc = 'Please enter a valid CVC (3-4 digits)';
                      }

                      // Validate email
                      if (!emailInput?.value?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                        newErrors.email = 'Please enter a valid email address';
                      }

                      if (Object.keys(newErrors).length > 0) {
                        setErrors(newErrors);
                        return;
                      }

                      // If all validations pass, proceed with booking
                      const cardLastFour = cardInput.value.slice(-4);
                      handleBookingSuccess(cardLastFour, emailInput.value);
                    }}
                    className="px-6 py-2 bg-[var(--forest-green)] text-white rounded-lg hover:bg-[var(--dark-brown)] transition-colors ml-auto"
                  >
                    Complete Booking
                  </button>
                )}
              </div>
            </div>

            {/* Booking summary */}
            <div className="bg-white rounded-lg shadow-lg border-4 border-[var(--forest-green)] p-8 h-fit">
              <h3 className="text-2xl font-bold text-[var(--day-text)] mb-4">Booking Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[var(--day-subtext)]">Total Amount:</span>
                  <span className="font-bold text-[var(--forest-green)]">£{calculateTotal()}</span>
                </div>
                <div className="border-t-2 border-[var(--forest-green)] pt-4">
                  <h4 className="text-lg font-bold text-[var(--day-text)] mb-2">Selected Tickets</h4>
                  {Object.entries(booking.tickets).map(([ticketId, quantity]) => {
                    const ticket = ticketTypes.find(t => t.id === ticketId);
                    if (ticket && quantity > 0 && ticket.type === 'standard') {
                      return (
                        <div key={ticketId} className="flex justify-between text-sm">
                          <span className="text-[var(--day-subtext)]">{ticket.name}</span>
                          <div className="text-right">
                            <span className="text-[var(--day-subtext)]">{quantity}x</span>
                            <span className="text-[var(--day-subtext)] ml-2">£{(ticket.price * quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                  {booking.educationalGroup && (booking.educationalGroup.students > 0 || booking.educationalGroup.teachers > 0) && (
                    <div className="mt-2 border-t border-[var(--forest-green)] pt-2">
                      <div className="text-[var(--day-text)] font-semibold mb-1">Educational Group</div>
                      {booking.educationalGroup.students > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--day-subtext)]">Students (£3.99 each)</span>
                          <div className="text-right">
                            <span className="text-[var(--day-subtext)]">{booking.educationalGroup.students}x</span>
                            <span className="text-[var(--day-subtext)] ml-2">£{(booking.educationalGroup.students * 3.99).toFixed(2)}</span>
                          </div>
                        </div>
                      )}
                      {booking.educationalGroup.teachers > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--day-subtext)]">Teachers (£5.99 each)</span>
                          <div className="text-right">
                            <span className="text-[var(--day-subtext)]">{booking.educationalGroup.teachers}x</span>
                            <span className="text-[var(--day-subtext)] ml-2">£{(booking.educationalGroup.teachers * 5.99).toFixed(2)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          router.push('/');
        }}
        bookingDetails={{
          selectedDate: booking.selectedDate || new Date(),
          tickets: booking.tickets,
          total: parseFloat(calculateTotal()),
          paymentInfo,
          email: userEmail
        }}
      />
    </>
  );
}