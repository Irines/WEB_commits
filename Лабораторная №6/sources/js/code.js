document.body.onload = function () {
  setTimeout(function () {
    document.getElementById("spinner").style.visibility = "hidden";
    document.getElementById("bl").style.visibility = "hidden";
  }, 1000)
}

function fullScreen(div) {
  if (div.getAttribute('class') !== 'fullscreen') {
    div.setAttribute('class', 'fullscreen');
  }
  else {
    div.setAttribute('class', '');
  }
}

class Gallery extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" });

    const div = document.createElement("div");
    div.setAttribute("class", "myGallery");

    if (this.hasAttribute("images")) {
      const myImages = this.getAttribute("images").split(";");

      for (let image of myImages) {
        //create an image
        const imageEl = document.createElement("img");
        imageEl.setAttribute("src", "./resources/gallery/" + image);
        imageEl.setAttribute("onerror", "this.src = \"/sources/resources/default.png\"");
        imageEl.setAttribute("onload", "checkImageSize(this)");

        //wrapper
        const wrapperEl = document.createElement("div");
        wrapperEl.appendChild(imageEl);
        wrapperEl.setAttribute("onclick", "fullScreen(this)");

        div.appendChild(wrapperEl);
      }
    }

    const style = document.createElement("style");
    //get css file content
    fetch("./css/styleEl.css")
      .then(function(result) {
        return result.text();
      }).then(function(text) {
        //set styles for an element
        style.innerHTML = text;
        shadow.appendChild(div);
        shadow.appendChild(style);
        //catch errors
      }).catch(function(err) {
        alert("Problem with styles");
      });
  }
}

//sqweeze images to the standart size overflow:hidden for other parts
function checkImageSize(img) {
  if (img.clientWidth < img.clientHeight) {
    img.style.height = "auto";
    img.style.width = "85%";
  } else {
    img.style.height = "85%";
    img.style.width = "auto";
  }
}

customElements.define("c-1",Gallery);