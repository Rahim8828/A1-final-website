# Design Document: Urban Company Style Service UI

## Overview

This design document outlines the technical approach for implementing an Urban Company-inspired service booking interface for A1 Furniture Polish website. The solution will provide a mobile-first, visually rich interface where users can browse furniture polishing services, view detailed service information with multiple pricing options, select services, and send booking details via WhatsApp instead of a traditional cart checkout.

The design leverages the existing React + TypeScript + Tailwind CSS stack and builds upon current components like `BookingModal`, `TrustBadges`, and `OurProcess` while introducing new components for the Urban Company-style UI.

## Architecture

### High-Level Architecture

```mermaid
graph TD
    A[Service Page Route] --> B[ServiceDetailPage Component]
    B --> C[ServiceHeader]
    B --> D[ServiceGrid]
    B --> E[ServiceDetailModal]
    B --> F[BookingSummary]
    
    D --> G[ServiceCard Component]
    G --> H[Quick Add Action]
    G --> I[View Details Action]
    
    E --> J[ServiceOptions]
    E --> K[TrustSection]
    E --> L[ProcessSection]
    E --> M[FAQSection]
    
    F --> N[BookingSummaryItem]
    F --> O[WhatsAppCheckout]
    
    O --> P[WhatsApp API]
    
    Q[Service Data Store] --> B
    Q --> E
    Q --> F


### Component Hierarchy

```
FurniturePolishServicePage
├── ServiceHeader (Title, Rating, Promotional Banner)
├── ServiceGrid (3-column responsive grid)
│   └── ServiceCard[] (Door, Cabinet, Table, etc.)
│       ├── ServiceImage
│       ├── ServiceInfo (Name, Price, Rating)
│       ├── ServiceFeatures (Bullet points)
│       ├── ViewDetailsButton
│       └── QuickAddButton
├── ServiceDetailModal (Full-screen overlay on mobile)
│   ├── ModalHeader (Back, Close buttons)
│   ├── ServiceOptions[] (Pricing variants)
│   │   └── ServiceOptionCard
│   │       ├── OptionImage
│   │       ├── OptionDetails (Name, Rating, Time, Price)
│   │       └── AddButton
│   ├── PriceIncludesSection
│   ├── TrustBadgesSection
│   │   ├── TopProfessionals
│   │   └── UCCoverPromise
│   ├── MaterialsSection
│   ├── ProcessSection (Reuse OurProcess component)
│   └── FAQSection
└── BookingSummary (Sticky bottom on mobile)
    ├── SelectedServicesList
    │   └── BookingSummaryItem[]
    ├── TotalPrice
    └── BookNowButton (WhatsApp Integration)
```

## Components and Interfaces

### 1. FurniturePolishServicePage Component

Main container component that orchestrates the entire service booking experience.

**Props:**
```typescript
interface FurniturePolishServicePageProps {
  // No props - uses route params or loads all services
}
```

**State:**
```typescript
interface ServicePageState {
  services: ServiceData[];
  selectedServices: SelectedService[];
  activeDetailModal: string | null; // service ID
  isBookingSummaryOpen: boolean;
}
```

**Responsibilities:**
- Load service data from `servicePageData.ts`
- Manage global state for selected services
- Handle modal open/close
- Calculate total price
- Generate WhatsApp message

### 2. ServiceCard Component

Displays individual service in the grid with quick actions.

**Props:**
```typescript
interface ServiceCardProps {
  service: ServiceData;
  onViewDetails: (serviceId: string) => void;
  onQuickAdd: (serviceId: string, optionIndex: number) => void;
}
```

**Visual Design:**
- White background with subtle shadow
- Rounded corners (8px)
- Furniture image at top (aspect ratio 4:3)
- Service name as heading
- Star rating with review count
- Starting price in bold
- 2-3 bullet point features
- "View details" link in purple (#6B46C1)
- "Add" button in purple with white text
- "X options" text in gray

### 3. ServiceDetailModal Component

Full-screen modal (mobile) or overlay (desktop) showing complete service details.

**Props:**
```typescript
interface ServiceDetailModalProps {
  service: ServiceData;
  isOpen: boolean;
  onClose: () => void;
  onAddService: (serviceId: string, optionIndex: number, quantity: number) => void;
  selectedOptions: number[]; // indices of selected options
}
```

**Sections:**
1. Header with back arrow and close button
2. Service options grid (pricing variants)
3. "Your total price includes" with checkmarks
4. "Top professionals" with image and badges
5. "UC cover promise" with warranty details
6. "We bring everything needed" with material images
7. "Our process" with step-by-step images
8. FAQ accordion

**Visual Design:**
- Full-screen on mobile (100vh)
- Scrollable content
- Sticky header
- White background
- Purple accent color for CTAs
- Green checkmarks for included features

### 4. ServiceOptionCard Component

Individual pricing option within the service detail modal.

**Props:**
```typescript
interface ServiceOptionCardProps {
  option: ServiceOption;
  serviceImage: string;
  isSelected: boolean;
  onAdd: () => void;
}
```

**Visual Design:**
- Card with light gray background
- Furniture image
- Option name (e.g., "Single Door")
- Star rating with review count
- Estimated time with clock icon
- Price in bold
- "Add" button in purple
- Badge for "Set of X" if applicable
- Selected state with checkmark or counter

### 5. BookingSummary Component

Sticky bottom component showing selected services and total.

**Props:**
```typescript
interface BookingSummaryProps {
  selectedServices: SelectedService[];
  totalPrice: number;
  onUpdateQuantity: (serviceId: string, optionIndex: number, quantity: number) => void;
  onRemoveService: (serviceId: string, optionIndex: number) => void;
  onBookNow: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}
