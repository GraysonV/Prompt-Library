// Script that injects the header HTML into any page with an element of the id "footer"

// Start specific footer code.
let footerYear = new Date().getFullYear()
// End specific footer code.

let footerElement = document.getElementById("footer");

let footerHTML = `
<div>
  <hr>
  <p>
    <small>&copy;${footerYear} Code Ninjas Winnipeg</small>
  </p>
</div>
`;

if (footerElement != null) {
  footerElement.innerHTML += footerHTML;
}

