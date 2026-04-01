// Script that injects the header HTML into any page with an element of the id "header"

let headerElement = document.getElementById("header");

let headerHTML = `
<div class="header">

	<a onclick="toggleMenu();" href="#" class="header-mobile"><strong>&#8801;</strong> Menu</a>
	<div class="header-menu-hidden" id="header-buttons">
		<a href="/">Home</a>
		<a href="/browse.html">Browse</a>
		<a href="/submit.html">Submit</a>
		<a href="/sign-in.html" id="header-signin" style="display:none;">Sign In</a>
		<a href="#" class="dropbtn" id="header-user-profile" onclick="headerUserDropdownToggle();"></a>
		<div class="dropdown">
			<div class="dropdown-content" id="header-user-dropdown">
				<a href="#">Profile</a>
				<a href="#">Settings</a>
				<a href="#" onclick="signOut();">Sign Out</a>
			</div>
		</div>

  </div>
		<div class="search-container">
			<form action="/browse.html">
				<input type="text" placeholder="Search" name="q">
				<button type="submit"><i class="search-button">&#x1F50E;&#xFE0E;</i><span class="header-mobile">Search Prompt Library&nbsp;</span></button>
			</form>
		</div>
	</div>
</div>
`;

if (headerElement != null) {
  headerElement.innerHTML += headerHTML;
}

// Start specific header code.

let headerButtons = document.getElementById("header-buttons");
let menuVisible = false;

function toggleMenu() {
  if (menuVisible) {
    headerButtons.className = "header-menu-hidden";
    menuVisible = false;
  } else {
    headerButtons.className = "header-menu";
    menuVisible = true;
  }
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function headerUserDropdownToggle() {
	let myDropdown = document.getElementById("header-user-dropdown");
		if (myDropdown.style.display == "block") {
      myDropdown.style.display = "none";
    }
		else {
			myDropdown.style.display = "block";
		}
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
  	let myDropdown = document.getElementById("header-user-dropdown");
		if (myDropdown.style.display == "block") {
      myDropdown.style.display = "none";
    }
  }
}

// Firebase integration
// Auth state
const headerUserProfile = document.getElementById('header-user-profile');
const headerSignIn = document.getElementById('header-signin');

auth.onAuthStateChanged(user => {
    currentUser = user;
    if (user) {
				let username = user.email;
				let atIndex = username.indexOf("@")
				if (atIndex != -1) {
					username = username.substring(0, atIndex);
				}
        headerUserProfile.innerHTML = `${username} &#9658;`;
        headerSignIn.style.display = "none";
        // loadPrompts();
    } else {
				headerSignIn.style.display = "block";
				headerUserProfile.style.display = "none";
    }
});

function signOut() {
	auth.signOut();
	window.location.reload();
}