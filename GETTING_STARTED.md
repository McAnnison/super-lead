# Getting Started with NoteSong AI

This guide will help you get the NoteSong AI mobile app up and running on your development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **npm** (comes with Node.js) or **yarn**
   - Verify npm: `npm --version`
   - Or install yarn: `npm install -g yarn`

3. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

4. **Expo Go App** (for testing on physical devices)
   - Download from [App Store](https://apps.apple.com/app/expo-go/id982107779) (iOS)
   - Download from [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android)

5. **iOS Simulator** (Mac only, optional)
   - Install Xcode from Mac App Store
   - Install Command Line Tools: `xcode-select --install`

6. **Android Studio** (optional, for Android emulator)
   - Download from [developer.android.com](https://developer.android.com/studio)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/McAnnison/super-lead.git
cd super-lead
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React Native
- Expo SDK
- Navigation libraries
- UI components
- Document picker
- Audio/Video libraries

### 3. Start the Development Server

```bash
npm start
# or
expo start
```

This will start the Metro bundler and open the Expo DevTools in your browser.

### 4. Run the App

You have several options:

#### Option A: Run on Physical Device (Recommended for beginners)

1. Open the Expo Go app on your phone
2. Scan the QR code displayed in the terminal or browser
3. The app will load on your device

#### Option B: Run on iOS Simulator (Mac only)

```bash
# Press 'i' in the terminal where expo is running
# or
npm run ios
```

#### Option C: Run on Android Emulator

```bash
# Press 'a' in the terminal where expo is running
# or
npm run android
```

#### Option D: Run in Web Browser

```bash
# Press 'w' in the terminal where expo is running
# or
npm run web
```

## Using the App

### 1. Welcome Screen
- See an overview of features
- Choose "Get Started" to create your first song
- Or "My Library" to view saved songs

### 2. Upload Notes
- Click "Select File" to choose a document
- Supported formats: PDF, PPT, PPTX, DOC, DOCX, TXT
- File information will be displayed after selection
- Click "Continue to Genre Selection"

### 3. Choose Genre
- Select from 7 music genres:
  - Afrobeat
  - Hip-hop
  - Gospel
  - Lo-fi
  - Pop
  - Drill
  - Highlife
- Each genre has a unique style and feel
- Click "Create My Song"

### 4. Processing
- Watch as the app processes your notes
- Steps include:
  - Text extraction
  - Image analysis
  - Concept identification
  - Lyrics generation
  - Music synthesis
- This is simulated in the demo; production version will use real AI

### 5. Playback
- Play your generated learning song
- View lyrics and learning points
- See what images were analyzed
- Download the song for offline use
- Share with friends or study groups

### 6. Library
- View all your created songs
- Sort by recent, genre, or name
- Play any song from your library
- Delete songs you no longer need

## Development Tips

### Hot Reloading

The app supports hot reloading. When you save changes to your code, the app will automatically reload.

### Debugging

1. **Console Logs**: View in terminal where `expo start` is running
2. **React DevTools**: Open DevTools in Expo DevTools browser window
3. **Shake Device**: Shake your phone to open developer menu
4. **Simulator**: Press Cmd+D (iOS) or Cmd+M (Android) for developer menu

### Clearing Cache

If you encounter issues:

```bash
expo start -c
# or
npm start -- -c
```

## Common Issues and Solutions

### 1. "Module not found" Error

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
expo start -c
```

### 2. "Unable to resolve module"

```bash
# Make sure all dependencies are installed
npm install
# Restart the bundler
expo start -c
```

### 3. iOS Simulator Not Starting

```bash
# Ensure Xcode is installed
sudo xcode-select --switch /Applications/Xcode.app
# Accept license
sudo xcodebuild -license accept
```

### 4. Android Emulator Issues

- Make sure Android Studio is installed
- Open Android Studio → Tools → AVD Manager
- Create a new virtual device if needed
- Start the emulator before running `expo start`

### 5. Expo Go Connection Issues

- Ensure your phone and computer are on the same WiFi network
- Disable VPN if active
- Try using Tunnel mode: `expo start --tunnel`

## Project Structure

```
notesong-ai/
├── App.js                 # Main entry point
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── babel.config.js       # Babel configuration
├── assets/               # Images and icons
└── src/
    ├── screens/          # All app screens
    │   ├── WelcomeScreen.js
    │   ├── UploadScreen.js
    │   ├── GenreSelectionScreen.js
    │   ├── ProcessingScreen.js
    │   ├── PlaybackScreen.js
    │   └── LibraryScreen.js
    └── services/         # Business logic and API calls
        ├── documentService.js
        ├── imageAnalysisService.js
        ├── lyricsService.js
        └── musicService.js
```

## Making Changes

### Adding a New Screen

1. Create a new file in `src/screens/`
2. Import and add to navigator in `App.js`
3. Add navigation logic in other screens

### Modifying Styles

Each screen has its own `StyleSheet`. Look for the `styles` constant at the bottom of each screen file.

### Adding a New Genre

1. Edit `src/screens/GenreSelectionScreen.js`
2. Add to the `GENRES` array
3. Create a lyrics template in `src/services/lyricsService.js`

## Testing on Different Devices

The app is responsive and works on:
- iPhone (all modern models)
- Android phones
- Tablets (iPad, Android tablets)
- Web browsers (limited functionality)

## Next Steps

Once you're comfortable with the demo app:

1. Read `API_INTEGRATION.md` to understand AI service integration
2. Set up environment variables for API keys
3. Implement real document processing
4. Connect to AI services for lyrics and music generation
5. Set up a backend for user data and storage

## Getting Help

- Check the [README.md](README.md) for overview
- Read [API_INTEGRATION.md](API_INTEGRATION.md) for API setup
- Open an issue on GitHub
- Check Expo documentation: [docs.expo.dev](https://docs.expo.dev)

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Icons](https://icons.expo.fyi/)

---

**Happy Learning with Music!** 🎵📚
