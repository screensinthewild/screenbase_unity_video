screenbase_unity_video > display

Author:  Steve North
Author URI:  http://www.cs.nott.ac.uk/~pszsn/
License: AGPLv3 or later
License URI: http://www.gnu.org/licenses/agpl-3.0.en.html
Can: Commercial Use, Modify, Distribute, Place Warranty
Can't: Sublicence, Hold Liable
Must: Include Copyright, Include License, State Changes, Disclose Source
This research was originally funded in the UK under EPSRC grant reference EP/I031839/1 and title ‘Exploring the potential of networked urban screens for communities and culture’.

Copyright (c) 2015, The University of Nottingham

DESCRIPTION

A customisable, video player, primarily intended for use with a network of public-facing, urban screens (such as the 'Screens in the Wild' framework). Styled for portrait, touch-based display @ a resolution of 745x1340. 

screenbase_unity_video has one code base and uses URL parameters to customise the video content. 

At the moment, with a single code-baase, style customisation is limited to skinning the app with an image (a 745x1340 JPG). Customisable / dynamic CSS might be added in the future.

This app can display MP4 videos from one of two possible locations:
1. Hosted locally in a media directory, on the same server as this app.
2. Hosted remotely, web accessible, using the individual image URLs. 

There is a URL parameter to configure which of the above modes is operational (see below).

It can have a program of several video files that will either play sequentially, or the user can navigate forward and backwards through the program.

All individual videos must be specified in the URL parameters. You can't specify playing the entire contents of a directory.

screenbase_unity_video does not have a database backend.

screenbase_unity_video supports subtitle files in the VTT format. If a VTT is found in the same media directory as the MP4 video (and the names match: video1.mp4, video1.VTT), then the subtitles will be displayed (unless disabled by the URL parameter - see below).

User on-screen touch controls:

Left arrow: play previous video in program
Right arrow: play next video in program
Unmute: unmute audio (only stays unmuted for a fixed interval to avoid public disturbance)
Pause: pause video playback
Progress bar: drag to move through current video.

Note: if using UNION Server in a screens network - touching an arrow button will share the event (the id in the current program of the touch-selected video), causing 'momentary sync" between other screens connected to UNION Server and running this app. Everyone will be watching the same video.

Note: the screen layout for this app was originally designed to allow for the 'Screens in the Wild' video link panel, to overlap the bottom portion of the browser screen. This is why the video area does not make use of the fullscreen size.

TO DO

# Add customisable / dynamic CSS, so that each deployment can have a separate look and feel. At the moment, this is limited to the 'skin' URL paramter. Can this be done via a URL parameter (path to a custom CSS file, for example)? 

CONFIGURATION 

If you are using remotely-hosted video URLs and are not wanting to share video touch events across a screens network, then this app should work 'out of the box', without further configuration.

In credentials.js:

Configure this if using UNION Server to share video touch events (backwards and forwards arrow buttons). This is the 'room' or communication channel that in which events are shared between screens:
var experienceName = "<name for sharing interaction event messages>";



The URL of the media directory, containing images:
var dataStoreURL  = "<URL path to media files>"; For example: "http://<your site>/images/"

The relative path to the local media directory...relative to project index.html
var relativePathToMediaStore = "<relative path to media files>"; For example: "../../../../images/"

If using UNION Server to share video touch events, configure server IP address:

var server = "xx.xx.xx.xx";


Server port number, I used port 8080:
var port = <port number>;





In sitw.js

UNION Server IP address and port number.

In config.js - end of file

The labels used in on-screen notifications to attribute the origin of a share video touch event.
Currently, this system is configured for four screens:
New Art Exchange, Nottingham (NA)
Broadway Cinema, Nottingham (BW)
Walthamstow, London (WA)
Edgware Road, London (LE)
You will need to edit these to match your own screens details.


USING THE URL query parameter API


Format:

http://<your site>/<your directory containing video player app>/?&remote=<'y' or 'n'>&vids=<MP4 video1>~~<MP4 video2>~~<MP4 video3>&sharing=<'y' or 'n'>&subtitles=<'y' or 'n'>&loc=<location code used by 'Screens in the Wild' to identify screen node>&info=<URL encoded text to display when info button is touched>&branding=<URL encoded text for short title to appear on-screen>&call=<URL encoded text to appear under the video>&skin=<JPG image to skin app with>

