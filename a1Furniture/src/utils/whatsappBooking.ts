import { BookingData, SelectedService } from '../types';

/**
 * Generate formatted WhatsApp message from booking data
 * Requirement 7.3: Include service names, quantities, individual prices, total price
 */
export function generateWhatsAppMessage(booking: BookingData): string {
  let message = "🛋️ *New Furniture Polish Booking*\n\n";
  
  message += "📋 *Services:*\n";
  booking.services.forEach((service, index) => {
    message += `${index + 1}. ${service.serviceName} - ${service.optionName}\n`;
    message += `   Quantity: ${service.quantity}\n`;
    message += `   Price: ₹${service.price.toLocaleString()} x ${service.quantity} = ₹${(service.price * service.quantity).toLocaleString()}\n\n`;
  });
  
  message += `💰 *Total Amount:* ₹${booking.totalPrice.toLocaleString()}\n\n`;
  message += "📍 Please share your address and preferred date/time for service.\n\n";
  message += "Thank you for choosing A1 Furniture Polish! 🙏";
  
  return message;
}

/**
 * Open WhatsApp with pre-filled booking message
 * Requirements 7.2, 7.4, 7.5: Generate formatted message and open WhatsApp with business number
 */
export function openWhatsAppBooking(selectedServices: SelectedService[], totalPrice: number): void {
  // Requirement 7.6: Validate empty booking
  if (selectedServices.length === 0) {
    throw new Error('Please select at least one service before booking');
  }

  const booking: BookingData = {
    services: selectedServices,
    totalPrice: totalPrice,
  };

  const message = generateWhatsAppMessage(booking);
  const phoneNumber = "918828709945"; // Business WhatsApp number
  const encodedMessage = encodeURIComponent(message);
  
  // Detect mobile vs desktop for appropriate WhatsApp URL
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  const whatsappUrl = isMobile
    ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
  
  // Open WhatsApp in new window/tab
  window.open(whatsappUrl, '_blank');
}
