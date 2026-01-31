# Implementation Plan

- [x] 1. Set up data structure and TypeScript interfaces
  - Create TypeScript interfaces for ServiceData, ServiceOption, SelectedService, and BookingData
  - Update servicePageData.ts to include all required fields (rating, reviewCount, priceIncludes, materials, processSteps, faqs, trustBadges)
  - Add furniture category icons/images for service grid
  - _Requirements: 1.1, 1.2, 2.1_

- [x] 2. Create ServiceCard component for grid display
  - Build ServiceCard component with image, name, rating, starting price, and features
  - Implement responsive 3-column grid layout for mobile
  - Add "View details" link and "Add" button with purple styling
  - Display "X options" text for service variants
  - Add hover effects and transitions
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

- [x] 3. Build ServiceDetailModal component
- [x] 3.1 Create modal structure with header and navigation
  - Implement full-screen modal for mobile, overlay for desktop
  - Add back arrow and close (X) button in header
  - Display service name in header
  - Handle modal open/close with smooth animations
  - Trap focus within modal when open
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 8.1, 8.2_

- [x] 3.2 Implement service options pricing display
  - Create ServiceOptionCard component for each pricing variant
  - Display option image, name, rating, estimated time, and price
  - Add "Add" button for each option with purple styling
  - Show "Set of X" badge where applicable
  - Implement selected state visual indication
  - _Requirements: 4.1, 4.2, 5.1, 5.2_

- [x] 3.3 Add "Your total price includes" section
  - Display list of included features with green checkmarks
  - Show material & labour cost, polish brand, post-service cleaning
  - Use clean white background with proper spacing
  - _Requirements: 4.3_

- [x] 3.4 Create "Top professionals" trust section
  - Display professional image on right side
  - Show trust badges: Background verified, 300+ hours training, Certified
  - Use shield, wrench, and medal icons
  - Implement responsive layout for mobile/desktop
  - _Requirements: 4.4_

- [x] 3.5 Build "UC cover promise" warranty section
  - Display warranty details: 6 months warranty, ₹10,000 damage cover, verified quotes
  - Use shield, umbrella, and document icons with green checkmarks
  - Style with brand colors
  - _Requirements: 4.5_

- [x] 3.6 Add "We bring everything needed" materials section
  - Display grid of material/tool images (paint cans, brushes, tape, etc.)
  - Show heading and subheading
  - Implement 4-column grid on mobile, more on desktop
  - _Requirements: 4.6_

- [x] 3.7 Integrate "Our process" section
  - Reuse existing OurProcess component or create similar
  - Display 6 steps with images and descriptions
  - Show numbered steps with visual timeline
  - Add smooth scroll animations
  - _Requirements: 4.7_

- [x] 3.8 Create FAQ accordion section
  - Build collapsible FAQ items with questions and answers
  - Implement smooth expand/collapse animations
  - Add chevron icon that rotates on expand
  - Style with white background and proper spacing
  - _Requirements: 4.8_

- [x] 4. Implement service selection and booking state management
  - Create state management for selected services array
  - Implement addService function to add/update services
  - Build updateQuantity function for quantity changes
  - Create removeService function to remove items
  - Add calculateTotal function for price calculation
  - Handle edge cases (duplicate selections, quantity limits)
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 5. Build BookingSummary component
- [x] 5.1 Create sticky bottom summary container
  - Implement sticky positioning at bottom on mobile
  - Add white background with top shadow
  - Create collapsible/expandable functionality
  - Show item count and total when collapsed
  - Display full list when expanded
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 5.2 Build BookingSummaryItem component
  - Display service thumbnail, name, and option
  - Add quantity selector with +/- buttons
  - Show individual price
  - Implement remove button with X icon
  - Handle quantity updates and removal
  - _Requirements: 6.5_

- [x] 5.3 Add empty state handling
  - Display message when no services selected
  - Show helpful text to guide user
  - Style appropriately
  - _Requirements: 6.5_

