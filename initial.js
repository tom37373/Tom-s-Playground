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

if (!(await getItem("board-title")).exists()) {
    await setDoc(doc(notesRef, "board-title"), {
        elemt: "h3", "line number": "1", page: "Title"});
}

if (!(await getItem("board-text-0")).exists()) {
    await setDoc(doc(notesRef, "board-text-0"), {
        elemt: "p", "line number": "2", page: "Insert Text"});
}

document.getElementById("board-title").textContent = (await getItem("board-title")).data().page;

const allParas = document.getElementsByTagName("p")

var i = 0;
while ((await getItem("board-text-" + i)).exists()) {
    let elem = allParas[i]
    elem.textContent = (await getItem("board-text-" + i)).data().page;
    i++;
}

setInterval(async function() {
    await setDoc(doc(notesRef, "board-title"), {
        elemt: "h3", "line number": "1", page: document.getElementById("board-title").textContent});

    const allParas = document.getElementsByTagName("p")
    for (let i = 0; i < allParas.length; i++) {
        let elem = allParas[i]
        await setDoc(doc(notesRef, "board-text-" + i), {
        elemt: "h3", "line number": "1", page: elem.textContent});
    }

}, 10000)

async function getItem(field) {
  const docRefText = doc(db, "notes", field);
  const docSnapText = await getDoc(docRefText);
  return docSnapText;
}