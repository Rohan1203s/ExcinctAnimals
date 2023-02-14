// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback, /* DOMElement */ element){
			  window.setTimeout(callback, 1000 / 60);
			};
  })();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
  requestAnimFrame( animate );
  var currentTime = new Date().getTime();
  if (mLastFrameTime === 0) {
	  mLastFrameTime = currentTime;
  }

  if ((currentTime - mLastFrameTime) > mWaitTime) {
	  swapPhoto();
	  mLastFrameTime = currentTime;
  }
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
  //calls id element photo, location.
//index repeats itself
if(mCurrentIndex  >= mImages.length) {
	  // If it is, set the index back to 0 to loop back to the beginning

  mCurrentIndex = 0;
}
// Check if the current index is less than 0

if(mCurrentIndex  < 0) {
  mCurrentIndex = mImages.length-1;
}
// Updates current image, location, description and date

document.getElementById('photo').src = mImages[mCurrentIndex].img;
var location = document.getElementsByClassName('location');
location[0].innerHTML = 'location: ' + mImages[mCurrentIndex].location;
var description = document.getElementsByClassName('description');
description[0].innerHTML = 'description: ' + mImages[mCurrentIndex].description;

var date = document.getElementsByClassName('date')
date[0].innerHTML = 'date: ' + mImages[mCurrentIndex].date;

// Reset the last frame time
mLastFrameTime =0;
// Increment the current index by 1
mCurrentIndex +=1;


//Add code here to access the #slideShow element.
  //Access the img element and replace its source
  //with a new image from your images array which is loaded 
  //from the JSON string

}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson = "";

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';

function fetchJSON() {
  mRequest.onreadystatechange = function () {
		// Define the onreadystatechange function
	  console.log("on ready state change")
	  if (this.readyState == 4 && this.status == 200) {
				// Parse the responseText as JSON
		  mJson = JSON.parse(mRequest.responseText);
		  iterateJSON(mJson);
	  }
  }
  //created json object which pulls data from an image. 
  mRequest.open("GET", mUrl, true);
  mRequest.send ();

}

function iterateJSON() {
// Loop through the images in the JSON

  for (let x = 0; x < mJson.images.length; x++){
mImages[x] = new GalleryImage();
mImages[x].location = mJson.images[x].imgLocation;
mImages[x].description = mJson.images[x].description;
mImages[x].img = mJson.images[x].imgPath;
mImages[x].date = mJson.images[x].date;

  }
}




//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
  return function(e) {
	  galleryImage.img = e.target;
	  mImages.push(galleryImage);
  }
}

$(document).ready( function() {
	// Position the element with the ID "nextPhoto" relative to the element with the ID "nav"
  $( "#nextPhoto" ).position({
	  my: "right top",
	  at: "right top",
	  of: "#nav"
	});
  // This initially hides the photos' metadata information
  //$('.details').eq(0).hide();
  fetchJSON();
$( ".moreIndicator" ).click(function() {
	//  if the clicked element has the class then it will add and remove classes,
	//if not it will do 'else'

  if ($(this).hasClass("rot90")) {
	  $(this).removeClass("rot90");
	  $(this).addClass("rot270");
	  $( ".details" ).slideToggle( "slow" );

	} else {
	  $(this).removeClass("rot270");
	  $(this).addClass("rot90");
	  $( ".details" ).slideToggle( "slow" );

	}
  });
});




window.addEventListener('load', function() {
  
console.log('window loaded');
$("#imageID").show();
}, false);

function GalleryImage() {
//defining 4 variables and assigning json list that will be used in our slideshow
var location;
var description;
var data;
var img;

  //implement me as an object to hold the following data about an image:
  //1. location where photo was taken
  //2. description of photo
  //3. the date when the photo was taken
  //4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
}


$(document).ready(function() {
  $("#nextPhoto").click(function() {
	  swapPhoto();
  });
});

$(document).ready(function() {
  $("#prevPhoto").click(function() {
  //calls id element photo, location.
//index repeats itself
if(mCurrentIndex  >= mImages.length) {
  // If it is, set the index back to 0 to loop back to the beginning

mCurrentIndex = 0;
}
// Check if the current index is less than 0

if(mCurrentIndex  < 0) {
mCurrentIndex = mImages.length-1;
}
// Updates current image, location, description and date

document.getElementById('photo').src = mImages[mCurrentIndex].img;
var location = document.getElementsByClassName('location');
location[0].innerHTML = 'location: ' + mImages[mCurrentIndex].location;
var description = document.getElementsByClassName('description');
description[0].innerHTML = 'description: ' + mImages[mCurrentIndex].description;

var date = document.getElementsByClassName('date')
date[0].innerHTML = 'date: ' + mImages[mCurrentIndex].date;

// Reset the last frame time
mLastFrameTime =0;
// Increment the current index by 1
mCurrentIndex -=1;
  });
});