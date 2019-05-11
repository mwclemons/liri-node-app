require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");


var spotify = new Spotify(keys.spotify);

var myCommand = process.argv[2];
var myQuery = process.argv.slice(3).join(" ");

fs.appendFileSync("log.txt", "\n\n"+"$ node liri.js "+myCommand+" "+myQuery, function(err) {

    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }
  
});

runMyCommand();

function runMyCommand() {
    myQuery = myQuery.trim();

    if (myCommand === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function(error, data) {
            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return LogAndWrite(error);
            }
    
            var dataArr = data.split(",");
            myCommand = dataArr[0];
            myQuery = dataArr[1];
            runMyCommand();
        });
    } else if (myCommand === "concert-this") {
        axios.get("https://rest.bandsintown.com/artists/" + myQuery + "/events?app_id=codingbootcamp").then(
            function(res) {
                for (var x = 0; x < res.data.length; x++) {
                    LogAndWrite("Venue: " +res.data[x].venue.name);
                    LogAndWrite("Venue Location: " +res.data[x].venue.city + ", " + res.data[x].venue.region + " " + res.data[x].venue.country);
                    LogAndWrite("Date: " +moment(res.data[x].datetime).format("MM/DD/YYYY"));
                    LogAndWrite("------------------------------------------------")
                }
            }
        );
    } else if (myCommand === "spotify-this-song") {
        if (myQuery === "") {myQuery = "Ace of Base The Sign"}
        spotify
            .search({ type: 'track', query: myQuery, limit: 1})
            .then(function(res) {
                LogAndWrite(JSON.stringify(res.tracks.items[0].artists[0].name, null, 2));
                LogAndWrite(JSON.stringify(res.tracks.items[0].name, null, 2));
                LogAndWrite(JSON.stringify(res.tracks.items[0].preview_url, null, 2));
                LogAndWrite(JSON.stringify(res.tracks.items[0].album.name, null, 2));
            })
            .catch(function(err) {
                LogAndWrite(err);
        });
    } else if (myCommand === "movie-this") {
        if (myQuery === "") {myQuery = "Mr. Nobody"}
        axios.get("http://www.omdbapi.com/?t="+myQuery+"&y=&plot=short&apikey=trilogy").then(
        function(res) {
            LogAndWrite("Movie Title: " +res.data.Title);
            LogAndWrite("Year: " +res.data.Year);
            LogAndWrite("IMDB Rating: " +res.data.imdbRating);
            LogAndWrite("Rotten Tomatoes Rating: " +res.data.Ratings[1].Value);
            LogAndWrite("Country Produced: " +res.data.Country);
            LogAndWrite("Language: " +res.data.Language);
            LogAndWrite("Plot: " +res.data.Plot);
            LogAndWrite("Actors: " +res.data.Actors);
        });
    }; 
};    

function LogAndWrite(myString) {
    console.log(myString);
    fs.appendFileSync("log.txt", "\n"+myString, function(err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
          return console.log(err);
        }
      
    });
}