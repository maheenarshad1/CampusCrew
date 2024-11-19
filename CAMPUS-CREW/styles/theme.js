/**
 * Represents the light theme colors.
 */
const LightTheme = {
  primary: "#f27a1a",
  secondary: "#202124",
  background: "rgb(242, 242, 242)",
  card: "rgb(255, 255, 255)",
  text: "rgb(28, 28, 30)",
  border: "rgb(216, 216, 216)",
  notification: "rgb(255, 59, 48)",
};

const DarkTheme = {
  primary: "#f27a1a",
  secondary: "#efefef",
  background: "rgb(1, 1, 1)",
  card: "rgb(18, 18, 18)",
  text: "rgb(229, 229, 231)",
  border: "rgb(39, 39, 41)",
  notification: "rgb(255, 69, 58)",
};

export { LightTheme, DarkTheme };

import { Platform, StyleSheet } from "react-native";

export const global = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  screen: {
    flex: 1,
  },
  screenPaddingVertical: {
    paddingHorizontal: 15,
  },
  screenPaddingHorizontal: {
    // paddingVertical: 10,
  },
  buttonStyle: {
    marginTop: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#218C03",
    padding: 10,
    borderRadius: 20,
    width: 300,
    gap: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D94A",

    ...Platform.select({
      android: {
        marginBottom: 5,
      },
      ios: {
        marginBottom: 10,
      },
    }),
  },
  input: {
    flex: 1,
    fontSize: 15,
    ...Platform.select({
      android: {
        height: 38,
      },
      ios: {
        height: 40,
      },
    }),
  },
});
