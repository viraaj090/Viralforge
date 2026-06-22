import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Slider from '@react-native-community/slider';
import styles from '../styles/editorStyles';
import { VideoProcessor } from '../utils/videoProcessor';

const { width, height } = Dimensions.get('window');

export default function VideoEditorScreen() {
  const [videoUri, setVideoUri] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editorMode, setEditorMode] = useState('trim'); // trim, text, filter, export
  const [overlayText, setOverlayText] = useState('');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [textSize, setTextSize] = useState(20);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const videoRef = useRef(null);

  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
      });

      if (!result.canceled && result.assets[0]) {
        setVideoUri(result.assets[0].uri);
        setTrimStart(0);
        setTrimEnd(0);
        setCurrentTime(0);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick video');
    }
  };

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = async (value) => {
    setCurrentTime(value);
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(value * 1000);
    }
  };

  const handleExportVideo = async () => {
    if (!videoUri) {
      Alert.alert('Error', 'No video selected');
      return;
    }

    setIsProcessing(true);
    try {
      const processor = new VideoProcessor();
      const processedVideo = await processor.processVideo({
        inputUri: videoUri,
        trimStart,
        trimEnd,
        overlayText,
        textColor,
        textSize,
        filter: selectedFilter,
        brightness,
        contrast,
        saturation,
      });

      Alert.alert('Success', `Video exported to: ${processedVideo}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to export video: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const colors = ['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFD700'];
  const filters = ['none', 'grayscale', 'sepia', 'blur', 'bright'];

  return (
    <View style={styles.container}>
      {/* Video Preview */}
      <View style={styles.previewContainer}>
        {videoUri ? (
          <Video
            ref={videoRef}
            source={{ uri: videoUri }}
            style={styles.videoPreview}
            resizeMode="contain"
            onLoad={(data) => {
              setVideoDuration(data.durationMillis / 1000);
              setTrimEnd(data.durationMillis / 1000);
            }}
            onPlaybackStatusUpdate={(status) => {
              if (status.isLoaded && !status.isBuffering) {
                setCurrentTime(status.positionMillis / 1000);
                if (status.didJustFinish) {
                  setIsPlaying(false);
                }
              }
            }}
            progressUpdateIntervalMillis={100}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Select a video to start editing</Text>
          </View>
        )}
      </View>

      {/* Timeline & Controls */}
      {videoUri && (
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={handlePlayPause}
          >
            <Text style={styles.buttonText}>{isPlaying ? '⏸ Pause' : '▶ Play'}</Text>
          </TouchableOpacity>

          <Slider
            style={styles.timeline}
            minimumValue={0}
            maximumValue={videoDuration}
            value={currentTime}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#FF6B6B"
            maximumTrackTintColor="#E0E0E0"
          />

          <Text style={styles.timeText}>
            {Math.floor(currentTime)}s / {Math.floor(videoDuration)}s
          </Text>
        </View>
      )}

      {/* Mode Selector */}
      <View style={styles.modeSelector}>
        {['trim', 'text', 'filter', 'export'].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[
              styles.modeButton,
              editorMode === mode && styles.modeButtonActive,
            ]}
            onPress={() => setEditorMode(mode)}
          >
            <Text
              style={[
                styles.modeButtonText,
                editorMode === mode && styles.modeButtonTextActive,
              ]}
            >
              {mode.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Editor Panels */}
      <ScrollView style={styles.editorPanel}>
        {editorMode === 'trim' && videoUri && (
          <View style={styles.editorContent}>
            <Text style={styles.sectionTitle}>Trim Video</Text>

            <View style={styles.trimSection}>
              <Text style={styles.label}>Start: {Math.floor(trimStart)}s</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={videoDuration}
                value={trimStart}
                onValueChange={setTrimStart}
                minimumTrackTintColor="#4CAF50"
              />
            </View>

            <View style={styles.trimSection}>
              <Text style={styles.label}>End: {Math.floor(trimEnd)}s</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={videoDuration}
                value={trimEnd}
                onValueChange={setTrimEnd}
                minimumTrackTintColor="#FF6B6B"
              />
            </View>
          </View>
        )}

        {editorMode === 'text' && (
          <View style={styles.editorContent}>
            <Text style={styles.sectionTitle}>Add Text Overlay</Text>

            <View style={styles.textInputSection}>
              <Text style={styles.label}>Text:</Text>
              <TouchableOpacity
                style={styles.textInput}
                onPress={() => Alert.prompt('Enter text', '', (text) => setOverlayText(text))}
              >
                <Text style={styles.textInputPlaceholder}>
                  {overlayText || 'Tap to add text'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.colorSection}>
              <Text style={styles.label}>Text Color:</Text>
              <View style={styles.colorPalette}>
                {colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      textColor === color && styles.colorOptionSelected,
                    ]}
                    onPress={() => setTextColor(color)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.sizeSection}>
              <Text style={styles.label}>Text Size: {Math.floor(textSize)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={10}
                maximumValue={50}
                value={textSize}
                onValueChange={setTextSize}
              />
            </View>
          </View>
        )}

        {editorMode === 'filter' && (
          <View style={styles.editorContent}>
            <Text style={styles.sectionTitle}>Filters & Effects</Text>

            <View style={styles.filterSection}>
              <Text style={styles.label}>Select Filter:</Text>
              <View style={styles.filterGrid}>
                {filters.map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    style={[
                      styles.filterButton,
                      selectedFilter === filter && styles.filterButtonActive,
                    ]}
                    onPress={() => setSelectedFilter(filter)}
                  >
                    <Text style={styles.filterButtonText}>{filter}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.adjustmentSection}>
              <Text style={styles.label}>Brightness: {brightness.toFixed(2)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0.5}
                maximumValue={2}
                value={brightness}
                onValueChange={setBrightness}
              />

              <Text style={styles.label}>Contrast: {contrast.toFixed(2)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0.5}
                maximumValue={2}
                value={contrast}
                onValueChange={setContrast}
              />

              <Text style={styles.label}>Saturation: {saturation.toFixed(2)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={2}
                value={saturation}
                onValueChange={setSaturation}
              />
            </View>
          </View>
        )}

        {editorMode === 'export' && (
          <View style={styles.editorContent}>
            <Text style={styles.sectionTitle}>Export Video</Text>
            <View style={styles.exportSummary}>
              <Text style={styles.summaryText}>Duration: {Math.floor(trimEnd - trimStart)}s</Text>
              <Text style={styles.summaryText}>Filter: {selectedFilter}</Text>
              {overlayText && <Text style={styles.summaryText}>Text: {overlayText}</Text>}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={styles.pickButton}
          onPress={pickVideo}
        >
          <Text style={styles.buttonText}>📁 Choose Video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.exportButton,
            (!videoUri || isProcessing) && styles.disabledButton,
          ]}
          onPress={handleExportVideo}
          disabled={!videoUri || isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>🎬 Export</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
