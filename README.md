# 🎬 ViralForge - Professional Video Editor

Create viral reels and shorts in minutes with ViralForge, a professional video editing tool built with React Native and Expo.

## ✨ Features

- ✂️ **Video Trimming** - Cut and trim videos with precision
- 📝 **Text Overlay** - Add custom text with multiple colors and sizes
- 🎨 **Filters & Effects** - Apply professional filters (grayscale, sepia, blur, etc.)
- 🎵 **Audio Sync** - Add background music and sound effects
- 🖌️ **Adjustments** - Control brightness, contrast, and saturation
- 📤 **Quick Export** - Export as MP4 in minutes
- 🎬 **Professional UI** - Dark mode interface inspired by Canva

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI: `npm install -g eas-cli`

### Installation

```bash
# Clone repository
git clone https://github.com/viraaj090/Viralforge.git
cd Viralforge

# Install dependencies
npm install

# Start Expo dev server
npm start
```

### Running on Android

**Option 1: With Expo Go (Quick testing)**
```bash
npm start
# Scan QR code with Expo Go app
```

**Option 2: Build APK**
```bash
npm run build:android
# or
eas build --platform android
```

## 📁 Project Structure

```
ViralForge/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js       # Home/Dashboard
│   │   └── VideoEditorScreen.js # Main editor
│   ├── styles/
│   │   └── editorStyles.js     # Styling
│   ├── utils/
│   │   └── videoProcessor.js   # Video processing logic
│   └── components/             # Reusable components
├── App.js                       # App entry point
├── app.json                     # Expo config
└── package.json                 # Dependencies
```

## 🎯 Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and runtime
- **React Navigation** - Screen navigation
- **Expo AV** - Video playback
- **Expo Skia** - Canvas rendering
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Touch gestures

## 📋 Roadmap

- [ ] FFmpeg integration for advanced video processing
- [ ] Multiple video effects (blur, pixelate, etc.)
- [ ] Transition effects between clips
- [ ] Sticker library
- [ ] Music library integration
- [ ] Cloud storage support
- [ ] Video templates
- [ ] Real-time preview
- [ ] Batch export

## 🔧 Development

### Building with FFmpeg (Advanced)

For professional video editing with trimming, filters, and effects:

```bash
npm install react-native-ffmpeg-kit-react-native
```

### Testing

```bash
# Run on Android device
eas build --platform android --profile preview

# Or use Expo Go for quick testing
npm start
```

## 📱 APK Download

[Download APK from Releases](https://github.com/viraaj090/Viralforge/releases)

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙋 Support

For issues and suggestions, please create an issue on GitHub.

---

**Made with ❤️ by Viraaj**
