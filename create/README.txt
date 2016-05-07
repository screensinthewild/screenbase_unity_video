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

A web-app to create correctly formatted strings for the URL query parameter API used by screenbase_unity_video.
Will work locally, or hosted on a webserver.

Enter:
Remote URLs of MP4 videos
Info Pop-Up Text
Short title text
Skin JPG image

The output from create is formatted as follows:
http://<your site>/<your directory containing video player app>/?&remote=<'y' or 'n'>&vids=<MP4 video1>~~<MP4 video2>~~<MP4 video3>&sharing=<'y' or 'n'>&subtitles=<'y' or 'n'>&loc=<location code used by 'Screens in the Wild' to identify screen node>&info=<URL encoded text to display when info button is touched>&branding=<URL encoded text for short title to appear on-screen>&call=<URL encoded text to appear under the video>&skin=<JPG image to skin app with>

Note: order of parameters produced by Create might differ from above (!).


THis will currently produce URLs assuming that screenbase_unity_video is hosted at: http://www.cs.nott.ac.uk/sitw/experiences/screenbase/videoplayer/display/stable/

You will need to edit the resulting URL to match your unity_slideshow_display install path.
For example: http://<your site>/<your directory containing unity_slideshow_display files>/

Create also produces example entries using the 'Screens in the Wild' system schedule file syntax, as used by sitw_core. If you are sitw_core to run a screens network, then you could use this example to immediately schedule your new video program to run on the network.