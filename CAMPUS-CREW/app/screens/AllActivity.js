import React, { useCallback } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const notifYesterday = [
  {
    id: "1",
    message: "You sent a connection request to ",
    image: require("../../assets/images/img2.png"),
    name: "Sam",
  },
  {
    id: "2",
    message: "You waved at ",
    image: require("../../assets/images/img1.png"),
    name: "user678",
  },
];

const lastsevendays = [
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

export default function AllActivity({ searchText }) {
  const filterNotifications = (data) => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  const goUserProfile = useCallback(async () => {
    await AsyncStorage.setItem("initialView", "view3");
    navigate(Routes.User);
  }, [navigate]);

  return (
    <View style={global.container}>
      <View style={[global.screen]}>
        <View
          style={[global.screenPaddingHorizontal, global.screenPaddingVertical]}
        >
          <Text style={{ fontWeight: "600", marginVertical: 5 }}>
            Yesterday
          </Text>
          <FlatList
            data={filterNotifications(notifYesterday)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.chatContainer}>
                <TouchableOpacity onPress={goUserProfile}>
                  <Image source={item.image} style={styles.map} />
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

          <Text style={{ fontWeight: "600", marginVertical: 5 }}>
            Last 7 days
          </Text>
          <FlatList
            data={filterNotifications(lastsevendays)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.chatContainer}>
                <TouchableOpacity onPress={goUserProfile}>
                  <Image source={item.image} style={styles.map} />
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
  map: {
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
});
