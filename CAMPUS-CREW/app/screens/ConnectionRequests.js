import React, { useCallback, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const received = [
  {
    id: "1",
    message: "You sent a connection request to ",
    image: require("../../assets/images/img2.png"),
    name: "Sam",
    view: "accept",
  },
  {
    id: "2",
    message: "You waved at ",
    image: require("../../assets/images/img1.png"),
    name: "user678",
    view: "accept",
  },
  {
    id: "3",
    message: "You waved at ",
    image: require("../../assets/images/img1.png"),
    name: "userabc",
    view: "accept",
  },
];

const pendings = [
  {
    id: "1",
    message: "You waved at ",
    image: require("../../assets/images/img3.png"),
    name: "user678",
  },
  {
    id: "2",
    message: "You received a connection request from ",
    image: require("../../assets/images/img1.png"),
    name: "User869",
  },
  {
    id: "3s",
    message: "You declined a connection request from ",
    image: require("../../assets/images/img2.png"),
    name: "User3432",
  },
];

export default function ConnectionRequests({ searchText }) {
  const filterNotifications = (data) => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const goUserProfile = useCallback(async () => {
    await AsyncStorage.setItem("initialView", "view2");
    navigate(Routes.User);
  }, [navigate]);
  const goToChatScreen = useCallback(() => navigate(Routes.ChatScreen), []);
  const goUserUnblock = useCallback(async () => {
    await AsyncStorage.setItem("initialView", "unblock");
    navigate(Routes.User);
  }, [navigate]);
  const [requests, setRequests] = useState(received);

  const handleAccept = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, view: "chat" } : request
      )
    );
  };

  const handleDecline = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, view: "decline" } : request
      )
    );
  };

  const goChatScreen = (waveMessage) => {
    navigate(Routes.ChatScreen, { waveMessage });
  };
  return (
    <View style={global.container}>
      <View style={[global.screen]}>
        <View
          style={[global.screenPaddingHorizontal, global.screenPaddingVertical]}
        >
          <Text style={{ fontWeight: "600", marginVertical: 5 }}>Received</Text>
          <FlatList
            data={filterNotifications(requests)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.chatContainer}>
                <TouchableOpacity onPress={goUserProfile}>
                  <Image source={item.image} style={styles.userImg} />
                </TouchableOpacity>
                <View style={styles.chatItem}>
                  <View style={styles.chatText}>
                    <Text style={styles.chatMessage}>
                      {item.message}
                      {item.name}
                    </Text>
                  </View>
                  {item.view === "accept" && (
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={styles.acceptButton}
                        onPress={() => handleAccept(item.id)}
                      >
                        <Text style={{ fontSize: 11, fontWeight: "500" }}>
                          Accept
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.declineButton}
                        onPress={() => handleDecline(item.id)}
                      >
                        <Text style={{ fontSize: 11, fontWeight: "500" }}>
                          Decline
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {item.view === "chat" && (
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginTop: 10 }}>
                        <TouchableOpacity
                          style={styles.chatButton}
                          onPress={goToChatScreen}
                        >
                          <Text style={{ fontSize: 11, fontWeight: "500" }}>
                            Chat
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            goChatScreen(`👋 Sent a wave to ${item.name}`, {
                              waveSize: 40,
                            })
                          }
                        >
                          <Image
                            source={require("../../assets/images/wave.png")}
                            style={styles.waveImp}
                          />
                          <Text style={styles.wavetext}>
                            Send a {"\n"} Quick Wave
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  {item.view === "decline" && (
                    <View>
                      <TouchableOpacity
                        style={styles.blockButton}
                        onPress={goUserUnblock}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: "500",
                            color: "#fff",
                          }}
                        >
                          Block
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            )}
          />
          <Text style={{ fontWeight: "600", marginVertical: 5 }}>Pendings</Text>
          <FlatList
            data={filterNotifications(pendings)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.chatContainer}>
                <TouchableOpacity onPress={goUserProfile}>
                  <Image source={item.image} style={styles.userImg} />
                </TouchableOpacity>
                <View style={styles.chatItem}>
                  <View style={styles.chatText}>
                    <Text style={styles.chatMessage}>
                      {item.message}
                      {item.name}
                    </Text>
                  </View>
                </View>
              </View>
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
    width: 40,
    height: 40,
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
  chatMessage: {
    color: "#555",
    fontSize: 14,
    fontStyle: "italic",
  },
  acceptButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B5DE9C",
    marginRight: 5,
  },
  declineButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D94A",
  },
  chatButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEDA41",
    marginRight: 5,
  },
  wavetext: {
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
  blockButton: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A61111",
    marginRight: 10,
  },
});
