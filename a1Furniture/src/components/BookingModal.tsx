
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Book Service</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes />
          </button>
        </div>
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Service</label>
            <p>{service} - {price}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSubmit}
              className="bg-amber-600 text-white font-bold py-2 px-4 rounded-full w-full hover:bg-amber-700"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
