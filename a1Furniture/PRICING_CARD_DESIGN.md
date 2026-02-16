# Pricing Card Design Specification

## Visual Design Reference

The new pricing card matches the style shown in your reference image with these adaptations:

### Layout Structure

```
╔═══════════════════════════════════════════════════════════════╗
║  TRANSPARENT PRICING                                          ║
║  Affordable services in [Location] with no hidden charges     ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ ┌─────────────────────┬─────────────────────────────┐   │ ║
║  │ │  ● Monthly Billed   │  Features +                 │   │ ║
║  │ │                     │  ─────────────────────────  │   │ ║
║  │ │                     │                             │   │ ║
║  │ │     ₹1,449         │  ✓ Furniture size and type  │   │ ║
║  │ │  (Cyan Gradient)    │  ✓ Polish type (PU...)      │   │ ║
║  │ │                     │  ✓ Condition of finish      │   │ ║
║  │ │  Billed Monthly     │  ✓ Number of items          │   │ ║
║  │ │                     │  ✓ Additional repair work   │   │ ║
║  │ │  Price Range:       │                             │   │ ║
║  │ │  ₹1,449 - ₹6,449   │  (Hover to see info icon)   │   │ ║
║  │ │                     │  (Click for details)        │   │ ║
║  │ │  ┌───────────────┐  │                             │   │ ║
║  │ │  │ Get Started   │  │                             │   │ ║
║  │ │  └───────────────┘  │                             │   │ ║
║  │ └─────────────────────┴─────────────────────────────┘   │ ║
║  │                                                           │ ║
║  │  ✓ Click on any feature above for detailed information   │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

## Design Elements Breakdown

### 1. Container
- **Background**: Dark gradient (gray-900 → gray-800 → black)
- **Border**: Blue-500 with 30% opacity + glow effect
- **Border Radius**: 24px (rounded-3xl)
- **Padding**: 48px (p-12)
- **Shadow**: 2xl with blue glow underneath

### 2. Left Column - Price Display

#### Monthly Badge
```
┌──────────────────┐
│ ● Monthly Billed │  ← Animated pulse dot
└──────────────────┘
```
- Background: Blue-500/20
- Text: Blue-300
- Rounded: Full (pill shape)
- Padding: 16px horizontal, 8px vertical

#### Price Display
```
₹1,449
```
- Font Size: 96px (text-7xl)
- Font Weight: Black (900)
- Gradient: Blue-400 → Cyan-400
- Background Clip: Text (transparent background)

#### Price Range
```
Price Range: ₹1,449 - ₹6,449
```
- Text: Gray-400
- Highlight: White + font-semibold

#### Get Started Button
```
┌─────────────────┐
│  📞 Get Started │
└─────────────────┘
```
- Background: Gradient blue-500 → cyan-500
- Text: White
- Padding: 32px horizontal, 16px vertical
- Rounded: 12px (rounded-xl)
- Hover: Scale 1.05 + darker gradient
- Shadow: Large

### 3. Right Column - Features

#### Section Header
```
Features +
─────────────────
```
- Text: Gray-400
- Divider: Gradient gray-700 → transparent

#### Feature Items (Interactive)
```
✓ Furniture size and type        ℹ️
✓ Polish type (PU, Melamine...)  ℹ️
✓ Condition of existing finish   ℹ️
✓ Number of items                ℹ️
✓ Additional repair work needed  ℹ️
```

**Default State:**
- Background: Transparent
- Text: Gray-300
- Icon: Green-400 checkmark
- Info icon: Hidden

**Hover State:**
- Background: White/5
- Text: White
- Checkmark: Scale 1.1
- Info icon: Visible (blue-400)
- Cursor: Pointer

**Click Action:**
- Opens draggable modal
- Shows detailed explanation
- Backdrop blur effect

### 4. Bottom Section
```
✓ Click on any feature above for detailed information
```
- Border Top: Gray-700/50
- Padding Top: 32px
- Text: Gray-400, centered
- Icon: Cyan-400

## Color Specifications

### Primary Palette
```css
Background:
- from-gray-900 (rgb(17, 24, 39))
- via-gray-800 (rgb(31, 41, 55))
- to-black (rgb(0, 0, 0))

Accent Colors:
- Blue-500: rgb(59, 130, 246)
- Cyan-500: rgb(6, 182, 212)
- Blue-400: rgb(96, 165, 250)
- Cyan-400: rgb(34, 211, 238)

Text Colors:
- White: rgb(255, 255, 255)
- Gray-300: rgb(209, 213, 219)
- Gray-400: rgb(156, 163, 175)

