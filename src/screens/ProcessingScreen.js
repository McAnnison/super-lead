import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PROCESSING_STEPS = [
  { id: 1, text: 'Extracting text from document...', icon: 'document-text' },
  { id: 2, text: 'Analyzing images and diagrams...', icon: 'images' },
  { id: 3, text: 'Identifying key concepts...', icon: 'bulb' },
  { id: 4, text: 'Generating creative lyrics...', icon: 'create' },
  { id: 5, text: 'Synthesizing music and vocals...', icon: 'musical-notes' },
];

export default function ProcessingScreen({ navigation, route }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress] = useState(new Animated.Value(0));
  const { file, genre } = route.params;

  useEffect(() => {
    // Simulate processing steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < PROCESSING_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          // After all steps complete, navigate to playback
          setTimeout(() => {
            navigation.replace('Playback', { file, genre });
          }, 1000);
          return prev;
        }
      });
    }, 2000);

    // Animate progress bar
    Animated.timing(progress, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: false,
    }).start();

    return () => clearInterval(stepInterval);
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="musical-notes" size={80} color="#6C63FF" />
          <ActivityIndicator
            size="large"
            color="#6C63FF"
            style={styles.spinner}
          />
        </View>

        <Text style={styles.title}>Creating Your Learning Song</Text>
        <Text style={styles.subtitle}>
          Genre: {genre.name} • File: {file.name}
        </Text>

        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[styles.progressBar, { width: progressWidth }]}
          />
        </View>

        <View style={styles.stepsContainer}>
          {PROCESSING_STEPS.map((step, index) => (
            <ProcessingStep
              key={step.id}
              step={step}
              isActive={index === currentStep}
              isCompleted={index < currentStep}
            />
          ))}
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color="#6C63FF" />
          <Text style={styles.infoText}>
            This may take a few moments. We're analyzing your content and
            creating a personalized learning experience.
          </Text>
        </View>
      </View>
    </View>
  );
}

function ProcessingStep({ step, isActive, isCompleted }) {
  return (
    <View style={styles.stepContainer}>
      <View
        style={[
          styles.stepIcon,
          isActive && styles.stepIconActive,
          isCompleted && styles.stepIconCompleted,
        ]}
      >
        {isCompleted ? (
          <Ionicons name="checkmark" size={16} color="#fff" />
        ) : (
          <Ionicons
            name={step.icon}
            size={16}
            color={isActive ? '#6C63FF' : '#CCC'}
          />
        )}
      </View>
      <Text
        style={[
          styles.stepText,
          isActive && styles.stepTextActive,
          isCompleted && styles.stepTextCompleted,
        ]}
      >
        {step.text}
      </Text>
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
    padding: 20,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  spinner: {
    position: 'absolute',
    bottom: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 32,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 3,
  },
  stepsContainer: {
    marginBottom: 32,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepIconActive: {
    backgroundColor: '#E8E6FF',
  },
  stepIconCompleted: {
    backgroundColor: '#4CAF50',
  },
  stepText: {
    fontSize: 14,
    color: '#999',
    flex: 1,
  },
  stepTextActive: {
    color: '#6C63FF',
    fontWeight: '600',
  },
  stepTextCompleted: {
    color: '#4CAF50',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
