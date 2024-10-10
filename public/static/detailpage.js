import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBqh_newPcy7PSLDUQ4unXMH4K1tM_btvg",
    authDomain: "note-48991.firebaseapp.com",
    projectId: "note-48991",
    storageBucket: "note-48991.appspot.com",
    messagingSenderId: "65394640622",
    appId: "1:65394640622:web:3ffdb0c028cd0ead7255ff"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get('id');

async function loadNote() {
  if (docId) {
    const docRef = doc(db, "note", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const noteData = docSnap.data();
      const fields = Object.keys(noteData);
      const field = fields[0]; // 첫 번째 필드
      const fieldContent = noteData[field];

      // 문서 제목 및 내용 표시
      document.getElementById('noteTitle').textContent = docId;
      document.getElementById('noteContent').innerHTML = `${fieldContent} (${field})`;
    } else {
      document.getElementById('noteTitle').textContent = '문서를 찾을 수 없습니다.';
      document.getElementById('noteContent').textContent = '';
    }
  }
}

loadNote();
