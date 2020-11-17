import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCNwBkU6qvkV_x44j8c0sX6_3wNGBCE5X0",
    authDomain: "inmobiliaria-app-62883.firebaseapp.com",
    databaseURL: "https://inmobiliaria-app-62883.firebaseio.com",
    projectId: "inmobiliaria-app-62883",
    storageBucket: "inmobiliaria-app-62883.appspot.com",
    messagingSenderId: "608878010172",
    appId: "1:608878010172:web:823a77d71f445961edc839",
    measurementId: "G-VSX4E62B71"
  };

class Firebase {
    constructor(){
        firebase.initializeApp(config).firestore();
        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.storage = firebase.storage();
    }
    estaIniciado(){
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }
    guardarDocumento = (nombreDocumento, documento) => this.storage.ref().child(nombreDocumento).out(documento);
    devolverDocumento = (documentoUrl) => this.storage.ref().child(documentoUrl).getDownloadURL();
}


export default Firebase;