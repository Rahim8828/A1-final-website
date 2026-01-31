# Implementation Guide - Nayi Website Banane Ke Liye

## 🎯 Step-by-Step Implementation

### STEP 1: Project Setup (15 minutes)

```bash
# Create new Vite + React + TypeScript project
npm create vite@latest my-service-website -- --template react-ts

cd my-service-website

# Install dependencies
npm install react-router-dom lucide-react react-helmet-async

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Configure Tailwind** (`tailwind.config.js`):
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Add Tailwind directives** (`src/index.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### STEP 2: Folder Structure Banao (5 minutes)

```
src/
├── pages/
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── Cart.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ServiceCard.tsx
│   ├── ServiceDetailModal.tsx
│   ├── ServiceOptionCard.tsx
│   ├── CartIcon.tsx
│   ├── FloatingCartButton.tsx
│   └── BookingSummary.tsx
├── data/
│   └── serviceData.ts
├── hooks/
│   ├── useLocalStorage.ts
│   └── useAnalytics.ts
├── utils/
│   └── whatsappBooking.ts
├── types.ts
├── App.tsx
└── main.tsx
```

---

### STEP 3: Types Define Karo (10 minutes)

**File: `src/types.ts`**
```typescript
export interface ServiceOption {
  id: string;
  name: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  estimatedTime?: string;
  image?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceData {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  duration: string;
  image: string;
  features: string[];
  options: ServiceOption[];
  priceIncludes: string[];
  processSteps: ProcessStep[];
  faqs: FAQ[];
}

export interface SelectedService {
  serviceId: string;
  serviceName: string;
  optionId: string;
  optionName: string;
  price: number;
  quantity: number;
  image: string;
}
```

---

### STEP 4: Service Data Banao (30 minutes)

**File: `src/data/serviceData.ts`**

```typescript
import { ServiceData } from '../types';

export const serviceData: ServiceData[] = [
  {
    id: 'aluminium-window',
    name: 'Aluminium Window Installation',
    category: 'windows',
    rating: 4.8,
    reviewCount: 1234,
    duration: '~3 hrs',
    image: '/images/aluminium-window.jpg',
    features: [
      '5 Year Warranty',
      'Premium Quality Material',
      'Professional Installation',
    ],
    options: [
      {
        id: 'window-3x3',
        name: '3x3 ft Window',
        price: 4500,
        rating: 4.8,
        reviewCount: 234,
        estimatedTime: '2 hrs',
      },
      {
        id: 'window-4x4',
        name: '4x4 ft Window',
        price: 6500,
        rating: 4.9,
        reviewCount: 456,
        estimatedTime: '3 hrs',
      },
      {
        id: 'window-5x5',
        name: '5x5 ft Window',
        price: 8500,
        rating: 4.8,
        reviewCount: 189,
        estimatedTime: '3.5 hrs',
      },
    ],
    priceIncludes: [
      'Material & labour cost',
      'Premium aluminium frame',
      'Installation & fitting',
      '5 year warranty',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Site Measurement',
        description: 'Our team visits and takes accurate measurements',
        image: '/images/measurement.jpg',
      },
      {
        step: 2,
        title: 'Material Selection',
        description: 'Choose from various colors and designs',
        image: '/images/selection.jpg',
      },
      {
        step: 3,
        title: 'Installation',
        description: 'Professional installation by experts',
        image: '/images/installation.jpg',
      },
      {
        step: 4,
        title: 'Quality Check',
        description: 'Final inspection and handover',
        image: '/images/quality-check.jpg',
      },
    ],
    faqs: [
      {
        question: 'How long does installation take?',
        answer: 'Typically 2-4 hours depending on window size.',
      },
      {
        question: 'What warranty do you provide?',
        answer: 'We provide 5 year warranty on all installations.',
      },
    ],
  },
  // Add more services...
];
```

---

### STEP 5: Custom Hooks Banao (15 minutes)

**File: `src/hooks/useLocalStorage.ts`**
```typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

**File: `src/hooks/useAnalytics.ts`**
```typescript
export const useAnalytics = () => {
  const trackServiceView = (serviceId: string, serviceName: string) => {
    console.log('Service Viewed:', serviceId, serviceName);
    // Add Google Analytics or other tracking
  };

  const trackAddToCart = (service: any) => {
    console.log('Added to Cart:', service);
  };

  const trackBooking = (itemCount: number, total: number) => {
    console.log('Booking Initiated:', itemCount, total);
  };

  return { trackServiceView, trackAddToCart, trackBooking };
};
```

---

### STEP 6: WhatsApp Booking Utility (10 minutes)

**File: `src/utils/whatsappBooking.ts`**
```typescript
import { SelectedService } from '../types';

