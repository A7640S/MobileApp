import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ReportContext } from "../context/ReportContext";
import IncidentForm from "./newScreen/IncidentForm"; 
import { useNavigation } from '@react-navigation/native';
export default function App() {
  const { isSyncing, submitReport } = useContext(ReportContext);
  const navigation = useNavigation();
  const [report, setReport] = useState({
    title: "",
    description: "",
    lattitude: "",
    longitude: "",
    zone: "",
    photo: "",
    audio: "",
    video: "",
    etat: "declared",
  });

  const [showForm, setShowForm] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission refusée", "Vous devez accorder l'accès à la caméra pour utiliser cette fonctionnalité.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
    });

    if (!result.canceled && result.assets) {
      const imageUri = result.assets[0].uri;
      setReport((prevReport) => ({ ...prevReport, photo: imageUri }));
      console.log("Image URI capturée:", imageUri);

      navigation.navigate("IncidentForm", { report: { ...report, photo: imageUri } });
    }
  };

  useEffect(() => {
    pickImage(); 
  }, []); 

  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff6347" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
});
