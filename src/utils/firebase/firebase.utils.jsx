import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection, writeBatch          //for uploading data on firebase
} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyD7K2hefracjjCRkcgA8ujIfNnv1hRq6A8",
  authDomain: "crown2-5802e.firebaseapp.com",
  projectId: "crown2-5802e",
  storageBucket: "crown2-5802e.firebasestorage.app",
  messagingSenderId: "284254315429",
  appId: "1:284254315429:web:83ccdf8d89703345e13e4c"
};




// Initialize Firebasee
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);
    
    objectsToAdd.forEach((object) => { // see end
        const docRef = doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object);
    });
    await batch.commit();  // <-- this actually saves to Firestore
     console.log("Batch committed ✅");
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if(!userAuth) return;
    const userDocRef = doc(db,'users',userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }catch(error){
            console.log('error creating the user',error.message);
        }
    }
    return userDocRef;  
};

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth,callback);


// {
//   next: callback,
//   error: errorCallback,
//   complete: completedCallback
// }


	// •	doc() → creates a reference to a specific document in the collection.
	// •	collectionRef → /categories (if that’s your key).
	// •	object.title.toLowerCase() → becomes the document’s ID.
	// •	If title = "Hats", ID = "hats".
	// •	Path becomes /categories/hats.