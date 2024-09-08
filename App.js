import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import SectionInput from "./src/components/SectionInput";
import { configureBackgroundFetch, checkTimetable } from "./src/backgroundTask";
import { initializeNotifications } from "./src/utils/notification";
import { Button } from "react-native-paper";

export default function App() {
  useEffect(() => {
    // initializeNotifications(); // Initialize notifications on app start
    configureBackgroundFetch(); // Configure background fetch on app start
  }, []);

  const handleManualCheck = async () => {
    await checkTimetable(); // Call the checkTimetable function manually
  };

  const handleSectionSaved = (section) => {
    console.log("Section saved:", section);
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
