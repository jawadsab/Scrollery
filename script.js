const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
let imageCount = 5;
const apiKey = config.apikey
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}&query=cars`

//loaded image 
function imageLoaded() {

    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        imageCount = 30;
    }
}

// Helper function to set attribute
function setAttributes(element,attributes) {
    for(const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

function displayPhotosFormAPI(photosArray) {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {

        // console.log(photo)

        
     
        const {links:{html},urls:{regular},alt_description} = photo;
        console.log(html)
       
        //create images that have an image and div overlay
        const images = document.createElement("div");
        images.classList.add("images");

        //create image from the urls
        const img = document.createElement("img");
        setAttributes(img,{"src":regular});

        img.addEventListener("load",imageLoaded);

        //create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("image-overlay");

        const p = document.createElement("p");
        p.classList.add("image-desc");
        p.innerText = alt_description;

        const info = document.createElement("div");
        info.classList.add("info");

        const iconLink = document.createElement("i");
        // iconLink.classList.add("fa");
        // iconLink.classList.add("fa-external-link");
        // iconLink.setAttribute("aria-hidden",true);
        iconLink.innerHTML = `<i class="fa fa-external-link" aria-hidden="true"></i>`
        

        const link = document.createElement("p");
        link.classList.add("link");
        link.innerText = "Hellooooo"

        info.appendChild(iconLink);
        info.appendChild(link)

        //append p to overlay div
        overlay.appendChild(p);
        overlay.appendChild(info);

        //append img and overlay to images
        images.appendChild(img);
        images.appendChild(overlay);

        //apend images to imageContainer
        imageContainer.appendChild(images);
    });
}

// get photos from UNSPLASH API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
       displayPhotosFormAPI(photosArray);
    } catch (error) {
        // Catch error here
        console.log("Something Went Wrong  ",error)
    }
}

window.addEventListener("scroll",() => {
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
       ready = false;
       getPhotos();
   }
})


// onload
getPhotos()