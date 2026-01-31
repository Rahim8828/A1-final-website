# Requirements Document

## Introduction

This document outlines the requirements for implementing an Urban Company-style service booking UI for A1 Furniture Polish website. The system will provide a mobile-first interface where users can browse furniture polishing services, view detailed service information, select multiple service options, and send their complete booking details via WhatsApp instead of a traditional cart checkout.

## Glossary

- **Service System**: The A1 Furniture Polish web application that displays furniture polishing services
- **User**: A customer visiting the website to book furniture polishing services
- **Service Card**: A visual component displaying a furniture polishing service with image, price, and details
- **Service Detail View**: A modal or page showing complete information about a specific service
- **Service Option**: A variant of a service (e.g., Single Door, 2 Doors, 3 Doors)
- **Booking Summary**: A collection of all selected services with quantities and total price
- **WhatsApp Integration**: The mechanism to send booking details to WhatsApp for final confirmation

## Requirements

### Requirement 1: Service Grid Display

**User Story:** As a User, I want to see all available furniture polishing services in a visual grid format, so that I can quickly browse and select the service I need.

#### Acceptance Criteria

1. WHEN the User navigates to the services page, THE Service System SHALL display a grid of service cards with furniture type images (Door, Cabinet, Dining Table, Chair, Bed, Window, Sofa, Other Tables, At Home Consultation)
2. THE Service System SHALL display each service card with a furniture icon/image, service name, and starting price
3. WHILE viewing on mobile devices, THE Service System SHALL display the service grid in a responsive layout with 3 columns
4. THE Service System SHALL display the service title "Furniture Wood Polish" with rating and total bookings at the top of the page
5. THE Service System SHALL display a cashback or promotional banner below the title

### Requirement 2: Service Card Information

**User Story:** As a User, I want to see basic service information on each card, so that I can understand what is included before viewing full details.

#### Acceptance Criteria

1. THE Service System SHALL display each service card with the service name as a heading
2. THE Service System SHALL display the starting price in the format "Starts at ₹X,XXX"
3. THE Service System SHALL display a star rating with the number of reviews in parentheses
4. THE Service System SHALL display 2-3 bullet points highlighting key service features
5. THE Service System SHALL display a "View details" link in purple/blue color for each service card
6. THE Service System SHALL display an "Add" button in purple color for quick service selection
7. THE Service System SHALL display "X options" text indicating the number of available service variants

### Requirement 3: Service Detail View Navigation

**User Story:** As a User, I want to click on "View details" to see complete service information, so that I can make an informed decision before booking.

#### Acceptance Criteria

1. WHEN the User clicks on "View details" link, THE Service System SHALL open a detailed service view in a modal or full-page overlay
2. THE Service System SHALL display a back arrow button and close (X) button in the header of the detail view
3. THE Service System SHALL display the service name in the header of the detail view
4. WHEN the User clicks the back arrow or close button, THE Service System SHALL return to the main service grid view

### Requirement 4: Service Detail Content Display

**User Story:** As a User, I want to see comprehensive service details including pricing options, process, and guarantees, so that I understand exactly what I am booking.

#### Acceptance Criteria

1. THE Service System SHALL display multiple pricing options for the service (e.g., Single Door ₹2999, 2 Doors ₹3999, 3 Doors ₹4999)
2. THE Service System SHALL display each pricing option with an image, option name, rating, estimated time, price, and "Add" button
3. THE Service System SHALL display a "Your total price includes" section with checkmarks listing what is included (material & labour cost, polish brand, post-service cleaning)
4. THE Service System SHALL display a "Top professionals" section with an image and trust badges (Background verified, 300+ hours of training, Certified under Skill India Programme)
5. THE Service System SHALL display a "UC cover promise" section with warranty details (6 months warranty, damage cover up to ₹10,000, verified quotes)
6. THE Service System SHALL display a "We bring everything needed" section with images of materials and tools
7. THE Service System SHALL display an "Our process" section with numbered steps, descriptions, and images for each step
8. THE Service System SHALL display a "Frequently asked questions" section with expandable/collapsible questions

