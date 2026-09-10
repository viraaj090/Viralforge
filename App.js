import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, StatusBar, Alert } from 'react-native';
// FFmpeg Kit integration
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [activeTab, setActiveTab] = useState('trim');
  const [selectedFilter, setSelectedFilter] = useState('Normal');
  const [isProcessing, setIsProcessing] = useState(false);

  const tools = [
    { id: 'trim', name: 'Trim', icon: '✂️' },
    { id: 'filters', name: 'Filters', icon: '🎨' },
    { id: 'text', name: 'Text', icon: '📝' },
    { id: 'audio', name: 'Audio', icon: '🎵' },
    { id: 'adjust', name: 'Adjust', icon: '🖌️' },
  ];

  const filters = ['Normal', 'Grayscale', 'Sepia', 'Vivid', 'Warm', 'Cool'];

  // FFmpeg Export Handler
  const handleExport = async () => {
    setIsProcessing(true);
    
    // Sample FFmpeg command for video processing/filter
    const command = `-i input.mp4 -vf "hue=s=0" -c:a copy output.mp4`;

    FFmpegKit.execute(command).then(async (session) => {
      const returnCode = await session.getReturnCode();

      setIsProcessing(false);
      if (ReturnCode.isSuccess(returnCode)) {
        Alert.alert('Success', 'Video exported successfully!');
      } else {
        Alert.alert('Error', 'Failed to process video with FFmpeg.');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎬 ViralForge Editor</Text>
        <TouchableOpacity 
          style={styles.exportButton} 
          onPress={handleExport}
          disabled={isProcessing}
        >
          <Text style={styles.exportText}>{isProcessing ? 'Processing...' : 'Export MP4'}</Text>
        </TouchableOpacity>
      </View>

      {/* Video Preview Canvas */}
      <View style={styles.previewContainer}>
        <View style={[styles.canvas, selectedFilter === 'Grayscale' && styles.filterGrayscale]}>
          <Text style={styles.previewPlaceholder}>📹 Video Preview Area</Text>
          <Text style={styles.filterTag}>Filter: {selectedFilter}</Text>
        </View>
      </View>

      {/* Timeline Controls */}
      <View style={styles.timelineContainer}>
        <Text style={styles.timelineText}>⏱️ 00:00 / 00:30</Text>
        <View style={styles.timelineTrack} />
      </View>

      {/* Tool Panels */}
      <View style={styles.panelContainer}>
        {activeTab === 'filters' && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsList}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[styles.optionBadge, selectedFilter === filter && styles.activeBadge]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={styles.optionText}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {activeTab !== 'filters' && (
          <Text style={styles.panelPlaceholder}>{activeTab.toUpperCase()} options panel</Text>
        )}
      </View>

      {/* Bottom Tool Bar */}
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
  previewContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15 },
  canvas: { width: width - 30, height: 380, backgroundColor: '#1E1E1E', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  previewPlaceholder: { color: '#888', fontSize: 16 },
  filterTag: { color: '#7C3AED', marginTop: 10, fontSize: 12 },
  filterGrayscale: { backgroundColor: '#2A2A2A' },
  timelineContainer: { paddingHorizontal: 20, height: 40, justifyContent: 'center' },
  timelineText: { color: '#AAA', fontSize: 12, marginBottom: 5 },
  timelineTrack: { height: 6, backgroundColor: '#333', borderRadius: 3 },
  panelContainer: { height: 60, backgroundColor: '#1A1A1A', justifyContent: 'center', borderTopWidth: 1, borderTopColor: '#2A2A2A' },
  optionsList: { paddingHorizontal: 10 },
  optionBadge: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#262626', marginRight: 10, justifyContent: 'center' },
  activeBadge: { backgroundColor: '#7C3AED' },
  optionText: { color: '#FFF', fontSize: 13 },
  panelPlaceholder: { color: '#666', textAlign: 'center', fontSize: 13 },
  toolbar: { height: 65, flexDirection: 'row', backgroundColor: '#0A0A0A', borderTopWidth: 1, borderTopColor: '#222' },
  toolItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  activeTool: { backgroundColor: '#1E1B4B' },
  toolIcon: { fontSize: 18 },
  toolLabel: { color: '#AAA', fontSize: 11, marginTop: 2 },
});
        </View>
      </View>

      {/* Timeline Controls */}
      <View style={styles.timelineContainer}>
        <Text style={styles.timelineText}>⏱️ 00:00 / 00:30</Text>
        <View style={styles.timelineTrack} />
      </View>

      {/* Tool Panels */}
      <View style={styles.panelContainer}>
        {activeTab === 'filters' && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsList}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[styles.optionBadge, selectedFilter === filter && styles.activeBadge]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={styles.optionText}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {activeTab !== 'filters' && (
          <Text style={styles.panelPlaceholder}>{activeTab.toUpperCase()} options panel</Text>
        )}
      </View>

      {/* Bottom Tool Bar */}
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
  previewContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15 },
  canvas: { width: width - 30, height: 380, backgroundColor: '#1E1E1E', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  previewPlaceholder: { color: '#888', fontSize: 16 },
  filterTag: { color: '#7C3AED', marginTop: 10, fontSize: 12 },
  filterGrayscale: { backgroundColor: '#2A2A2A' },
  timelineContainer: { paddingHorizontal: 20, height: 40, justifyContent: 'center' },
  timelineText: { color: '#AAA', fontSize: 12, marginBottom: 5 },
  timelineTrack: { height: 6, backgroundColor: '#333', borderRadius: 3 },
  panelContainer: { height: 60, backgroundColor: '#1A1A1A', justifyContent: 'center', borderTopWidth: 1, borderTopColor: '#2A2A2A' },
  optionsList: { paddingHorizontal: 10 },
  optionBadge: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#262626', marginRight: 10, justifyContent: 'center' },
  activeBadge: { backgroundColor: '#7C3AED' },
  optionText: { color: '#FFF', fontSize: 13 },
  panelPlaceholder: { color: '#666', textAlign: 'center', fontSize: 13 },
  toolbar: { height: 65, flexDirection: 'row', backgroundColor: '#0A0A0A', borderTopWidth: 1, borderTopColor: '#222' },
  toolItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  activeTool: { backgroundColor: '#1E1B4B' },
  toolIcon: { fontSize: 18 },
  toolLabel: { color: '#AAA', fontSize: 11, marginTop: 2 },
});
