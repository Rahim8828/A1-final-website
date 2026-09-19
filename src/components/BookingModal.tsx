import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { X, Calendar } from 'lucide-react';

interface BookingModalProps {
  service: string;
  price: string;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ service, price, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    if (!name || !phone || !address) {
      alert('Please fill in all fields.');
      return;
    }

    const message = `New Booking!

Service: ${service}
Price: ${price}
Name: ${name}
Phone: ${phone}
Address: ${address}`;
    const whatsappUrl = `https://wa.me/918828709945?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex flex-col justify-end md:justify-center md:items-center p-0 md:p-6 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full md:max-w-md bg-white rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col z-10 animate-slide-up md:animate-scale-in max-h-[88vh] overflow-hidden border border-[#D2B48C]/30">
        {/* Header */}
        <div className="flex-shrink-0 bg-gradient-to-r from-[#5D3A1A] via-[#8B4513] to-[#A0522D] px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Calendar className="w-5 h-5 text-white" />
              <h2 className="text-lg font-bold text-white">Book Service</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              type="button"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="p-3.5 bg-[#FDF8F3] border border-[#D2B48C]/40 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-semibold text-[#5D3A1A]/70">Selected Service</p>
              <p className="font-bold text-[#5D3A1A] text-sm sm:text-base">{service}</p>
            </div>
            <span className="font-bold text-[#8B4513] text-base">{price}</span>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#5D3A1A] mb-1" htmlFor="book-name">
              Your Name
            </label>
            <input
              type="text"
              id="book-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-4 py-2.5 border border-[#D2B48C] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] outline-none text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#5D3A1A] mb-1" htmlFor="book-phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="book-phone"
              value={phone}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full px-4 py-2.5 border border-[#D2B48C] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] outline-none text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#5D3A1A] mb-1" htmlFor="book-address">
              Address / Location in Mumbai
            </label>
            <textarea
              id="book-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Bandra West, Mumbai"
              rows={3}
              className="w-full px-4 py-2.5 border border-[#D2B48C] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] outline-none text-gray-900 resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#5D3A1A] via-[#8B4513] to-[#A0522D] text-white font-bold py-3.5 rounded-xl hover:from-[#8B4513] hover:via-[#A0522D] hover:to-[#CD853F] transition-all shadow-md active:scale-[0.98]"
            type="button"
          >
            Confirm Booking on WhatsApp
          </button>
        </div>

        {/* Safe Area padding on mobile */}
        <div className="h-6 md:hidden"></div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default BookingModal;
