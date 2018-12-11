
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

// getCharts();  https://umn.bootcampcontent.com/University-of-Minnesota-Boot-Camp/MINSTP201808FSF4/blob/master/01-Class-Content/06-ajax/01-Activities/11-BandsInTownApp/Solved/bands-in-town-solved.html

// function getCharts(){
//    $.ajax({
//     headers : {"Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS"},
//     url :  "https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=2538b3b1d406a3ddd6b776c21163d924",
//     method: "GET"

//   }).then(function(response){
//     var respObject = JSON.parse(response)
//     var size = respObject.message.body.track_list.length;
//     $('#chartsValues').empty()
//     for(var i=0; i < size; i++){
//       var trackName = respObject.message.body.track_list[i].track.track_name;
//       var album_name = respObject.message.body.track_list[i].track.album_name;
//        var artist_name = respObject.message.body.track_list[i].track.artist_name;

//        $("#chartsValues").append(("<tr> " +
//    " <td > " + trackName +" </td> "+
//    " <td> " + artist_name +" </td> "+
//    " <td> " + album_name +" </td> "
//    ));
//     }

//grabbing the artist and song from html

$("#add").on("click", function (event) {
  event.preventDefault()
  console.log("here")
  var artist = $("#inputArtist").val()
  var song = $("#inputSong").val()
  var deezerApi;
  // var musicMatchApi;
  var flag = 0
  if (artist === "" && song === "") {
    // console.log("no input")

  }
  else if (artist === "") {
    // console.log("song only")
    deezerApi = "https://api.deezer.com/search?q=track:" + '"' + song + '"'
    //musicMatchApi =http://api.musixmatch.com/ws/1.1/track.search?q_artist=track: " + '"' + song + '"'
  }
  else if (song === "") {
    // console.log("artist only")
    deezerApi = "https://api.deezer.com/search?q=artist:" + '"' + artist + '"'
    //musicMatchApi =http://api.musixmatch.com/ws/1.1/track.search?q_artist: " + '"' + artist + '"'
  }
  else {
    // console.log("song & artist")
    // console.log("artist : " + artist)
    // console.log("song : " + song)
    deezerApi = "https://api.deezer.com/search?q=artist:" + '"' + artist + '"' + " track:" + '"' + song + '"'
    //musicMatchApi = http://api.musixmatch.com/ws/1.1/track.search?q_artist: " + '"' + artist + '"' + " track:" + '"' + song + '"'
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







