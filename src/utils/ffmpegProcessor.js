import { FFmpegKit, FFmpegKitConfig, ReturnCode } from '@ffmpeg-kit/react-native';
import * as FileSystem from 'expo-file-system';

export class FFmpegVideoProcessor {
  constructor() {
    this.tempDir = FileSystem.documentDirectory + 'ViralForge/temp/';
    this.outputDir = FileSystem.documentDirectory + 'ViralForge/output/';
    this.initializeDirs();
    FFmpegKitConfig.enableLogCallback((log) => {
      console.log('[FFmpeg] ' + log.getMessage());
    });
    FFmpegKitConfig.enableStatisticsCallback((stat) => {
      console.log('[FFmpeg Stats] Time: ' + stat.getTime() + 'ms');
    });
  }

  async initializeDirs() {
    try {
      const tempInfo = await FileSystem.getInfoAsync(this.tempDir);
      if (!tempInfo.exists) {
        await FileSystem.makeDirectoryAsync(this.tempDir, { intermediates: true });
      }

      const outputInfo = await FileSystem.getInfoAsync(this.outputDir);
      if (!outputInfo.exists) {
        await FileSystem.makeDirectoryAsync(this.outputDir, { intermediates: true });
      }
    } catch (error) {
      console.error('Error initializing directories:', error);
    }
  }

