import React from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform,
  Image,
} from "react-native";
import { global } from "../../styles/theme";

function Settings() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={global.container}
    >
      <View style={styles.inner}>
        <Text style={styles.header}>
          We apologize for your inconvenience Settings are under construction
        </Text>
        <Image
          source={require("../../assets/images/contruction.png")}
          style={[styles.tabMsgImg]}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    marginBottom: 18,
    justifyContent: "center",
    fontWeight: "600",
    textAlign: "center",
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
  tabMsgImg: {
    width: 199,
    height: 164,
  },
});

export default Settings;
