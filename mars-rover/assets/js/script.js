async function GetResults() {
  "use strict";

  var form=$("#myform");

  form.validate();

  if (form.valid()) {

    var date = document.getElementById("date").value;
    var rover;
    if (document.getElementById("Curiosity").checked) {
      rover = document.getElementById("Curiosity").value
    }
    if (document.getElementById("Opportunity").checked) {
      rover = document.getElementById("Opportunity").value
    }
    if (document.getElementById("Spirit").checked) {
      rover = document.getElementById("Spirit").value
    }

    var apiKey = "P6mXXXsKNORlyIWftycYoVSa8gfNASya3HA5QgfB"
    
    var myURL = 
      "https://api.nasa.gov/mars-photos/api/v1/rovers/" +
      rover +
      "/photos?earth_date=" +
      date +
      "&page=1&api_key=" +
      apiKey;

    var myObject = await fetch(myURL);
    var myText = await myObject.text();
    var msg = JSON.parse(myText);

    var flen = msg.photos.length;
    for (var i = 0; i < 25; i++) {
      if (i < flen) {
      // Note how we construct the name for image1, image2, etc...this sets the image source0
        document.getElementById("image" + i).src = msg.photos[i].img_src;
        document.getElementById("anchor" + i).href = msg.photos[i].img_src;
        document.getElementById("image" + i).title = msg.photos[i].camera.full_name;
        document.getElementById("image"+ i).style.display = "inline";
      } else {
        document.getElementById("image"+ i).style.display = "none";      
        document.getElementById("image" + i).src = "#";
        document.getElementById("anchor" + i).href = "#";
      }
    }
  }
}

function defaultDate() {
  if (document.getElementById("Curiosity").checked){
    document.getElementById("date").value = "2012-08-06"
  }

  if (document.getElementById("Opportunity").checked){
    document.getElementById("date").value = "2004-01-26"
  }

  if (document.getElementById("Spirit").checked){
    document.getElementById("date").value = "2004-01-05"
  }
}

function ClearForm() {
  document.getElementById("rover").value = "";
  document.getElementById("Curiosity").checked = false;
  document.getElementById("Opportunity").checked = false;
  document.getElementById("Spirit").checked = false;
  document.getElementById("roverError").innerHTML = "";

  document.getElementById("date").value = "";
  document.getElementById("dateError").innerHTML = "";
}