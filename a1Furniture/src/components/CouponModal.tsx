import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { X, Tag } from 'lucide-react';

interface Coupon {
  discount: number;
  description: string;
}

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  appliedCoupon: string | null;
  validCoupons: { [key: string]: Coupon };
}

const CouponModal: React.FC<CouponModalProps> = ({
  isOpen,
  onClose,
  onApplyCoupon,
  onRemoveCoupon,
  appliedCoupon,
  validCoupons,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApply = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError('Please enter a coupon code');
      return;
    }
    if (validCoupons[code]) {
      onApplyCoupon(code);
      setCouponCode('');
      setCouponError('');
      onClose();
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const handleRemove = () => {
    onRemoveCoupon();
    onClose();
  };

  const handleClose = () => {
    setCouponCode('');
    setCouponError('');
    onClose();
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex flex-col justify-end md:justify-center md:items-center p-0 md:p-6 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full md:max-w-md bg-white rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col z-10 animate-slide-up md:animate-scale-in max-h-[85vh] md:max-h-[90vh] overflow-hidden border border-[#D2B48C]/30">
        {/* Header */}
        <div className="flex-shrink-0 bg-gradient-to-r from-[#5D3A1A] via-[#8B4513] to-[#A0522D] px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Tag className="w-5 h-5 text-white" />
              <h2 className="text-lg font-bold text-white">Apply Coupon</h2>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              type="button"
              aria-label="Close coupon modal"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#5D3A1A] mb-1.5">
              Coupon Code
            </label>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value.toUpperCase());
                setCouponError('');
              }}
              placeholder="e.g. FIRST10"
              className="w-full px-4 py-3 border border-[#D2B48C] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] text-gray-900 font-medium uppercase outline-none"
              aria-label="Coupon code input"
            />
          </div>

          {couponError && (
            <p className="text-sm text-red-600 font-medium" role="alert">
              {couponError}
            </p>
          )}

          {/* Available Coupons */}
          <div className="bg-[#FDF8F3] border border-[#D2B48C]/40 p-4 rounded-xl space-y-2">
            <p className="text-xs uppercase font-bold text-[#5D3A1A]/80 tracking-wider">
              Available Offers:
            </p>
            {Object.entries(validCoupons).map(([code, coupon]) => (
              <div 
                key={code} 
                onClick={() => {
                  setCouponCode(code);
                  setCouponError('');
                }}
                className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-[#D2B48C]/30 hover:border-[#8B4513] cursor-pointer transition-all"
              >
                <div>
                  <span className="font-bold text-[#5D3A1A] text-sm">{code}</span>
                  <p className="text-xs text-[#5D3A1A]/70">{coupon.description}</p>
                </div>
                <span className="text-xs font-semibold text-[#8B4513] bg-[#F5EBE0] px-2.5 py-1 rounded-md">
                  Tap to use
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleApply}
            className="w-full bg-gradient-to-r from-[#5D3A1A] via-[#8B4513] to-[#A0522D] text-white font-semibold py-3.5 rounded-xl hover:from-[#8B4513] hover:via-[#A0522D] hover:to-[#CD853F] transition-all shadow-md active:scale-[0.98]"
            type="button"
          >
            Apply Coupon
          </button>

          {appliedCoupon && (
            <button
              onClick={handleRemove}
              className="w-full bg-red-50 text-red-700 font-semibold py-3 rounded-xl hover:bg-red-100 transition-colors border border-red-200"
              type="button"
            >
              Remove Applied Coupon
            </button>
          )}
        </div>
        
        {/* Safe Area padding on mobile */}
        <div className="h-6 md:hidden"></div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default CouponModal;

