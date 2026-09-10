import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';

const { width } = Dimensions.get('window');

const ELEVENLABS_API_KEY = "sk_4af2f3460c1af9c940a074a611c318c65fcebebbf016a3a6";
const REPLICATE_API_TOKEN = "r8_fF43SbWWubH1suyutZ9LC49g3XOcyJS2Hk4Xm";
const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; 

export default function App() {
  const [activeTab, setActiveTab] = useState('ai_video');
  const [selectedFilter, setSelectedFilter] = useState('Normal');
  const [isProcessing, setIsProcessing] = useState(false);

  const [videoPrompt, setVideoPrompt] = useState('');
  const [voiceScript, setVoiceScript] = useState('');
  const [generatedSubtitle, setGeneratedSubtitle] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Cinematic');
  
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState(null);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState(null);

  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const tools = [
    { id: 'ai_video', name: 'AI Video', icon: '🤖' },
    { id: 'ai_voice', name: 'AI Voice', icon: '🎙️' },
    { id: 'subtitles', name: 'Subtitles', icon: '💬' },
    { id: 'trim', name: 'Trim', icon: '✂️' },
    { id: 'filters', name: 'Filters', icon: '🎨' },
  ];

  const videoStyles = ['Cinematic', 'Anime', '3D Render', 'Cyberpunk', 'Photorealistic'];
  const filters = ['Normal', 'Grayscale', 'Sepia', 'Vivid', 'Cinematic'];

  const handleGenerateAIVideo = async () => {
    if (!videoPrompt.trim()) {
      Alert.alert('Error', 'Prompt text likhein!');
      return;
    }
    setIsGeneratingVideo(true);
    setStatusMessage('Generating AI Video...');

    setTimeout(() => {
      setIsGeneratingVideo(false);
      setGeneratedVideoUrl('demo_video_ready');
      setStatusMessage('AI Video Ready!');
      Alert.alert('Success', 'AI Video Generated!');
    }, 2500);
  };

  const handleGenerateVoiceover = async () => {
    if (!voiceScript.trim()) {
      Alert.alert('Error', 'Script likhein!');
      return;
    }
    setIsGeneratingVoice(true);

    setTimeout(() => {
      setIsGeneratingVoice(false);
      setGeneratedSubtitle(voiceScript);
      Alert.alert('Success', 'AI Voiceover & Captions Ready!');
    }, 2000);
  };

  const handleExport = async () => {
    setIsProcessing(true);
    const command = `-i input.mp4 -vf "hue=s=0" -c:a copy output.mp4`;

    FFmpegKit.execute(command).then(async (session) => {
      setIsProcessing(false);
      Alert.alert('Export Complete', 'Movie compilation complete!');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎬 ViralForge Studio</Text>
        <TouchableOpacity style={styles.exportButton} onPress={handleExport} disabled={isProcessing}>
          <Text style={styles.exportText}>{isProcessing ? 'Rendering...' : 'Export Movie'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.previewContainer}>
        <View style={styles.canvas}>
          {generatedVideoUrl ? (
            <Text style={styles.statusText}>✅ AI Video Ready</Text>
          ) : (
            <Text style={styles.previewPlaceholder}>📹 AI Movie Preview Area</Text>
          )}

          {generatedSubtitle !== '' && (
            <View style={styles.subtitleOverlay}>
              <Text style={styles.subtitleText}>{generatedSubtitle}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.panelContainer}>
        {activeTab === 'ai_video' && (
          <View style={styles.aiSection}>
            <TextInput
              style={styles.textInput}
              placeholder="Describe video scene..."
              placeholderTextColor="#666"
              value={videoPrompt}
              onChangeText={setVideoPrompt}
            />
            <TouchableOpacity style={styles.generateBtn} onPress={handleGenerateAIVideo}>
              {isGeneratingVideo ? <ActivityIndicator color="#FFF" /> : <Text style={styles.generateBtnText}>⚡ Generate Video</Text>}
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'ai_voice' && (
          <View style={styles.aiSection}>
            <TextInput
              style={styles.textInput}
              placeholder="Script likhein..."
              placeholderTextColor="#666"
              value={voiceScript}
              onChangeText={setVoiceScript}
            />
            <TouchableOpacity style={styles.generateBtn} onPress={handleGenerateVoiceover}>
              {isGeneratingVoice ? <ActivityIndicator color="#FFF" /> : <Text style={styles.generateBtnText}>🎙️ Generate Voice</Text>}
            </TouchableOpacity>
          </View>
        )}

        {activeTab !== 'ai_video' && activeTab !== 'ai_voice' && (
          <Text style={styles.panelPlaceholder}>{activeTab.toUpperCase()} Mode Active</Text>
        )}
      </View>

      <View style={styles.toolbar}>
        {tools.map((tool) => (
          <TouchableOpacity
            key={tool.id}
            style={[styles.toolItem, activeTab === tool.id && styles.activeTool]}
            onPress={() => setActiveTab(tool.id)}
          >
            <Text style={styles.toolIcon}>{tool.icon}</Text>
            <Text style={styles.toolLabel}>{tool.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  exportButton: { backgroundColor: '#7C3AED', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 6 },
  exportText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
  previewContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 },
  canvas: { width: width - 30, height: 320, backgroundColor: '#1E1E1E', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  previewPlaceholder: { color: '#888', fontSize: 16 },
  statusText: { color: '#10B981', fontSize: 16, fontWeight: 'bold' },
  subtitleOverlay: { position: 'absolute', bottom: 25, backgroundColor: 'rgba(0,0,0,0.8)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  subtitleText: { color: '#FFF', fontSize: 13 },
  panelContainer: { height: 180, backgroundColor: '#1A1A1A', padding: 12, borderTopWidth: 1, borderTopColor: '#2A2A2A' },
  aiSection: { flex: 1, justifyContent: 'space-around' },
  textInput: { backgroundColor: '#262626', color: '#FFF', borderRadius: 8, padding: 10, height: 50 },
  generateBtn: { backgroundColor: '#2563EB', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  generateBtnText: { color: '#FFF', fontWeight: 'bold' },
  panelPlaceholder: { color: '#666', textAlign: 'center', marginTop: 40 },
  toolbar: { height: 65, flexDirection: 'row', backgroundColor: '#0A0A0A', borderTopWidth: 1, borderTopColor: '#222' },
  toolItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  activeTool: { backgroundColor: '#1E1B4B' },
  toolIcon: { fontSize: 18 },
  toolLabel: { color: '#AAA', fontSize: 11, marginTop: 2 },
});
