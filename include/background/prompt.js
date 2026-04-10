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

/* https://stackoverflow.com/questions/1787322/#:~:text=There%20is */
function escapeHtml(text) {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

// Makes a subject value more human-readable (E.g. "computer_science" -> "Computer Science")
function beautifySubject(text) {
    let tokens = text.split("_");
    let result = "";
    tokens.forEach(part => {
        result += part.charAt(0).toUpperCase() + String(part).slice(1) + " ";
    });
    result = result.trim();
    return result;
}

// =========== Auth code has been moved to the header script for persistent stuff and auth.js for login.

// Logout
//document.getElementById('logout-btn').onclick = () => auth.signOut();

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
