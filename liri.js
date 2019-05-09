require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var myCommand = process.argv[2];
var myQuery = ""

for (var x = 3; x < process.argv.length; x++) {
    myQuery = myQuery + process.argv[x] + " ";
};
myQuery = myQuery.trim();

if (myCommand === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        myCommand = dataArr[0];
        myQuery = dataArr[1];
        runMyCommand();
    });
} else {
    runMyCommand();
}

function runMyCommand() {
    if (myCommand === "concert-this") {
        axios.get("https://rest.bandsintown.com/artists/" + myQuery + "/events?app_id=codingbootcamp").then(
            function(res) {
                for (var x = 0; x < res.data.length; x++) {
                    console.log("Venue: " +res.data[x].venue.name);
                    console.log("Venue Location: " +res.data[x].venue.city + ", " + res.data[x].venue.region + " " + res.data[x].venue.country);
                    console.log("Date: " +moment(res.data[x].datetime).format("MM/DD/YYYY"));
                    console.log("------------------------------------------------")
                }
            }
        );
    } else if (myCommand === "spotify-this-song") {
        if (myQuery === "") {myQuery = "Ace of Base The Sign"}
        spotify
            .search({ type: 'track', query: myQuery, limit: 1})
            .then(function(res) {
                console.log(JSON.stringify(res.tracks.items[0].artists[0].name, null, 2));
                console.log(JSON.stringify(res.tracks.items[0].name, null, 2));
                console.log(JSON.stringify(res.tracks.items[0].preview_url, null, 2));
                console.log(JSON.stringify(res.tracks.items[0].album.name, null, 2));
            })
            .catch(function(err) {
                console.log(err);
        });
    } else if (myCommand === "movie-this") {
        if (myQuery === "") {myQuery = "Mr. Nobody"}
        axios.get("http://www.omdbapi.com/?t="+myQuery+"&y=&plot=short&apikey=trilogy").then(
        function(res) {
            console.log("Movie Title: " +res.data.Title);
            console.log("Year: " +res.data.Year);
            console.log("IMDB Rating: " +res.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " +res.data.Ratings[1].Value);
            console.log("Country Produced: " +res.data.Country);
            console.log("Language: " +res.data.Language);
            console.log("Plot: " +res.data.Plot);
            console.log("Actors: " +res.data.Actors);
        });
    }; 
};    

