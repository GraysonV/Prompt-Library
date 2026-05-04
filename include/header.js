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
				<!-- <a href="#">Profile</a> -->
				<a href="/settings.html">Settings</a>
				<a href="#" onclick="signOut();">Sign Out</a>
			</div>
		</div>

  </div>
		<div class="search-container">
			<label id="header-input-subject-label" for="header-input-subject">Find a prompt on, </label>
			<select id="header-input-subject" name="header-input-subject">
				<option value="all"></option>
				<option value="all">All Prompts</option>
				<optgroup label="Misc.">
					<option value="none">None</option>
					<option value="other">Other</option>
				</optgroup>
				<optgroup label="Health">
					<option value="general_health">General Health</option>
					<option value="physical_education">Physical Education</option>
					<option value="psychology">Psychology</option>
				</optgroup>

				<optgroup label="Language">
					<option value="language_arts">Language Arts</option>
					<option value="language_studies">Language Studies</option>
				</optgroup>

				<optgroup label="Mathematics">
					<option value="general_math">General Math</option>
					<option value="algebra">Algebra</option>
					<option value="calculus">Calculus</option>
					<option value="pre_calculus">Pre-Calculus</option>
					<option value="statistics">Statistics</option>
				</optgroup>

				<optgroup label="Science">
					<option value="general_science">General Science</option>
					<option value="biology">Biology</option>
					<option value="chemistry">Chemistry</option>
					<option value="computer_science">Computer Science</option>
					<option value="engineering">Engineering</option>
					<option value="physics">Physics</option>
				</optgroup>

				<optgroup label="World">
					<option value="art">Art</option>
					<option value="history">History</option>
					<option value="films">Films</option>
					<option value="social_studies">Social Studies</option>
				</optgroup>
			</select>


			<!-- <form action="/browse.html">
				<input type="text" placeholder="Search" name="q">
				<button type="submit"><i class="search-button">&#x1F50E;&#xFE0E;</i><span class="header-mobile">Search Prompt Library&nbsp;</span></button>
			</form> -->
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
				let username = getDisplayName(user);
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

let headerSubjectSelect = document.getElementById("header-input-subject");

headerSubjectSelect.onchange = (event) => {
    var inputText = event.target.value;

    let url = "/browse.html";
    url += '?s=' + inputText;

    window.location.href = url;
}