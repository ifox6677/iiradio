import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

let currentNotificationId = null; // Store the current notification ID

// Configure notification handling
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Function to send or update the "Now Playing" notification
const sendNowPlayingNotification = async (stationName, stopPlayback) => {
  // Cancel the previous notification if it exists
  if (currentNotificationId) {
    await Notifications.dismissNotificationAsync(currentNotificationId);
  }

  // Schedule the new notification
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: '正在播放：',
      body: `${stationName}`,
      data: { action: 'stop' },
      sound: false,
    },
    trigger: null,
  });

  // Update the stored notification ID
  currentNotificationId = identifier;

  // Listen for notification interactions
  Notifications.addNotificationResponseReceivedListener((response) => {
    const action = response.notification.request.content.data.action;
    if (action === 'stop') {
      stopPlayback();
    }
  });

  return identifier;
};

// Function to cancel all notifications
const cancelAllNotifications = async () => {
  if (currentNotificationId) {
    await Notifications.dismissNotificationAsync(currentNotificationId);
    currentNotificationId = null;
  }
};

export { sendNowPlayingNotification, cancelAllNotifications };
