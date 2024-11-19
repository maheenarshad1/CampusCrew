import { global } from "../../styles/theme";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";
import AudioPlayer from "../../components/AudioPlayer";
import { useRoute } from "@react-navigation/native";

function ChatView() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const navigation = useNavigation();
  const route = useRoute();
  const showDropdown = route?.params?.showDropdown ?? false;
  const emojisWithIcons = [
    { title: "User123", image: require("../../assets/images/img2.png") },
    { title: "Userabc", image: require("../../assets/images/img3.png") },
    { title: "Olivia", image: require("../../assets/images/img1.png") },
  ];

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: String(prevMessages.length + 1),
          text: inputText,
          sender: "user",
          type: "text",
        },
      ]);
      setInputText("");
    }
  };

  async function startRecording() {
    try {
      if (permissionResponse?.status !== "granted") {
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(undefined);
      if (uri) {
        saveAudioMessage(uri);
      }
    }
  }

  const saveAudioMessage = (uri) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: String(prevMessages.length + 1),
        uri: uri,
        sender: "user",
        type: "audio",
      },
    ]);
  };

  const renderItem = ({ item }) => {
    const messageText =
      item.type === "text" && item.text.includes("👋")
        ? item.text.replace("👋", "")
        : item.text;

    return (
      <View
        style={[
          styles.messageContainer,
          item.sender === "user" ? styles.userMessage : styles.botMessage,
        ]}
      >
        {item.type === "audio" ? (
          <AudioPlayer uri={item.uri} />
        ) : (
          <Text style={styles.messageText}>
            {item.text?.includes("👋") && (
              <Text style={styles.waveText}>👋</Text>
            )}
            {messageText}
          </Text>
        )}
      </View>
    );
  };

  useEffect(() => {
    if (route.params?.waveMessage) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: String(prevMessages.length + 1),
          text: route.params.waveMessage,
          sender: "bot",
          type: "text",
        },
      ]);
    }
  }, [route.params?.waveMessage]);

  return (
    <KeyboardAvoidingView
      style={global.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../../assets/images/back-arrow.png")}
              style={styles.backArrow}
            />
          </TouchableOpacity>

          {!showDropdown ? (
            <View style={styles.profileContainer}>
              <Image
                source={require("../../assets/images/profile.png")}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.username}>User XYZ</Text>
                <Text style={styles.lastActive}>Last Active 04:53 PM</Text>
              </View>
            </View>
          ) : (
            <SelectDropdown
              data={emojisWithIcons}
              onSelect={(selectedItem, index) => {}}
              renderButton={(selectedItem, isOpened) => (
                <View style={styles.dropdownButtonStyle}>
                  {selectedItem && (
                    <Image
                      source={selectedItem.image}
                      style={styles.dropdownButtonIconStyle}
                    />
                  )}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || "Add Recipient"}
                  </Text>
                  <Icon
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    style={styles.dropdownButtonArrowStyle}
                  />
                </View>
              )}
              renderItem={(item, index, isSelected) => (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  <Image
                    source={item.image}
                    style={styles.dropdownItemIconStyle}
                  />
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          )}
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={{ paddingTop: 10 }}
      />

      <View style={styles.inputContainer}>
        <Text style={{ fontSize: 26, marginRight: 5 }}>+</Text>
        <TextInput
          style={styles.input}
          placeholder="Send a Message"
          value={inputText}
          onChangeText={setInputText}
        />

        <TouchableOpacity
          onPress={recording ? stopRecording : startRecording}
          style={styles.button}
        >
          <Icon
            name={recording ? "stop-circle" : "microphone"}
            size={30}
            color={recording ? "#B70D0D" : "green"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSend}>
          <Image
            source={require("../../assets/images/send.png")}
            style={styles.sendImage}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#F6EFB7",
    width: "auto",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F0EFEF",
  },
  messageText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#d9d9d9",
    ...Platform.select({
      ios: {
        paddingTop: 15,
        paddingBottom: 35,
        paddingHorizontal: 20,
      },
    }),
  },
  input: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: "#fff",
    fontStyle: "italic",
    ...Platform.select({
      ios: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginRight: 20,
      },
    }),
  },
  sendImage: {
    height: 20,
    width: 20,
    padding: 5,
  },
  headerContainer: {
    backgroundColor: "#f5d432",
    paddingTop: 40,
    paddingHorizontal: 15,
    paddingBottom: 10,
    height: "auto",
    ...Platform.select({
      ios: {
        paddingTop: 65,
      },
    }),
  },
  backButton: {
    padding: 5,
    marginRight: 5,
  },
  profileContainer: {
    flexDirection: "row",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  lastActive: {
    fontSize: 12,
    color: "gray",
  },
  backArrow: {
    width: 8,
    height: 13,
  },
  dropdownButtonStyle: {
    width: "92%",
    height: 40,
    backgroundColor: "#E9ECEF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 10,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    color: "#151E26",
    fontStyle: "italic",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    marginRight: 8,
    width: 20,
    height: 20,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderColor: "#000",
    borderWidth: 1,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    marginRight: 8,
    width: 20,
    height: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 50,
  },

  waveText: {
    fontSize: 24,
    ...Platform.select({
      ios: {
        fontSize: 36,
      },
    }),
  },
  messageText: {
    fontSize: 16,
  },
});

export default ChatView;
