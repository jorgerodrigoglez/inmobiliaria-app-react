import app from 'firebase/app';
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
        app.initializeApp(config).firestore();
        this.db = app.firestore();
        this.auth = app.auth();
        this.storage = app.storage();

        this.storage.ref().constructor.prototype.guardarDocumentos = function(documentos){
            var ref = this;
            return Promise.all(documentos.map(function(file){
                return ref.child(file.alias).put(file).then(snapshot=>{
                    return ref.child(file.alias).getDownloadURL();
                })
            }))
        }
    }
    // de app.js
    estaIniciado(){
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    guardarDocumento = (nombreDocumento, documento) => this.storage.ref().child(nombreDocumento).put(documento);
    
    devolverDocumento = (documentoUrl) => this.storage.ref().child(documentoUrl).getDownloadURL();

    guardarDocumentos = (documentos) => this.storage.ref().guardarDocumentos(documentos);
}


export default Firebase;