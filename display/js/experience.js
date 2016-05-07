

var videoFileName;
var subTitlesFileName;

var skinURL;

var video;
var playButton;
var muteButton;
var seekBar;

var audioTimeOut;

var arrayOfVideoFilenames = new Array();

var keepInfoVisibleTimer;

var hasTouch = false;

var iedom=document.all||document.getElementById

var screenLocation;

var locationOfRempoteScreenSendingUsMessage;

var indexOfCurrentVideoInArrayOfVideoFilenames = 0;


function init () {

// ######### START: DO ALL THE WEB SERVICES / API VALUE GATHERING FROM THE URL #################

//screenLocation = translateTwoDigitLocationCodeIntoTextString ( (getURLparameterValue("loc")) );

screenLocation = getURLparameterValue("loc");

var checkSharing = getURLparameterValue("sharing");
if(checkSharing=="true" || checkSharing=="y" || checkSharing=="Y")
{
SHARING_MODE = true;
}

var checkSubtitles = getURLparameterValue("subtitles");
if(checkSubtitles=="false" || checkSubtitles=="n" || checkSubtitles=="N")
{
SUBTITLE_MODE = false;
}

if (getURLparameterValue("branding")!="") BRANDING_TEXT = decodeURIComponent(getURLparameterValue("branding"));
if (getURLparameterValue("call")!="") CALLTOACTION_TEXT = decodeURIComponent(getURLparameterValue("call"));
if (getURLparameterValue("info")!="") TEXT_FOR_INFO_WINDOW = decodeURIComponent(getURLparameterValue("info"));

var checkIfRemoteURLs = getURLparameterValue("remote");

if(checkIfRemoteURLs=="y" || checkIfRemoteURLs=="Y")
{
REMOTE_MODE = true;
}

if (getURLparameterValue("skin")!="") 
{
USE_SKIN = true;
skinURL = decodeURIComponent(getURLparameterValue("skin"));
}

// ######### END: DO ALL THE WEB SERVICES / API VALUE GATHERING FROM THE URL ##############

doHTMLstuff();

createArrayOfVideoFileNamesFromURLParameter();

loadVideoByArrayIndex(indexOfCurrentVideoInArrayOfVideoFilenames);

initLayoutCustomComponents();

registerInputListeners();

initUnion();

}



window.onload = function() {

	// Video
video = document.getElementById("video");
    
video.addEventListener('ended',function(e) {

if(!e) { e = window.event; }
incrementIndexInArrayOfVideoFilenames();
playVideo();
    });
	

	// Buttons
	playButton = document.getElementById("play-pause");
	muteButton = document.getElementById("mute");
	// Sliders
	seekBar = document.getElementById("seek-bar");
	
	// Nav controls
	leftTriangle = document.getElementById("triangleLeft");
	rightTriangle = document.getElementById("triangleRight");
	

	// Event listener for the play/pause button
	playButton.addEventListener("click", function() {
		if (video.paused == true) {
			// Play the video
			video.play();

			// Update the button text to 'Pause'
			playButton.innerHTML = "Pause";
		} else {
			// Pause the video
			video.pause();

			// Update the button text to 'Play'
			playButton.innerHTML = "Play";
		}
	});


	// Event listener for the mute button
	muteButton.addEventListener("click", function() {
		if (video.muted == false) {
		
		muteVideo();

	} else {
			// Unmute the video
			video.muted = false;

			// Update the button text
			muteButton.innerHTML = "Mute";
			
			resetAudioTimeout();
			
		}
	});

	
	
		// Event listener for the left triangle
	leftTriangle.addEventListener("click", function() {
			
decrementIndexInArrayOfVideoFilenames();

playVideo();

if(SHARING_MODE)
{
sitwOutgoingEvent("videoindex", indexOfCurrentVideoInArrayOfVideoFilenames);
}


	});
	
	
		// Event listener for the left triangle
	rightTriangle.addEventListener("click", function() {

incrementIndexInArrayOfVideoFilenames();

playVideo();

if(SHARING_MODE)
{
sitwOutgoingEvent("videoindex", indexOfCurrentVideoInArrayOfVideoFilenames);
}

	});
	
	

	// Event listener for the seek bar
	seekBar.addEventListener("change", function() {
		// Calculate the new time
		var time = video.duration * (seekBar.value / 100);

		// Update the video time
		video.currentTime = time;
	});

	
	// Update the seek bar as the video plays
	video.addEventListener("timeupdate", function() {
		// Calculate the slider value
		var value = (100 / video.duration) * video.currentTime;

		// Update the slider value
		seekBar.value = value;
	});

	// Pause the video when the seek handle is being dragged
	seekBar.addEventListener("mousedown", function() {
		video.pause();
	});

	// Play the video when the seek handle is dropped
	seekBar.addEventListener("mouseup", function() {
		video.play();
	});

	
	playVideo("first_run");
	
}



