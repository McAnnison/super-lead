import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

export default function UploadScreen({ navigation }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
        ],
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setSelectedFile(result);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick document');
      console.error(err);
    }
  };

  const handleContinue = () => {
    if (!selectedFile) {
      Alert.alert('No File Selected', 'Please select a file to continue');
      return;
    }
    navigation.navigate('GenreSelection', { file: selectedFile });
  };

  const getFileIcon = (fileName) => {
    if (!fileName) return 'document';
    const ext = fileName.split('.').pop().toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'document-text';
      case 'ppt':
      case 'pptx':
        return 'easel';
      case 'doc':
      case 'docx':
        return 'document';
      case 'txt':
        return 'document-text-outline';
      default:
        return 'document';
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Upload Your Notes</Text>
        <Text style={styles.description}>
          Select a PDF, PowerPoint, Word document, or text file containing your
          study notes or slides
        </Text>

        <View style={styles.supportedFormats}>
          <Text style={styles.supportedTitle}>Supported Formats:</Text>
          <View style={styles.formatList}>
            <FormatTag icon="document-text" label="PDF" />
            <FormatTag icon="easel" label="PPT" />
            <FormatTag icon="document" label="Word" />
            <FormatTag icon="document-text-outline" label="Text" />
          </View>
        </View>

        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <Ionicons name="cloud-upload" size={40} color="#6C63FF" />
          <Text style={styles.uploadButtonText}>
            {selectedFile ? 'Change File' : 'Select File'}
          </Text>
        </TouchableOpacity>

        {selectedFile && (
          <View style={styles.filePreview}>
            <Ionicons
              name={getFileIcon(selectedFile.name)}
              size={50}
              color="#6C63FF"
            />
            <View style={styles.fileInfo}>
              <Text style={styles.fileName} numberOfLines={1}>
                {selectedFile.name}
              </Text>
              <Text style={styles.fileSize}>
                {formatFileSize(selectedFile.size)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setSelectedFile(null)}
              style={styles.removeButton}
            >
              <Ionicons name="close-circle" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={24} color="#6C63FF" />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>What happens next?</Text>
            <Text style={styles.infoDescription}>
              • Text will be extracted and summarized{'\n'}
              • Images (diagrams, charts, tables) will be analyzed{'\n'}
              • Key concepts will be identified{'\n'}
              • Content will be ready for lyric generation
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedFile && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedFile}
        >
          <Text style={styles.continueButtonText}>Continue to Genre Selection</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function FormatTag({ icon, label }) {
  return (
    <View style={styles.formatTag}>
      <Ionicons name={icon} size={20} color="#6C63FF" />
      <Text style={styles.formatLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
  },
  supportedFormats: {
    marginBottom: 30,
  },
  supportedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  formatList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  formatTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  formatLabel: {
    color: '#6C63FF',
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#F8F9FF',
    borderWidth: 2,
    borderColor: '#6C63FF',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  filePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  fileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  fileSize: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  removeButton: {
    padding: 4,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E8E6FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  continueButton: {
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    gap: 8,
  },
  continueButtonDisabled: {
    backgroundColor: '#CCC',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
