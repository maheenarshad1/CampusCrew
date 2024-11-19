import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import { global } from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Routes from "../../utils/Routes";
import { navigate } from "../../helpers/router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
function UserProfile() {
  const navigation = useNavigation();
  const [view, setView] = useState("view1");

  useEffect(() => {
    const getInitialView = async () => {
      try {
        const storedView = await AsyncStorage.getItem("initialView");
        if (storedView) {
          setView(storedView);
        }
      } catch (error) {
        console.error(
          "Failed to retrieve the initial view from storage",
          error
        );
      }
    };
    getInitialView();
  }, []);
  const goToChatScreen = useCallback(() => navigate(Routes.ChatScreen), []);
  return (
    <SafeAreaView style={global.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../../assets/images/back-arrow.png")}
            style={styles.backArrow}
          />
        </TouchableOpacity>

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: "95%",
          }}
        >
          <View>
            <Text style={styles.username}>User123</Text>
          </View>
          <View style={styles.badge}>
            <Text style={{ fontSize: 13, fontWeight: "600" }}>65% Match</Text>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator overScrollMode={"always"}>
        <View
          style={[
            global.screenPaddingHorizontal,
            global.screenPaddingVertical,
            { marginBottom: 20 },
          ]}
        >
          <View style={[styles.flexRow]}>
            <View style={styles.flexDirectionRow}>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.textItalic}>
                  Introduction by the user (250 characters)
                </Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 15 }}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/images/userProfile.png")}
                style={styles.userImage}
              />
            </View>
          </View>

          {/* View 1 */}
          {view === "view1" && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => setView("connect")}
              >
                <Text style={{ fontSize: 11, fontWeight: "500" }}>Connect</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.declineButton}
                onPress={() => setView("unblock")}
              >
                <Text style={{ fontSize: 11, fontWeight: "500" }}>Block</Text>
              </TouchableOpacity>
            </View>
          )}

          {view === "connect" && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: "500" }}>
                Connection Request Sent
              </Text>
            </View>
          )}
          {/* View 1 */}

          {/* View 2 */}
          {view === "view2" && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => setView("chat")}
              >
                <Text style={{ fontSize: 11, fontWeight: "500" }}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.declineButton}
                onPress={() => setView("block")}
              >
                <Text style={{ fontSize: 11, fontWeight: "500" }}>Decline</Text>
              </TouchableOpacity>
            </View>
          )}

          {view === "chat" && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={[styles.chatButton, { paddingHorizontal: 50 }]}
                onPress={goToChatScreen}
              >
                <Text style={{ fontSize: 11, fontWeight: "500" }}>Chat</Text>
              </TouchableOpacity>
            </View>
          )}
          {view === "block" && (
            <View
              style={{
                flexDirection: "column",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 10, fontWeight: "600", marginBottom: 5 }}
              >
                Connection Request Declined
              </Text>
              <TouchableOpacity
                style={[styles.blockButton, { paddingHorizontal: 35 }]}
                onPress={() => setView("unblock")}
              >
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#fff" }}
                >
                  Block User
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {view === "remove" && (
            <View
              style={{
                flexDirection: "column",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 10, fontWeight: "600", marginBottom: 5 }}
              >
                Connection Removed
              </Text>
              <TouchableOpacity
                style={[styles.blockButton, { paddingHorizontal: 35 }]}
                onPress={() => setView("unblock")}
              >
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#fff" }}
                >
                  Block User
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {view === "unblock" && (
            <View
              style={{
                flexDirection: "column",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={[styles.blockButton, { paddingHorizontal: 35 }]}
                onPress={() => setView("view1")}
              >
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#fff" }}
                >
                  UnBlock
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "600",
                  marginTop: 5,
                  fontStyle: "italic",
                }}
              >
                Unblock User to view profile
              </Text>
            </View>
          )}
          {/* View 2 */}

          {/* View 3 */}
          {view === "view3" && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.chatButton}
                onPress={goToChatScreen}
              >
                <Text style={{ fontSize: 11, fontWeight: "500" }}>Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.declineButton}
                onPress={() => setView("remove")}
              >
                <Text style={{ fontSize: 11, fontWeight: "500" }}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.blockButton}
                onPress={() => setView("unblock")}
              >
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#fff" }}
                >
                  Block
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {/* View 3 */}

          <View>
            <View style={[styles.flexRow, { marginTop: 15 }]}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.headingText}>Education</Text>
              </View>
            </View>
            <View>
              <Text>Degree</Text>
              <Text>Field</Text>
              <Text>Year</Text>
            </View>
          </View>

          <View>
            <View style={[styles.flexRow, { marginTop: 25 }]}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.headingText}>Ethnicity and Languages</Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 8,
                flexWrap: "wrap",
              }}
            >
              <View style={[styles.choiceBagde, { marginRight: 25 }]}>
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Ethnicity Undisclosed
                </Text>
              </View>
              <View style={[styles.choiceBagde, { marginRight: 10 }]}>
                <Text style={{ fontSize: 13, fontWeight: "500" }}>English</Text>
              </View>
              <View style={[styles.choiceBagde, { marginRight: 10 }]}>
                <Text style={{ fontSize: 13, fontWeight: "500" }}>Spanish</Text>
              </View>
              <View style={[styles.choiceBagde, { marginRight: 25 }]}>
                <Text style={{ fontSize: 13, fontWeight: "500" }}>French</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={[styles.flexRow, { marginTop: 25 }]}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.headingText}>Your Hobbies</Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 8,
                flexWrap: "wrap",
              }}
            >
              <View style={[styles.choiceBagde, { marginRight: 25 }]}>
                <Text style={{ fontSize: 13, fontWeight: "500" }}>Reading</Text>
              </View>
              <View style={[styles.choiceBagde, { marginRight: 25 }]}>
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Swimming
                </Text>
              </View>
              <View style={[styles.choiceBagde, { marginRight: 10 }]}>
                <Text style={{ fontSize: 13, fontWeight: "500" }}>Hiking</Text>
              </View>
              <View style={[styles.choiceBagde, { marginRight: 25 }]}>
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Photography
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View style={[styles.flexRow, { marginTop: 25 }]}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.headingText}>Others Interests</Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 8,
                flexWrap: "wrap",
              }}
            >
              <View style={[styles.choiceBagde, { marginRight: 25 }]}>
                <Text style={{ fontSize: 13, fontWeight: "500" }}>Arts</Text>
              </View>
              <View style={[styles.choiceBagde, { marginRight: 25 }]}>
                <Text style={{ fontSize: 13, fontWeight: "500" }}>Cooking</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={[styles.flexRow, { marginTop: 25 }]}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.headingText}>Personality</Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 3,
                flexWrap: "wrap",
              }}
            >
              <View style={[styles.choiceBagde, { marginRight: 25 }]}>
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Extrovert
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.textItalic}>
                100 characters intro about their personality
              </Text>
            </View>
          </View>

          <View>
            <View style={[styles.flexRow, { marginTop: 25 }]}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.headingText}>Other Details </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 3,
                flexWrap: "wrap",
              }}
            ></View>
            <View>
              <Text style={styles.textItalic}>
                1000 characters intro about their personality
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  profileImage: {
    width: 62,
    height: 58,
  },
  text: {
    fontSize: 14,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 210,
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  plusButton: {
    position: "absolute",
    top: -10,
    right: 0,
    backgroundColor: "#fff",
    width: 41,
    height: 41,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#000",
  },
  buttonText: {
    fontSize: 26,
  },
  editText: {
    fontWeight: "600",
    fontSize: 13,
    color: "#000",
  },
  headingText: {
    fontWeight: "700",
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 310,
    padding: 10,
    backgroundColor: "#F0EFEF",
    borderWidth: 2,
    borderColor: "#000",
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "700",
  },
  closeButton: {
    borderRadius: 5,
    textAlign: "left",
  },
  closeButtonimg: {
    height: 10,
    width: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
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
    fontSize: 13,
    ...Platform.select({
      android: {
        height: 25,
      },
      ios: {
        height: 28,
      },
    }),
  },
  optionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },

  saveButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B5DE9C",
  },
  choiceBagde: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0EFEF",
    marginVertical: 4,
  },

  textItalic: {
    fontStyle: "italic",
    fontSize: 13,
  },
  avatarImage: {
    width: 101,
    height: 95,
  },
  modalImage: {
    width: 59,
    height: 58,
  },
  acceptButton: {
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B5DE9C",
    marginHorizontal: 10,
  },
  declineButton: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D94A",
    marginRight: 10,
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B5DE9C",
    marginHorizontal: 10,
  },
  chatButton: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEDA41",
    marginRight: 10,
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

export default UserProfile;
