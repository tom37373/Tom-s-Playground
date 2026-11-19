import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyArVpAjiMfgOjhqVSxZhr_C8EHHcxBowFg",
    authDomain: "tom-s-playground.firebaseapp.com",
    projectId: "tom-s-playground",
    storageBucket: "tom-s-playground.firebasestorage.app",
    messagingSenderId: "322136771656",
    appId: "1:322136771656:web:7a31ca9bfb562b40ea9c7d"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const notesRef = collection(db, "notes");

const docRefTitle = doc(db, "notes", "board-title");
const docSnapTitle = await getDoc(docRefTitle);

if (!docSnapTitle.exists()) {
    await setDoc(doc(notesRef, "board-title"), {
        elemt: "h3", "line number": "1", page: "Title"});
}

const docRefText = doc(db, "notes", "board-text-0");
const docSnapText = await getDoc(docRefText);

if (!docSnapText.exists()) {
    await setDoc(doc(notesRef, "board-text-0"), {
        elemt: "p", "line number": "2", page: "Insert Text"});
}
const docSnap = await getDoc(doc(db, "notes", "board-title"));
document.getElementById("board-title").textContent = docSnap.data().page;
console.log(docSnap.data().page);
const allParas = document.getElementsByTagName("p")



var i = 0;
while (localStorage.getItem("board-text-" + i)) {
    let elem = allParas[i]
    elem.textContent = localStorage.getItem("board-text-" + i);
    i++;
}

setInterval(function() {
    localStorage.setItem("board-title", document.getElementById("board-title").textContent);
    
    const allParas = document.getElementsByTagName("p")
    for (let i = 0; i < allParas.length; i++) {
        let elem = allParas[i]
        localStorage.setItem("board-text-" + i, elem.textContent);
    }

}, 1000)

