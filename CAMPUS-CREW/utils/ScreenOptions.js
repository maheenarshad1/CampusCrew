import { CardStyleInterpolators } from "@react-navigation/stack";
import { Dimensions } from "react-native";

/**
 * Options for configuring the screen behavior and appearance.
 */
export const ScreenOptions = {
  gestureEnabled: true,
  gestureResponseDistance: Dimensions.get("screen").width,
  headerShown: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerStyle: { backgroundColor: "white" },
  headerTitleStyle: { fontFamily: "Bold" },
  headerTitleAlign: "left",
};
