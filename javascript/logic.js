
var config = {
  apiKey: "AIzaSyDnoIh_ls25YVOg3CkYj2B-OtheE3ds2gg",
  authDomain: "project-1-1ea90.firebaseapp.com",
  databaseURL: "https://project-1-1ea90.firebaseio.com",
  projectId: "project-1-1ea90",
  storageBucket: "",
  messagingSenderId: "37482486000"
};
firebase.initializeApp(config);


//definition of var values that will be stored in firebase
var playlistURL =[]
var trackName =[]
var artistName =[]
var album =[]
var year =[]
var database = firebase.database()
var a = '/connections_' + Math.floor(Math.random() * 1000)
//console.log("random : " + a)
var connectionRef = database.ref(a);
var connectedRef = database.ref(".info/connected");
var counter = 0;
var result;
var currTrack = "";
var currArtist = "";

 function searchBandsInTown(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
      console.log(response);

      // Constructing HTML containing the artist information
      var artistName = $("<h1>").text(response.name);
      var artistURL = $("<a>").attr("href", response.url).append(artistName);
      var artistImage = $("<img>").attr("src", response.thumb_url);
      var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
      var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
      var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

      // Empty the contents of the artist-div, append the new artist content
      $("#artist-div").empty();
      $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
    });
  }

  // Event handler for user clicking the select-artist button
  $("#select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputArtist = $("#artist-input").val().trim();

    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchBandsInTown(inputArtist);
  });

//grabbing the artist and song from html

$("#add").on("click", function (event) {
  event.preventDefault()
  console.log("here")
  var artist = $("#inputArtist").val()
  var song = $("#inputSong").val()
  var deezerApi;
  //var musicMatchApi;
  var flag = 0
  if (artist === "" && song === "") {
    // console.log("no input")

  }
  else if (artist === "") {
    // console.log("song only")
    deezerApi = "https://api.deezer.com/search?q=track:" + '"' + song + '"'
    //musicMatchApi ="http:api.musixmatch.com/ws/1.1/track.search?q_artist=track: " + '"' + song + '"'
  }
  else if (song === "") {
    // console.log("artist only")
    deezerApi = "https://api.deezer.com/search?q=artist:" + '"' + artist + '"'
    //musicMatchApi ="http://api.musixmatch.com/ws/1.1/track.search?q_artist: " + '"' + artist + '"'
  }
  else {
    // console.log("song & artist")
    // console.log("artist : " + artist)
    // console.log("song : " + song)
    deezerApi = "https://api.deezer.com/search?q=artist:" + '"' + artist + '"' + " track:" + '"' + song + '"'
    //musicMatchApi = "http://api.musixmatch.com/ws/1.1/track.search?q_artist: " + '"' + artist + '"' + " track:" + '"' + song + '"'
  }
  //console.log(deezerApi)
  play(deezerApi, flag)
  //play(musicMatchApi, flag)

})


// deezer api
function play(a, flag) {


  var deezerApi = a
  //var musicMatchApi = a
  console.log("play: " + deezerApi)
  //console.log("play: " + musicMatchApi)
  var flag = flag;
  console.log(flag)

  $.ajax({
    //include the following headers because of CORS policy
    headers: { "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS" },
    url: deezerApi,
    //url : musicMatchApi,
    method: "GET"

  }).then(function (response) {
    console.log(response)
    if (result == null) {
      result = response.data.slice(1);
      counter = 0;
    } else {
      //newCounter = result.length+1;

      result = result.slice(0, counter).concat(response.data.slice(1)).concat(result.slice(counter));
      counter;
      result = result.concat(response.data);
    }


    playMusic(result, result[counter].preview)
    // console.log (playlistId)

  })

};

function playMusic(result, mp3Path) {

  music(mp3Path);

};
//function that will insert media player into html
function music(mp3path) {
  $('#playDiv').empty()
  // the audio control tag and source  

  
  $('#playDiv').append(
    "<audio id='myAudio' controls autoplay><source src='" + mp3path + "' type='audio/mpeg'></audio>"
  )
}

//define what values the api pulls
function writeUserData(playlistURL, trackName, artist, album) {
  connectionRef.push({
    playlistURL: playlistURL,
    trackName: trackName,
    artist: artist,
    album: album,
  })
};

//function that plays a track again when play button is clicked
$('#playAgain').on('click', function () {
  var aud = document.getElementById("myAudio");
  // 
  counter = $(this).data("counter")
  console.log("counter is :" + counter)
  //counter =;
  aud.src = result[counter].preview

})







