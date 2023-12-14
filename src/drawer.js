import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './home';
import { TouchableOpacity,Image,Linking } from 'react-native';
import { widthToDP as wp, heightToDP as hp } from 'react-native-responsive-screens';
import { StatusBar } from 'expo-status-bar';
import { WebView } from "react-native-webview";

//Creates the drawer navigator
const Drawer = createDrawerNavigator();

//We have a custom drawer, this is it.
function CustomDrawer(props){
    return(
      <View style={{width: "100%", height: "100%", backgroundColor: "#044b7b"}}>
          <Image
        source={require("../assets/BG.jpeg")}
        resizeMode="cover"
        style={{
          width: "100%",
          height: hp(100),
          borderWidth: 0,
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "rgba(255,255,255,0.2)"
        }}
      />
        <DrawerContentScrollView style={{borderRightWidth:0, borderColor: "#ffffff"}} {...props} >
        <TouchableOpacity
            onPress={() =>
        props.navigation.navigate('Home')
            }
          >
            <View style={{flexDirection:'row',width: "100%", height: hp(10)}}>
            <Image
           source={require("../assets/gv_chip_large.png")}
              resizeMode="contain" 
              style={{
                width: wp(18),
                height: hp(10),

              }}
            />
               <Image
           source={require("../assets/Home.png")}
              resizeMode="contain" 
              style={{
                width: wp(40),
                height: hp(10),
                marginLeft: wp(4)
              }}
            />
        
            </View>
          </TouchableOpacity>
        
        <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Support')
            }
          >
            <Image
              source={require("../assets/support_button.png")}
              resizeMode="contain" 
              style={{
                width: "100%",
                height: hp(10),
                borderColor: "#ffffff",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
        Linking.openURL("https://www.goldvalley.com/support-faqs/")
            }
          >
            <Image
              source={require("../assets/privacy_policy_button.png")}
              resizeMode="contain" 
              style={{
                width: "100%",
                height: hp(10),
                borderColor: "#ffffff",
              }}
            />
          </TouchableOpacity>
          </DrawerContentScrollView>
      </View>
      
   )
}
//This is our custom left header
function CustomLeftHeader({props,navigation}){

return(
  <TouchableOpacity
    style={{marginHorizontal: wp(2.5)}}
    onPress={() =>navigation.openDrawer()
    }
  >
    <Image
      source={require("../assets/hamburger_menu.png")}
      resizeMode="contain"
      style={{
        width: hp(7),
        height: hp(7),
      }}
    />
  </TouchableOpacity>
)
}

export default function DrawerScreens() {
  return (
   <View style={{flex:1}}>
    <StatusBar animated={false} backgroundColor='#ffffff' hidden={true} hideTransitionAnimation='slide' />
    <Drawer.Navigator
      screenOptions={({navigation,route})=>({headerLeft: (props)=> <CustomLeftHeader props={props} navigation={navigation} />, headerBackground: (props)=>  <Image
      source={require("../assets/damask_background.png")}
      resizeMode="cover"
      style={[props.style,{
        width: "100%",
        height: "100%",
        borderWidth: 0,
        left: 0,
        opacity: 0.2
      }]}
    />})}
      detachInactiveScreens={true}
    backBehavior='initialRoute'
  drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Support">{(props)=>{
          return(  <View
            style={{
              flex: 1,
              alignSelf: "center",
              justifyContent: "center",
          
            }}
          >
              <WebView
                  source={{ uri: "https://tawk.to/chat/650bfac6b1aaa13b7a781062/1harcn6sf" }}
                  style={{ width: wp(100), height: hp(85) }}
                />
          </View>)
        }}</Drawer.Screen>
      </Drawer.Navigator>
 
   </View>
  );
}