export const openWhatsAppBooking = (
  services: SelectedService[],
  total: number
) => {
  const phoneNumber = '919876543210'; // Apna number dalo
  
  let message = '🏠 *New Booking Request*\n\n';
  message += '📋 *Services:*\n';
  
  services.forEach((service) => {
    message += `• ${service.optionName} - ₹${service.price.toLocaleString()} x ${service.quantity}\n`;
  });
  
  message += `\n💰 *Total: ₹${total.toLocaleString()}*\n\n`;
  message += '📍 Location: \n';
  message += '📅 Preferred Date: \n';
  message += '⏰ Preferred Time: ';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};
```

---

### STEP 7: Main Components Banao

#### A. Header Component (15 minutes)

**File: `src/components/Header.tsx`**
```typescript
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-amber-600">
            Your Logo
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-amber-600">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-amber-600">Services</Link>
            <Link to="/about" className="text-gray-700 hover:text-amber-600">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-amber-600">Contact</Link>
          </nav>
          
          <CartIcon itemCount={cartItemCount} onClick={onCartClick} />
        </div>
      </div>
    </header>
  );
};

export default Header;
```

#### B. Cart Icon Component (10 minutes)

**File: `src/components/CartIcon.tsx`**
```typescript
import { ShoppingCart } from 'lucide-react';

interface CartIconProps {
  itemCount: number;
  onClick: () => void;
}

const CartIcon = ({ itemCount, onClick }: CartIconProps) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label={`Cart with ${itemCount} items`}
    >
      <ShoppingCart className="w-6 h-6 text-gray-700" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
```

#### C. Service Card Component (20 minutes)

**File: `src/components/ServiceCard.tsx`**
```typescript
import { ServiceData } from '../types';
import { Star } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceData;
  onViewDetails: (serviceId: string) => void;
}

