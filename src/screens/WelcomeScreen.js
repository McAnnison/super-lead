import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="musical-notes" size={100} color="#6C63FF" />
        <Text style={styles.title}>NoteSong AI</Text>
        <Text style={styles.subtitle}>
          Transform your notes into memorable songs
        </Text>
      </View>

      <View style={styles.features}>
        <FeatureItem
          icon="document-text"
          title="Upload Notes"
          description="PDF, PPT, Word, or text files"
        />
        <FeatureItem
          icon="images"
          title="Image Analysis"
          description="Understands diagrams, charts & tables"
        />
        <FeatureItem
          icon="headset"
          title="AI Music"
          description="Converts to songs in your favorite genre"
        />
      </View>

      <View style={styles.genrePreview}>
        <Text style={styles.genreTitle}>Available Genres:</Text>
        <View style={styles.genreTags}>
          {['Afrobeat', 'Hip-hop', 'Gospel', 'Lo-fi', 'Pop', 'Drill', 'Highlife'].map(
            (genre, index) => (
              <View key={index} style={styles.genreTag}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            )
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Upload')}
      >
        <Text style={styles.startButtonText}>Get Started</Text>
        <Ionicons name="arrow-forward" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.libraryButton}
        onPress={() => navigation.navigate('Library')}
      >
        <Ionicons name="folder-open" size={20} color="#6C63FF" />
        <Text style={styles.libraryButtonText}>My Library</Text>
      </TouchableOpacity>
    </View>
  );
}

function FeatureItem({ icon, title, description }) {
  return (
    <View style={styles.featureItem}>
      <Ionicons name={icon} size={40} color="#6C63FF" />
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  features: {
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#F8F9FF',
    borderRadius: 12,
  },
  featureText: {
    marginLeft: 15,
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  genrePreview: {
    marginBottom: 30,
  },
  genreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  genreTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreTag: {
    backgroundColor: '#E8E6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  genreText: {
    color: '#6C63FF',
    fontSize: 12,
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  libraryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6C63FF',
  },
  libraryButtonText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
