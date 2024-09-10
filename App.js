import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import SectionInput from "./src/components/SectionInput";
import { initializeNotifications } from "./src/utils/notification";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function App() {
  const [section, setSection] = React.useState("");
  const apiUrl = "http://10.0.2.2:8000/api";

  useEffect(() => {
    // initializeNotifications();
  }, []);

  const handleManualCheck = async () => {
    try {
      const response = await fetch(`${apiUrl}/check-timetable/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section: section,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Timetable Check",
          text2: result.message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: result.message || "Failed to update timetable.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: "Unable to reach the server.",
      });
    }
  };

  const handleSectionSaved = (savedSection) => {
    setSection(savedSection);
    console.log("Section saved:", savedSection);
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 300 }}>
        <SectionInput onSectionSaved={handleSectionSaved} />
      </View>
      <Button
        mode="contained"
        onPress={handleManualCheck}
        style={{ marginTop: 20, paddingVertical: 0 }}
        contentStyle={{ paddingHorizontal: 60 }}
      >
        Check Timetable Now
      </Button>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