- [x] 6. Implement WhatsApp booking integration
  - Create generateWhatsAppMessage function with proper formatting
  - Build openWhatsAppBooking function with mobile/desktop detection
  - Add "Book Now" button in green color (#059669)
  - Implement validation to prevent empty bookings
  - Show error message if no services selected
  - Handle WhatsApp URL construction and encoding
  - Test on mobile and desktop browsers
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

- [x] 7. Create main FurniturePolishServicePage component
  - Build page container component
  - Add service header with title, rating, and promotional banner
  - Integrate ServiceGrid with ServiceCard components
  - Connect ServiceDetailModal with state
  - Integrate BookingSummary component
  - Wire up all event handlers (onViewDetails, onAdd, onRemove, etc.)
  - Load service data from servicePageData.ts
  - _Requirements: 1.1, 1.5, 3.1, 3.2, 3.3, 3.4_
`
- [x] 8. Implement mobile-first responsive design
  - Ensure 3-column grid on mobile (320px-768px)
  - Adapt to 4-column grid on tablet (768px-1024px)
  - Implement 4-5 column grid on desktop (1024px+)
  - Make modal full-screen on mobile
  - Create overlay modal on desktop
  - Ensure touch-friendly button sizes (44x44px minimum)
  - Test on various screen sizes
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 9. Apply visual design and styling
  - Implement Website orange primary color for CTAs and links
  - Use green (#059669) for WhatsApp button
  - Apply white backgrounds with subtle gray dividers
  - Add green checkmarks for included features
  - Use consistent typography hierarchy
  - Apply 8px border radius on cards and buttons
  - Add subtle shadows for depth
  - Ensure high-quality furniture images
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

- [x] 10. Add animations and transitions
  - Implement modal enter/exit animations (fade + slide)
  - Add card hover effects (lift shadow, scale)
  - Create button press animations (scale down)
  - Build accordion expand/collapse transitions
  - Add smooth scroll animations
  - Ensure 200-300ms transition durations
  - _Requirements: 8.1, 9.1_

- [x] 11. Implement accessibility features
  - Add proper ARIA labels for icon-only buttons
  - Implement keyboard navigation (Tab, Enter, Escape)
  - Create focus indicators for all interactive elements
  - Add aria-expanded for accordion items
  - Use aria-modal for modal dialogs
  - Ensure proper heading hierarchy (h1, h2, h3)
  - Add descriptive alt text for all images
  - Test with screen readers
  - Verify WCAG AA color contrast compliance
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 12. Optimize performance
  - Implement lazy loading for below-fold images
  - Use OptimizedImage component for all images
  - Add skeleton loaders for loading states
  - Memoize ServiceCard component with React.memo
  - Optimize expensive calculations (total price)
  - Compress images to <100KB
  - Test loading performance on 3G connection
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 13. Add SEO and meta tags
  - Create unique title and description for service page
  - Add Open Graph tags for social sharing
  - Implement JSON-LD structured data for services
  - Use semantic HTML structure
  - Ensure proper heading hierarchy
  - Add descriptive alt text for SEO
  - _Requirements: 1.1, 1.2_

- [ ] 14. Handle error cases and edge cases
  - Validate empty booking before WhatsApp redirect
  - Implement quantity limits (min: 1, max: 10)
  - Handle service data loading failures
  - Add fallback for WhatsApp not available
  - Handle message too long scenario
  - Show appropriate error messages
  - Test all error scenarios
  - _Requirements: 7.6_

- [ ] 15. Create route and integrate with existing app
  - Add route for /furniture-polish-services
  - Update navigation to include new service page
  - Ensure smooth integration with existing Header/Footer
  - Test navigation from other pages
  - Verify StickyWhatsApp component compatibility
  - _Requirements: 1.1_

- [ ] 16. Cross-browser and device testing
  - Test on Chrome, Firefox, Safari, Edge (latest 2 versions)
  - Test on iOS Safari 12+
  - Test on Chrome Android 80+
  - Verify responsive design on multiple screen sizes
  - Test touch interactions on mobile devices
  - Verify WhatsApp integration on mobile and desktop
  - Check modal behavior across browsers
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 17. Final polish and quality assurance
  - Review all components for consistency
  - Verify all requirements are met
  - Check for any console errors or warnings
  - Validate TypeScript types
  - Review code for best practices
  - Ensure smooth user experience
  - Get user feedback and iterate
  - _Requirements: All_