### Requirement 5: Service Selection and Addition

**User Story:** As a User, I want to add multiple services and service options to my booking, so that I can book all required furniture polishing services at once.

#### Acceptance Criteria

1. WHEN the User clicks the "Add" button on a service option, THE Service System SHALL add that service option to the booking summary
2. THE Service System SHALL display a visual indication (such as a counter or checkmark) when a service option is added
3. THE Service System SHALL allow the User to add multiple different service options to the booking summary
4. THE Service System SHALL allow the User to add multiple quantities of the same service option
5. THE Service System SHALL calculate and display the total price of all selected services in real-time

### Requirement 6: Booking Summary Display

**User Story:** As a User, I want to see a summary of all services I have selected with the total price, so that I can review my booking before finalizing.

#### Acceptance Criteria

1. THE Service System SHALL display a persistent booking summary section showing all selected services
2. THE Service System SHALL display each selected service with its name, quantity, and individual price
3. THE Service System SHALL display the total price of all selected services prominently
4. THE Service System SHALL allow the User to modify quantities or remove services from the booking summary
5. WHEN the booking summary is empty, THE Service System SHALL display a message indicating no services are selected

### Requirement 7: WhatsApp Booking Integration

**User Story:** As a User, I want to send my complete booking details to WhatsApp after reviewing my selection, so that I can finalize my booking through WhatsApp communication.

#### Acceptance Criteria

1. THE Service System SHALL display a "Book Now" button in the booking summary section
2. WHEN the User clicks "Book Now" with at least one service selected, THE Service System SHALL generate a formatted message containing all booking details
3. THE Service System SHALL include in the WhatsApp message: service names, quantities, individual prices, total price, and any special requests
4. THE Service System SHALL open WhatsApp (web or app) with the pre-filled booking message
5. THE Service System SHALL use the business WhatsApp number configured in the system
6. IF the User clicks "Book Now" with no services selected, THEN THE Service System SHALL display an error message prompting the User to select at least one service

### Requirement 8: Mobile-First Responsive Design

**User Story:** As a User accessing the website on my mobile device, I want the service UI to be optimized for mobile viewing, so that I can easily browse and book services on my phone.

#### Acceptance Criteria

1. THE Service System SHALL display all service UI components optimized for mobile screen sizes (320px to 768px width)
2. THE Service System SHALL use touch-friendly button sizes (minimum 44x44 pixels) for all interactive elements
3. THE Service System SHALL display images that are optimized for mobile loading speeds
4. THE Service System SHALL use a mobile-first layout with vertical scrolling for service details
5. WHILE viewing on desktop devices (768px and above), THE Service System SHALL adapt the layout to utilize available screen space effectively

### Requirement 9: Visual Design Consistency

**User Story:** As a User, I want the service UI to match Urban Company's visual style, so that I have a familiar and professional booking experience.

#### Acceptance Criteria

1. THE Service System SHALL use a clean white background with subtle gray dividers between sections
2. THE Service System SHALL use purple/blue accent color (#6B46C1 or similar) for primary action buttons and links
3. THE Service System SHALL use green checkmarks for included features and trust indicators
4. THE Service System SHALL use consistent typography with clear hierarchy (headings, body text, captions)
5. THE Service System SHALL use rounded corners on cards and buttons (8px border radius)
6. THE Service System SHALL use subtle shadows on cards for depth (box-shadow)
7. THE Service System SHALL display high-quality furniture images with consistent styling

### Requirement 10: Performance and Loading

**User Story:** As a User, I want the service pages to load quickly, so that I can browse services without delays.

#### Acceptance Criteria

1. THE Service System SHALL load the initial service grid view within 2 seconds on 3G mobile connections
2. THE Service System SHALL use lazy loading for images that are not immediately visible
3. THE Service System SHALL display loading skeletons or placeholders while content is loading
4. THE Service System SHALL optimize images to appropriate sizes for mobile and desktop viewing
5. WHEN the User navigates between service detail views, THE Service System SHALL load content within 1 second