const ServiceCard = ({ service, onViewDetails }: ServiceCardProps) => {
  const minPrice = Math.min(...service.options.map(opt => opt.price));
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        {/* Left - Details */}
        <div className="flex-1 space-y-3">
          <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
          
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="text-sm font-semibold">{service.rating}</span>
            <span className="text-xs text-gray-600">({service.reviewCount} reviews)</span>
          </div>
          
          <p className="text-lg font-bold text-gray-900">
            Starts at ₹{minPrice.toLocaleString()}
          </p>
          
          <div className="border-t border-gray-200 pt-3">
            <ul className="space-y-2">
              {service.features.slice(0, 2).map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-gray-400">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <button
            onClick={() => onViewDetails(service.id)}
            className="text-amber-600 font-semibold text-sm hover:text-amber-700"
          >
            View details
          </button>
        </div>
        
        {/* Right - Image & Button */}
        <div className="flex flex-col items-center gap-2 w-40">
          <div className="w-full aspect-square bg-gray-50 rounded-lg overflow-hidden p-3">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-contain"
            />
          </div>
          
          <button
            onClick={() => onViewDetails(service.id)}
            className="w-full px-4 py-2 bg-white text-amber-600 font-semibold text-sm rounded-lg border-2 border-amber-600 hover:bg-amber-50"
          >
            Add
          </button>
          
          <p className="text-xs text-gray-600">{service.options.length} options</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
```

---

### STEP 8: Services Page Banao (45 minutes)

**File: `src/pages/Services.tsx`**
```typescript
import { useState, useCallback } from 'react';
import { serviceData } from '../data/serviceData';
import ServiceCard from '../components/ServiceCard';
import ServiceDetailModal from '../components/ServiceDetailModal';
import CartIcon from '../components/CartIcon';
import { SelectedService } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { openWhatsAppBooking } from '../utils/whatsappBooking';

const Services = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useLocalStorage<SelectedService[]>('cart', []);
  const [showCart, setShowCart] = useState(false);

  const handleViewDetails = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  const handleCloseModal = () => {
    setSelectedServiceId(null);
  };

  const addService = useCallback((serviceId: string, optionIndex: number, quantity: number = 1) => {
    const service = serviceData.find(s => s.id === serviceId);
    if (!service) return;

    const option = service.options[optionIndex];
    if (!option) return;

    setSelectedServices(prev => {
      const existingIndex = prev.findIndex(
        s => s.serviceId === serviceId && s.optionId === option.id
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newService: SelectedService = {
          serviceId: service.id,
          serviceName: service.name,
          optionId: option.id,
          optionName: option.name,
          price: option.price,
          quantity,
          image: service.image,
        };
        return [...prev, newService];
      }
    });
  }, [setSelectedServices]);

  const updateQuantity = useCallback((serviceId: string, optionId: string, newQuantity: number) => {
    setSelectedServices(prev =>
      prev.map(service =>
        service.serviceId === serviceId && service.optionId === optionId
          ? { ...service, quantity: Math.max(1, Math.min(10, newQuantity)) }
          : service
      )
    );
  }, [setSelectedServices]);

  const removeService = useCallback((serviceId: string, optionId: string) => {
    setSelectedServices(prev =>
      prev.filter(service => !(service.serviceId === serviceId && service.optionId === optionId))
    );
  }, [setSelectedServices]);

  const calculateTotal = () => {
    return selectedServices.reduce((sum, service) => sum + service.price * service.quantity, 0);
  };

  const handleBookNow = () => {
    if (selectedServices.length === 0) {
      alert('Please select at least one service');
      return;
    }
    openWhatsAppBooking(selectedServices, calculateTotal());
  };

  const selectedService = serviceData.find(s => s.id === selectedServiceId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Our Services</h1>
            <CartIcon
              itemCount={selectedServices.length}
              onClick={() => setShowCart(true)}
            />
          </div>
        </div>
      </header>

      {/* Services List */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {serviceData.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            onViewDetails={handleViewDetails}
          />
        ))}
      </main>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService || null}
        isOpen={!!selectedServiceId}
        onClose={handleCloseModal}
        onAddService={addService}
        onRemoveService={removeService}
        onUpdateQuantity={updateQuantity}
        selectedOptions={[]} // Implement this based on your needs
      />

      {/* Cart Summary - Bottom Bar */}
      {selectedServices.length > 0 && !showCart && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{selectedServices.length} items</p>
              <p className="text-lg font-bold">₹{calculateTotal().toLocaleString()}</p>
            </div>
            <button
              onClick={handleBookNow}
              className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
```

---

### STEP 9: App.tsx Setup (10 minutes)

**File: `src/App.tsx`**
```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

### STEP 10: Testing & Deployment (30 minutes)

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Customization Checklist

### 1. Branding
- [ ] Logo change karo
- [ ] Color scheme update karo (Tailwind config)
- [ ] Font family change karo

### 2. Content
- [ ] Service data update karo
- [ ] Images add karo (`/public/images/`)
- [ ] Process steps customize karo
- [ ] FAQs update karo

### 3. Contact
- [ ] WhatsApp number change karo
- [ ] Email address update karo
- [ ] Social media links add karo

### 4. SEO
- [ ] Meta tags add karo
- [ ] Sitemap generate karo
- [ ] Google Analytics add karo

---

## 📱 Mobile Optimization

### Bottom Navigation (Optional)
```typescript
// src/components/BottomNav.tsx
import { Home, List, User, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="flex items-center justify-around py-2">
        <Link to="/" className={`flex flex-col items-center p-2 ${isActive('/') ? 'text-amber-600' : 'text-gray-600'}`}>
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/services" className={`flex flex-col items-center p-2 ${isActive('/services') ? 'text-amber-600' : 'text-gray-600'}`}>
          <List className="w-6 h-6" />
          <span className="text-xs mt-1">Services</span>
        </Link>
        <Link to="/about" className={`flex flex-col items-center p-2 ${isActive('/about') ? 'text-amber-600' : 'text-gray-600'}`}>
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">About</span>
        </Link>
        <Link to="/contact" className={`flex flex-col items-center p-2 ${isActive('/contact') ? 'text-amber-600' : 'text-gray-600'}`}>
          <Phone className="w-6 h-6" />
          <span className="text-xs mt-1">Contact</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
```

---

## 🚀 Performance Tips

1. **Image Optimization**
   - Use WebP format
   - Add lazy loading
   - Compress images

2. **Code Splitting**
   - Use React.lazy() for pages
   - Dynamic imports for heavy components

3. **Caching**
   - Service Worker for offline support
   - localStorage for cart persistence

---

## 📊 Analytics Integration

```typescript
// Add to index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🎯 Key Features Summary

✅ **Service Listing** - Urban Company style cards
✅ **Service Details** - Full-screen modal with options
✅ **Cart System** - Add/Remove/Update quantity
✅ **WhatsApp Booking** - Direct booking via WhatsApp
✅ **Responsive Design** - Mobile-first approach
✅ **Local Storage** - Cart persistence
✅ **SEO Ready** - Meta tags & structured data
✅ **Fast Performance** - Optimized bundle size

---

## 🔧 Troubleshooting

### Issue: Images not loading
**Solution:** Check image paths in `/public/images/`

### Issue: WhatsApp not opening
**Solution:** Verify phone number format (country code without +)

### Issue: Cart not persisting
**Solution:** Check localStorage in browser DevTools

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Vite Guide](https://vitejs.dev)

---

## 🎉 Done!

Tumhari website ready hai! Bas service data change karo aur deploy kar do.

**Deployment Options:**
- Vercel (Recommended)
- Netlify
- GitHub Pages
- Firebase Hosting

```bash
# Vercel deployment
npm i -g vercel
vercel
```

**Happy Coding! 🚀**
