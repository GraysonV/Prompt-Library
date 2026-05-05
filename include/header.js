// Script that injects the header HTML into any page with an element of the id "header"

let headerElement = document.getElementById("header");

let headerHTML = `
<div class="header">

	<a onclick="toggleMenu();" href="#" class="header-mobile"><strong>&#8801;</strong> Menu</a>
	<div class="header-menu-hidden" id="header-buttons">
		<a href="/index.html">Home</a>
		<a href="/browse.html">Browse</a>
		<a href="/submit.html">Submit</a>
		<a href="/sign-in.html" id="header-signin" style="display:none;">Sign In</a>
		<a href="#" class="dropbtn" id="header-user-profile" onclick="headerUserDropdownToggle(event);"></a>
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

function headerUserDropdownToggle(event) {
	if (event != null) {
		event.preventDefault();
	}
	const trigger = document.getElementById('header-user-profile');
	let myDropdown = document.getElementById("header-user-dropdown");
	if (!myDropdown) return;

	// Move dropdown to body once to avoid being clipped by header overflow
	if (myDropdown.dataset.moved !== 'true') {
		document.body.appendChild(myDropdown);
		myDropdown.dataset.moved = 'true';
		myDropdown.style.position = 'absolute';
	}

	// Toggle visibility
	if (myDropdown.style.display === 'block') {
		myDropdown.style.display = 'none';
		return;
	}

	// Position dropdown under the trigger
	const rect = trigger.getBoundingClientRect();
	const scrollY = window.scrollY || window.pageYOffset;
	const left = Math.max(8, rect.left);
	const top = rect.bottom + scrollY + 4; // small gap
	myDropdown.style.left = `${left}px`;
	myDropdown.style.top = `${top}px`;
	myDropdown.style.display = 'block';
	myDropdown.style.zIndex = 9999;

	// reposition on scroll/resize
	const reposition = () => {
		const r = trigger.getBoundingClientRect();
		const sY = window.scrollY || window.pageYOffset;
		myDropdown.style.left = `${Math.max(8, r.left)}px`;
		myDropdown.style.top = `${r.bottom + sY + 4}px`;
	};
	// attach temporary listeners while open
	const cleanup = (e) => {
		if (!e) return;
		if (!e.target.closest || (!e.target.closest('#header-user-dropdown') && !e.target.closest('.dropbtn') && !e.target.closest('#header-user-profile'))) {
			myDropdown.style.display = 'none';
			window.removeEventListener('scroll', reposition);
			window.removeEventListener('resize', reposition);
			window.removeEventListener('click', cleanup);
		}
	};
	window.addEventListener('scroll', reposition);
	window.addEventListener('resize', reposition);
	// use capture click to ensure outside clicks close it
	window.addEventListener('click', cleanup);
}

// Close the dropdown if the user clicks outside of it
// click handling is managed per-dropdown open via headerUserDropdownToggle cleanup listener

// Firebase integration
// Auth state
const headerUserProfile = document.getElementById('header-user-profile');
const headerSignIn = document.getElementById('header-signin');

auth.onAuthStateChanged(user => {
    currentUser = user;
    if (user) {
				let username = getDisplayName(user);
        headerUserProfile.innerHTML = `${username} &#9660;`;
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