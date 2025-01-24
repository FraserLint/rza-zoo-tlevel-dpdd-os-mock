'use client';

import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    selectedDate: Date;
    tickets: {
      [key: string]: number;
    };
    total: number;
    paymentInfo: {
      cardLastFour: string;
    };
    email: string;
  };
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  bookingDetails
}) => {
  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl border-4 border-[var(--darker-brown)]">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700">Visit Date</h3>
            <p>{formatDate(bookingDetails.selectedDate)}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Tickets</h3>
            {Object.entries(bookingDetails.tickets).map(([type, quantity]) => (
              quantity > 0 && (
                <p key={type} className="text-gray-600">
                  {quantity}x {type.charAt(0).toUpperCase() + type.slice(1)}
                </p>
              )
            ))}
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Payment Details</h3>
            <p className="text-gray-600">
              Total Paid: £{bookingDetails.total.toFixed(2)}
            </p>
            <p className="text-gray-600">
              Card ending in: {bookingDetails.paymentInfo.cardLastFour}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Confirmation Email</h3>
            <p className="text-gray-600">{bookingDetails.email}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-[var(--forest-green)] text-white py-2 px-4 rounded-md hover:bg-[var(--day-text)] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;