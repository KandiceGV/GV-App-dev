import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { WebView } from "react-native-webview";
import { Button, Card, Layout, Modal, Text, Icon } from "@ui-kitten/components";
import {
  heightToDP as hp,
  widthToDP as wp,
} from "react-native-responsive-screens";
import { useEffect, useRef, useState } from "react";
import { PermissionsAndroid } from "react-native";
import WifiManager from "@react-native-tethering/wifi";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import GVCarousel from "./components/carousel";
// First, set the handler that will cause the notification
// to show the alert

export default function HomePage(props) {
  const [uri, setUri] = useState("");
  const [visible, setVisible] = useState(false);
  const [gameURLs, setGameURLS] = useState([
    {
      image:
        "https://www.goldvalley.com/wp-content/uploads/2023/03/safari-e1679656885544-150x150.png",
      uri: "https://www.safaribet.co.za",
    },
    {
      image:
        "https://www.goldvalley.com/wp-content/uploads/2023/05/gvchip-150x150.png",
      uri: "https://goldvalley.co.za/",
    },
    {
      image:
        "https://www.goldvalley.com/wp-content/uploads/2023/03/palms-e1679656814524-150x150.png",
      uri: "https://www.gvsolution.net/",
    },
    {
      image:
        "https://www.goldvalley.com/wp-content/uploads/2023/03/gvlive-e1679656852647-150x150.png",
      uri: "https://gvlive.co.za/",
    },
    {
      image:
        "https://www.goldvalley.com/wp-content/uploads/2023/03/zonke-e1679656911820-150x150.png",
      uri: "https://zonkebets.co.za/",
    },
    {
      image:
        "https://www.goldvalley.com/wp-content/uploads/2023/03/moon-150x150.png",
      uri: "https://www.moonbet.co.za/",
    },
  ]);

  const [WifiVisible, setWifiVisible] = useState(false);
  const [phoneIP, setPhoneIP] = useState("");
  const [routerMac, setRouterMac] = useState("");
  const [hostName, setHostName] = useState("");
  const [WifiConnected, setWifiConnected] = useState(false);
  const [wifilist, setWifiList] = useState([]);


  // Navigates user to Notifications page
  function nav() {
    props.navigation.navigate("Notifications");
  }

  //Function to toggle a webview popup
  function TogglePopup(url) {
    setVisible(true);
    setUri(url);
  }

  //The Login Link for GV Hotspot
  const [loginLink, setLoginLink] = useState(`https://os.gvhotspot.com/login?
    identity=1C-66-88-BE-36-40&
    hostname=10.200.0.1&
    server-name=server1&
    interface-name=br-lan&
    login-by=&mac=18:31:bf:97:19:52&
    ip=10.200.34.185&username=&
    link-login=radiusauth&
    link-orig=www.gstatic.com&error=&
    chap-id=&chap-challenge=&
    link-login-only=https://ap.wifihotspot.io/linkloginonly&
    link-orig-esc=&
    mac-esc=&link-logout=http://1.0.0.0/logoff`);
//Toggles the Wifi Manager
  async function ToggleWifi() {
    let isWifiOn = await WifiManager.isWifiEnabled();
    let isWifiConnected = await WifiManager.isDeviceAlreadyConnected();
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location permission is required for WiFi connections",
        message:
          "This app needs location permission as this is required  " +
          "to scan for wifi networks.",
        buttonNegative: "DENY",
        buttonPositive: "ALLOW",
      }
    );
      //If Permissions is granted
    if (granted) {
 


      if (isWifiOn) {
        //Check if the Wi-Fi is on
        if (!isWifiConnected) {
          //Not Connected
          let hello = await WifiManager.getWifiNetworks().then((network) => {
            network.forEach((net) => {
        
            });
          });

        } else {
          //Connected

          //Automated Scanning and connection to GV Hotspot

          //1. Scan for Networks and Check if GV Hotspot is part of the list
          await WifiManager.getWifiNetworks().then((network) => {
            let gvhotspothere;
            network.forEach((net) => {
          
              if(net.ssid === "vdSteenhoven"){
                WifiManager.connectToNetwork({
                    ssid: net.ssid,
                    isHidden:false,
                    password: "SkinkiKoffie@54",
                    timeout:2000
                }).then(result=>{
               
                })
              }
            });
          });
          //2. If GV Hotspot is part of the list then do 2 things
          //2.A. Send a Notification to the user that they can connect to GV Hotspot
          //2.B. Connect Automatically to the GV Hotspot
       
       
        }
      }
    } else {
      // Permission denied
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignSelf: "center",
        justifyContent: "center",
    
      }}
    >
      <Image
        source={require("../assets/damask_background.png")}
        resizeMode="stretch"
        style={{
          width: wp(100),
          height: hp(93),
          borderWidth: 0,
          position: "absolute",
          left: 0,
        }}
      />
    
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
        <GVCarousel />
          <TouchableOpacity
            onPress={() => TogglePopup("https://www.goldvalley.com")}
          >
            <Image
              source={require("../assets/goldvalley_com_button.png")}
              resizeMode="contain"
              style={{
                width: wp(70),
                height: hp(10),
                marginHorizontal: wp(15),
                borderColor: "#ffffff",
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => TogglePopup("https://goldvalley.co.za/register")}
          >
            <Image
              source={require("../assets/gv_live_org_button.png")}
              resizeMode="contain"
              style={{
                width: wp(70),
                height: hp(10),
                marginHorizontal: wp(15),
                borderColor: "#ffffff",
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              ToggleWifi(
                "https://os.gvhotspot.com/login?identity=1C-66-88-BE-36-28&hostname=10.200.0.1&server-name=server1&interface-name=br-lan&login-by=&mac=18:31:bf:97:19:52&ip=10.200.34.185&username=&link-login=radiusauth&link-orig=www.msftconnecttest.com&error=&chap-id=&chap-challenge=&link-login-only=https://ap.wifihotspot.io/linkloginonly&link-orig-esc=&mac-esc=&link-logout=http://1.0.0.0/logoff"
              )
            }
          >
            <Image
              source={require("../assets/Wifi.png")}
              resizeMode="contain"
              style={{
                width: wp(70),
                height: hp(10),
                marginHorizontal: wp(15),
                borderColor: "#ffffff",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => nav()}>
            <Image
              source={require("../assets/important_messages_button.png")}
              resizeMode="contain"
              style={{
                width: wp(70),
                height: hp(10),
                marginHorizontal: wp(15),
                borderColor: "#ffffff",
              }}
            />
          </TouchableOpacity>

       

          <Modal visible={visible}>
            <View
              style={{ width: wp(100), height: hp(90), borderColor: "#ffffff" }}
            >
              <Button
                style={{ alignSelf: "flex-end" }}
                onPress={() => setVisible(false)}
              >
                Close
              </Button>
              {visible ? (
                <WebView
                  source={{ uri: uri }}
                  style={{ width: wp(100), height: hp(85) }}
                />
              ) : null}
            </View>
          </Modal>
          <Modal visible={WifiVisible}>
            <View
              style={{ width: wp(100), height: hp(90), borderColor: "#ffffff" }}
            >
              <Button
                style={{ alignSelf: "flex-end" }}
                onPress={() => setWifiVisible(false)}
              >
                Close
              </Button>
              <Text>Wifi List</Text>
              <View>
                {wifilist.length > 0
                  ? wifilist.map((key, index) => {
                      return (
                        <View key={index}>
                          <Text>{key.SSID}</Text>
                          <Text>{key.frequency}</Text>
                        </View>
                      );
                    })
                  : null}
              </View>
            </View>
          </Modal>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            {gameURLs.map((key, index) => {
              return (
                <TouchableOpacity
                  style={{ borderColor: "#ffffff", padding: hp(2) }}
                  key={index}
                  onPress={() => TogglePopup(key.uri)}
                >
                  <Image
                    resizeMode="contain"
                    source={{ uri: key.image }}
                    style={{ width: wp(24), height: wp(24) }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
