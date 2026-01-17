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

// Sample data for demonstration
const SAMPLE_SONGS = [
  {
    id: 1,
    title: 'Computer Networks Basics',
    genre: 'Hip-hop',
    fileName: 'networks_chapter1.pdf',
    duration: '3:45',
    createdAt: '2024-01-08',
    imageCount: 5,
  },
  {
    id: 2,
    title: 'Data Structures & Algorithms',
    genre: 'Lo-fi',
    fileName: 'dsa_notes.pptx',
    duration: '4:20',
    createdAt: '2024-01-07',
    imageCount: 8,
  },
  {
    id: 3,
    title: 'Human-Computer Interaction',
    genre: 'Afrobeat',
    fileName: 'hci_lecture.pdf',
    duration: '3:15',
    createdAt: '2024-01-06',
    imageCount: 3,
  },
];

export default function LibraryScreen({ navigation }) {
  const [songs, setSongs] = useState(SAMPLE_SONGS);
  const [sortBy, setSortBy] = useState('recent'); // recent, genre, name

  const handlePlaySong = (song) => {
    navigation.navigate('Playback', {
      file: { name: song.fileName },
      genre: { name: song.genre },
    });
  };

  const handleDeleteSong = (songId) => {
    Alert.alert(
      'Delete Song',
      'Are you sure you want to delete this song?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setSongs(songs.filter((s) => s.id !== songId));
            Alert.alert('Deleted', 'Song removed from your library');
          },
        },
      ]
    );
  };

  const getSortedSongs = () => {
    switch (sortBy) {
      case 'genre':
        return [...songs].sort((a, b) => a.genre.localeCompare(b.genre));
      case 'name':
        return [...songs].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return songs;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.heading}>My Learning Songs</Text>
          <Text style={styles.subheading}>{songs.length} songs in your library</Text>
        </View>

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'recent' && styles.sortButtonActive]}
              onPress={() => setSortBy('recent')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'recent' && styles.sortButtonTextActive]}>
                Recent
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'genre' && styles.sortButtonActive]}
              onPress={() => setSortBy('genre')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'genre' && styles.sortButtonTextActive]}>
                Genre
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'name' && styles.sortButtonActive]}
              onPress={() => setSortBy('name')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'name' && styles.sortButtonTextActive]}>
                Name
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Songs List */}
        {getSortedSongs().length > 0 ? (
          <View style={styles.songsList}>
            {getSortedSongs().map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onPlay={() => handlePlaySong(song)}
                onDelete={() => handleDeleteSong(song.id)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="musical-notes-outline" size={80} color="#CCC" />
            <Text style={styles.emptyTitle}>No Songs Yet</Text>
            <Text style={styles.emptyDescription}>
              Create your first learning song by uploading your notes
            </Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate('Upload')}
            >
              <Ionicons name="add-circle" size={24} color="#fff" />
              <Text style={styles.createButtonText}>Create Song</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {songs.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('Upload')}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

function SongCard({ song, onPlay, onDelete }) {
  const getGenreColor = (genre) => {
    const colors = {
      'Afrobeat': '#FF6B6B',
      'Hip-hop': '#4ECDC4',
      'Gospel': '#FFE66D',
      'Lo-fi': '#95E1D3',
      'Pop': '#F38181',
      'Drill': '#AA96DA',
      'Highlife': '#FCBAD3',
    };
    return colors[genre] || '#6C63FF';
  };

  return (
    <View style={styles.songCard}>
      <View style={[styles.songThumbnail, { backgroundColor: getGenreColor(song.genre) }]}>
        <Ionicons name="musical-notes" size={32} color="#fff" />
      </View>
      
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.songMeta}>
          <Ionicons name="musical-note" size={12} color="#666" /> {song.genre} • {song.duration}
        </Text>
        <Text style={styles.songDate}>
          <Ionicons name="calendar" size={12} color="#666" /> {song.createdAt}
        </Text>
      </View>

      <View style={styles.songActions}>
        <TouchableOpacity style={styles.playButton} onPress={onPlay}>
          <Ionicons name="play-circle" size={40} color="#6C63FF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    color: '#666',
  },
  sortContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sortLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  sortButtons: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    margin: 4,
  },
  sortButtonActive: {
    backgroundColor: '#6C63FF',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  sortButtonTextActive: {
    color: '#fff',
  },
  songsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  songCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  songThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  songInfo: {
    flex: 1,
    marginLeft: 12,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  songMeta: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  songDate: {
    fontSize: 12,
    color: '#666',
  },
  songActions: {
    alignItems: 'center',
  },
  playButton: {
    marginBottom: 8,
  },
  deleteButton: {
    padding: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 40,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
