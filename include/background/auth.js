// Auth
const AUTH_USERNAME_MIN_LENGTH = 3
const AUTH_USERNAME_MAX_LENGTH = 32

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
            const username = document.getElementById('user-name').value.trim();

            if (consented) {
                if (username.length >= AUTH_USERNAME_MIN_LENGTH) {
                    if (username.length < AUTH_USERNAME_MAX_LENGTH) {
                        if (passwordConfirm === password) {
                            let success = true;
                            await auth.createUserWithEmailAndPassword(email, password)
                            .catch(function(error) {
                                success = false;
                            });
                            console.log("TEST");
                            // Successfully creates account
                            if (success) {
                                currentUser.updateProfile({
                                    displayName: username 
                                });
                                // await db.set(ref(db, 'users/' + userId), {
                                //         username: email
                                //     });
                                // Upload successful
                                //  and redirect to homepage.
                                window.location.replace(signInRedirect);
                            }
                        } else {
                            signInError.innerHTML = "Passwords must match."
                        }
                    } else {
                        signInError.innerHTML = `Display name cannot be greater than ${AUTH_USERNAME_MAX_LENGTH} characters long.`;
                    }
                } else {
                    signInError.innerHTML = `Display name must be at least ${AUTH_USERNAME_MIN_LENGTH} characters long.`;
                }
            } else {
                signInError.innerHTML = "Please agree to the conditions before creating an account.";
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
