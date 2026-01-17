# NoteSong AI - AI Learning Assistant 🎵📚

Transform your study notes into memorable songs with AI-powered music generation!

## 📱 Overview

NoteSong AI is a revolutionary mobile learning assistant that converts your educational materials (PDFs, PowerPoints, Word documents, and text files) into engaging songs. The app analyzes both text and images in your notes, extracts key concepts, and transforms them into rhythmic, memorable lyrics set to your favorite music genre.

## ✨ Features

### 📄 Document Processing
- **Multi-format Support**: Upload PDF, PPT, PPTX, DOC, DOCX, and TXT files
- **Smart Text Extraction**: Automatically extracts and summarizes key learning points
- **Intelligent Parsing**: Identifies document structure, headings, and important sections

### 🖼️ Image Understanding
- **Diagram Analysis**: Explains visual relationships and component connections
- **Flowchart Conversion**: Transforms process flows into step-by-step lyrical verses
- **Table Summarization**: Converts tabular data into memorable choruses and hooks
- **Graph Interpretation**: Describes trends and patterns musically
- **OCR Technology**: Extracts text from images for complete understanding

### 🎵 Music Generation
- **Multiple Genres**: Choose from 7+ music styles:
  - 🥁 **Afrobeat** - Energetic African rhythms
  - 🎤 **Hip-hop** - Rhythmic beats and flow
  - 🙏 **Gospel** - Uplifting and soulful
  - 🎹 **Lo-fi** - Calm and relaxing
  - ⭐ **Pop** - Catchy and memorable
  - ⚡ **Drill** - Hard-hitting beats
  - 🎺 **Highlife** - Classic African sound

- **AI Lyrics Generation**: Creates educational content in rhythmic, memorable formats
- **Vocal Synthesis**: AI-powered singing in your selected genre
- **Professional Mixing**: Combines instrumentals and vocals seamlessly

### 🎧 Playback & Library
- **Music Player**: Built-in player with standard controls (play, pause, skip)
- **Download**: Save songs for offline learning
- **Library Management**: Organize and access your learning songs
- **Share**: Share songs with study groups or friends
- **Progress Tracking**: Monitor your learning song collection

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/McAnnison/super-lead.git
   cd super-lead
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on your device/simulator**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser

## 📱 App Structure

```
notesong-ai/
├── App.js                 # Main application entry point
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
├── babel.config.js       # Babel configuration
├── assets/               # App assets (icons, images)
└── src/
    ├── screens/          # Application screens
    │   ├── WelcomeScreen.js
    │   ├── UploadScreen.js
    │   ├── GenreSelectionScreen.js
    │   ├── ProcessingScreen.js
    │   ├── PlaybackScreen.js
    │   └── LibraryScreen.js
    ├── components/       # Reusable components
    ├── services/         # API and business logic
    │   ├── documentService.js
    │   ├── imageAnalysisService.js
    │   ├── lyricsService.js
    │   └── musicService.js
    └── utils/           # Utility functions
```

## 🎯 How It Works

1. **Upload**: Select your study notes (PDF, PPT, Word, or text file)
2. **Analysis**: AI extracts text and analyzes images (diagrams, charts, tables, graphs)
3. **Genre Selection**: Choose your preferred music style
4. **Processing**: 
   - Text is summarized into key learning points
   - Images are explained and converted to lyrical content
   - Lyrics are generated in your chosen genre
   - Music and vocals are synthesized
5. **Playback**: Listen, download, and learn on the go!

## 🔧 Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **UI Components**: React Native core components
- **Icons**: Expo Vector Icons
- **File Handling**: Expo Document Picker
- **Audio**: Expo AV

### AI/ML Integration (Production)
The app is designed to integrate with:
- **Document Processing**: PDF.js, Mammoth.js
- **Image Analysis**: Google Cloud Vision, AWS Rekognition, OpenAI Vision
- **OCR**: Tesseract.js, Google Cloud Vision OCR
- **Text Summarization**: OpenAI GPT-4, Anthropic Claude
- **Lyrics Generation**: OpenAI GPT-4, custom fine-tuned models
- **Music Generation**: Suno AI, Mubert, AIVA
- **Vocal Synthesis**: Google Cloud TTS, Amazon Polly, Azure TTS

## 🎨 Customization

### Adding New Genres

Edit `src/screens/GenreSelectionScreen.js` to add new music genres:

```javascript
const GENRES = [
  // Add your genre here
  { 
    id: 'yourgenre', 
    name: 'Your Genre', 
    icon: 'icon-name', 
    color: '#HexColor', 
    description: 'Description' 
  },
];
```

Then implement the lyrics style in `src/services/lyricsService.js`.

### Customizing Colors

The primary color scheme can be modified in each screen's StyleSheet. The main brand color is `#6C63FF`.

## 🔒 Privacy & Security

- Documents are processed securely
- No data is stored without user consent
- All uploads are encrypted in transit
- User privacy is our top priority

## 📝 Development Notes

### Current Status
This is the initial mobile app implementation. The core UI and navigation flow are complete. AI service integrations are currently simulated and ready for production API implementation.

### Next Steps for Production
1. Integrate real document processing APIs
2. Connect to vision AI services for image analysis
3. Implement actual lyrics generation with GPT-4 or similar
4. Integrate music generation APIs
5. Set up backend services for processing and storage
6. Implement user authentication
7. Add cloud storage for songs
8. Implement social features (sharing, playlists)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

McAnnison

## 🙏 Acknowledgments

- Inspired by the need to make learning more engaging and memorable
- Built with React Native and Expo
- UI/UX designed for optimal mobile learning experience

## 📞 Support

For support, email support@notesong.ai or open an issue in this repository.

---

**Made with ❤️ for learners everywhere**

*Transform your notes. Amplify your learning. One song at a time.* 🎵📚
