import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, doc, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBqh_newPcy7PSLDUQ4unXMH4K1tM_btvg",
    authDomain: "note-48991.firebaseapp.com",
    projectId: "note-48991",
    storageBucket: "note-48991.appspot.com",
    messagingSenderId: "65394640622",
    appId: "1:65394640622:web:3ffdb0c028cd0ead7255ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// -------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('saveButton');
  const noteTitleInput = document.getElementById('noteTitle');
  const textareaInput = document.getElementById('textarea');

  saveButton.addEventListener('click', async () => {
    const title = noteTitleInput.value.trim(); // 문서의 ID로 사용할 값
    const content = textareaInput.value.trim(); // 문서의 필드 값
    // 오늘 날짜를 YYYY-MM-DD 형식으로 얻기
    const today = new Date();
    const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    try {
      // Firestore에 'note' 컬렉션으로 데이터 저장
      await setDoc(doc(db, 'note', title), {
        [dateKey]: content
      });
      
      alert('노트가 성공적으로 저장되었습니다.');
      
    } catch (error) {
        console.error('Firestore에 데이터 저장 중 오류 발생:', error);
        alert('데이터 저장 중 오류가 발생했습니다.');
    }

    // 입력값 초기화
    noteTitleInput.value = '';
    textareaInput.value = '';
  });
});