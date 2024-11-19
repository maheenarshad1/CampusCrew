import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  SafeAreaView,
} from "react-native";
import { global } from "../../styles/theme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActiveChatsScreen from "./ActiveChats";
import NewChatScreen from "./NewChats";
import Routes from "../../utils/Routes";
import { navigate } from "../../helpers/router";
import { useNavigation } from "@react-navigation/native";

const TopTab = createMaterialTopTabNavigator();

function Chats() {
  const [searchText, setSearchText] = useState("");

  const navigation = useNavigation();

  return (
    <SafeAreaView style={global.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.username}>Chats</Text>
        </View>
      </View>
      <View
        style={[global.screenPaddingHorizontal, global.screenPaddingVertical]}
      >
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
      <TopTab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: true,
          tabBarLabel: ({ focused }) => {
            const isActiveTab = focused;
            return (
              <View
                style={[
                  styles.tabBadge,
                  isActiveTab ? styles.activeTabBadge : styles.inactiveTabBadge,
                  ,
                ]}
              >
                <Text
                  style={[
                    styles.tabLabel,
                    isActiveTab
                      ? styles.activeTabLabel
                      : styles.inactiveTabLabel,
                  ]}
                >
                  {route.name}
                </Text>
              </View>
            );
          },
          tabBarIndicatorStyle: { height: 0 },
          tabBarStyle: {
            backgroundColor: "white",
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarItemStyle: { width: "auto" },
          tabBarAndroidRipple: { color: "transparent" },
        })}
      >
        <TopTab.Screen
          name="Active Chats"
          component={() => (
            <ActiveChatsScreen
              searchText={searchText}
              setSearchText={setSearchText}
            />
          )}
        />
        <TopTab.Screen
          name="New Chat"
          component={() => (
            <NewChatScreen
              searchText={searchText}
              setSearchText={setSearchText}
            />
          )}
        />
      </TopTab.Navigator>

      <View style={styles.plusButton}>
        <TouchableOpacity
          onPress={() => navigate(Routes.ChatScreen, { showDropdown: true })}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 5,
    height: 55,
    ...Platform.select({
      ios: {
        marginBottom: 5,
      },
    }),
  },
  backButton: {
    marginRight: 10,
  },
  username: {
    fontSize: 28,
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
  tabBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabBadge: {
    backgroundColor: "#B5DE9C",
  },
  inactiveTabBadge: {
    backgroundColor: "#D9D9D94A",
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  activeTabLabel: {
    color: "#000",
  },
  inactiveTabLabel: {
    color: "#000",
  },
  plusButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
    marginRight: 10,
    width: 41,
    height: 41,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#B5DE9C",
    position: "relative",
  },
  buttonText: {
    fontSize: 26,
  },
});

export default Chats;
