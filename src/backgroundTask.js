import BackgroundFetch from "react-native-background-fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { downloadTimetable } from "./utils/downloadTimetable";
import { compareTimetables } from "./utils/hashUtils";
import { sendNotification } from "./utils/notification";

export const checkTimetable = async () => {
  try {
    const section = await AsyncStorage.getItem("user_section");
    if (!section) {
      console.error("No section found in AsyncStorage.");
      return;
    }

    const oldPath = `${FileSystem.documentDirectory}timetable_${section}.pdf`;
    const newPath = await downloadTimetable(section);

    if (newPath && (await compareTimetables(oldPath, newPath))) {
      // notification will be sent here that new time table is added
      // sendNotification();
    }

    // sendNotification();
  } catch (error) {
    console.error("Timetable check failed:", error);
  }
};

export const configureBackgroundFetch = () => {
  BackgroundFetch.configure(
    { minimumFetchInterval: 15 }, // Check every 15 minutes
    async () => {
      await checkTimetable();
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    },
    (error) => {
      console.error("Background fetch configuration failed:", error);
    }
  );
};
