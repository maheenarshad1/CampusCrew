import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { global } from "../../styles/theme";
import Routes from "../../utils/Routes";
import { navigate } from "../../helpers/router";
import { useNavigation, useRoute } from "@react-navigation/native";

function ProfileScreen({ route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAvatarVisible, setModalAvatarVisible] = useState(false);

  const [title1Text, setTitle1Text] = useState("");
  const [title2Text, setTitle2Text] = useState("");
  const [title3Text, setTitle3Text] = useState("");

  const selectedImage = route.params?.selectedImage;
  const goYourConnections = useCallback(
    () => navigate(Routes.YourConnections),
    []
  );
  const goAddPhotos = useCallback(() => navigate(Routes.AddPhotosScreen), []);
  const navigation = useNavigation();
  const [edu, setEdu] = useState({
    degree: "Degree",
    field: "Field",
    year: "Year",
  });
  const [languages, setLanguages] = useState([
    "Ethnicity Undisclosed",
    "English",
  ]);
  const [personality, setPersonality] = useState(["Extrovert"]);
  const [hobbies, setHobbies] = useState(["Reading", "Swimming"]);
  const [interest, setInterest] = useState(["Arts", "Cooking"]);
  const [otherDetails, setOtherDetails] = useState([
    "1000 characters into About their Personality",
  ]);
  const [selectedAvatar, setSelectedAvatar] = useState(
    require("../../assets/images/profile-avatar.png")
  );

  const [type, setType] = useState("");
  const handleEdit = (type) => {
    setModalVisible(true);
    setType(type);
  };
  const handleModalValue = async () => {
    setModalVisible(false);

    if (type === "edu") {
      setEdu((prevEdu) => {
        const updatedEdu = { ...prevEdu, [title1Text]: title1Text };
        AsyncStorage.setItem("edu", JSON.stringify(updatedEdu));
        return updatedEdu;
      });
    } else if (type === "Ethnicity and Languages") {
      setLanguages((prevLanguages) => {
        const updatedLanguages = [...prevLanguages, title1Text];
        AsyncStorage.setItem("languages", JSON.stringify(updatedLanguages));
        return updatedLanguages;
      });
    } else if (type === "hobbies") {
      setHobbies((prevHobbies) => {
        const updatedHobbies = [...prevHobbies, title1Text];
        AsyncStorage.setItem("hobbies", JSON.stringify(updatedHobbies));
        return updatedHobbies;
      });
    } else if (type === "interest") {
      setInterest((prevInterest) => {
        const updatedInterest = [...prevInterest, title1Text];
        AsyncStorage.setItem("interest", JSON.stringify(updatedInterest));
        return updatedInterest;
      });
    } else if (type === "personality") {
      setPersonality((prevPersonality) => {
        const updatedPersonality = [...prevPersonality, title1Text];
        AsyncStorage.setItem("personality", JSON.stringify(updatedPersonality));
        return updatedPersonality;
      });
    } else if (type === "Other Details") {
      setOtherDetails((prevOtherDetails) => {
        const updatedOtherDetails = [title1Text];
        AsyncStorage.setItem(
          "otherDetails",
          JSON.stringify(updatedOtherDetails)
        );
        return updatedOtherDetails;
      });
    }
  };

  const handleAvatarSelection = async (avatarSource) => {
    setSelectedAvatar(avatarSource);
    setModalAvatarVisible(false);

    await AsyncStorage.setItem("selectedAvatar", JSON.stringify(avatarSource));
  };

  useEffect(() => {
    const loadData = async () => {
      const storedEdu = await AsyncStorage.getItem("edu");
      if (storedEdu) setEdu(JSON.parse(storedEdu));

      const storedLanguages = await AsyncStorage.getItem("languages");
      if (storedLanguages) setLanguages(JSON.parse(storedLanguages));

      const storedHobbies = await AsyncStorage.getItem("hobbies");
      if (storedHobbies) setHobbies(JSON.parse(storedHobbies));

      const storedInterest = await AsyncStorage.getItem("interest");
      if (storedInterest) setInterest(JSON.parse(storedInterest));

      const storedPersonality = await AsyncStorage.getItem("personality");
      if (storedPersonality) setPersonality(JSON.parse(storedPersonality));

      const storedOtherDetails = await AsyncStorage.getItem("otherDetails");
      if (storedOtherDetails) setOtherDetails(JSON.parse(storedOtherDetails));

      const storedAvatar = await AsyncStorage.getItem("selectedAvatar");
      if (storedAvatar) setSelectedAvatar(JSON.parse(storedAvatar));
    };

    loadData();
  }, []);

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

        <View>
          <Text style={styles.username}>Singleplayer123</Text>
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
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View>
              <Image
                source={require("../../assets/images/profile-avatar.png")}
                style={styles.profileImage}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ margin: 10 }}>
                <TouchableOpacity onPress={goYourConnections}>
                  <Text style={{ textAlign: "center", fontSize: "20" }}>
                    25
                  </Text>
                  <Text style={styles.text}>Connections</Text>
                </TouchableOpacity>
              </View>
              <View style={{ margin: 10 }}>
                <TouchableOpacity onPress={goYourConnections}>
                  <Text style={{ textAlign: "center", fontSize: "20" }}>3</Text>
                  <Text style={styles.text}>Requests</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.flexRow]}>
            <View style={styles.flexDirectionRow}>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.headingText}>Maheen Arshad Qazi</Text>
                <Text style={styles.textItalic}>
                  Introduction by the user (250 characters)
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleEdit("intro")}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 25 }}>
            <Text style={styles.headingText}>Photos</Text>
            <View style={styles.imageContainer}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.userImage}
                />
              ) : (
                <Image
                  source={require("../../assets/images/Rectangle17.png")}
                  style={styles.userImage}
                />
              )}

              <TouchableOpacity style={styles.plusButton} onPress={goAddPhotos}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={[styles.flexRow, { marginTop: 25 }]}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.headingText}>Education</Text>
              </View>

              <View>
                <TouchableOpacity onPress={() => handleEdit("Education")}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              {Object.values(edu).map((label, index) => (
                <Text key={index}>{label}</Text>
              ))}
            </View>
          </View>

          <View>
            <View style={[styles.flexRow, { marginTop: 25 }]}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.headingText}>Ethnicity and Languages</Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => handleEdit("Ethnicity and Languages")}
                >
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
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
              {languages.map((language, index) => (
                <View
                  key={index}
                  style={[styles.choiceBadge, { marginRight: 10 }]}
                >
                  <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    {language}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View>
            <View style={[styles.flexRow, { marginTop: 25 }]}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.headingText}>Your Hobbies</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => handleEdit("Hobbies")}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
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
              {hobbies.map((hobbies, index) => (
                <View
                  key={index}
                  style={[styles.choiceBadge, { marginRight: 10 }]}
                >
                  <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    {hobbies}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View>
            <View style={[styles.flexRow, { marginTop: 25 }]}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.headingText}>Others Interests</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => handleEdit("Interest")}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
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
              {interest.map((interest, index) => (
                <View
                  key={index}
                  style={[styles.choiceBadge, { marginRight: 10 }]}
                >
                  <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    {interest}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View>
            <View style={[styles.flexRow, { marginTop: 25 }]}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.headingText}>Personality</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => handleEdit("Personality")}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
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
              {personality.map((personality, index) => (
                <View
                  key={index}
                  style={[styles.choiceBadge, { marginRight: 10 }]}
                >
                  <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    {personality}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View>
            <View style={[styles.flexRow, { marginTop: 25 }]}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.headingText}>Other Details </Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => handleEdit("Other Details")}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
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
              <Text style={styles.textItalic}>{otherDetails[0]}</Text>
            </View>
          </View>

          <View>
            <View style={[styles.flexRow, { marginTop: 25 }]}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.headingText}>Avatar</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => setModalAvatarVisible(true)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
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
              <Image source={selectedAvatar} style={styles.avatarImage} />
            </View>
          </View>

          {/* Edit Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Image
                    source={require("../../assets/images/x.png")}
                    style={styles.closeButtonimg}
                  />
                </TouchableOpacity>
                <Text style={styles.modalText}>Edit your {type} details</Text>
                <View style={{ marginBottom: 15 }}>
                  <Text style={styles.editText}>{type}</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder=""
                      value={title1Text}
                      onChangeText={(text) => setTitle1Text(text)}
                    />
                  </View>
                </View>
                <View
                  style={{
                    marginVertical: 15,
                    alignSelf: "flex-end",
                    width: "auto",
                  }}
                >
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleModalValue}
                  >
                    <Text style={{ fontSize: 13, fontWeight: "500" }}>
                      Save Changes
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Edit Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalAvatarVisible}
            onRequestClose={() => setModalAvatarVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalAvatarVisible(false)}
                >
                  <Image
                    source={require("../../assets/images/x.png")}
                    style={styles.closeButtonimg}
                  />
                </TouchableOpacity>
                <Text style={styles.modalText}>Choose Avatar</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      handleAvatarSelection(
                        require("../../assets/images/img1.png")
                      )
                    }
                  >
                    <Image
                      source={require("../../assets/images/img1.png")}
                      style={styles.modalImage}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      handleAvatarSelection(
                        require("../../assets/images/img2.png")
                      )
                    }
                  >
                    <Image
                      source={require("../../assets/images/img2.png")}
                      style={styles.modalImage}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      handleAvatarSelection(
                        require("../../assets/images/img3.png")
                      )
                    }
                  >
                    <Image
                      source={require("../../assets/images/img3.png")}
                      style={styles.modalImage}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      handleAvatarSelection(
                        require("../../assets/images/profile-avatar.png")
                      )
                    }
                  >
                    <Image
                      source={require("../../assets/images/profile-avatar.png")}
                      style={styles.modalImage}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginVertical: 15,
                    alignSelf: "flex-end",
                    width: "auto",
                  }}
                >
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => setModalAvatarVisible(false)}
                  >
                    <Text style={{ fontSize: 13, fontWeight: "500" }}>
                      Save Changes
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingBottom: 5,
    height: 70,
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
    fontSize: 22,
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
    fontSize: 18,
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

  choiceBadge: {
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
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
});

export default ProfileScreen;
