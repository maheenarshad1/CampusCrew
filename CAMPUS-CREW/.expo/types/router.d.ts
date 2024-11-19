/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/_sitemap` | `/screens` | `/screens/ActiveChats` | `/screens/AddPhotosScreen` | `/screens/AllActivity` | `/screens/ChatScreen` | `/screens/Chats` | `/screens/ConnectionRequests` | `/screens/NewChats` | `/screens/Notifications` | `/screens/Profile` | `/screens/Settings` | `/screens/UserProfile` | `/screens/YourConnections`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
