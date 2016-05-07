screenbase_unity_video

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

A customisable, video player, primarily intended for use with a network of public-facing, urban screens (such as the 'Screens in the Wild' framework). Styled for a portrait, touch-based display, with available browser screen space of 745x1340. 

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

See the README inside the 'display' directory for full details of configuration, the format for using URL parameters etc..