  async trimVideo(inputUri, outputUri, startTime, endTime) {
    try {
      const duration = endTime - startTime;
      // Convert seconds to HH:MM:SS format
      const ssTime = this.secondsToTime(startTime);
      const durationSeconds = duration.toFixed(2);

      const command = `-ss ${ssTime} -i "${inputUri}" -t ${durationSeconds} -c:v copy -c:a copy "${outputUri}"`;
      console.log('Trim Command:', command);

      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        console.log('Video trimmed successfully');
        return { success: true, outputUri };
      } else {
        throw new Error('Trim failed with return code: ' + returnCode);
      }
    } catch (error) {
      console.error('Trim error:', error);
      throw error;
    }
  }

  async addTextOverlay(inputUri, outputUri, text, options = {}) {
    try {
      const {
        fontsize = 24,
        fontcolor = 'white',
        x = 10,
        y = 'H-th-10',
        fontfile = '',
      } = options;

      // Escape special characters in text
      const escapedText = this.escapeFFmpegText(text);

      let drawtext = `drawtext=text='${escapedText}':fontsize=${fontsize}:fontcolor=${fontcolor}:x=${x}:y=${y}`;
      if (fontfile) {
        drawtext += `:fontfile='${fontfile}'`;
      }

      const command = `-i "${inputUri}" -vf "${drawtext}" -c:a copy "${outputUri}"`;
      console.log('Text Overlay Command:', command);

      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        console.log('Text overlay added successfully');
        return { success: true, outputUri };
      } else {
        throw new Error('Text overlay failed with return code: ' + returnCode);
      }
    } catch (error) {
      console.error('Text overlay error:', error);
      throw error;
    }
  }

  async applyFilter(inputUri, outputUri, filterType = 'none') {
    try {
      let filterCmd = '';

      switch (filterType) {
        case 'grayscale':
          filterCmd = 'format=gray';
          break;
        case 'sepia':
          filterCmd = 'colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131';
          break;
        case 'blur':
          filterCmd = 'boxblur=5:1';
          break;
        case 'bright':
          filterCmd = 'eq=brightness=1.2';
          break;
        case 'contrast':
          filterCmd = 'eq=contrast=1.3';
          break;
        case 'saturate':
          filterCmd = 'hue=s=1.5';
          break;
        case 'invert':
          filterCmd = 'negate';
          break;
        case 'edges':
          filterCmd = 'edgedetect=mode=sobel';
          break;
        case 'none':
        default:
          // No filter, copy as-is
          const copyCommand = `-i "${inputUri}" -c:v copy -c:a copy "${outputUri}"`;
          const copySession = await FFmpegKit.execute(copyCommand);
          const copyReturnCode = await copySession.getReturnCode();
          if (ReturnCode.isSuccess(copyReturnCode)) {
            return { success: true, outputUri };
          }
          return { success: false };
      }

      const command = `-i "${inputUri}" -vf "${filterCmd}" -c:a copy "${outputUri}"`;
      console.log('Filter Command:', command);

      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        console.log('Filter applied successfully');
        return { success: true, outputUri };
      } else {
        throw new Error('Filter failed with return code: ' + returnCode);
      }
    } catch (error) {
      console.error('Filter error:', error);
      throw error;
    }
  }

  async adjustBrightness(inputUri, outputUri, brightness = 1.0) {
    try {
      const command = `-i "${inputUri}" -vf "eq=brightness=${brightness}" -c:a copy "${outputUri}"`;
      console.log('Brightness Command:', command);

      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        return { success: true, outputUri };
      } else {
        throw new Error('Brightness adjustment failed');
      }
    } catch (error) {
      console.error('Brightness adjustment error:', error);
      throw error;
    }
  }

  async adjustContrast(inputUri, outputUri, contrast = 1.0) {
    try {
      const command = `-i "${inputUri}" -vf "eq=contrast=${contrast}" -c:a copy "${outputUri}"`;
      console.log('Contrast Command:', command);

      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        return { success: true, outputUri };
      } else {
        throw new Error('Contrast adjustment failed');
      }
    } catch (error) {
      console.error('Contrast adjustment error:', error);
      throw error;
    }
  }

  async adjustSaturation(inputUri, outputUri, saturation = 1.0) {
    try {
      const command = `-i "${inputUri}" -vf "hue=s=${saturation}" -c:a copy "${outputUri}"`;
      console.log('Saturation Command:', command);

      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        return { success: true, outputUri };
      } else {
        throw new Error('Saturation adjustment failed');
      }
    } catch (error) {
      console.error('Saturation adjustment error:', error);
      throw error;
    }
  }

  async processVideo(params) {
    try {
      const {
        inputUri,
        trimStart = 0,
        trimEnd = 0,
        overlayText = '',
        textColor = 'white',
        textSize = 24,
        filter = 'none',
        brightness = 1.0,
        contrast = 1.0,
        saturation = 1.0,
      } = params;

      const timestamp = Date.now();
      let currentOutput = inputUri;
      let step = 1;

      // Step 1: Trim if needed
      if (trimEnd > trimStart && trimEnd > 0) {
        const trimOutput = `${this.tempDir}step_${step}_trim_${timestamp}.mp4`;
        console.log(`Step ${step}: Trimming...`);
        await this.trimVideo(currentOutput, trimOutput, trimStart, trimEnd);
        currentOutput = trimOutput;
        step++;
      }

      // Step 2: Apply filter
      if (filter !== 'none') {
        const filterOutput = `${this.tempDir}step_${step}_filter_${timestamp}.mp4`;
        console.log(`Step ${step}: Applying filter '${filter}'...`);
        await this.applyFilter(currentOutput, filterOutput, filter);
        currentOutput = filterOutput;
        step++;
      }

      // Step 3: Add text overlay
      if (overlayText.trim().length > 0) {
        const textOutput = `${this.tempDir}step_${step}_text_${timestamp}.mp4`;
        console.log(`Step ${step}: Adding text overlay...`);
        await this.addTextOverlay(currentOutput, textOutput, overlayText, {
          fontsize: textSize,
          fontcolor: textColor,
          x: 10,
          y: 'H-th-10',
        });
        currentOutput = textOutput;
        step++;
      }

      // Step 4: Adjust brightness
      if (brightness !== 1.0) {
        const brightnessOutput = `${this.tempDir}step_${step}_brightness_${timestamp}.mp4`;
        console.log(`Step ${step}: Adjusting brightness...`);
        await this.adjustBrightness(currentOutput, brightnessOutput, brightness);
        currentOutput = brightnessOutput;
        step++;
      }

      // Step 5: Adjust contrast
      if (contrast !== 1.0) {
        const contrastOutput = `${this.tempDir}step_${step}_contrast_${timestamp}.mp4`;
        console.log(`Step ${step}: Adjusting contrast...`);
        await this.adjustContrast(currentOutput, contrastOutput, contrast);
        currentOutput = contrastOutput;
        step++;
      }

      // Step 6: Adjust saturation
      if (saturation !== 1.0) {
        const saturationOutput = `${this.tempDir}step_${step}_saturation_${timestamp}.mp4`;
        console.log(`Step ${step}: Adjusting saturation...`);
        await this.adjustSaturation(currentOutput, saturationOutput, saturation);
        currentOutput = saturationOutput;
        step++;
      }

      // Final output
      const finalOutput = `${this.outputDir}ViralForge_${timestamp}.mp4`;
      if (currentOutput !== inputUri) {
        await FileSystem.copyAsync({
          from: currentOutput,
          to: finalOutput,
        });
      } else {
        await FileSystem.copyAsync({
          from: inputUri,
          to: finalOutput,
        });
      }

      // Clean up temp files
      await this.cleanupTempFiles(timestamp);

      return { success: true, outputUri: finalOutput };
    } catch (error) {
      console.error('Video processing error:', error);
      throw error;
    }
  }

  async cleanupTempFiles(timestamp) {
    try {
      const files = await FileSystem.readDirectoryAsync(this.tempDir);
      for (const file of files) {
        if (file.includes(timestamp)) {
          await FileSystem.deleteAsync(`${this.tempDir}${file}`);
        }
      }
    } catch (error) {
      console.warn('Cleanup error:', error);
    }
  }

  secondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  }

  pad(num) {
    return String(num).padStart(2, '0');
  }

  escapeFFmpegText(text) {
    // Escape special characters for FFmpeg drawtext filter
    return text
      .replace(/'/g, "'\\''")
      .replace(/\\/g, '\\\\\\\\')
      .replace(/:/g, '\\:')
      .replace(/\[/g, '\\[')
      .replace(/\]/g, '\\]');
  }
}
