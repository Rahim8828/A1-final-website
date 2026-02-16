# Parallax Service Page Design

## Overview
The new parallax service page template provides a modern, immersive user experience with smooth scrolling effects and interactive pricing modals.

## Key Features

### 1. **Parallax Scrolling Effects**
- Hero section with background image parallax
- Smooth section transitions with different scroll speeds
- Floating elements that move at different rates
- Creates depth and visual interest

### 2. **Enhanced Pricing Section**
- **Large Pricing Card**: Prominent display with starting price badge
- **Draggable Modals**: Click on any pricing factor to open a draggable modal with detailed information
- **Interactive Elements**: Hover effects and smooth transitions
- **Mobile Responsive**: Touch-enabled dragging on mobile devices

### 3. **Modern Visual Design**
- Bold typography (5xl-6xl headings)
- Gradient backgrounds (amber to orange)
- Large, prominent CTAs
- Smooth animations and transitions
- Glass-morphism effects

### 4. **Improved User Experience**
- Sticky breadcrumb navigation
- Floating rating card
- Multiple CTA placements
- WhatsApp and phone integration
- Smooth scroll animations

## Components

### ParallaxServiceTemplate
Main template component that replaces `ServicePageTemplate` with enhanced parallax effects.

**Location**: `src/components/ParallaxServiceTemplate.tsx`

### DraggablePricingModal
Interactive modal component for displaying pricing factor details.

**Features**:
- Drag and drop functionality (mouse and touch)
- Smooth animations
- Backdrop blur effect
- Call-to-action buttons

**Location**: `src/components/DraggablePricingModal.tsx`

### ParallaxSection
Wrapper component for sections with parallax effects.

**Location**: `src/components/ParallaxSection.tsx`

## Usage

### Update Single Page
```typescript
// Change import
import ParallaxServiceTemplate from '../../components/ParallaxServiceTemplate';

// Use in component
const MyServicePage: React.FC = () => {
  return <ParallaxServiceTemplate pageData={pageData} />;
};
```

### Update All Generated Pages
Run the update script:
```bash
npm run update:parallax
```

This will automatically update all generated service pages to use the new parallax template.

## Pricing Factor Details

The draggable modals provide detailed explanations for each pricing factor:

1. **Furniture size and type**: Explains how size affects pricing
2. **Polish type**: Details about PU, Melamine, and Duco options
3. **Condition of existing finish**: Information about repair work
4. **Number of items**: Package discount information
5. **Additional repair work**: Separate repair work pricing

## Customization

### Adjust Parallax Speed
Modify the `speed` prop in `ParallaxSection` components:
```typescript
<ParallaxSection speed={0.5}> // Slower
<ParallaxSection speed={0.2}> // Faster
```

### Modify Pricing Factor Details
Edit the `getPricingFactorDetails` function in `ParallaxServiceTemplate.tsx`:
```typescript
function getPricingFactorDetails(factor: string): string {
  const details: Record<string, string> = {
    'Your Factor': 'Your detailed explanation...',
  };
  return details[factor] || 'Default message';
}
```

### Customize Colors
The design uses Tailwind CSS classes. Main colors:
- Primary: `amber-500` to `orange-600`
- Accent: `green-500` (WhatsApp)
- Dark: `gray-900`

## Performance Considerations

1. **Scroll Event Optimization**: Uses `requestAnimationFrame` for smooth scrolling
2. **Image Optimization**: Background images should be optimized
3. **Lazy Loading**: Heavy sections load on demand
4. **Mobile Performance**: Reduced parallax effects on mobile for better performance

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Fallback for older browsers (no parallax effects)

## Testing

Test the following:
1. Scroll performance on different devices
2. Draggable modal functionality (mouse and touch)
3. Responsive design on various screen sizes
4. CTA button functionality
5. Image loading and parallax effects

## Migration Checklist

- [x] Create ParallaxServiceTemplate component
- [x] Create DraggablePricingModal component
- [x] Create ParallaxSection component
- [x] Update AffordableSofaWoodPolishSion.tsx as example
- [x] Create update script for all pages
- [x] Add npm script command
- [ ] Test on development server
- [ ] Test on mobile devices
- [ ] Optimize images for parallax backgrounds
- [ ] Update all generated pages
- [ ] Deploy to production

## Future Enhancements

1. Add more interactive elements
2. Implement scroll-triggered animations
3. Add video backgrounds for hero section
4. Create animated pricing calculator
5. Add customer testimonial carousel with parallax
6. Implement 3D card effects
7. Add micro-interactions on hover

## Support

For issues or questions about the parallax design:
1. Check browser console for errors
2. Verify all components are imported correctly
3. Test scroll performance on target devices
4. Review Tailwind CSS configuration

---

**Last Updated**: December 2024
**Version**: 1.0.0
