import React from 'react';

interface Coupon {
  discount: number;
  description: string;
}

interface CouponSectionProps {
  appliedCoupon: string | null;
  validCoupons: { [key: string]: Coupon };
  onOpenModal: () => void;
}

const CouponSection: React.FC<CouponSectionProps> = ({
  appliedCoupon,
  validCoupons,
  onOpenModal,
}) => {
  return (
    <section className="bg-white rounded-lg p-4 shadow-sm">
      <button
        onClick={onOpenModal}
        className="w-full flex items-center gap-3 hover:bg-gray-50 transition-colors p-2 rounded-lg"
        type="button"
        aria-label={appliedCoupon ? 'Change coupon' : 'Apply coupon'}
      >
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-green-600 text-xl" aria-hidden="true">%</span>
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-gray-900">
            {appliedCoupon && validCoupons[appliedCoupon]
              ? validCoupons[appliedCoupon].description
              : 'Apply Coupon'}
          </h3>
          <p className="text-sm text-gray-600">
            {appliedCoupon ? `Code: ${appliedCoupon}` : 'Tap to apply coupon code'}
          </p>
        </div>
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </section>
  );
};

export default CouponSection;
