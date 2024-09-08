import * as FileSystem from "expo-file-system";
import CryptoJS from "crypto-js";

export const getFileHash = async (filePath) => {
  try {
    const fileData = await FileSystem.readAsStringAsync(filePath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const hash = CryptoJS.SHA256(fileData).toString();
    return hash;
  } catch (error) {
    console.error("Error reading file for hash:", error);
    return null;
  }
};

export const compareTimetables = async (oldPath, newPath) => {
  try {
    const oldHash = await getFileHash(oldPath);
    const newHash = await getFileHash(newPath);

    if (oldHash && newHash) {
      return oldHash !== newHash;
    } else {
      console.error("Failed to calculate hashes.");
      return false;
    }
  } catch (error) {
    console.error("Error comparing timetables:", error);
    return false;
  }
};
