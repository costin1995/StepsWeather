'use strict';

const express = require('express');

const cities = ['Sibiu','Cluj-Napoca','Brasov', 'Timisoara', 'Bucuresti', 'Craiova', 'Medias', 'Constanta', 'Iasi', 'Suceava'];

let app = express();

app.use('/static', express.static(__dirname + '/static'));

app.get('/*', function (req, res) {
  let path = '/';
  let reqPath = trim(req.path, '/');

  if ( reqPath && cities.indexOf(reqPath) === -1 )
	{
    path += 'sections/' + reqPath + '/index.html';
	}
	else 
	{
		path += 'index.html';
	}
  

  res.sendFile(__dirname + path);

  /*setTimeout(function() {
   res.sendFile(__dirname + path);
   }, 1000);*/

});

app.listen(3000, function () {
  console.log('Listening to http://localhost:3000');
});


// Functions
var trim = (function () {
  "use strict";

  function escapeRegex(string) {
    return string.replace(/[\[\](){}?*+\^$\\.|\-]/g, "\\$&");
  }

  return function trim(str, characters, flags) {
    flags = flags || "g";
    if (typeof str !== "string" || typeof characters !== "string" || typeof flags !== "string") {
      throw new TypeError("argument must be string");
    }

    if (!/^[gi]*$/.test(flags)) {
      throw new TypeError("Invalid flags supplied '" + flags.match(new RegExp("[^gi]*")) + "'");
    }

    characters = escapeRegex(characters);

    return str.replace(new RegExp("^[" + characters + "]+|[" + characters + "]+$", flags), '');
  };
}());