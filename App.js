import React, { useState, Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/HomePage';
import Login from './src/screens/LoginScreen';
import Static from './src/screens/StaticScreen';
import Res from './src/screens/ResScreen';
import { decode, encode } from 'base-64';
import { firebaseApp } from './src/components/FirebaseConfig'



if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


const Stack = createStackNavigator();

class App extends Component {
  // const [loading, setLoading] = useState(true)
  // const [user, setUser] = useState(null)
  // if (loading) {
  //   return (
  //     <></>
  //   )
  // }
  // useEffect(() => {
  //   const usersRef = firebaseApp.firestore().collection('users');
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       usersRef
  //         .doc(user.uid)
  //         .get()
  //         .then((document) => {
  //           const userData = document.data()
  //           setLoading(false)
  //           setUser(userData)
  //         })
  //         .catch((error) => {
  //           setLoading(false)
  //         });
  //     } else {
  //       setLoading(false)
  //     }
  //   });
  // }, []);
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{
            headerShown: false
          }} />
          <Stack.Screen name="Home" component={Home} options={{
            headerShown: false, // change this to `false`
          }} />
          <Stack.Screen name="Static" component={Static} options={{
            headerShown: false, // change this to `false`
          }} />
          <Stack.Screen name="Res" component={Res} options={{
            headerShown: false, // change this to `false`
          }} />

        </Stack.Navigator>
      </NavigationContainer>
    );

  }
}
export default App;

