# ITIS 6177 - Final Project - Computer Vision

This is the code for a website that can be found [HERE](http://137.184.74.76/index.html). This site features a final project for ITIS 6177 - System Integration at the University of North Carolina Charlotte that implements Microsoft Azures's "Computer Vision" API which is an AI service that analyzes content in images and video.

In addition to the information and documentation found below, there is some information in the website under the "documentation tab"

## Installation

The files contained in this GitHub are used for two things. The first is an Nginx web server that hosts the HTML, CSS, and JavaScript for the site. The second is the node server-side files, contained in the "server" folder that can be put into the root folder of the server. Within this server folder, there is a file called "server.js" this will need to be run using node or another similar feature in order to host and implement Microsoft Azures's "Computer Vision" API on the site. This file must remain running at all times on the server for the API to work correctly.  

------

A few files are missing that will need to be added:

The first is a file called "config.js" this file will need to be added to the same server folder you created.

The "config.js" file should contain the following information:
```bash
const computerVisionAPIKey = "YOUR_API_KEY_HERE"
const computerVisionEndpoint = "COMPUTER_VISION_ENDPOINT_HERE"
module.exports = { computerVisionAPIKey, computerVisionEndpoint }
```

Having this information in the "config.js" file is vital and will allow the API that is implemented in the server.js file to work. You can get your API key and the endpoint from Microsoft Azures's "Computer Vision" API site after making an account with them.

------

A second file that needs to be added is the "log.txt" file. This is where the logs for the site that can be seen used throughout the code will be stored.

You can do this by simply adding a file called log.txt in the server folder.

---

You must also install the node modules using the "npm install" command.

---

Lastly, the HTML, CSS, and JavaScript for the site must be hosted using Nginx. This can be done by following a tutorial such as the one below.

You could follow a tutorial such as "https://ubuntu.com/tutorials/install-and-configure-nginx#2-installing-nginx" to do this easily. *When you reach the step about creating an index.html file instead put all of the files from the HTML folder on GitHub here. These files should go into a directory "/var/www/html".

## Usage

After following the steps above you should be able to implement this same site on your own server. 

## Contributing

Feel free to reach out to me if you have any suggestions on to changes.
