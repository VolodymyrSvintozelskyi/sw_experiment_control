function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, false);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }

includeHTML();


let sidebar_ul = document.getElementById("menu").firstElementChild
switch(window.location.href.split("/").at(-1)){
    case "index.html":
        sidebar_ul.children[0].classList.add("nav-active");
        break;
    case "dashboard.html":
        sidebar_ul.children[1].classList.add("nav-active");
        break;
    case "log-viewer.html":
        sidebar_ul.children[2].classList.add("nav-active");
        break;
    case "about.html":
        sidebar_ul.children[3].classList.add("nav-active");
        break;
}
