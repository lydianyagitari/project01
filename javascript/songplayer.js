
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

var album =[]
var author =[]
var title =[]
var description =[]
var database = firebase.database()
var a = '/connections_' + Math.floor(Math.random() * 1000)
//console.log("random : " + a)
var connectionRef = database.ref(a);
var connectedRef = database.ref(".info/connected");
var counter = 0;
var result;
var currTrack = "";
var currArtist = "";

//Nws api that gives us the latest and trending topics about artists as it plays their tracks
// getBiz();

// function getBiz(){
//    $.ajax({
//     headers : {"Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS"},
//     url :  "https://newsapi.org/v2/everything?q=bitcoin&apiKey=87a7a20aa21946feb272aaf4f7347402",
//     method: "GET"

//   }).then(function(response){
//     var respObject = JSON.parse(response)
//     var size = respObject.message.body.source.length;
//     $('#chartsValues').empty()
//     for(var i=0; i < size; i++){
//       var author = respObject.message.body.source[i].news.author;
//       var title = respObject.message.body.source[i].news.title;
//        var description = respObject.message.body.source[i].description;

//        $("#BizValues").append('playDiv'
//    ));
//     }


//grabbing the artist and song from html

$("#add").on("click", function (event) {
  event.preventDefault()
  console.log("here")
  var artist = $("#inputArtist").val()
  var song = $("#inputSong").val()
  var deezerApi;
  var flag = 0
  if (artist === "" && song === "") {
    // console.log("no input")

  }
  else if (artist === "") {
    // console.log("song only")
    deezerApi = "https://api.deezer.com/search?q=track:" + '"' + song + '"'

  }
  else if (song === "") {
    // console.log("artist only")
    deezerApi = "https://api.deezer.com/search?q=artist:" + '"' + artist + '"'
  }
  else {
    // console.log("song & artist")
    // console.log("artist : " + artist)
    // console.log("song : " + song)
    deezerApi = "https://api.deezer.com/search?q=artist:" + '"' + artist + '"' + " track:" + '"' + song + '"'
  }
  //console.log(deezerApi)
  play(deezerApi, flag)

})


// deezer api
function play(a, flag) {


  var deezerApi = a
  console.log("play: " + deezerApi)
  var flag = flag;
  console.log(flag)

  $.ajax({
    headers: { "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS" },
    url: deezerApi,
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







