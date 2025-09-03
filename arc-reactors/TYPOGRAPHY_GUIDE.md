# StarLance Typography Guide

## New Font System

### Fonts Used
- **Poppins**: Display font for headings and important text (modern, geometric, bold character)
- **Outfit**: Body font for readable text (clean, friendly, professional)
- **JetBrains Mono**: Monospace font for code and technical elements

### Font Classes

#### Display & Headings
```jsx
// Hero headlines - largest impact
<h1 className="text-8xl font-display font-extrabold text-sharp">
  StarLance
</h1>

// Section headlines
<h2 className="text-6xl text-heading">
  Section Title
</h2>

// Page titles
<h3 className="text-4xl font-display font-bold">
  Page Title
</h3>
```

#### Body Text
```jsx
// Regular paragraphs
<p className="text-lg text-body">
  This is body text using Outfit font for great readability.
</p>

// Medium emphasis text
<p className="text-base text-body-medium">
  Slightly bolder body text for emphasis.
</p>

// Small text / captions
<span className="text-sm text-caption">
  Caption or helper text
</span>
```

#### Buttons & Interactive
```jsx
// Buttons
<button className="text-button text-base">
  Button Text
</button>
```

#### Special Effects
```jsx
// Glowing text (great for hero sections)
<span className="text-glow bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
  Highlighted Text
</span>

// Sharp, crisp text rendering
<h1 className="text-sharp font-display">
  Crystal Clear Text
</h1>
```

### Font Sizes Available
- `text-xs` to `text-9xl` (9xl is 8rem/128px for massive headlines)
- Improved line heights for better readability
- Optimized letter spacing for each font

### Font Weights
- `font-light` (300)
- `font-normal` (400) 
- `font-medium` (500)
- `font-semibold` (600)
- `font-bold` (700)
- `font-extrabold` (800)

### Typography Best Practices

1. **Headlines**: Use `font-display` (Poppins) with `font-bold` or `font-extrabold`
2. **Body Text**: Use `text-body` (Outfit) with `font-normal` or `font-medium`
3. **Buttons**: Use `text-button` for proper spacing and weight
4. **Large Text**: Add `text-sharp` for crisp rendering
5. **Special Emphasis**: Use `text-glow` with gradients for impact

### Examples in Components

```jsx
// Hero Section
<h1 className="text-8xl font-display font-extrabold text-sharp">
  The Future of
  <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent text-glow">
    Decentralized Work
  </span>
</h1>

// Navigation Brand
<span className="text-xl font-display font-bold">StarLance</span>

// Card Title
<h3 className="text-2xl text-heading">Card Title</h3>

// Card Description
<p className="text-base text-body text-gray-600">
  Card description text that's easy to read.
</p>
```

This typography system gives StarLance a modern, professional, and distinctive character while maintaining excellent readability across all devices.


