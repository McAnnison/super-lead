import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function PlaybackScreen({ navigation, route }) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const { file, genre } = route.params;

  // Sample lyrics based on the genre
  const sampleLyrics = getSampleLyrics(genre.name);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const togglePlayback = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    } else {
      // In a real app, load the actual audio file here
      Alert.alert(
        'Demo Mode',
        'In production, this would play the AI-generated song based on your notes.'
      );
    }
  };

  const handleDownload = () => {
    Alert.alert(
      'Download Song',
      'Your learning song would be saved to your device for offline listening.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Download',
          onPress: () => {
            Alert.alert('Success', 'Song downloaded successfully!');
          },
        },
      ]
    );
  };

  const handleShare = () => {
    Alert.alert(
      'Share Song',
      'Share your learning song with friends or study groups.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Share',
          onPress: () => {
            Alert.alert('Shared', 'Song link copied to clipboard!');
          },
        },
      ]
    );
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Album Art Placeholder */}
        <View style={styles.albumArt}>
          <Ionicons name="musical-notes" size={80} color="#fff" />
          <Text style={styles.genreBadge}>{genre.name}</Text>
        </View>

        {/* Song Info */}
        <Text style={styles.songTitle}>Your Learning Song</Text>
        <Text style={styles.songSubtitle}>
          From: {file.name.length > 30 ? file.name.substring(0, 30) + '...' : file.name}
        </Text>

        {/* Playback Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="play-skip-back" size={32} color="#6C63FF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playButton}
            onPress={togglePlayback}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={40}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="play-skip-forward" size={32} color="#6C63FF" />
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '35%' }]} />
          </View>
          <View style={styles.timeLabels}>
            <Text style={styles.timeText}>1:23</Text>
            <Text style={styles.timeText}>3:45</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
            <Ionicons name="download" size={24} color="#6C63FF" />
            <Text style={styles.actionText}>Download</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-social" size={24} color="#6C63FF" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Library')}
          >
            <Ionicons name="folder-open" size={24} color="#6C63FF" />
            <Text style={styles.actionText}>Library</Text>
          </TouchableOpacity>
        </View>

        {/* Lyrics Section */}
        <View style={styles.lyricsSection}>
          <Text style={styles.lyricsTitle}>Lyrics & Learning Points</Text>
          <View style={styles.lyricsBox}>
            <ScrollView style={styles.lyricsScroll}>
              <Text style={styles.lyricsText}>{sampleLyrics}</Text>
            </ScrollView>
          </View>
        </View>

        {/* Image Analysis Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>
            <Ionicons name="images" size={18} color="#6C63FF" /> Content Analysis
          </Text>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.infoItemText}>3 diagrams explained</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.infoItemText}>2 tables summarized</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.infoItemText}>5 key concepts identified</Text>
          </View>
        </View>

        {/* Create Another Button */}
        <TouchableOpacity
          style={styles.createAnotherButton}
          onPress={() => navigation.navigate('Upload')}
        >
          <Ionicons name="add-circle" size={24} color="#6C63FF" />
          <Text style={styles.createAnotherText}>Create Another Song</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function getSampleLyrics(genre) {
  const baseLyrics = `[Verse 1]
Let me break it down, knowledge in the sound
Key concepts here, learning all around
Diagrams explained, making it so clear
Every chart and graph, now you understand

[Chorus]
Study with the rhythm, let it sink in deep
Every fact and figure, yours to keep
Learning made easy, music in your mind
Knowledge and the beat, perfectly combined

[Verse 2]
Tables tell a story, data in a row
Flowcharts show the process, helping you to know
Images analyzed, meaning crystal clear
Everything you need, right here for you to hear

[Bridge]
Retention through repetition
Learning with precision
Music is the mission
Knowledge acquisition`;

  return baseLyrics;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  albumArt: {
    width: '100%',
    height: 300,
    backgroundColor: '#6C63FF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  genreBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  songSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  controlButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 2,
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#6C63FF',
    marginTop: 4,
    fontWeight: '600',
  },
  lyricsSection: {
    marginBottom: 24,
  },
  lyricsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  lyricsBox: {
    backgroundColor: '#F8F9FF',
    borderRadius: 12,
    padding: 16,
    height: 200,
  },
  lyricsScroll: {
    flex: 1,
  },
  lyricsText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 24,
  },
  infoSection: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoItemText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  createAnotherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6C63FF',
  },
  createAnotherText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C63FF',
    marginLeft: 8,
  },
});
