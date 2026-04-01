// Prompt Library config
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;

// Elements
//const authContainer = document.getElementById('auth-container');
//const appContainer = document.getElementById('app-container');
//const uploadBtn = document.getElementById('upload-prompt-btn');
//const loadBtn = document.getElementById('load-prompts-btn');

// Tab switching
// document.querySelectorAll('.tab').forEach(tab => {
//     console.log("Hello!!!");
//     tab.addEventListener('click', function() {
//         document.querySelector('.tab.active').classList.remove('active');
//         this.classList.add('active');
//     });
// });

// =========== Auth code has been moved to the header script for persistent stuff and auth.js for login.

// Logout
//document.getElementById('logout-btn').onclick = () => auth.signOut();

// UPLOAD - CLICK WORKS
/*
uploadBtn.onclick = async () => {
    const title = document.getElementById('title-input').value.trim();
    const content = document.getElementById('content-input').value.trim();

    if (!title || !content || !currentUser) {
        showMessage('upload-message', 'Fill title & content + login', 'error');
        return;
    }

    try {
        await db.collection('prompts').add({
            title,
            content,
            author: currentUser.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        showMessage('upload-message', '✅ Uploaded!', 'success');
        document.getElementById('title-input').value = '';
        document.getElementById('content-input').value = '';
        loadPrompts();
    } catch (e) {
        showMessage('upload-message', 'Upload failed: ' + e.message, 'error');
    }
};
*/

//loadBtn.onclick = loadPrompts;

function showMessage(id, msg, type) {
  alert(id);
  alert(msg);
  alert(type);
    // const el = document.getElementById(id);
    // el.textContent = msg;
    // el.className = `message ${type}`;
    // el.style.display = 'block';
    // setTimeout(() => el.style.display = 'none', 3000);
}
