/**
 * Object representing the available routes in the application.
 */
const Routes = {
  Home: "screens/index",
  Settings: "screensSettings",
  Chats: "screens/Chats",
  Notification: "screens/Notifications",
  ChatScreen: "screens/ChatScreen",
  ProfileScreen: "screens/Profile",
  YourConnections: "screens/YourConnections",
  User: "screens/UserProfile",
  AddPhotosScreen: "AddPhotosScreen",
};

/**
 * Represents the parameter types for the root stack navigation.
 * Using a JavaScript object to approximate this structure.
 */
const RootStackParams = {
  [Routes.Home]: undefined,
  [Routes.Settings]: undefined,
  [Routes.Chats]: undefined,
  [Routes.Notification]: undefined,
  [Routes.ChatScreen]: undefined,
  [Routes.ProfileScreen]: { selectedImage: "" }, // Placeholder type
  [Routes.YourConnections]: undefined,
  [Routes.User]: undefined,
  [Routes.AddPhotosScreen]: undefined,
};

/**
 * Represents the navigation parameters for the root stack.
 */
const NavigationParams = RootStackParams;

export { Routes, RootStackParams, NavigationParams };
export default Routes;
