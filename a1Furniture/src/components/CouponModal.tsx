import React, { useState } from 'react';

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center md:justify-center overflow-y-auto p-0 md:p-4">
      <div className="bg-white w-full md:max-w-md rounded-t-2xl md:rounded-2xl animate-slide-up md:animate-scale-in max-h-[95vh] md:max-h-[90vh] overflow-y-auto my-auto flex flex-col">
        {/* Header - Sticky on mobile */}
        <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Apply Coupon</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              type="button"
              aria-label="Close coupon modal"
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coupon Code
            </label>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value.toUpperCase());
                setCouponError('');
              }}
              placeholder="Enter coupon code"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              aria-label="Coupon code input"
            />
          </div>

          {couponError && (
            <p className="text-sm text-red-600" role="alert">
              {couponError}
            </p>
          )}

          {/* Available Coupons */}
          <div className="bg-amber-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700 font-semibold mb-2">
              Available Coupons:
            </p>
            {Object.entries(validCoupons).map(([code, coupon]) => (
              <div key={code} className="text-sm text-gray-700 mb-1">
                <span className="font-semibold">{code}</span> - {coupon.description}
              </div>
            ))}
          </div>

          <button
            onClick={handleApply}
            className="w-full bg-amber-600 text-white font-semibold py-3 rounded-lg hover:bg-amber-700 transition-colors"
            type="button"
          >
            Apply Coupon
          </button>

          {appliedCoupon && (
            <button
              onClick={handleRemove}
              className="w-full bg-gray-200 text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors"
              type="button"
            >
              Remove Coupon
            </button>
          )}
        </div>
        
        {/* Bottom Padding for mobile safe area */}
        <div className="h-6 md:hidden"></div>
      </div>
    </div>
  );
};

export default CouponModal;
