import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput, Button, Card, Paragraph } from "react-native-paper";

const SectionInput = ({ onSectionSaved }) => {
  const [section, setSection] = useState("");
  const [storedSection, setStoredSection] = useState("");

  useEffect(() => {
    const getSection = async () => {
      const savedSection = await AsyncStorage.getItem("user_section");
      if (savedSection) {
        setStoredSection(savedSection);
      }
    };
    getSection();
  }, []);

  const saveSection = async () => {
    if (section) {
      await AsyncStorage.setItem("user_section", section);
      setStoredSection(section);
      onSectionSaved(section);
      alert("Section saved successfully!");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Card>
        <Card.Title title="Section Information" />
        <Card.Content>
          <Paragraph>
            Please enter your section below to receive updates.
          </Paragraph>
          <TextInput
            label="Section"
            mode="outlined"
            value={section}
            onChangeText={setSection}
            style={{ marginBottom: 10 }}
          />
          <Button mode="contained" onPress={saveSection}>
            Save Section
          </Button>
          {storedSection ? (
            <Text style={{ marginTop: 10 }}>
              Your saved section: {storedSection}
            </Text>
          ) : null}
        </Card.Content>
      </Card>
    </View>
  );
};

export default SectionInput;
