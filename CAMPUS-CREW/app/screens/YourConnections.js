import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Platform,
} from "react-native";
import { global } from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import Routes from "../../utils/Routes";
import { navigate } from "../../helpers/router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const connections = [
  {
    id: "1",
    image: require("../../assets/images/img2.png"),
    name: "Amanda Bynes",
  },
  {
    id: "2",
    image: require("../../assets/images/img1.png"),
    name: "Bob Marley",
  },
  {
    id: "3",
    image: require("../../assets/images/img1.png"),
    name: "Catherine Cersy",
  },
];

const requestsData = [
  {
    id: "1",
    message: "You waved at ",
    image: require("../../assets/images/img3.png"),
    name: "user678",
    view: "accept",
  },
  {
    id: "2",
    message: "You received a connection request from ",
    image: require("../../assets/images/img1.png"),
    name: "User869",
    view: "accept",
  },
  {
    id: "3",
    message: "You declined a connection request from ",
    image: require("../../assets/images/img2.png"),
    name: "User3432",
    view: "accept",
  },
];

function YourConnections() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filterNotifications = (data) => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const [selectedTab, setSelectedTab] = useState("Connections");
  const navigation = useNavigation();
  const goUserProfile = useCallback(async () => {
    await AsyncStorage.setItem("initialView", "view3");
    navigate(Routes.User);
  }, [navigate]);
  const goUserScreen = useCallback(async () => {
    await AsyncStorage.setItem("initialView", "view2");
    navigate(Routes.User);
  }, [navigate]);
  const goUserUnblock = useCallback(async () => {
    await AsyncStorage.setItem("initialView", "unblock");
    navigate(Routes.User);
  }, [navigate]);
  const goToChatScreen = useCallback(() => navigate(Routes.ChatScreen), []);
  const [requests, setRequests] = useState(requestsData);

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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../../assets/images/back-arrow.png")}
            style={styles.backArrow}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.username}>Your Connections</Text>
        </View>
      </View>
      <View
        style={[global.screenPaddingHorizontal, global.screenPaddingVertical]}
      >
        <View style={[styles.headerContainer]}>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setSelectedTab("Connections")}>
              <Text
                style={[
                  styles.text,
                  selectedTab === "Connections" && styles.activeTab,
                ]}
              >
                <Text>24 </Text> Connections
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedTab("Requests")}>
              <Text
                style={[
                  styles.text,
                  selectedTab === "Requests" && styles.activeTab,
                ]}
              >
                <Text>3 </Text> Requests
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={global.inputContainer}>
          <Image
            source={require("../../assets/images/search.png")}
            style={styles.searchImage}
          />
          <TextInput
            style={global.input}
            placeholder="Search"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        {selectedTab === "Connections" ? (
          <View>
            <FlatList
              data={filterNotifications(connections)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.chatContainer}>
                  <TouchableOpacity onPress={goUserProfile}>
                    <Image source={item.image} style={styles.userImg} />
                  </TouchableOpacity>
                  <View style={styles.chatItem}>
                    <View style={styles.chatText}>
                      <Text style={styles.chatMessage}>{item.name}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={styles.chatButton}
                        onPress={goToChatScreen}
                      >
                        <Text style={{ fontSize: 13, fontWeight: "600" }}>
                          Chat
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                          source={require("../../assets/images/dots.png")}
                          style={styles.dotsImage}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainerMarker}>
                <View style={styles.modalContent}>
                  <Image
                    source={require("../../assets/images/img1.png")}
                    style={styles.markerImage}
                  />
                  <Text style={styles.modalText}>Remove Connection?</Text>
                  <Text style={styles.modalDescription}>
                    We won’t tell userabc that they were removed from your{" "}
                    {"\n"}
                    connections
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.removeButton}>Remove</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeButton}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <View>
            <FlatList
              data={requests}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.chatContainer}>
                  <TouchableOpacity onPress={() => goUserScreen(item.id)}>
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
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 33,
    paddingHorizontal: 15,
    paddingBottom: 5,
    height: 75,
    ...Platform.select({
      ios: {
        paddingTop: 45,
        marginBottom: 5,
      },
    }),
  },
  backButton: {
    marginRight: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  backArrow: {
    width: 8,
    height: 13,
    alignItems: "center",
  },
  searchImage: {
    height: 18,
    width: 18,
    marginRight: 5,
  },
  text: {
    fontSize: 14,
  },
  headerContainer: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  activeTab: {
    fontWeight: "bold",
    color: "#000",
  },
  contentContainer: {
    padding: 20,
  },

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
  chatButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEDA41",
    marginRight: 5,
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
  dotsImage: {
    height: 5,
    width: 20,
    marginTop: 15,
  },
  modalContainerMarker: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#D9D9D9",
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "700",
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  modalDescription: {
    fontSize: 10,
    marginBottom: 2,
    textAlign: "center",
  },
  markerImage: {
    width: 40,
    height: 40,
  },
  closeButton: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
  },
  removeButton: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#B70D0D",
    marginVertical: 8,
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

export default YourConnections;
