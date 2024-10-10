// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
// import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyBqh_newPcy7PSLDUQ4unXMH4K1tM_btvg",
//     authDomain: "note-48991.firebaseapp.com",
//     projectId: "note-48991",
//     storageBucket: "note-48991.appspot.com",
//     messagingSenderId: "65394640622",
//     appId: "1:65394640622:web:3ffdb0c028cd0ead7255ff"
// };

// // Firebase 초기화
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// async function loadNotes() {
//     const querySnapshot = await getDocs(collection(db, "note"));
//     const notesContainer = document.getElementById('notesContainer');

//     querySnapshot.forEach((doc) => {
//         const docId = doc.id;
//         const noteDiv = document.createElement('div');
//         noteDiv.innerHTML = `
//             <a href="detail.html?id=${docId}"><h3>${docId}</h3></a>
//         `;
//         notesContainer.appendChild(noteDiv);
//     });
// }

// loadNotes();    