import { StyleSheet,  View ,Image, TouchableOpacity} from 'react-native';
import {heightToDP as hp, widthToDP as wp } from 'react-native-responsive-screens'
export default function WelcomePage(props) {
    //Function to send user to the Homepage of the app
    function nav(){
        props.navigation.navigate("Home")
    }

  return (
  <View style={{flex:1}}>
        <Image source={require("../assets/damask_background.png")} resizeMode='cover' style={{width: wp(100), height: hp(100), position: 'absolute'}} />
    <Image source={require("../assets/welcome_title.png")} resizeMode='contain' style={{width: wp(70), height: hp(20),  marginHorizontal: wp(15),marginVertical: hp(5), borderColor: "#ffffff"}} />
    <Image source={require("../assets/gv_chip_large.png")} resizeMode='contain' style={{width: wp(70), height: hp(20),  marginHorizontal: wp(15),marginVertical: hp(5), borderColor: "#ffffff"}} />
    <TouchableOpacity onPress={()=>nav()} >
    <Image source={require("../assets/enter_button.png")} resizeMode='contain' style={{width: wp(70), height: hp(20),  marginHorizontal: wp(15),marginVertical: hp(5), borderColor: "#ffffff"}} />
  
    </TouchableOpacity>
    
  </View>
  );
}