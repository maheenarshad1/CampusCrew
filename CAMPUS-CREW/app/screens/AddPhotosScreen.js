import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Routes from "../../utils/Routes";
import { navigate } from "../../helpers/router";

export default function AddPhotosScreen() {
  const navigation = useNavigation();

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;
      setImages((prevImages) => [...prevImages, newImageUri]);
      setSelectedImage(newImageUri);
    }
  };

  const handleSelectImage = (uri) => {
    setSelectedImage(uri);
  };

  const saveImage = async () => {
    if (selectedImage) {
      try {
        const filename = selectedImage.split("/").pop();
        const newPath = `${FileSystem.documentDirectory}${filename}`;
        await FileSystem.copyAsync({
          from: selectedImage,
          to: newPath,
        });
        alert("Image saved successfully!");
      } catch (error) {
        console.error("Error saving image:", error);
      }
    } else {
      alert("No image selected");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../../assets/images/cancel.png")}
            style={styles.backArrow}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.username}>Add Photos</Text>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigate(Routes.ProfileScreen, { selectedImage })}
        >
          <Text style={{ color: "white" }}>Next</Text>
          <Image
            source={require("../../assets/images/next-arrow.png")}
            style={styles.nextArrow}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.userImage} />
        ) : (
          <Image
            source={require("../../assets/images/Rectangle17.png")}
            style={styles.userImage}
          />
        )}
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 25,
        }}
      >
        <Text style={styles.title}>Add from Gallery</Text>
        <View>
          <FlatList
            data={images}
            keyExtractor={(item) => item}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectImage(item)}>
                <Image source={{ uri: item }} style={styles.imageThumbnail} />
              </TouchableOpacity>
            )}
            ListHeaderComponent={
              <>
                <TouchableOpacity onPress={pickImage}>
                  <Image
                    source={require("../../assets/images/camera.png")}
                    style={styles.gallery}
                  />
                </TouchableOpacity>
                {selectedImage && (
                  <View style={styles.selectedContainer}>
                    <Text>Selected Image</Text>
                    <Image
                      source={{ uri: selectedImage }}
                      style={styles.selectedImage}
                    />
                    <Button title="Save Selected Image" onPress={saveImage} />
                  </View>
                )}
              </>
            }
            contentContainerStyle={styles.gallery}
          />
        </View>
      </View>

      <Image
        source={require("../../assets/images/galleryImage.png")}
        style={styles.imageThumbnail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  imageThumbnail: {
    width: 348,
    height: 400,
    resizeMode: "cover",
    ...Platform.select({
      ios: {
        width: 400,
        height: 450,
      },
    }),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 33,
    paddingHorizontal: 5,
    paddingBottom: 5,
    height: 75,
  },
  nextButton: {
    marginRight: 10,
    tintColor: "white",
    display: "flex",
    flexDirection: "row",
  },
  backButton: {
    marginRight: 10,
  },
  username: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  backArrow: {
    width: 13,
    height: 17,
    alignItems: "center",
  },
  nextArrow: {
    width: 12,
    height: 19,
    marginLeft: 3,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 210,
    marginTop: 25,
    resizeMode: "cover",
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  gallery: {
    width: 28,
    height: 26,
  },

  selectedContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});