// Register callback functions to handle user input
function registerInputListeners () {
document.onmousedown = pointerDownListener;
document.ontouchstart = touchDownListener;
}


function doHTMLstuff() {

document.write('<div id="info_popup">');
document.write('<div id="info_text"></div>');
document.write('</div>');

document.write('<div id="jcontainer">');

document.write('<div id="branding_text"></div>');

document.write('<div id="calltoaction_text"></div>');

document.write('<img id="info_button" src="imgs/info.png"/>');

document.write('<div id="iSpy_reserved_space"><BR><BR><BR>768 x 342 space reserved <BR> for iSpy video panel overlay</div>');

document.write('<div id="video-container">');
document.write('<!-- Video -->');
document.write('<video id="video">');

document.write('<source type="video/mp4">');

document.write('<track id="track" kind="subtitles" label="English subtitles" srclang="en" default></track>');

document.write('</video>');
document.write('</div>'); // close video-container

document.write('<div id="video-controls-container">');
document.write('<!-- Video Controls -->');
document.write('<div id="video-controls">');
//document.write('<button type="button" id="play-pause" class="play">Pause</button>');
document.write('<button type="button" id="play-pause" class="play">Pause</button>');
document.write('<input type="range" id="seek-bar" value="0">');
//document.write('<button type="button" id="mute">Mute</button>');
document.write('<button type="button" id="mute">Unmute</button>');

document.write('</div>'); // video-controls-container

document.write('<div id="triangleLeft"></div>');
document.write('<div id="triangleRight"></div>');

document.write('</div>'); // close triangular_navigation_control

document.write('</div>'); // close jcontainer


} // close doHTMLstuff()




//==============================================================================

// TOUCH-INPUT EVENT LISTENERS

//==============================================================================

// On devices that support touch input, this function is triggered when the 
// user touches the screen.

function touchDownListener(e) {
var event = e || window.event; 
mouseOrTouchDown (event);   
}

//==============================================================================

// MOUSE-INPUT EVENT LISTENERS

//==============================================================================
 
// Triggered when the mouse is pressed down

function pointerDownListener (e) {
var event = e || window.event; 
mouseOrTouchDown (event);   
}
  
function mouseOrTouchDown (e) {

var tname

// Get id of element associated with event
tname=event.target.id; 

if(tname=="info_button")
{
document.getElementById("info_popup").style.visibility = 'visible';
console.log(tname);
keepInfoVisibleTimer=setInterval("hideInfoWindow()",millisecsToShowInfo);
return;

}

if(tname=="info_text" || tname=="info_popup" )

{
hideInfoWindow();
return;
}


// Determine where the user clicked the mouse.
 
var mouseX = event.clientX;
var mouseY = event.clientY;

}
 





function initLayoutCustomComponents() {

if (USE_SKIN)
{
document.getElementById("jcontainer").style.backgroundImage = "url('" + skinURL + "')";
}

document.getElementById("info_text").innerHTML = TEXT_FOR_INFO_WINDOW;

document.getElementById("branding_text").innerHTML = BRANDING_TEXT;

document.getElementById("calltoaction_text").innerHTML = CALLTOACTION_TEXT;

}


function hideInfoWindow()
{
document.getElementById("info_popup").style.visibility = 'hidden';
clearInterval(keepInfoVisibleTimer);

}


