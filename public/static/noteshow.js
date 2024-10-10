// // Firestore에서 모든 문서의 데이터 읽기
// document.addEventListener('DOMContentLoaded', async () => {
//     const notesContainer = document.getElementById('notesContainer');
    
//     if (!notesContainer) {
//         console.error('notesContainer 요소를 찾을 수 없습니다.');
//         return; // 함수를 종료하여 이후 코드가 실행되지 않도록 함
//     }

//     try {
//         // Firestore 인스턴스 가져오기
//         const db = firebase.firestore();

//         // 'note' 컬렉션에서 모든 문서 가져오기
//         const querySnapshot = await db.collection('note').get();

//         // 로딩 중 텍스트 제거
//         notesContainer.innerHTML = '';

//         if (!querySnapshot.empty) {
//         // 모든 문서를 순회하며 데이터를 가져옴
//         querySnapshot.forEach(doc => {
//             const data = doc.data();
//             const docId = doc.id; // 문서 ID

//             const dateFields = Object.keys(data).filter(field => {
//                 return /\d{4}-\d{2}-\d{2}/.test(field); // YYYY-MM-DD 형식의 필드만 필터링
//             });

//             // 각 문서의 제목과 내용을 표시할 div 생성
//             const noteDiv = document.createElement('div');
//             // noteDiv.className = 'container';

//             if (dateFields.length > 0) {
//                 const latestDateField = dateFields.sort((a, b) => new Date(b) - new Date(a))[0]; // 최신 날짜 찾기
//                 const latestContent = data[latestDateField]; // 최신 날짜의 필드값 가져오기
        
//                 // HTML로 출력
//                 notesContainer.innerHTML += `
//                   <div class="container">
//                     <a href="detail.html"><h3 id="noteTitle">${docId}</h3></a>
//                     <p id="noteContent">${latestContent || '내용 없음'}</p>
//                   </div>
//                 `;
//             } else {
//                 // 날짜 필드가 없을 경우 처리
//                 notesContainer.innerHTML += `
//                   <div class="container">
//                     <a href="detail.html"><h3 id="noteTitle">${docId}</h3></a>
//                     <p id="noteContent">내용 없음</p>
//                   </div>
//                 `;
//             }
//             notesContainer.appendChild(noteDiv);
//         });
//         } else {
//         notesContainer.textContent = '노트가 없습니다.';
//         }
//     } catch (error) {
//         console.error('Firestore에서 데이터 불러오기 중 오류 발생:', error);
//         notesContainer.textContent = '오류가 발생했습니다.';
//     }
// });

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

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

async function loadNotes() {
    const querySnapshot = await getDocs(collection(db, "note"));
    const notesContainer = document.getElementById('notesContainer');

    querySnapshot.forEach((doc) => {
        const docId = doc.id;
        const data = doc.data();
        
        // 날짜 필드만 추출 (예: YYYY-MM-DD 형식)
        const dateFields = Object.keys(data).filter(field => /\d{4}-\d{2}-\d{2}/.test(field));

        if (dateFields.length > 0) {
            // 최신 날짜 필드를 찾기
            const latestDateField = dateFields.sort((a, b) => new Date(b) - new Date(a))[0]; 
            const latestContent = data[latestDateField]; // 최신 날짜의 필드값 가져오기

            // HTML로 출력
            notesContainer.innerHTML += `
              <div class="container">
                <a href="detail.html?id=${docId}"><h3 id="noteTitle">${docId}</h3></a>
                <p id="noteContent">${latestContent || '내용 없음'}</p>
              </div>
            `;
        } else {
            // 날짜 필드가 없을 경우 처리
            notesContainer.innerHTML += `
              <div class="container">
                <a href="detail.html?id=${docId}"><h3 id="noteTitle">${docId}</h3></a>
                <p id="noteContent">내용 없음</p>
              </div>
            `;
        }
    });
}

// Firestore에서 데이터를 로드
loadNotes();
