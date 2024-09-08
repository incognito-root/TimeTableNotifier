import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";

export const initializeNotifications = () => {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log("Notification received:", notification);
    },

    // requestPermissions: Platform.OS === "ios",
  });

  if (Platform.OS === "android") {
    PushNotification.createChannel(
      {
        channelId: "timetable-updates",
        channelName: "Timetable Updates",
        importance: 4,
      },
      (created) => console.log(`CreateChannel returned '${created}'`)
    );
  }
};

export const sendNotification = () => {
  PushNotification.localNotification({
    channelId: "timetable-updates",
    title: "Timetable Updated",
    message: "A new timetable has been uploaded.",
  });
};
