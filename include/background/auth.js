// Auth
const authBtn = document.getElementById('user-submit');
const signInRedirect = "/browse.html";
const signInError = document.getElementById("sign-in-error");

// Redirect to browse page if user is already signed in.
auth.onAuthStateChanged(user => {
    currentUser = user;
    if (user) {
        window.location.replace(signInRedirect);
    }
});

authBtn.addEventListener('click', async () => {
    const isSignIn = document.getElementById("page").textContent === "sign-in";
    const email = document.getElementById('user-email').value.trim();
    const password = document.getElementById('user-password').value;

    if (!email || !password) {
        signInError.innerHTML = "Enter email & password";
        //showMessage('auth-message', 'Enter email & password', 'error');
        return;
    } else {
        signInError.innerHTML = "";
    }

    try {
        if (!isSignIn) {
            const passwordConfirm = document.getElementById('user-password-confirm').value;
            const consented = document.getElementById('user-consent').checked;

            if (consented) {
                if (passwordConfirm === password) {
                    await auth.createUserWithEmailAndPassword(email, password);
                    // Successfully creates account and redirect to homepage.
                    window.location.replace(signInRedirect);
                } else {
                    signInError.innerHTML = "Passwords must match."
                }
            } else {
                signInError.innerHTML = "Please agree to the conditions before creating an account."
            }
        } else {
            await auth.signInWithEmailAndPassword(email, password);
            // Successfully logs in and redirects to homepage.
            window.location.replace(signInRedirect);
        }
    } catch (error) {
        switch(error.code) {
            case "auth/invalid-email":
                signInError.innerHTML = "Please enter a valid email address.";
                break;
            case "auth/invalid-credential":
                signInError.innerHTML = "Incorrect email or password. Please try again.";
                break;
            case "auth/weak-password":
                signInError.innerHTML = "Password must contain at least 6 characters.";
                break;
            default:
                signInError.innerHTML = error.code;
                break;
        }
        //showMessage('auth-message', error.message, 'error');
    }
});
