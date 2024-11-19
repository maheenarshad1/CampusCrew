import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomNavigation from "./BottomNavigation";
import { ScreenOptions } from "../utils/ScreenOptions";
import Routes from "../utils/Routes";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "../helpers/router";

import Chats from "../app/screens/Chats";
import Notifications from "../app/screens/Notifications";
import ChatScreen from "../app/screens/ChatScreen";
import ProfileScreen from "../app/screens/Profile";
import YourConnections from "../app/screens/YourConnections";
import UserProfile from "../app/screens/UserProfile";
import AddPhotosScreen from "../app/screens/AddPhotosScreen";
// import TabLayout from "@/app/(tabs)/_layout";

enableScreens();

const Stack = createStackNavigator();

function RootNavigation() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} independent={true}>
        <Stack.Navigator screenOptions={{ ...ScreenOptions }}>
          <Stack.Screen
            name={Routes.Home}
            component={BottomNavigation}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name={Routes.Chats}
            component={Chats}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />

          <Stack.Screen
            name={Routes.Notification}
            component={Notifications}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />

          <Stack.Screen
            name={Routes.ChatScreen}
            component={ChatScreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />

          <Stack.Screen
            name={Routes.ProfileScreen}
            component={ProfileScreen}
            initialParams={{ selectedImage: "" }}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />

          <Stack.Screen
            name={Routes.AddPhotosScreen}
            component={AddPhotosScreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />

          <Stack.Screen
            name={Routes.YourConnections}
            component={YourConnections}
            options={{
              headerShown: false,
              gestureEnabled: false,
              headerTitle: "Singleplayer123",
            }}
          />

          <Stack.Screen
            name={Routes.User}
            component={UserProfile}
            options={{
              headerShown: false,
              gestureEnabled: false,
              headerTitle: "User123",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default RootNavigation;
