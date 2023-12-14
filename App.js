import { LogBox, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import WelcomePage from "./src/welcome";
import { NavigationContainer } from "@react-navigation/native";
import NotificationsPage from "./src/Notifications";
import "expo-dev-client";
import DrawerScreens from "./src/drawer";
import { useEffect , useRef, useState} from "react";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'

  //Connect to Firebase, API is exposed but not accessible on a mobile device. 
  const firebaseApp = firebase.initializeApp({
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID
  });
  

//When app is closed we run a Notfication Handler to handle background notifications
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  schedulePushNotification(remoteMessage)
});
//Get a Firebase Cloud Messaging Token
messaging().getToken().then(token=>{
  console.log("TOKEN")
  console.log(token)
  console.log("TOKEN")
})

//In App Notification Handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


//Creates the Stack Navigator for Navigating between screens
const Stack = createStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyCDqHw2PFzgY47fagnrFD6YIsm5LCR5jAo",
  authDomain: "gold-valley-cf4cc.firebaseapp.com",
  databaseURL: "https://gold-valley-cf4cc.firebaseio.com",
  projectId: "gold-valley-cf4cc",
  storageBucket: "gold-valley-cf4cc.appspot.com",
  messagingSenderId: "1006010084073",
  appId: "1:1006010084073:web:c48249a4c139cbcbf45e78",
  measurementId: "G-14RRWKM2YB"
};


//Add in error handling for Log Boxes. Some third party libraries provide a depreciated error(not breaking the app), this error can be ignored.
LogBox.ignoreAllLogs(true);



export default function App() {
  //Expo Push Notifications Token State
  const [expoPushToken, setExpoPushToken] = useState('');
  //Notification State Boolean
  const [notification, setNotification] = useState(false);
  //Reference to the Notification Listener
  const notificationListener = useRef();
    //Reference to the Response Listener
  const responseListener = useRef();

    //Request Notification permission for the user
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  //Use a Continuous loop effect to always keep the ExpoPushToken updated and also make sure permission is given.
  useEffect(() => {
    let token;
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token)
      token= token
      console.log(token)
    });
setExpoPushToken(token)
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    requestUserPermission()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage)
      schedulePushNotification(remoteMessage)
    });

 
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      unsubscribe
    };
  }, []);



  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <NavigationContainer>
        <Stack.Navigator
          detachInactiveScreens={true}
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomePage} />
          <Stack.Screen name="Home" component={DrawerScreens} />
          <Stack.Screen name="Notifications" component={NotificationsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
//Schedules a Push Notification
async function schedulePushNotification(message) {
  console.log("message")
  console.log(message.notification)
  console.log("message")
  await Notifications.scheduleNotificationAsync({
    content: {
      title: message.notification.title,
      body: message.notification.body,
      data: message.data,
    },
    trigger: { seconds: 2 },
  });
}
//Registers for Push Notifications
async function registerForPushNotificationsAsync() {
  let token;

  //If it is on an android
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  //If it is a devices
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    //If We already have Notification Permission
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
     //If We already have Notification Permission
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    //Get The Expo Push Token
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
