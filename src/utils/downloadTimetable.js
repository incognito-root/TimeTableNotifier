import * as FileSystem from "expo-file-system";

export const downloadTimetable = async (section) => {
  const url = `https://lahore.comsats.edu.pk/student/20240902-8000-Classes.pdf`;
  const filePath = `${FileSystem.documentDirectory}timetable_${section}.pdf`;

  try {
    const res = await FileSystem.downloadAsync(url, filePath);
    console.log("File downloaded to:", res.uri);
    return res.uri;
  } catch (error) {
    console.error("Failed to download file:", error);
    return null;
  }
};
