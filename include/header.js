// Script that injects the header HTML into any page with an element of the id "header"

let headerElement = document.getElementById("header");

let headerHTML = `
<div class="header">

	<a onclick="toggleMenu();" href="#" class="header-mobile"><strong>&#8801;</strong> Menu</a>
	<div class="header-menu-hidden" id="header-buttons">
		<a href="/">Home</a>
		<a href="#prompts">Prompts</a>
		<a href="#submit">Submit</a>
		<a href="#sign-in">Sign In</a>
		<div class="search-container">
			<form action="/search.html">
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