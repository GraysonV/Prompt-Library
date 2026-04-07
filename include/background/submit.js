const uploadBtn = document.getElementById('user-submit');
const signedOutRedirect = "/sign-in.html";
const uploadSuccessRedirect = "/browse.html";

// Redirect to login page if not signed in.
auth.onAuthStateChanged(user => {
    currentUser = user;
    if (!user) {
        window.location.replace(signedOutRedirect);
    }
})

uploadBtn.onclick = async () => {
    // Escape HTML code to avoid exploits.
    const title = escapeHtml(document.getElementById('input-title').value.trim());
    const content = escapeHtml(document.getElementById('input-content').value.trim());

    if (!title || !content || !currentUser) {
        window.location.replace(signedOutRedirect);
        return;
    }

    try {
        await db.collection('prompts').add({
            title,
            content,
            author: currentUser.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        // Upload successful
        uploadSuccess()
        document.getElementById('input-title').value = '';
        document.getElementById('input-content').value = '';
    } catch (e) {
        showMessage('upload-message', 'Upload failed: ' + e.message, 'error');
    }
};

function uploadSuccess() {
    window.location.replace(uploadSuccessRedirect);
}