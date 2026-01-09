# Asset Files

This directory contains the app's visual assets.

## Required Assets

For production deployment, you need to provide the following assets:

### 1. **icon.png**
- **Size**: 1024x1024 pixels
- **Format**: PNG
- **Purpose**: App icon for iOS and Android
- **Requirements**: 
  - Square image
  - No transparency for iOS
  - Represents the NoteSong AI brand

### 2. **splash.png**
- **Size**: 1242x2436 pixels (or higher resolution maintaining aspect ratio)
- **Format**: PNG
- **Purpose**: Splash screen displayed when app launches
- **Requirements**:
  - Centered logo/branding
  - Background color: #6C63FF (or your brand color)

### 3. **adaptive-icon.png**
- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Purpose**: Android adaptive icon (foreground layer)
- **Requirements**:
  - Safe zone: 432x432 pixels centered
  - Can have transparency

### 4. **favicon.png**
- **Size**: 48x48 pixels (minimum)
- **Format**: PNG
- **Purpose**: Web app favicon
- **Requirements**: Simple, recognizable at small sizes

## Design Guidelines

### App Icon Design
- Use the musical note symbol (🎵) combined with a book or document icon
- Primary color: #6C63FF (purple/blue)
- Accent colors: #FFE66D (yellow), #4ECDC4 (teal)
- Keep it simple and recognizable at small sizes
- Ensure good contrast for visibility

### Splash Screen Design
- Centered "NoteSong AI" logo with musical notes
- Gradient background from #6C63FF to #4834DF
- Optional tagline: "Transform Notes into Songs"
- Minimal and professional look

### Brand Colors
- Primary: #6C63FF (Purple/Blue)
- Secondary: #FFE66D (Yellow)
- Accent: #4ECDC4 (Teal)
- Success: #4CAF50 (Green)
- Text: #333333 (Dark Gray)
- Background: #FFFFFF (White)

## Tools for Creating Assets

- **Design Software**: 
  - Adobe Photoshop
  - Sketch
  - Figma
  - Canva (for quick prototypes)
  
- **Icon Generators**:
  - [makeappicon.com](https://makeappicon.com/)
  - [appicon.co](https://appicon.co/)
  
- **Asset Resize Tools**:
  - [imageresizer.com](https://imageresizer.com/)
  - Expo's asset resizing (built-in)

## Generating Assets

Once you have your master icon (1024x1024), Expo can automatically generate the required sizes:

```bash
expo optimize
```

## Current Status

Currently using placeholder files. Replace these with actual designed assets before production deployment.

---

**Note**: The `.placeholder` files are temporary and should be replaced with actual PNG images for the app to display correctly.