function doSomethingWithLocationCode (messageIsLocal,locationCode) {

var introText;


if (messageIsLocal == true)
{
introText = ifTouchedLocationIntroText;
}
 else
 {

introText = photoShowingStartTxt+locationOfRempoteScreenSendingUsMessage+photoShowingEndTxt;

 }


if(locationCode=="WA") 
{
//console.log(locationIntroText+WalthamstowLocationDescription);
notify(introText+WalthamstowLocationDescription,timeUntilShowPhotoNotificationFades);

}


else if(locationCode=="LE") 
{
//console.log(locationIntroText+LeytonstoneLocationDescription);
notify(introText+LeytonstoneLocationDescription,timeUntilShowPhotoNotificationFades);

}

else if(locationCode=="BW") 
{
//console.log(locationIntroText+BroadwayLocationDescription);
notify(introText+BroadwayLocationDescription,timeUntilShowPhotoNotificationFades);


}

else if(locationCode=="NA") 
{
//console.log(locationIntroText+NewArtExchangeLocationDescription);
notify(introText+NewArtExchangeLocationDescription,timeUntilShowPhotoNotificationFades);

}

else 
{
//console.log(locationIntroText+"unknown");
notify(introText+"unknown",timeUntilShowPhotoNotificationFades);
}

}

function notify (notification,removeTimer) {

console.log("Notify:"+notification);

 var notice = '<div class="notice">'
 + '<div class="notice-body">'
// + '<img src="imgs/info2.png" />'
 + '<p>'+notification+'</p>'
 + '</div>'
 + '<div class="notice-bottom">'
 + '</div>'
 + '</div>';
 $( notice ).purr(
    {
    fadeInSpeed: 200,
    fadeOutSpeed: 2000,
  removeTimer: 2000,
// Steve added next option, so that I can disable list covering screen...
  disableListOfNotifications: useSingleNotificationNotList
    }
  );
  


  }

  

function muteVideo()
{

			// Mute the video
			video.muted = true;

			// Update the button text
			muteButton.innerHTML = "Unmute";
			
			//resetAudioTimeout();
			
}
			
			
function resetAudioTimeout()
{

clearTimeout(audioTimeOut);
audioTimeOut=setTimeout(function(){muteVideo()},numberOfMilliSecondsUntilAudioTimeout);

}


function createArrayOfVideoFileNamesFromURLParameter () {
// separate filenames into an array, by separator
arrayOfVideoFilenames = getURLparameterValue("vids").split(separatorForVideoFileNamesInURL);
}


function loadVideoByArrayIndex(arrayIndex) {

videoFileName = arrayOfVideoFilenames[arrayIndex];
subTitlesFileName = getFileNameWithoutExtension(arrayOfVideoFilenames[arrayIndex])+".vtt";

document.getElementById("track").setAttribute("src", "");

if(REMOTE_MODE) 
{
document.getElementById("video").setAttribute("src", decodeURIComponent(videoFileName));
//console.log(decodeURIComponent(videoFileName));
}
else 
{
document.getElementById("video").setAttribute("src", relativePathToMediaStore+videoFileName);
}

if(SUBTITLE_MODE)
{
document.getElementById("track").setAttribute("src", relativePathToMediaStore+subTitlesFileName);
}

}

function incrementIndexInArrayOfVideoFilenames() {

if(indexOfCurrentVideoInArrayOfVideoFilenames==arrayOfVideoFilenames.length-1) // on last element in array
{
indexOfCurrentVideoInArrayOfVideoFilenames = 0; // set index to zero
//indexOfCurrentVideoInArrayOfVideoFilenames = -1; // set index to 1 below zero, so next line can be used in all cases
}

else // is not last element in array...
{
indexOfCurrentVideoInArrayOfVideoFilenames++; // increment index...
}

}


function decrementIndexInArrayOfVideoFilenames() {

// Counting down...so need to jump from first in array to last!

if(indexOfCurrentVideoInArrayOfVideoFilenames==0) // is first in array!
	{
	indexOfCurrentVideoInArrayOfVideoFilenames=arrayOfVideoFilenames.length-1; // Go to last element in array
	}

	

else 
	{
	indexOfCurrentVideoInArrayOfVideoFilenames--;
	} 


}


function playVideo(value) {

if(value!="first_run")
{
video.pause();
seekBar.value = 0;
loadVideoByArrayIndex(indexOfCurrentVideoInArrayOfVideoFilenames);
}

muteVideo();
video.play();
playButton.innerHTML = "Pause";
}


/* ########################## START: SITW functionality ################################## */

// A shortcut to adding UNION Server 'Shared' behaviours on the 'Screens in the Wild' Network by Steve North