```

**Visual Design:**
- Sticky at bottom on mobile
- White background with top shadow
- Collapsible/expandable
- Shows item count and total when collapsed
- Shows full list when expanded
- "Book Now" button in green (#059669)
- Smooth animations

### 6. BookingSummaryItem Component

Individual item in the booking summary.

**Props:**
```typescript
interface BookingSummaryItemProps {
  service: SelectedService;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}
```

**Visual Design:**
- Horizontal layout
- Small thumbnail image
- Service name and option
- Quantity selector (- / number / +)
- Price
- Remove button (X icon)

### 7. TrustBadgesSection Component

Displays professional credentials and guarantees.

**Props:**
```typescript
interface TrustBadgesSectionProps {
  type: 'professionals' | 'promise';
}
```

**Visual Design for "Top professionals":**
- Professional image on right
- 3 badges on left:
  - Background verified (shield icon)
  - 300+ hours of training (wrench icon)
  - Certified under Skill India Programme (medal icon)

**Visual Design for "UC cover promise":**
- Brand color heading
- 3 guarantee items:
  - 6 months warranty (shield icon)
  - Up to ₹10,000 damage cover (umbrella icon)
  - Verified quotes (document icon)

### 8. MaterialsSection Component

Shows images of materials and tools used.

**Props:**
```typescript
interface MaterialsSectionProps {
  materials: string[]; // image URLs
}
```

**Visual Design:**
- Heading: "We bring everything needed"
- Subheading: "So you don't have to make market runs"
- Grid of material images (paint cans, brushes, tape, etc.)
- 4 columns on mobile, more on desktop

### 9. FAQSection Component

Accordion-style FAQ list.

**Props:**
```typescript
interface FAQSectionProps {
  faqs: FAQ[];
}
```

**Visual Design:**
- White background
- Each FAQ is a collapsible item
- Question in bold with chevron icon
- Answer revealed on click
- Smooth expand/collapse animation

## Data Models

### ServiceData Interface

```typescript
interface ServiceData {
  id: string;
  name: string;
  category: string; // 'furniture-polish'
  rating: number;
  reviewCount: number;
  duration: string; // e.g., "~3 hrs"
  image: string;
  features: string[]; // bullet points
  options: ServiceOption[];
  priceIncludes: string[];
  materials: string[]; // image URLs
  processSteps: ProcessStep[];
  faqs: FAQ[];
  trustBadges: TrustBadge[];
}

