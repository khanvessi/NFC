import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission(){
    const authStatus = await messaging().requestPermission();

    const enabled = 
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if(enabled){
            console.log('Authorization status: ', authStatus);
            getFCMToken();
        }
}

async function getFCMToken(){
    let fcmToken = await AsyncStorage.getItem("fcmtoken");
    console.log(fcmToken, "old token");
    if(!fcmToken){

        try {
            const fcmToken = await messaging().getToken();
            if(fcmToken){
                console.log(fcmToken, "new token");
                await AsyncStorage.setItem("fcmtoken", fcmToken);
            }
        } catch (error) {
            console.log(error, "error in fcmToken!");
            
        }

    }

}