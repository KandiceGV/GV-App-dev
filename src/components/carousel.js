import * as React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    Image, LogBox, TouchableOpacity, Linking,
} from 'react-native';
import { heightToDP as hp, widthToDP as wp } from 'react-native-responsive-screens';

import Carousel from 'react-native-snap-carousel';
import firebase from '@react-native-firebase/firestore'
export default class GVCarousel extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            carouselItems: [
                {

                    imageUrl: "https://www.goldvalley.com/wp-content/uploads/2023/06/Club-Tropicana-640x550.jpg",
                    externalUrl: ""
                },


            ]
        }
    }

    _renderItem({ item, index }) {
        return (
            <TouchableOpacity key={index} onPress={()=>Linking.openURL(item.externalUrl)} style={{
                backgroundColor: index == 0 ? '#71a81f' : index == 1 ? '#044b7b' : '#4e9fba',
                borderRadius: 5,
                height: hp(20),
                marginVertical: hp(1),
                marginHorizontal: wp(1)
            }}
            >
                <Image source={{ uri: item.imageUrl }} style={{ width: "100%", height: "100%", position: 'absolute', zIndex: -1, left: 0, top: 0 }} resizeMode='stretch' />

            </TouchableOpacity>

        )
    }


    componentDidMount() {
        console.log("mounted")
        const firestores = firebase().app.firestore()
        let docstoadd = []
     
        firebase().collection("banners").onSnapshot({
            complete: documents => {
                let docstoadd = []
                documents.forEach(document => {
                    console.log(document.data())
                    docstoadd.push({
                        id: document.id,
                        ...document.data()
                    })
                })
                this.setState({ carouselItems: docstoadd })
                this.forceUpdate()
            },
            next: documents => {
                let docstoadd = []
                documents.forEach(document => {
                    console.log(document.data())
                    docstoadd.push({
                        id: document.id,
                        ...document.data()
                    })
                })
                this.setState({ carouselItems: docstoadd })
                this.forceUpdate()
            },error: error=>console.log(error)
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                    <Image source={{ uri: "https://media.gettyimages.com/id/1270422647/photo/gold-fluid-melting-waves-flowing-liquid-motion-abstract-background.jpg?s=1024x1024&w=gi&k=20&c=8qk9dwmGNoSOgzUrwYufAVKyerhiHvty6tfQPk675Jo=" }} resizeMode='stretch' style={{ width: wp(100), height: "100%", borderWidth: 0, position: 'absolute', top: 0, left: 0 }} />

                    <Carousel
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={this.state.carouselItems}
                        sliderWidth={wp(100)}
                        itemWidth={wp(98)}
                        renderItem={this._renderItem}
                        onSnapToItem={index => this.setState({ activeIndex: index })}
                        autoplay={true}
                        autoplayInterval={3500}
                        automaticallyAdjustContentInsets={true}
                        automaticallyAdjustsScrollIndicatorInsets={true}
                        sliderHeight={hp(25)}
                        itemHeight={hp(20)}
                        enableMomentum={false}
                        lockScrollWhileSnapping={true}
                        loop={true}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