interface ServiceOption {
  id: string;
  name: string; // e.g., "Single Door", "2 Doors"
  price: number;
  rating: number;
  reviewCount: number;
  estimatedTime: string; // e.g., "3 hrs"
  image?: string; // optional, defaults to service image
  badge?: string; // e.g., "Set of 2"
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  image: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface TrustBadge {
  icon: string;
  text: string;
}
```

### SelectedService Interface

```typescript
interface SelectedService {
  serviceId: string;
  serviceName: string;
  optionId: string;
  optionName: string;
  price: number;
  quantity: number;
  image: string;
}
```

### BookingData Interface

```typescript
interface BookingData {
  services: SelectedService[];
  totalPrice: number;
  customerInfo?: {
    name?: string;
    phone?: string;
    address?: string;
  };
}
```

## State Management

### Local Component State

For this feature, we'll use React's built-in state management (useState, useReducer) rather than a global state library. The main state will be managed in the `FurniturePolishServicePage` component and passed down via props.

### State Structure

```typescript
// Main page state
const [services, setServices] = useState<ServiceData[]>([]);
const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
const [activeDetailModal, setActiveDetailModal] = useState<string | null>(null);
const [isBookingSummaryExpanded, setIsBookingSummaryExpanded] = useState(false);

// Helper functions
const addService = (serviceId: string, optionIndex: number, quantity: number = 1) => {
  // Add or update service in selectedServices
};

const updateQuantity = (serviceId: string, optionIndex: number, quantity: number) => {
  // Update quantity of existing service
};

const removeService = (serviceId: string, optionIndex: number) => {
  // Remove service from selectedServices
};

const calculateTotal = () => {
  return selectedServices.reduce((sum, service) => sum + (service.price * service.quantity), 0);
};
```

## Error Handling

### User Input Validation

1. **Empty Booking:**
   - If user clicks "Book Now" with no services selected
   - Show toast/alert: "Please select at least one service"
   - Prevent WhatsApp redirect

2. **Quantity Limits:**
   - Minimum quantity: 1
   - Maximum quantity: 10 (reasonable limit)
   - Disable decrease button at 1
   - Disable increase button at 10

3. **Service Availability:**
   - If service data fails to load
   - Show error message with retry button
   - Fallback to empty state with contact information

### WhatsApp Integration Errors

1. **WhatsApp Not Available:**
   - Detect if WhatsApp is not installed (mobile)
   - Fallback to WhatsApp Web
   - Show message: "Opening WhatsApp..."

2. **Message Too Long:**
   - If booking message exceeds WhatsApp limits
   - Truncate or split message
   - Ensure critical info (services, total) is included

## Testing Strategy

### Unit Tests

1. **Component Tests:**
   - ServiceCard renders correctly with props
   - ServiceDetailModal opens/closes properly
   - BookingSummary calculates total correctly
   - Quantity selector increments/decrements

2. **State Management Tests:**
   - addService adds new service
   - updateQuantity updates existing service
   - removeService removes service
   - calculateTotal returns correct sum

3. **Utility Function Tests:**
   - generateWhatsAppMessage formats correctly
   - formatPrice displays currency properly
   - validateBooking checks for empty selection

### Integration Tests

1. **User Flow Tests:**
   - User can browse services
   - User can view service details
   - User can add multiple services
   - User can modify quantities
   - User can remove services
   - User can complete booking via WhatsApp

2. **Modal Interaction Tests:**
   - Opening detail modal from service card
   - Closing modal with back button
   - Closing modal with X button
   - Adding service from modal updates summary

### Visual Regression Tests

1. **Responsive Design Tests:**
   - Service grid layout on mobile (320px, 375px, 414px)
   - Service grid layout on tablet (768px, 1024px)
   - Service grid layout on desktop (1280px, 1920px)
   - Modal full-screen on mobile
   - Modal overlay on desktop

2. **Component State Tests:**
   - Service card hover state
   - Selected service option state
   - Expanded booking summary
   - Collapsed booking summary

## Performance Optimization

### Image Optimization

1. **Lazy Loading:**
   - Use existing `OptimizedImage` component
   - Load images below fold lazily
   - Prioritize above-fold images

2. **Image Formats:**
   - Use WebP with JPEG fallback
   - Serve appropriate sizes for device
   - Compress images to <100KB

3. **Placeholder Strategy:**
   - Show skeleton loaders while images load
   - Use blur-up technique for smooth loading

### Code Splitting

1. **Route-Based Splitting:**
   - Service detail page as separate chunk
   - Load modal components on demand

2. **Component Lazy Loading:**
   - Lazy load FAQ section (below fold)
   - Lazy load process section (below fold)

### Rendering Optimization

1. **Memoization:**
   - Memoize ServiceCard component
   - Memoize expensive calculations (total price)
   - Use React.memo for pure components

2. **Virtual Scrolling:**
   - If service list grows beyond 50 items
   - Implement virtual scrolling for grid
   - Currently not needed for ~15 services

## Mobile-First Design Approach

### Breakpoints

```css
/* Mobile First */
- xs: 320px - 374px (small phones)
- sm: 375px - 639px (standard phones)
- md: 640px - 767px (large phones)
- lg: 768px - 1023px (tablets)
- xl: 1024px - 1279px (small desktops)
- 2xl: 1280px+ (large desktops)
```

### Layout Strategy

1. **Mobile (< 768px):**
   - 3-column service grid
   - Full-screen modals
   - Sticky bottom booking summary
   - Collapsible summary by default
   - Touch-friendly buttons (min 44x44px)

2. **Tablet (768px - 1023px):**
   - 3-4 column service grid
   - Modal as overlay (80% width)
   - Floating booking summary (bottom-right)
   - Expanded summary by default

3. **Desktop (1024px+):**
   - 4-5 column service grid
   - Modal as centered overlay (max 900px width)
   - Floating booking summary (bottom-right)
   - Hover effects on cards

### Touch Interactions

1. **Tap Targets:**
   - Minimum 44x44px for all buttons
   - Adequate spacing between interactive elements
   - Visual feedback on tap (scale, color change)

2. **Gestures:**
   - Swipe down to close modal (optional enhancement)
   - Pull to refresh service list (optional enhancement)
   - Tap outside modal to close

## Accessibility

### Keyboard Navigation

1. **Tab Order:**
   - Logical tab order through service cards
   - Modal traps focus when open
   - Escape key closes modal
   - Enter key activates buttons

2. **Focus Indicators:**
   - Visible focus rings on all interactive elements
   - High contrast focus indicators
   - Skip to main content link

### Screen Reader Support

1. **ARIA Labels:**
   - `aria-label` for icon-only buttons
   - `aria-expanded` for accordion items
   - `aria-modal` for modal dialogs
   - `role="dialog"` for modals

2. **Semantic HTML:**
   - Proper heading hierarchy (h1, h2, h3)
   - `<button>` for actions
   - `<nav>` for navigation
   - `<main>` for main content

3. **Alt Text:**
   - Descriptive alt text for all images
   - Empty alt for decorative images
   - Context-aware descriptions

### Color Contrast

1. **WCAG AA Compliance:**
   - Text contrast ratio ≥ 4.5:1
   - Large text contrast ratio ≥ 3:1
   - Interactive element contrast ≥ 3:1

2. **Color Independence:**
   - Don't rely solely on color for information
   - Use icons + text for status
   - Patterns in addition to colors

## WhatsApp Integration

### Message Format

```typescript
function generateWhatsAppMessage(booking: BookingData): string {
  let message = "🛋️ *New Furniture Polish Booking*\n\n";
  
  message += "📋 *Services:*\n";
  booking.services.forEach((service, index) => {
    message += `${index + 1}. ${service.serviceName} - ${service.optionName}\n`;
    message += `   Quantity: ${service.quantity}\n`;
    message += `   Price: ₹${service.price} x ${service.quantity} = ₹${service.price * service.quantity}\n\n`;
  });
  
  message += `💰 *Total Amount:* ₹${booking.totalPrice}\n\n`;
  message += "📍 Please share your address and preferred date/time for service.\n\n";
  message += "Thank you for choosing A1 Furniture Polish! 🙏";
  
  return message;
}
```

### WhatsApp URL Construction

```typescript
function openWhatsAppBooking(booking: BookingData) {
  const phoneNumber = "917897995178"; // Business WhatsApp number
  const message = generateWhatsAppMessage(booking);
  const encodedMessage = encodeURIComponent(message);
  
  // Detect mobile vs desktop
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  const whatsappUrl = isMobile
    ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
}
```

### Fallback Strategy

1. **WhatsApp Not Available:**
   - Show phone number to call
   - Provide email option
   - Display booking summary to copy

2. **User Cancels:**
   - Keep booking summary intact
   - Allow user to modify and retry
   - Show "Booking not sent" message

## Visual Design System

### Color Palette

```css
/* Primary Colors */
--primary-purple: #6B46C1;
--primary-purple-hover: #553C9A;
--primary-green: #059669;
--primary-green-hover: #047857;

/* Secondary Colors */
--amber-50: #FFFBEB;
--amber-100: #FEF3C7;
--amber-600: #D97706;
--orange-50: #FFF7ED;
--orange-600: #EA580C;

/* Neutral Colors */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-600: #4B5563;
--gray-900: #111827;

/* Semantic Colors */
--success-green: #10B981;
--error-red: #EF4444;
--warning-yellow: #F59E0B;
```

### Typography

```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing

```css
/* Spacing Scale (Tailwind default) */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Shadows

```css
/* Shadow Levels */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Border Radius

```css
/* Radius Scale */
--radius-sm: 0.25rem;  /* 4px */
--radius-md: 0.5rem;   /* 8px */
--radius-lg: 0.75rem;  /* 12px */
--radius-xl: 1rem;     /* 16px */
--radius-2xl: 1.5rem;  /* 24px */
--radius-full: 9999px; /* Fully rounded */
```

## Animation and Transitions

### Transition Timing

```css
/* Duration */
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;

/* Easing */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Common Animations

1. **Modal Enter/Exit:**
   - Fade in background overlay (300ms)
   - Slide up modal from bottom (300ms)
   - Scale and fade for desktop (200ms)

2. **Card Hover:**
   - Lift shadow (200ms)
   - Slight scale up (200ms)
   - Border color change (200ms)

3. **Button Press:**
   - Scale down to 0.95 (150ms)
   - Color darken (150ms)

4. **Accordion Expand:**
   - Height transition (300ms)
   - Rotate chevron icon (200ms)

## Implementation Phases

### Phase 1: Core Structure (Foundation)
- Create data models and TypeScript interfaces
- Set up service data structure
- Create basic page layout
- Implement service grid with cards

### Phase 2: Service Details (Modal)
- Build service detail modal
- Implement service options display
- Add trust badges section
- Integrate materials and process sections

### Phase 3: Booking Flow (Selection)
- Implement service selection logic
- Build booking summary component
- Add quantity management
- Create remove service functionality

### Phase 4: WhatsApp Integration (Checkout)
- Implement WhatsApp message generation
- Add booking confirmation flow
- Handle edge cases and errors
- Test on mobile and desktop

### Phase 5: Polish and Optimization (Enhancement)
- Add animations and transitions
- Optimize images and performance
- Implement accessibility features
- Conduct cross-browser testing

## Technical Considerations

### Browser Compatibility

- Target: Modern browsers (Chrome, Firefox, Safari, Edge)
- Minimum: Last 2 versions
- Mobile: iOS Safari 12+, Chrome Android 80+
- Fallbacks for older browsers (graceful degradation)

### SEO Considerations

1. **Meta Tags:**
   - Unique title and description per service
   - Open Graph tags for social sharing
   - Structured data (JSON-LD) for services

2. **URL Structure:**
   - `/furniture-polish-services` - Main service page
   - `/furniture-polish-services/door-polish` - Individual service (optional)

3. **Content Strategy:**
   - Descriptive headings (H1, H2, H3)
   - Alt text for all images
   - Semantic HTML structure

### Analytics Tracking

1. **Events to Track:**
   - Service card view
   - Service detail modal open
   - Service option added
   - Booking summary opened
   - WhatsApp booking initiated
   - Booking completed (via WhatsApp callback if possible)

2. **User Behavior:**
   - Most viewed services
   - Most selected options
   - Average booking value
   - Drop-off points in funnel

## Security Considerations

1. **Input Sanitization:**
   - Sanitize any user input (if added later)
   - Validate quantity values
   - Prevent XSS in dynamic content

2. **WhatsApp Number Protection:**
   - Store phone number in environment variable
   - Don't expose in client-side code directly
   - Use server-side proxy if needed (future enhancement)

3. **Data Privacy:**
   - No personal data stored locally
   - Clear privacy policy link
   - GDPR compliance (if applicable)

## Future Enhancements

1. **Advanced Features:**
   - Save booking as draft (localStorage)
   - Share booking link with others
   - Schedule booking for later
   - Add photos of furniture to booking

2. **Payment Integration:**
   - Online payment gateway
   - Partial payment option
   - Payment confirmation via WhatsApp

3. **User Accounts:**
   - Save booking history
   - Repeat previous bookings
   - Loyalty points/discounts

4. **AI Features:**
   - Chatbot for service recommendations
   - Image recognition for furniture type
   - Price estimation based on photos

## Conclusion

This design provides a comprehensive blueprint for implementing an Urban Company-style service booking interface. The mobile-first approach ensures excellent user experience on all devices, while the WhatsApp integration provides a familiar and convenient booking flow for Indian users. The modular component architecture allows for easy maintenance and future enhancements.
