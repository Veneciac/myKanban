import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyAMO6oC-kPxvHCu5RHfavg6z5veMo7glEo',
  authDomain: 'vunban.firebaseapp.com',
  databaseURL: 'https://vunban.firebaseio.com',
  projectId: 'vunban',
  storageBucket: 'vunban.appspot.com',
  messagingSenderId: '612863274244'
}

firebase.initializeApp(config)
var db = firebase.firestore()

export default db