// Open the browser Javascript console to see what's going on...now click anywhere!!

// Note: when you test this file...in order to use the location-specific code, you will need to add the 'loc' argument to the URL.
// For example: if you are testing it locally...it might look like this: file:///C:/Users/<user name>/Desktop/index.html?loc=BW
// Currently legal values for loc are: BW (Broadway Cinema), NA (New Art Exchange), WA (The Mill, Walthamshow) and LE (Leytonstone). 

// This JavaScript can live in an HTML file script element, or in a separate Javascript file, that is included via a 'src' parameter. 

/* ########## START: incoming SITW event handling ########## */

// In this example, there are two types of incoming events: changes of state for the entire experience 
// and momentary events from a specific location. 

// 1. Changes of state for the entire experience - (SOMETHING HAS CHANGED FOR EVERYONE)
// These messages tell you when the value of an attribute has changed on UNION Server.
// These attributes relate specifically to the experience defined by the variable 'experienceName'.
// Attributes might be high scores, for example. 
// State is retained so long as UNION Server is not reset. They won't survive a server reset.

// Note: this next bit can handle any attributeName that you have choosen to define by calling the function - sitwOutgoingChangeOfState(attributeName, attributeValue).
// You just need to edit the bit below to identify your attributeName and decide what to do with the attributeValue.

function sitwIncomingChangeOfState(attributeName, attributeValue) {

// Once you have an attribute and it's new value...you might edit this bit to do something with it...
if (attributeName == "myAttribute")
{
//doSomething(attributeValue);
}

// Repeat with 'ifs' for your other attributes...

} // close sitwIncomingChangeOfState


// 2. Momentary events from a specific location (SOMETHING HAS CHANGED AT ONE LOCATION)
// These messages tell you when someone has changed something at another location.
// This is best suited for rapid messaging that does not need to have its state remembered by UNION Server (for example: user screen position changes in a game).
// These events will go to everyone connected to this experience, as defined by the variable 'experienceName'.
// They are NOT retained by UNION Server.

// Note: this next bit can handle any eventName that you have choosen to define by calling the function - sitwOutgoingEvent(eventName, eventValue) - note: location is added automatically before sending. 
// You just need to edit the bit below to identify your eventName and decide what to do with the eventValue and eventLocation.

function sitwIncomingEvent(eventName, eventValue, eventLocation) {

if (eventName == "videoindex" && SHARING_MODE)
{

  // Parse...
  var values = eventValue.split(",");

   console.log("Receiving video started message..."+eventLocation);

indexOfCurrentVideoInArrayOfVideoFilenames = Number(values[0]);
locationOfRempoteScreenSendingUsMessage = translateTwoDigitLocationCodeIntoTextString (eventLocation);

playVideo();

notify(videoShowingStartTxt+locationOfRempoteScreenSendingUsMessage+videoShowingEndTxt,timeUntilShowPhotoNotificationFades);

}

} // close sitwIncomingEvent


/* ########## END: incoming SITW event handling ########## */


/* ########################## END: SITW functionality ################################## */



/* ########################## Helper Functions ################################## */


function getURLparameterValue( param )
{
param = param.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
var regexS = "[\\?&]"+param+"=([^&#]*)";  
var regex = new RegExp( regexS );  
var results = regex.exec( window.location.href ); 
 if( results == null )    return "";  
else    return results[1];
}


function translateTwoDigitLocationCodeIntoTextString (location) {

var loc;

if (location == "NA")
{
loc = NewArtExchangeLocationDescription;
}

else if (location == "BW")
{
loc = BroadwayLocationDescription;
}

else if (location == "LE")
{
loc = LeytonstoneLocationDescription;
}

else if (location == "WA")
{
loc = WalthamstowLocationDescription;
}

else
{
loc = "somewhere";
//loc = "Unknown Location";
}

return loc;

}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


function getFileNameWithoutExtension(filename) {
var arrayIndexOfDotInFileName = filename.lastIndexOf(".");
return filename.substring(0,arrayIndexOfDotInFileName);
}


function getTwoDigitLocationCodeFromImageName (image_name) {
var arrayIndexOfFirstUnderscoreInImageName = image_name.indexOf("_");
return image_name.substring(arrayIndexOfFirstUnderscoreInImageName+1,arrayIndexOfFirstUnderscoreInImageName+3);
}

