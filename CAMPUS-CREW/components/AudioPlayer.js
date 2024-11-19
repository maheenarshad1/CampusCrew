import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio, AVPlaybackStatus } from "expo-av";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AudioPlayer = ({ uri }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(0);

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: false }
    );

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        setDuration(status.durationMillis || 0);
        setPosition(status.positionMillis || 0);
        setIsPlaying(status.isPlaying);
      }
    });

    setSound(sound);
  };

  const playPauseSound = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getFormattedTime = (millis) => {
    const minutes = Math.floor(millis / 1000 / 60);
    const seconds = Math.floor((millis / 1000) % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(async () => {
        const status = await sound?.getStatusAsync();
        if (status && status.isLoaded) {
          setPosition(status.positionMillis);
        }
      }, 500);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, sound]);

  return (
    <View style={styles.audioContainer}>
      <TouchableOpacity onPress={playPauseSound}>
        <Icon name={isPlaying ? "pause" : "play"} style={styles.button} />
      </TouchableOpacity>
      <View>
        <Slider
          style={styles.progressBar}
          value={position}
          minimumValue={0}
          maximumValue={duration || 0}
          onSlidingComplete={async (value) => {
            if (sound) {
              await sound.setPositionAsync(value);
            }
          }}
        />
        <Text style={styles.timestamp}>
          {getFormattedTime(position)} / {getFormattedTime(duration || 0)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  audioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    height: 20,
    width: 120,
  },
  timestamp: {
    paddingHorizontal: 10,
    fontSize: 12,
    color: "#555",
  },
  button: {
    fontSize: 28,
  },
});

export default AudioPlayer;