Success:
- Green-400: rgb(74, 222, 128)
```

### Gradients
```css
Price Text:
background: linear-gradient(to right, #60a5fa, #22d3ee);

Button:
background: linear-gradient(to right, #3b82f6, #06b6d4);

Card Glow:
background: linear-gradient(to bottom right, 
  rgba(59, 130, 246, 0.1), 
  transparent, 
  rgba(6, 182, 212, 0.1)
);

Bottom Accent:
background: linear-gradient(to right,
  rgba(59, 130, 246, 0.5),
  rgba(6, 182, 212, 0.5),
  rgba(59, 130, 246, 0.5)
);
```

## Draggable Modal Design

### Modal Structure
```
╔═══════════════════════════════════════════╗
║ ↔️ Furniture size and type            ✕  ║  ← Draggable header
╠═══════════════════════════════════════════╣
║ Drag to move this modal                   ║
╠═══════════════════════════════════════════╣
║                                           ║
║  ┌─────────────────────────────────────┐ ║
║  │ Larger furniture pieces like        │ ║
║  │ wardrobes and dining tables require │ ║
║  │ more materials and time, affecting  │ ║
║  │ the overall cost. We provide        │ ║
║  │ detailed measurements and estimates │ ║
║  │ for accurate pricing.               │ ║
║  └─────────────────────────────────────┘ ║
║                                           ║
║  ┌──────────────────┐  ┌──────────────┐ ║
║  │ Call for Details │  │    Close     │ ║
║  └──────────────────┘  └──────────────┘ ║
╚═══════════════════════════════════════════╝
```

### Modal Specifications
- **Width**: 90% max 600px
- **Position**: Centered initially, draggable
- **Background**: White
- **Border Radius**: 24px
- **Shadow**: 2xl
- **Backdrop**: Black/50 with blur

#### Header (Draggable Area)
- Background: Gradient amber-500 → orange-600
- Text: White, 24px, bold
- Icon: Move icon (white)
- Cursor: Grab (active: grabbing)
- Padding: 24px

#### Content Area
- Background: Gradient amber-50 → orange-50
- Border: 2px amber-200
- Border Radius: 16px
- Padding: 24px
- Text: Gray-700, 18px

#### Action Buttons
- Call Button: Amber-500 background
- Close Button: Gray-200 background
- Both: Full width on mobile, flex on desktop

## Responsive Breakpoints

### Desktop (1024px+)
```
┌─────────────┬─────────────┐
│   Price     │  Features   │
│   Display   │   List      │
└─────────────┴─────────────┘
```

### Tablet (768px - 1023px)
```
┌─────────────┬─────────────┐
│   Price     │  Features   │
│  (Smaller)  │  (Compact)  │
└─────────────┴─────────────┘
```

### Mobile (< 768px)
```
┌─────────────────────────┐
│      Price Display      │
├─────────────────────────┤
│     Features List       │
└─────────────────────────┘
```

## Animation Specifications

### Hover Animations
```css
Feature Item Hover:
- transition: all 300ms ease
- transform: none → background white/5
- info icon: opacity 0 → 1

Button Hover:
- transition: all 300ms ease
- transform: scale(1) → scale(1.05)
- background: lighter gradient

Checkmark Hover:
- transition: transform 300ms ease
- transform: scale(1) → scale(1.1)
```

### Modal Animations
```css
Modal Open:
- backdrop: opacity 0 → 1 (300ms)
- modal: scale(0.95) → scale(1) (300ms)

Modal Drag:
- transform: translate(x, y)
- scale: 1 → 1.02 (while dragging)
- cursor: grab → grabbing

Modal Close:
- backdrop: opacity 1 → 0 (300ms)
- modal: scale(1) → scale(0.95) (300ms)
```

### Pulse Animation
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

## Implementation Code Snippets

### Main Card Structure
```tsx
<div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 
                backdrop-blur-xl rounded-3xl shadow-2xl 
                border border-blue-500/30">
  {/* Glow effect */}
  <div className="absolute inset-0 bg-gradient-to-br 
                  from-blue-500/10 via-transparent to-cyan-500/10" />
  
  {/* Content */}
  <div className="relative p-12">
    {/* Two columns */}
  </div>
</div>
```

### Price Display
```tsx
<span className="text-7xl font-black text-transparent 
                 bg-clip-text bg-gradient-to-r 
                 from-blue-400 to-cyan-400">
  ₹{pricing.startingPrice}
</span>
```

### Interactive Feature
```tsx
<button onClick={() => setActiveModal(index)}
        className="group w-full flex items-start gap-3 
                   p-3 rounded-xl hover:bg-white/5 
                   transition-all duration-300">
  <CheckCircle className="text-green-400 
                          group-hover:scale-110" />
  <span className="text-gray-300 group-hover:text-white">
    {factor}
  </span>
  <Info className="text-gray-500 group-hover:text-blue-400 
                   opacity-0 group-hover:opacity-100" />
</button>
```

## Comparison with Reference Image

### Similarities
✅ Dark background with glassmorphism
✅ Two-column layout (price + features)
✅ Large price display with gradient
✅ Monthly billing badge
✅ Feature list with checkmarks
✅ Prominent CTA button
✅ Modern, premium appearance

### Adaptations for Furniture Business
- Changed "Access to 500+ design templates" → "Furniture size and type"
- Changed "Dedicated design expert" → "Polish type (PU, Melamine, Duco)"
- Changed "Unlimited revisions" → "Condition of existing finish"
- Changed "Brand asset library" → "Number of items"
- Changed "Priority delivery" → "Additional repair work"
- Added draggable modals for detailed explanations
- Adapted colors to match brand (blue/cyan instead of pure blue)

---

**Design Status**: ✅ Implemented
**Matches Reference**: ✅ Yes (with business-specific adaptations)
**Production Ready**: ✅ Yes
