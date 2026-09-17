import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { toast } from 'react-toastify';

const firebaseConfig = {
	apiKey: 'AIzaSyDe62abYFVfeizMvMcdOosXRkYdZa8zBss',
	authDomain: 'netflix-clone-296d7.firebaseapp.com',
	projectId: 'netflix-clone-296d7',
	storageBucket: 'netflix-clone-296d7.firebasestorage.app',
	messagingSenderId: '614109846435',
	appId: '1:614109846435:web:ed83a810be8f91d6d31816',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signup = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await addDoc(collection(db, 'user'), {
			uid: user.uid,
			name,
			authProvider: 'local',
			email,
		});
	} catch (error) {
		console.log(error);
		toast.error(error.code.split('/')[1].split('-').join(' '));
	}
};

export const login = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.log(error);
		toast.error(error.code.split('/')[1].split('-').join(' '));
	}
};

export const logout = () => {
	signOut(auth);
};
