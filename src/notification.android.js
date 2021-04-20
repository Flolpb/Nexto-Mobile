import PushNotification from 'react-native-push-notification';

const showNotification = (message) => {
    PushNotification.localNotification({
        channelId: "localId",
        title: 'Nexto',
        message: message,
        soundName: "default",
    });
    console.log("Envoi d'une notification: " + message)
};

const delayedMessageNotification = (message, contact) => {
    if(message.length >= 15){
        message = message.slice(0, 15);
        message += "..."
    }
    PushNotification.localNotification({
        channelId: "localId",
        title: 'Nexto',
        message: "Envoi de : " + message + " au " + contact,
        soundName: "default",
    });
};


const handleScheduleNotification = (message) => {
    PushNotification.localNotificationSchedule({
        channelId: "localId",
        bigText: message,
        title: "Nexto",
        message: message,
        playSound: true,
        soundName: "default",
        vibrate: true,
        vibration: 300,
        date: new Date(Date.now() + 3 * 1000)
    });
};


export {showNotification, handleScheduleNotification, delayedMessageNotification};
