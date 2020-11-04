import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA64ArfebkcFZpmCHfVGweBMx_2ewlm9uE",
    authDomain: "demorn-975d4.firebaseapp.com",
    databaseURL: "https://demorn-975d4.firebaseio.com",
    projectId: "demorn-975d4",
    storageBucket: "demorn-975d4.appspot.com",
    messagingSenderId: "944882709293",
    appId: "1:944882709293:web:c417bbde5163be033259a4",
    measurementId: "G-24P3NEHT78"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);