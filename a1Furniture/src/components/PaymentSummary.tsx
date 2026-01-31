import React from 'react';

interface Coupon {
  discount: number;
  description: string;
}

interface PaymentSummaryProps {
  itemTotal: number;
  appliedCoupon: string | null;
  validCoupons: { [key: string]: Coupon };
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  itemTotal,
  appliedCoupon,
  validCoupons,
}) => {
  const discountAmount = appliedCoupon && validCoupons[appliedCoupon]
    ? Math.round(itemTotal * validCoupons[appliedCoupon].discount)
    : 0;

  const totalAmount = itemTotal - discountAmount;

  return (
    <section className="bg-white rounded-lg p-4 shadow-sm space-y-4">
      <h2 className="text-lg font-bold">Payment summary</h2>
      
      <div className="space-y-3">
        {/* Item Total */}
        <div className="flex justify-between text-gray-700">
          <span>Item total</span>
          <span className="font-semibold">₹{itemTotal.toLocaleString()}</span>
        </div>
        
        {/* Discount */}
        {appliedCoupon && validCoupons[appliedCoupon] && (
          <div className="flex justify-between text-green-700 bg-green-50 p-2 rounded">
            <span>Discount ({validCoupons[appliedCoupon].description})</span>
            <span className="font-semibold">-₹{discountAmount.toLocaleString()}</span>
          </div>
        )}
        
        {/* Total Amount */}
        <div className="border-t border-gray-200 pt-3 flex justify-between text-gray-900">
          <span className="font-bold">Total amount</span>
          <span className="font-bold">₹{totalAmount.toLocaleString()}</span>
        </div>
      </div>
    </section>
  );
};

export default PaymentSummary;