Shown with 3 videos, but you can add as many as required.

if 'remote' parameter = y, then each value for 'vids' (separated by '~~') is the URL encoded web address of the MP4 video including http://

if 'remote' parameter = n, then each value for 'vids' (separated by '~~') is name of an MP4 video file, without any path information.

The valid URL parameters are:
remote, vids, sharing, subtitles, loc, info, branding, call, skin

remote (not required) - valid values are: ‘y’ or ‘n’. Default (or if omitted) is ‘n’. If set to ‘‘y’, then full URLs for remote videos may be specified in the vids parameter, rather than the default filenames only (which assumes a location directory on the local server).

vids (required) - can be one or a list of MP4 file names (no paths or URLs, unless remote = Y), which are hosted on the SitW web server at: /www/sitw/experiences/videos File names in URL are separated by “~~”. 

Example: http://www.cs.nott.ac.uk/sitw/experiences/screenbase/videoplayer/display/stable/?vids=test1.mp4~~test2.mp4~~test3.mp4     

Note: if the remote parameter is set to ‘y’, then full paths may be used. 

Example: 
http://www.cs.nott.ac.uk/sitw/experiences/screenbase/videoplayer/display/stable/?vids=https%3A%2F%2Fia700408.us.archive.org%2F31%2Fitems%2FThePeanutVendor1933%2FThePeanutVendor1933_512kb.mp4~~https%3A%2F%2Farchive.org%2Fdownload%2FFelixAprilMaze%2Ffelix_april_maze_instr_512kb.mp4~~https%3A%2F%2Farchive.org%2Fdownload%2FTomAndJerryInANightBeforeChristmas%2FTomAndJerry-003-NightBeforeChristmas1941.mp4~~https%3A%2F%2Farchive.org%2Fdownload%2Fsecret_agent%2Fsecret_agent_512kb.mp4&info=%3Ch1%3EInfo%3C%2Fh1%3EVideos%20from%20the%20Internet%20Archive%20-%20%3CBR%3EPublic%20Domain%20Moving%20Image%20Collection&branding=The%20Public%20Domain%20Show&skin=http%3A%2F%2Fwww.cs.nott.ac.uk%2Fsitw%2Fexperiences%2Fimages%2Fmisc%2Finternet_archive.jpg&subtitles=n&sharing=y&remote=y&loc=NA
	
The URLs in the above, must be URL encoded.

sharing (not required) - default (or if omitted) is ‘n’. Set this to ‘y’ (or ‘true’ for backward compatibility reasons) if, each time a  video is played, you want an event message sent to UNION Server, which generates a notification at other screens and the other screens to start playing the same video. Example: http://www.cs.nott.ac.uk/sitw/experiences/screenbase/videoplayer/display/stable/?vids=test1.mp4&sharing=y

subtitles (not required) -  default (or if omitted) is ‘y’. Set this to ‘n’ (or ‘false’  for backward compatibility reasons) if you don’t want any corresponding subtitle files to be displayed. Example: http://www.cs.nott.ac.uk/sitw/experiences/screenbase/videoplayer/display/stable/?vids=test1.mp4~~test2.mp4~~test3.mp4&subtitles=n

loc (not required) - default (or if omitted) notification will display location as ‘somewhere’ instead of screen description. Recognised values are: BW, NA, WA and LE. These are translated in text descriptions for the notifications. 

info - the text to appear in the Info pop-up - must be URL encoded for use in URL.

branding - the short title to appear on-screen (white font, outlined in black, to work on any background skin) - must be URI encoded for use in URL.

call - text to appear under the video - must be URI encoded for use in URL (not tested recently!).

skin - the URL encoded remote URL (or local filepath?) for a 745 x 1340 JPG (or PNG?) background image, to customise the video player’s appearance.


To manually encode URLs or Info text, use: http://meyerweb.com/eric/tools/dencoder/

or..use the ScreenBase screenbase_unity_video module to encode everything for you. This will work locally by running Create's index.html or try it at:

http://www.cs.nott.ac.uk/sitw/experiences/screenbase/videoplayer/create/stable/


