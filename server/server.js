//Creates neccesary const information:
const express = require("express");
const app = express();
const port = 3000;
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
const bodyParser = require('body-parser')
const fs = require("fs");
const cors = require('cors')
app.use(cors())

//need this if using curl commands instead of utilizing the html form
//var jsonParser = bodyParser.json()
//app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true }));

//Imports the API Key and Endpoint from the config folder so that they are not exposed to the internet:
const { computerVisionAPIKey, computerVisionEndpoint } = require("./config");
const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': computerVisionAPIKey } }), computerVisionEndpoint);

// Used information from https://learn.microsoft.com/en-us/azure/cognitive-services/computer-vision/quickstarts-sdk/image-analysis-client-library?tabs=visual-studio%2C3-2&pivots=programming-language-javascript

//Implements Text Extraction API feature:
app.post("/textextraction", (req, res) => {
  //prints information to console to visualize it running. To see these you must run with node.
  console.log("running text extraction...");
  console.log(req.body);
  //Verifies that a url was submitted, if not it returns an error:
  if (!req.body?.image_url) return res.status(400).send({ data: "No url given" });
  //Establishes the computer vision client to recognize printed text:
  computerVisionClient.recognizePrintedText(true, req.body.image_url).then((data) => {
    //Prints to console data that is extracted from the text after it is sent through a function that loops through the object in order to exract the text and put it all together
    console.log(getText(data));
    //Logs submitted url and the text extracted to a log file on the server. This is used to verify everything is working correctly and review if it was not you testing:
    logText("URL: " + req.body.image_url + " Text Extracted: " + getText(data))
    //Sends the data and the text to the html/website:
    res.send({ data: getText(data) })
    //Catches any errors and sends those errors to both the server side log and to the html/website:
  }).catch((err) => {
    console.error(err);
    logText("/textextraction Error: " + err.message + " URL: " + req.body.image_url);
    return res.status(400).send({ data: `Error processing image: ${err.message}` + " Please try again." });
  });

});

//Implements Image Description API feature:
app.post("/imagedescription", (req, res) => {
  console.log("running image description analysis...");
  console.log(req.body);
  if (!req.body?.image_url) return res.status(400).send({ data: "No url given" });
  computerVisionClient.analyzeImage(req.body.image_url, {
    visualFeatures: ['Tags', 'Description']
  }).then((result) => {
    const image_description = result.description.captions[0].text
    console.log(result.tags);
    console.log(image_description);
    logText("URL: " + req.body.image_url + " Description: " + image_description)
    return res.json({ tags: result.tags, caption: image_description })
  }).catch((err) => {
    console.error(err);
    logText("/imagedescription Error: " + err.message + " URL: " + req.body.image_url);
    return res.status(400).send({ data: `Error processing image: ${err.message}` + " Please try again." });
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


function getText(data) {
  var text = "";
  if (!data?.regions) return ""
  data.regions.forEach(region => {
    if (region.lines) {
      region.lines.forEach(line => {
        if (line.words) {
          line.words.forEach(word => {
            text += word.text + " ";
          })
        }
        text += "\n";
      })
    }
    text += "\n\n";
  })
  return text;
}


function logText(text) {
  const date = new Date();
  const dateString = `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`;

  fs.appendFile("log.txt", `${dateString} ${text}\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });
}