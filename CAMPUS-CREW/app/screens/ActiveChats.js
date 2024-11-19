import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { global } from "../../styles/theme";
import Routes from "../../utils/Routes";
import { navigate } from "../../helpers/router";

const activeChats = [
  { id: "1", name: "Osama Khan", message: "Message" },
  { id: "2", name: "Anjali Gupta", message: "Message" },
  { id: "3", name: "Yuan Li", message: "New Message", unread: true },
  { id: "4", name: "Xian Cherise", message: "New Message", unread: true },
];

export default function ActiveChatsScreen({ searchText }) {
  const goToChatScreen = () => {
    navigate(Routes.ChatScreen);
  };

  const filteredChats = activeChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );
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
                onPress={goToChatScreen}
              >
                <Image
                  source={require("../../assets/images/img1.png")}
                  style={styles.map}
                />
                <View style={styles.chatItem}>
                  <View style={styles.chatText}>
                    <Text style={styles.chatName}>{item.name}</Text>
                    <Text style={styles.chatMessage}>{item.message}</Text>
                  </View>
                  <View>
                    {item.unread && (
                      <View style={[styles.circle]}>
                        <Text style={styles.textInitial}>2</Text>
                      </View>
                    )}
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
  map: {
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
  textInitial: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "500",
  },
});
