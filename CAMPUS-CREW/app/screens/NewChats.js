import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { global } from "../../styles/theme";
import Routes from "../../utils/Routes";
import { navigate } from "../../helpers/router";

const newChats = [
  { id: "1", message: "Start a chat with ", name: "Maheen" },
  { id: "2", message: "Start a chat with ", name: "Olivia James" },
];

export default function NewChatScreen({ searchText }) {
  const filteredChats = newChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const goToChatScreen = (waveMessage) => {
    navigate(Routes.ChatScreen, { waveMessage });
  };
  return (
    <View style={global.container}>
      <View style={[global.screen]}>
        <View
          style={[global.screenPaddingHorizontal, global.screenPaddingVertical]}
        >
          <FlatList
            data={filteredChats}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.chatContainer}
                onPress={() =>
                  goToChatScreen(`👋 Sent a wave to ${item.name}`, {
                    waveSize: 40,
                  })
                }
              >
                <Image
                  source={require("../../assets/images/img1.png")}
                  style={styles.userImg}
                />
                <View style={styles.chatItem}>
                  <View style={styles.chatText}>
                    <Text style={styles.chatMessage}>
                      {item.message}
                      {item.name}
                    </Text>
                  </View>
                  <View>
                    <View>
                      <Image
                        source={require("../../assets/images/wave.png")}
                        style={styles.waveImp}
                      />
                      <Text style={styles.text}>Send a {"\n"} Quick Wave</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
  },
  userImg: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  chatItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  chatText: {
    flex: 1,
  },
  chatName: {
    fontWeight: "bold",
  },
  chatMessage: {
    color: "#555",
    fontSize: 14,
    fontStyle: "italic",
  },
  circle: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#B70D0D",
    position: "relative",
  },
  text: {
    fontSize: 8,
    color: "#555",
    fontStyle: "italic",
    textAlign: "center",
  },

  waveImp: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});
