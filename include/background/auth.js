// Auth
const authBtn = document.getElementById('user-submit');
const signInRedirect = "/browse.html"

// Redirect to browse page if user is already signed in.
auth.onAuthStateChanged(user => {
    currentUser = user;
    if (user) {
				window.location.replace(signInRedirect);
    }
});

authBtn.addEventListener('click', async () => {
    const email = document.getElementById('user-email').value.trim();
    const password = document.getElementById('user-password').value.trim();

    if (!email || !password) {
        showMessage('auth-message', 'Enter email & password', 'error');
        return;
    }

    try {
        const isSignIn = document.getElementById("page").textContent === "sign-in";
        if (!isSignIn) {
            await auth.createUserWithEmailAndPassword(email, password);
            // Successfully creates account and redirect to homepage.
        } else {
            await auth.signInWithEmailAndPassword(email, password);
            // Successfully logs in and redirects to homepage.
            window.location.replace(signInRedirect);
        }
    } catch (error) {
        showMessage('auth-message', error.message, 'error');
    }
});
