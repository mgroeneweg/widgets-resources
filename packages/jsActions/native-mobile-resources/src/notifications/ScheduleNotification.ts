// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import { NativeModules } from "react-native";
import ReactNativeFirebase from "react-native-firebase";

type RepeatInterval = "minute" | "hour" | "day" | "week";

/**
 * Displays the specified notification at a future moment in time.
 *
 * Note: It is not possible to display a notification whilst the app is in the foreground on iOS 9.
 * @param {Date} date - This field is required.
 * @param {RepeatInterval} repeatInterval - Empty for no repeat.
 * @param {string} body - This field is required.
 * @param {string} title
 * @param {string} subtitle
 * @param {boolean} playSound
 * @param {string} notificationId - This ID can be used to cancel the scheduled notification later.
 * @param {string} actionName
 * @param {string} actionGuid
 * @returns {Promise.<void>}
 */
export async function ScheduleNotification(
    date?: Date,
    repeatInterval?: RepeatInterval,
    body?: string,
    title?: string,
    subtitle?: string,
    playSound?: boolean,
    notificationId?: string,
    actionName?: string,
    actionGuid?: string
): Promise<void> {
    // BEGIN USER CODE
    // Documentation https://rnfirebase.io/docs/v5.x.x/notifications/scheduling-notifications

    if (NativeModules && !NativeModules.RNFirebase) {
        return Promise.reject(new Error("Firebase module is not available in your app"));
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const firebase: typeof ReactNativeFirebase = require("react-native-firebase");

    if (!date) {
        return Promise.reject(new Error("Input parameter 'Date' is required"));
    }

    if (!body) {
        return Promise.reject(new Error("Input parameter 'Body' is required"));
    }

    const channel = new firebase.notifications.Android.Channel(
        "mendix-local-notifications",
        "Local notifications",
        firebase.notifications.Android.Importance.Default
    );
    await firebase.notifications().android.createChannel(channel);

    const notification = new firebase.notifications.Notification()
        .setBody(body)
        .android.setChannelId("mendix-local-notifications");

    if (title) {
        notification.setTitle(title);
    }

    if (subtitle) {
        notification.setSubtitle(subtitle);
    }

    if (playSound) {
        notification.setSound("default");
    }

    if (actionName || actionGuid) {
        notification.setData({
            actionName,
            guid: actionGuid
        });
    }

    if (notificationId) {
        notification.setNotificationId(notificationId);
    }

    const schedule: any = {
        fireDate: date.getTime()
    };

    if (repeatInterval) {
        schedule.repeatInterval = repeatInterval;
    }

    return firebase.notifications().scheduleNotification(notification, schedule);

    // END USER CODE
}
