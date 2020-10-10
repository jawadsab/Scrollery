const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
const search = document.getElementById("search");
const searchIcon = document.getElementById("search-icon")

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let queryString = "";

// Unsplash API
let imageCount = 5;
const apiKey = config.apikey
const baseAPIURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`

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

        const linkToPhoto = document.createElement("a");
        linkToPhoto.style.color = "white"
        linkToPhoto.style.fontSize = "30px"
        linkToPhoto.innerHTML = `<i class="fas fa-external-link-alt"></i>`
        setAttributes(linkToPhoto,{"href":html,"title":"See On Unspalsh","target":"_blank"})


        //append p to overlay div
        overlay.appendChild(p);
        overlay.appendChild(linkToPhoto);
       

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

function searchForPhoto() {
    queryString =  search.value.split(" ")[0];
    if(queryString) {
        apiURL=baseAPIURL+"&query="+queryString;
        console.log(apiURL);
        getPhotos();

    } else {
        apiURL=baseAPIURL;
        return;
    }
    search.value = "";
}

searchIcon.addEventListener("click",searchForPhoto);
document.addEventListener("keypress",(e) => {
    if(!search.value) {
        return;
    } else {
        if(e.code === "Enter") {
            searchForPhoto();
        }
    }
})


// onload
getPhotos()