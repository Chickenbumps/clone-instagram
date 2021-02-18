import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export default function AddPage(props) {
  const [cameraHasPermission, setCameraHasPermission] = useState(null);
  const [galleryHasPermission, setGalleryHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setCameraHasPermission(cameraStatus.status === "granted");
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryHasPermission(galleryStatus.status === "granted");
    })();
  }, []);

  if (cameraHasPermission === null || galleryHasPermission === null) {
    return <View />;
  }
  if (cameraHasPermission === false || galleryHasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <Button
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />
      <Button title="Take a Pircture" onPress={takePicture} />
      <Button title="Pick Image from Gallery" onPress={pickImage} />
      <Button
        title="Save Iamge"
        onPress={() => props.navigation.navigate("Save", { image })}
      />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
