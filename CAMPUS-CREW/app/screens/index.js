import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Routes from "../../utils/Routes";
import { navigate } from "../../helpers/router";
import PieChart from "react-native-pie-chart";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState();
  const pulseAnimation = useState(new Animated.Value(1))[0];

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };
  const [value, setValue] = useState(0);

  const goToProfileScreen = () => {
    navigate(Routes.ProfileScreen);
  };

  const goUserProfile = useCallback(async () => {
    await AsyncStorage.setItem("initialView", "view1");
    navigate(Routes.User);
  }, [navigate]);
  const initialMarkerData = useMemo(
    () => [
      {
        id: 1,
        coordinate: { latitude: -33.9177, longitude: 151.2315 },
        title: "User 1",
        match: "79% match",
        description: "Masters of ABC, 2nd Year\nEnglish, Chinese\nIntrovert",
        image: require("../../assets/images/user1.png"),
      },
      {
        id: 2,
        coordinate: { latitude: -33.9172, longitude: 151.2305 },
        title: "User 2",
        match: "85% match",
        description: "Masters of ABC, 2nd Year\nEnglish, Chinese\nIntrovert",
        image: require("../../assets/images/user2.png"),
      },
      {
        id: 3,
        coordinate: { latitude: -33.9168, longitude: 151.232 },
        title: "User 3",
        match: "95% match",
        description: "Masters of ABC, 2nd Year\nEnglish, Chinese\nIntrovert",
        image: require("../../assets/images/user3.png"),
      },
    ],
    []
  );
  const [markerData, setMarkerData] = useState(initialMarkerData);

  const widthAndHeight = 30;
  const series = [100 - value, value];
  const sliceColor = ["#e0e0e0", "#e15c64"];

  const handleProgress = (newValue) => {
    setValue(Math.round(newValue));
    const filteredData = initialMarkerData?.filter((marker) => {
      const matchPercentage = parseInt(marker.match);
      return matchPercentage > newValue;
    });
    setMarkerData(filteredData);
  };
  useEffect(() => {}, [markerData]);

  const triggerPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const CustomMarker = React.memo(({ marker, isSelected }) => {
    const markerSize = isSelected ? 60 : 40;
    const markerStyles = [
      styles.markerContainer,
      isSelected && styles.markerContainer,
      isSelected && { transform: [{ scale: pulseAnimation }] },
    ];

    return (
      <Marker
        key={marker.id}
        coordinate={marker.coordinate}
        onPress={() => handleMarkerPress(marker)}
      >
        <Animated.View style={markerStyles}>
          <Image
            source={marker.image}
            style={[
              styles.markerImage,
              { width: markerSize, height: markerSize },
            ]}
          />
        </Animated.View>
      </Marker>
    );
  });

  useEffect(() => {}, [isModalVisible]);
  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setIsModalVisible(true);
    triggerPulse();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }} pointerEvents="box-none">
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: -33.9173,
            longitude: 151.2309,
            latitudeDelta: 0.005,
            longitudeDelta: 0.002,
          }}
        >
          {isVisible &&
            markerData.map((marker) => (
              <CustomMarker
                key={marker.id}
                marker={marker}
                isSelected={selectedMarker?.id === marker.id}
              />
            ))}
        </MapView>

        {selectedMarker && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalContainerMarker}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Image
                    source={require("../../assets/images/x.png")}
                    style={styles.closeButtonimg}
                  />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{selectedMarker.title}</Text>
                {selectedMarker.image && (
                  <Image
                    source={selectedMarker.image}
                    style={styles.markerImage}
                  />
                )}
                <Text style={styles.modalTitle}>{selectedMarker.match}</Text>
                <Text style={styles.modalDescription}>
                  {selectedMarker.description}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "600", fontSize: 12 }}>
                      Matching Interests
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#F0EFEF",
                      padding: 5,
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    <View style={[styles.choiceBagde, { marginRight: 5 }]}>
                      <Text
                        style={{
                          fontSize: 10,

                          color: "#fff",
                        }}
                      >
                        option1
                      </Text>
                    </View>
                    <View style={[styles.choiceBagde, { marginRight: 5 }]}>
                      <Text
                        style={{
                          fontSize: 10,

                          color: "#fff",
                        }}
                      >
                        option2
                      </Text>
                    </View>
                    <View style={[styles.choiceBagde, { marginRight: 5 }]}>
                      <Text
                        style={{
                          fontSize: 10,

                          color: "#fff",
                        }}
                      >
                        option3
                      </Text>
                    </View>
                    <View style={[styles.choiceBagde, { marginRight: 5 }]}>
                      <Text
                        style={{
                          fontSize: 10,

                          color: "#fff",
                        }}
                      >
                        option4
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={styles.declineButton}
                    onPress={goUserProfile}
                  >
                    <Text style={{ fontSize: 11, fontWeight: "500" }}>
                      View Profile
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.acceptButton}>
                    <Text style={{ fontSize: 11, fontWeight: "500" }}>
                      Connect
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}

        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.profileWrapper}
            onPress={goToProfileScreen}
          >
            <Image
              source={require("../../assets/images/profile.png")}
              style={styles.profileImage}
            />
            <View style={styles.profileBackground}>
              <Text style={styles.profileText}>Profile</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.container2}>
          <TouchableOpacity
            onPress={toggleVisibility}
            style={styles.iconContainer}
          >
            <Image
              source={
                isVisible
                  ? require("../../assets/images/visibility-on.png")
                  : require("../../assets/images/visibility-off.png")
              }
              style={isVisible ? styles.iconOn : styles.iconOff}
            />
          </TouchableOpacity>

          {isVisible ? (
            <>
              <View>
                <Text style={{ fontSize: 8 }}>Visibility</Text>
                <Text
                  style={{
                    fontSize: 8,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  ON
                </Text>
              </View>
            </>
          ) : (
            <>
              <View>
                <Text style={{ fontSize: 8 }}>Visibility</Text>
                <Text
                  style={{
                    fontSize: 8,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  OFF
                </Text>
              </View>
            </>
          )}

          <View style={styles.numberContainer}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <PieChart
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={sliceColor}
                coverRadius={0.7}
                coverFill={"#FFF"}
              />
              <View style={styles.textContainer}>
                <Text style={styles.centerText}>{value}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 8 }}>Match</Text>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainerMarker}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Image
                    source={require("../../assets/images/x.png")}
                    style={styles.closeButtonimg}
                  />
                </TouchableOpacity>
                <Text style={styles.modalText}>Change Match Percentage</Text>
                <Text style={styles.modalDescription}>
                  Change your match percentage to filter students who closely
                  meet your preferences.
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 3,
                    paddingHorizontal: 20,
                    marginVertical: 10,
                  }}
                >
                  <Text style={[styles.modalText, { marginBottom: 0 }]}>
                    {value}%
                  </Text>
                </View>
                <LinearGradient
                  colors={["#F3967D", "#B5DE9C"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientBackground}
                >
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    value={value}
                    onValueChange={(newValue) => handleProgress(newValue)}
                    thumbTintColor="#FFF"
                    minimumTrackTintColor="transparent"
                    maximumTrackTintColor="transparent"
                  />
                </LinearGradient>
                <Text style={styles.modalDescription}>
                  The higher the percentage, the stronger the match—but you'll
                  see fewer students on the map
                </Text>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  container2: {
    position: "absolute",
    top: 80,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    backgroundColor: "#fff9f9",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderColor: "#000",
    borderWidth: 1,
  },
  map: {
    width: 60,
    height: 60,
  },
  profileContainer: {
    position: "absolute",
    top: 80,
    left: 20,
    alignItems: "center",
    zIndex: 10,
  },
  profileWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 90,
    height: 90,
  },
  profileBackground: {
    position: "absolute",
    bottom: 15,
    left: 8,
    right: 0,
    backgroundColor: "#000",
    paddingVertical: 2,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    width: 74,
  },
  profileText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  iconContainer: {
    marginBottom: 10,
  },
  iconOn: {
    width: 40,
    height: 40,
  },
  iconOff: {
    width: 40,
    height: 40,
  },
  switchContainer: {
    alignItems: "center",
  },
  switchText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  numberContainer: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderColor: "#000",
    borderWidth: 3,
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
  },

  choiceBagde: {
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    marginVertical: 4,
  },

  modalContainerMarker: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "700",
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  modalDescription: {
    fontSize: 10,
    marginBottom: 2,
    textAlign: "center",
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerImage: {
    resizeMode: "contain",
    borderRadius: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonimg: {
    height: 10,
    width: 10,
  },
  acceptButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B5DE9C",
    marginHorizontal: 10,
  },
  declineButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D94A",
  },
  valueText: {
    fontSize: 18,
    marginBottom: 10,
  },
  gradientBackground: {
    width: 300,
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    marginVertical: 4,
    ...Platform.select({
      android: {
        width: 270,
        height: 20,
      },
    }),
  },
  slider: {
    width: "100%",
    height: 40,
  },
});

export default Home;
