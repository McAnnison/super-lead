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

const GENRES = [
  { id: 'afrobeat', name: 'Afrobeat', icon: 'musical-note', color: '#FF6B6B', description: 'Energetic African rhythms' },
  { id: 'hiphop', name: 'Hip-hop', icon: 'headset', color: '#4ECDC4', description: 'Rhythmic beats and flow' },
  { id: 'gospel', name: 'Gospel', icon: 'heart', color: '#FFE66D', description: 'Uplifting and soulful' },
  { id: 'lofi', name: 'Lo-fi', icon: 'cafe', color: '#95E1D3', description: 'Calm and relaxing' },
  { id: 'pop', name: 'Pop', icon: 'star', color: '#F38181', description: 'Catchy and memorable' },
  { id: 'drill', name: 'Drill', icon: 'flash', color: '#AA96DA', description: 'Hard-hitting beats' },
  { id: 'highlife', name: 'Highlife', icon: 'happy', color: '#FCBAD3', description: 'Classic African sound' },
];

export default function GenreSelectionScreen({ navigation, route }) {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { file } = route.params;

  const handleContinue = () => {
    if (!selectedGenre) {
      Alert.alert('No Genre Selected', 'Please select a music genre to continue');
      return;
    }
    navigation.navigate('Processing', { file, genre: selectedGenre });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Choose Your Genre</Text>
        <Text style={styles.description}>
          Select the music genre for your learning song. The AI will create
          lyrics and music in your chosen style.
        </Text>

        <View style={styles.genreGrid}>
          {GENRES.map((genre) => (
            <GenreCard
              key={genre.id}
              genre={genre}
              selected={selectedGenre?.id === genre.id}
              onSelect={() => setSelectedGenre(genre)}
            />
          ))}
        </View>

        {selectedGenre && (
          <View style={styles.selectedInfo}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.selectedText}>
              Selected: <Text style={styles.selectedGenre}>{selectedGenre.name}</Text>
            </Text>
          </View>
        )}

        <View style={styles.infoBox}>
          <Ionicons name="bulb" size={24} color="#FFB74D" />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>How it works:</Text>
            <Text style={styles.infoDescription}>
              Our AI will analyze your notes and images, extract key concepts,
              and transform them into rhythmic, memorable lyrics that match your
              selected genre. Perfect for learning on the go!
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedGenre && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedGenre}
        >
          <Text style={styles.continueButtonText}>Create My Song</Text>
          <Ionicons name="musical-notes" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function GenreCard({ genre, selected, onSelect }) {
  return (
    <TouchableOpacity
      style={[
        styles.genreCard,
        selected && styles.genreCardSelected,
        { borderColor: genre.color },
      ]}
      onPress={onSelect}
    >
      <View style={[styles.genreIcon, { backgroundColor: genre.color + '20' }]}>
        <Ionicons name={genre.icon} size={32} color={genre.color} />
      </View>
      <Text style={styles.genreName}>{genre.name}</Text>
      <Text style={styles.genreDescription}>{genre.description}</Text>
      {selected && (
        <View style={styles.selectedBadge}>
          <Ionicons name="checkmark" size={16} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
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
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  genreCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    position: 'relative',
  },
  genreCardSelected: {
    borderWidth: 3,
    backgroundColor: '#F8F9FF',
  },
  genreIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  genreName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  genreDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  selectedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4CAF50',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  selectedGenre: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E6',
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
  },
  continueButtonDisabled: {
    backgroundColor: '#CCC',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});
