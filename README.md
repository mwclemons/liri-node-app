# liri-node-app

##Assignment 

Make a command line node app that takes in parameters and based on the paramenters returns specific data from APIs.  
There were 4 possible commands:
1. node liri.js concert-this <artist/band name here>
    - This command returns the full list of concert dates and venues for the artist/band given in the command line.  This command uses the the Bands in Town Artist Events API.
2. node liri.js spotify-this-song '<song name here>'
    - This command returns the artist, song name, preview link and album of the song given in the command line.  This command uses the Spotify API.
3. node liri.js movie-this '<movie name here>' 
    - This command returns the movie title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot and actors of the movie given in the command line.  This command uses the OMDB API. 
4. node liri.js do-what-it-says
    - This command will run one of the above 3 commands depending on what is in the random.txt file.  

**Bonus** - have the application write the results of the command line inputs to the terminal and to a file called log.txt. 


##Solution
First, I connected the app to all of the proper node packages using require statements.  This allowed the app to use the following packages: node-spotify-api, axios, moment and fs.  Next I added the logic.

The first step in the logic was getting the search type and the value that was being searched for.  These values were put into variables (myCommand and myQuery) by accessing the process.argv array.  

Next the command line that was entered is writen to the file log.txt to reflect in the file what will be retuned.

Next the function runMyCommand is called.  This function is the brains of the app and determines which API to call based on the myCommand variable.  
1. If myCommand is "concert-this", the app will return concert dates for the artist identified in the myQuery variable.
**Example Input:** ![concert-this-input](https://github.com/mwclemons/liri-node-app/raw/master/images/concert-this-input.png)
**Example Output:** ![concer-this-output](https://github.com/mwclemons/liri-node-app/raw/master/images/concert-this-out.png)
2. If myCommand is "spotify-this-song", the app will return details about the song identified in the myQuery variable.
**Example Input:** ![spotify-this-song-input](https://github.com/mwclemons/liri-node-app/raw/master/images/spotify-this-song-input.png)
**Example Output:** ![spotify-this-song-out](https://github.com/mwclemons/liri-node-app/raw/master/images/spotify-this-song-output.png)
3. If myCommand is "movie-this", the app will return details about the movie identified in the myQuery variable.
**Example Input:** ![movie-this-input](https://github.com/mwclemons/liri-node-app/raw/master/images/movie-this-input.png)
**Example Output:** ![movie-this-output](https://github.com/mwclemons/liri-node-app/raw/master/images/movie-this-output.png)
4. If myCommand is "do-what-it-says", myCommand will be updated and myQuery will be defined by what is read from the random.txt file.  And runMyCommand will call itself.  When called again the app will run one of the above based on the updated value of myCommand and myQuery.
**Example Input:** ![do-what-it-says-input](https://github.com/mwclemons/liri-node-app/raw/master/images/do-what-it-says-input.png)
**Example Output:** *See above in 1,2, and 3*

To accomplish writing to a file and console logging the specific data about myQuery, the LogAndWrite function is used.  This is a custom function that is passed a string as an argument.  The function then writes that string to the log.txt file and logs the string in the console.  So LogAndWrite(data) is used throughout the app instead of console.log(data).
 






