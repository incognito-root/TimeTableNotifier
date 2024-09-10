import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  TextInput,
  Button,
  Card,
  Paragraph,
  HelperText,
} from "react-native-paper";

const SectionInput = ({ onSectionSaved }) => {
  const [section, setSection] = useState("");
  const [storedSection, setStoredSection] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const getSection = async () => {
      const savedSection = await AsyncStorage.getItem("user_section");
      if (savedSection) {
        setStoredSection(savedSection);
      }
    };
    getSection();
  }, []);

  const handleSectionChange = (text) => {
    setSection(text);
    const pattern = /^fa[0-9]{2}-[a-z]{3}-[a-z]$/i;
    setIsValid(pattern.test(text));
  };

  const saveSection = async () => {
    if (section && isValid) {
      await AsyncStorage.setItem("user_section", section);
      setStoredSection(section);
      onSectionSaved(section);
      alert("Section saved successfully!");
    } else {
      alert("Please enter a valid section format.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Card>
        <Card.Title title="Section Information" />
        <Card.Content>
          <Paragraph>
            Please enter section to receive updates.
          </Paragraph>
          <TextInput
            label="Section"
            mode="outlined"
            value={section}
            onChangeText={handleSectionChange}
            style={{ marginBottom: 10 }}
            error={!isValid && section.length > 0}
          />
          <HelperText type="error" visible={!isValid && section.length > 0}>
            format should be FA##-XXX-X (e.g., FA23-BCS-C)
          </HelperText>
          <Button
            mode="contained"
            onPress={saveSection}
            disabled={!isValid || section.length === 0}
          >
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
