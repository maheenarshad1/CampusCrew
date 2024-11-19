import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "../app/screens/Settings";
import { Image, Platform } from "react-native";
import { StyleSheet } from "react-native";
import Chats from "../app/screens/Chats";
import Notifications from "../app/screens/Notifications";
import Home from "../app/screens";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarStyle: [styles.tabContainer],
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Map"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/images/mapimg.png")}
              style={[styles.tabMapsImg]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Notifications}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/images/notification.png")}
              style={[styles.tabNotifImg]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Chats}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/images/msg.png")}
              style={[styles.tabMsgImg]}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/images/setting.png")}
              style={[styles.tabSettingsImg]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabText: {
    fontSize: 12,
    fontFamily: "RedditSans-Medium",
  },
  tabIcon: {
    marginTop: 5,
  },
  tabContainer: {
    height: 70,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
    paddingTop: 10,
    paddingBottom: 15,
    borderTopWidth: 0.5,
    borderTopColor: "#DADFD9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 8,
    backgroundColor: "#000",
    ...Platform.select({
      ios: {
        paddingVertical: 15,
        padding: 18,
        height: 80,
        paddingBottom: 25,
        borderTopWidth: 1,
        borderTopColor: "rgba(0,0,0,0.05)",
      },
      android: {
        padding: 15,
        paddingVertical: 12,
      },
    }),
  },

  tabSettingsImg: {
    width: 26,
    height: 26,
  },
  tabNotifImg: {
    width: 25,
    height: 28,
  },
  tabMsgImg: {
    width: 28,
    height: 28,
  },
  tabMapsImg: {
    width: 25,
    height: 28,
  },
});
