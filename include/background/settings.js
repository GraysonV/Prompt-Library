// There's duplicates in auth.js urghhhhh...
const SETTINGS_USERNAME_MIN_LENGTH = 3
const SETTINGS_USERNAME_MAX_LENGTH = 32

const signOutRedirect = "/"
let currentDisplayName = "";

const inputDisplayName = document.getElementById("settings-username");
const inputPasswordCurrent = document.getElementById("settings-password-current");
const inputPasswordNew1 = document.getElementById("settings-password-new1");
const inputPasswordNew2 = document.getElementById("settings-password-new2");

auth.onAuthStateChanged(user => {
    currentUser = user;
    if (user == null) {
        window.location.replace(signOutRedirect);
    }

    if (user.displayName != null) {
      currentDisplayName = user.displayName;
      inputDisplayName.value = currentDisplayName;
    }
});

function saveSettings() {
  // Update display name
  let success = null
  if (inputDisplayName.value != currentDisplayName && inputDisplayName.value.length >= SETTINGS_USERNAME_MIN_LENGTH && inputDisplayName.value.length <= SETTINGS_USERNAME_MAX_LENGTH) {
    currentUser.updateProfile({
        displayName: inputDisplayName.value
    }).then(() => {
      tryPasswordUpdate();
    }).catch((error) => {
      success = error;
      alert("Display name change failed on Firebase: " + error);
      tryPasswordUpdate();
    });
  }
  else {
    tryPasswordUpdate(success);
  }

}

// Password updating is split into a separate function so the profile update can asynchronously update.
function tryPasswordUpdate(success) {
  // Update password
  if (inputPasswordCurrent.value.length > 0) {
    console.log(auth);
    const credential = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        inputPasswordCurrent.value
    )

    currentUser.reauthenticateWithCredential(credential).then(() => {
      let newPassword = inputPasswordNew1.value;
      
      if (newPassword.length > 0) {
        if (newPassword === inputPasswordNew2.value) {
          // User re-authenticated.
          currentUser.updatePassword(newPassword).then(() => {
            // Update successful.
            console.log("Password changed");
            window.location.reload();

          }).catch((error) => {
            success = error;
            alert("Password change failed on Firebase: " + error);
          });
        } else{
          alert("New passwords don't match.");
        }
      } else {
        alert("Password cannot be empty.");
      }

    }).catch((error) => {
      success = error;
      alert("Current password is incorrect: " + error);
    });

  } else {
    window.location.reload();
  }

}