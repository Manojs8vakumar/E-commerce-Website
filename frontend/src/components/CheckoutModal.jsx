import React, { useState } from 'react';
import { 
  X, CheckCircle2, ShieldCheck, Truck, CreditCard, 
  Smartphone, Banknote, ArrowRight, Sparkles, MapPin, 
  Check, Lock, ChevronDown 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { createOrder } from '../services/api';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems = [],
  totalAmount = 0,
  discountAmount = 0,
  onOrderSuccess,
}) {
  const [activeStep, setActiveStep] = useState(2); // 1: Login, 2: Address, 3: Summary, 4: Payment, 5: Confirmed
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const addresses = [
    {
      id: 1,
      name: 'Rahul Sharma',
      phone: '9876543210',
      type: 'HOME',
      street: 'Flat 402, Royal Palms Residency, 100ft Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    {
      id: 2,
      name: 'Rahul Sharma',
      phone: '9876543210',
      type: 'WORK',
      street: 'Prestige Tech Park, Block B, Marathahalli-Sarjapur Outer Ring Rd',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103'
    }
  ];

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // UPI, CARD, NETBANKING, COD, EMI
  const [captchaInput, setCaptchaInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!isOpen) return null;

  const currentAddress = addresses[selectedAddressIndex];

  const handleConfirmOrder = async () => {
    if (paymentMethod === 'COD' && captchaInput !== '4892') {
      alert('Please enter correct captcha (4892) to confirm Cash on Delivery');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderPayload = {
        customerName: currentAddress.name,
        customerEmail: 'rahul.sharma@gmail.com',
        customerPhone: currentAddress.phone,
        shippingAddress: currentAddress.street,
        city: currentAddress.city,
        pincode: currentAddress.pincode,
        totalAmount: totalAmount,
        discountAmount: discountAmount,
        paymentMethod: paymentMethod,
        items: cartItems.map((item) => ({
          productId: item.id,
          title: item.title,
          imageUrl: item.imageUrl,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      const result = await createOrder(orderPayload);
      setConfirmedOrder(result);
      setActiveStep(5);

      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#2874f0', '#ffe500', '#fb641b', '#388e3c'],
        });
      } catch (e) {}

      if (onOrderSuccess) onOrderSuccess(result);
    } catch (err) {
      alert('Error placing order: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-md bg-[#f1f3f6] shadow-2xl overflow-hidden my-auto border border-slate-200">
        
        {/* Just Buy It Checkout Top Bar */}
        <div className="bg-[#2874f0] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#ffe500]" />
            <h2 className="text-base font-bold font-['Outfit']">Just Buy It Secure Checkout</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-3 max-h-[88vh] overflow-y-auto">
          
          {/* STEP 1: Login Accordion (Completed) */}
          <div className="bg-white rounded p-3.5 shadow-xs border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-[#2874f0] text-xs font-bold flex items-center justify-center">
                1
              </span>
              <div>
                <span className="font-bold text-xs uppercase text-slate-500">LOGIN</span>
                <div className="text-xs font-bold text-slate-800">Rahul Sharma <span className="text-slate-500 font-normal">+91 9876543210</span></div>
              </div>
            </div>
            <button className="text-[#2874f0] font-bold text-xs uppercase border border-slate-200 px-3 py-1 rounded-sm hover:bg-slate-50">
              CHANGE
            </button>
          </div>

          {/* STEP 2: Delivery Address */}
          <div className="bg-white rounded shadow-xs border border-slate-200 overflow-hidden">
            <div className="bg-[#2874f0] text-white px-4 py-2.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white text-[#2874f0] text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-xs uppercase tracking-wider">DELIVERY ADDRESS</h3>
            </div>

            <div className="p-4 space-y-3">
              {addresses.map((addr, idx) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddressIndex(idx)}
                  className={`p-3.5 rounded border transition-all cursor-pointer flex items-start gap-3 ${
                    selectedAddressIndex === idx
                      ? 'border-[#2874f0] bg-blue-50/40'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="addressSelect"
                    checked={selectedAddressIndex === idx}
                    onChange={() => setSelectedAddressIndex(idx)}
                    className="mt-1 text-[#2874f0]"
                  />
                  <div className="flex-1 text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{addr.name}</span>
                      <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
                        {addr.type}
                      </span>
                      <span className="font-bold text-slate-700">{addr.phone}</span>
                    </div>
                    <div className="text-slate-600 leading-relaxed">
                      {addr.street}, {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                    </div>

                    {selectedAddressIndex === idx && activeStep === 2 && (
                      <button
                        onClick={() => setActiveStep(3)}
                        className="mt-3 px-6 py-2.5 rounded-sm bg-[#fb641b] text-white font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer"
                      >
                        DELIVER HERE
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 3: Order Summary */}
          <div className="bg-white rounded shadow-xs border border-slate-200 overflow-hidden">
            <div
              onClick={() => activeStep >= 3 && setActiveStep(3)}
              className="px-4 py-2.5 flex items-center justify-between cursor-pointer border-b border-slate-100"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                  ORDER SUMMARY ({cartItems.length} Items)
                </h3>
              </div>
              {activeStep > 3 && (
                <button className="text-[#2874f0] font-bold text-xs uppercase hover:underline">
                  CHANGE
                </button>
              )}
            </div>

            {activeStep === 3 && (
              <div className="p-4 space-y-3">
                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.imageUrl} alt={item.title} className="w-12 h-12 object-contain rounded" />
                        <div>
                          <div className="font-semibold text-slate-800 line-clamp-1">{item.title}</div>
                          <div className="text-slate-400 text-[11px]">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="font-bold text-slate-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-600">
                    Order confirmation email will be sent to <strong className="text-slate-800">rahul.sharma@gmail.com</strong>
                  </span>
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-6 py-2.5 rounded-sm bg-[#fb641b] text-white font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer"
                  >
                    CONTINUE
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: Payment Options */}
          <div className="bg-white rounded shadow-xs border border-slate-200 overflow-hidden">
            <div className="bg-[#2874f0] text-white px-4 py-2.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white text-[#2874f0] text-xs font-bold flex items-center justify-center">
                4
              </span>
              <h3 className="font-bold text-xs uppercase tracking-wider">PAYMENT OPTIONS</h3>
            </div>

            {activeStep === 4 && (
              <div className="p-4 space-y-3">
                {/* UPI */}
                <label className="p-3 rounded border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-[#2874f0]" />
                    <div>
                      <div className="text-xs font-bold text-slate-800">UPI (Google Pay, PhonePe, Paytm, BHIM)</div>
                      <div className="text-[10px] text-slate-500">Pay directly from your bank account instantly</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payOpt"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="text-[#2874f0]"
                  />
                </label>

                {/* Credit / Debit Card */}
                <label className="p-3 rounded border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-amber-500" />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Credit / Debit / ATM Card</div>
                      <div className="text-[10px] text-[#388e3c] font-bold">10% Instant Discount on SBI & HDFC Cards</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payOpt"
                    checked={paymentMethod === 'CARD'}
                    onChange={() => setPaymentMethod('CARD')}
                    className="text-[#2874f0]"
                  />
                </label>

                {/* Cash on Delivery */}
                <div className={`p-3 rounded border transition-all ${paymentMethod === 'COD' ? 'border-[#2874f0] bg-blue-50/20' : 'border-slate-200'}`}>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Banknote className="w-5 h-5 text-[#388e3c]" />
                      <div>
                        <div className="text-xs font-bold text-slate-800">Cash on Delivery (COD)</div>
                        <div className="text-[10px] text-slate-500">Pay cash or UPI at the doorstep</div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payOpt"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="text-[#2874f0]"
                    />
                  </label>

                  {paymentMethod === 'COD' && (
                    <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-3 text-xs">
                      <div className="bg-slate-200 px-3 py-1.5 font-mono font-black text-slate-700 tracking-widest text-sm rounded">
                        4892
                      </div>
                      <input
                        type="text"
                        placeholder="Enter characters"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        className="w-32 p-1.5 border border-slate-300 rounded text-xs font-bold uppercase"
                      />
                      <span className="text-[10px] text-slate-500">Confirm you are human</span>
                    </div>
                  )}
                </div>

                {/* Final Order Action */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-semibold">Total Payable</span>
                    <div className="text-lg font-bold text-slate-900 font-['Outfit']">
                      ₹{totalAmount.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmOrder}
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-sm bg-[#fb641b] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'CONFIRMING...' : 'CONFIRM ORDER'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* STEP 5: Order Placed Success */}
          {activeStep === 5 && confirmedOrder && (
            <div className="bg-white rounded-md p-6 text-center space-y-4 border border-slate-200 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#388e3c] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-['Outfit']">
                  Order Placed Successfully!
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Thank you, <strong className="text-slate-800">{confirmedOrder.customerName}</strong>! An SMS & Email confirmation has been sent.
                </p>
              </div>

              <div className="bg-slate-50 rounded p-4 text-xs space-y-2 text-left max-w-md mx-auto border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="font-mono font-bold text-[#2874f0]">{confirmedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Status:</span>
                  <span className="font-bold text-[#388e3c]">{confirmedOrder.paymentStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Amount:</span>
                  <span className="font-bold text-slate-900">₹{confirmedOrder.totalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SuperCoins Earned:</span>
                  <span className="font-bold text-amber-600">+{confirmedOrder.earnedSuperCoins} Coins</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <span className="text-slate-500">Delivery Address:</span>
                  <span className="text-right text-slate-800">{confirmedOrder.shippingAddress}, {confirmedOrder.city}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-2.5 rounded-sm bg-[#2874f0] text-white font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
