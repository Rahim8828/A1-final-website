import { useCallback } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const useAnalytics = () => {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event);
    }
  }, []);

  const trackServiceView = useCallback((serviceId: string, serviceName: string) => {
    trackEvent({
      action: 'view_service',
      category: 'Services',
      label: `${serviceId} - ${serviceName}`,
    });
  }, [trackEvent]);

  const trackAddToCart = useCallback((serviceId: string, serviceName: string, price: number) => {
    trackEvent({
      action: 'add_to_cart',
      category: 'Ecommerce',
      label: `${serviceId} - ${serviceName}`,
      value: price,
    });
  }, [trackEvent]);

  const trackRemoveFromCart = useCallback((serviceId: string, serviceName: string) => {
    trackEvent({
      action: 'remove_from_cart',
      category: 'Ecommerce',
      label: `${serviceId} - ${serviceName}`,
    });
  }, [trackEvent]);

  const trackViewCart = useCallback((itemCount: number, totalValue: number) => {
    trackEvent({
      action: 'view_cart',
      category: 'Ecommerce',
      label: `${itemCount} items`,
      value: totalValue,
    });
  }, [trackEvent]);

  const trackBooking = useCallback((itemCount: number, totalValue: number) => {
    trackEvent({
      action: 'initiate_booking',
      category: 'Conversion',
      label: `${itemCount} items`,
      value: totalValue,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackServiceView,
    trackAddToCart,
    trackRemoveFromCart,
    trackViewCart,
    trackBooking,
  };
};
