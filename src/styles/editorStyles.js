import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  previewContainer: {
    height: height * 0.35,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  videoPreview: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
  },
  controlsContainer: {
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  playButton: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  timeline: {
    width: '100%',
    height: 30,
    marginVertical: 8,
  },
  timeText: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  modeButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  modeButtonText: {
    color: '#999',
    fontSize: 11,
    fontWeight: '600',
  },
  modeButtonTextActive: {
    color: '#FFF',
  },
  editorPanel: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  editorContent: {
    padding: 16,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  label: {
    color: '#DDD',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  trimSection: {
    marginBottom: 20,
  },
  textInputSection: {
    marginBottom: 16,
  },
  textInput: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  textInputPlaceholder: {
    color: '#999',
    fontSize: 14,
  },
  colorSection: {
    marginBottom: 16,
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: '#FFF',
    borderWidth: 3,
  },
  sizeSection: {
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterButton: {
    flex: 0.48,
    backgroundColor: '#2a2a2a',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  filterButtonActive: {
    borderColor: '#FF6B6B',
    backgroundColor: '#333',
  },
  filterButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  adjustmentSection: {
    marginTop: 16,
  },
  exportSummary: {
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  summaryText: {
    color: '#DDD',
    fontSize: 13,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    padding: 12,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  pickButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  exportButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default styles;
