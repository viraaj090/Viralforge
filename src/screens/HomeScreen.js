import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const features = [
    { id: 1, title: '✂️ Video Trimming', description: 'Cut and trim your videos precisely' },
    { id: 2, title: '📝 Text Overlay', description: 'Add custom text with colors and fonts' },
    { id: 3, title: '🎨 Filters & Effects', description: 'Apply professional filters' },
    { id: 4, title: '🎵 Audio Sync', description: 'Sync music and sound effects' },
    { id: 5, title: '🖌️ Stickers', description: 'Add stickers and animations' },
    { id: 6, title: '📤 Quick Export', description: 'Export as MP4 in minutes' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎬 ViralForge</Text>
        <Text style={styles.subtitle}>Create viral reels in minutes</Text>
      </View>

      {/* Quick Start */}
      <TouchableOpacity
        style={styles.quickStartButton}
        onPress={() => navigation.navigate('Editor')}
      >
        <Text style={styles.quickStartText}>🚀 Start Creating</Text>
      </TouchableOpacity>

      {/* Features Grid */}
      <View style={styles.featuresContainer}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature) => (
            <View key={feature.id} style={styles.featureCard}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Projects */}
      <View style={styles.recentContainer}>
        <Text style={styles.sectionTitle}>Recent Projects</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No projects yet. Start creating!</Text>
        </View>
      </View>

      {/* About */}
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutText}>
          ViralForge is your professional video editing tool designed for creating
          short-form content like reels and shorts. Edit, enhance, and export your
          videos faster than ever.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 30,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#E55555',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  quickStartButton: {
    margin: 16,
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  quickStartText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  featuresContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 12,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 11,
    color: '#AAA',
    lineHeight: 16,
  },
  recentContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  emptyState: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
  aboutContainer: {
    margin: 16,
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 10,
    marginBottom: 30,
  },
  aboutText: {
    color: '#CCC',
    fontSize: 13,
    lineHeight: 20,
  },
});

export default HomeScreen;
