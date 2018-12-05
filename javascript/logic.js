
  var config = {
    apiKey: "AIzaSyDnoIh_ls25YVOg3CkYj2B-OtheE3ds2gg",
    authDomain: "project-1-1ea90.firebaseapp.com",
    databaseURL: "https://project-1-1ea90.firebaseio.com",
    projectId: "project-1-1ea90",
    storageBucket: "",
    messagingSenderId: "37482486000"
  };
  firebase.initializeApp(config);


var playlistId =[]
var playlistURL =[]
var year =[]
var database = firebase.database()
var a = '/connections_'+ Math.floor(Math.random()*1000)
//console.log("random : " + a)
var connectionRef = database.ref(a);
var connectedRef =  database.ref(".info/connected");
var counter=0;
var result;
var currTrack="";
var currArtist="";

//grabbing the artist and song from html

$("#add").on("click",function(event){
  event.preventDefault()
  console.log("here")
  var artist = $("#inputArtist").val()
  var song = $("#inputSong").val()
  var deezerApi; 
  //var musicdemonsApi;
  var flag = 0
  if (artist === "" && song === "" ){
    // console.log("undefined search")
    
  }
  else if (artist === ""){
    // console.log("no artist was searched")
     deezerApi = "https://api.deezer.com/search?q=track:"+ '"' + song +'"'
    // musicdemonsApi = "https://musicdemons.com/api/v1/song"+ '"' + song + '"'

  }
  else if (song === ""){
    // console.log("no song was searched")
     deezerApi = "https://api.deezer.com/search?q=artist:"+ '"' + artist +'"'
    // musicdemonsApi = "https://musicdemons.com/api/v1/artist"+ '"' + artist + '"'
  }
  else {
    // console.log("search for song & artist")
    // console.log("artist found : " + artist)
    // console.log("song found : " + song)
   deezerApi = "https://api.deezer.com/search?q=artist:"+ '"' + artist +'"'  +" track:"+ '"' + song +'"' 
    // musicdemonsApi = "https://musicdemons.com/api/v1/artist"+ '"' + artist + '"' +" song"+ '"' + song +'"' 
  }
  //console.log(deezerApi)
  //console.log(musicdemonsApi)
  play(deezerApi, flag)
  //play(musicdemonsApi, flag)
  
})



// deezer api
// musicdemonsApi
function play(a , flag){
 
  
  var deezerApi = a
  // var musicdemonsApi = a
  console.log("play: " + deezerApi)
  //console.log("play: " + musicdemonsApi)
  var flag = flag;
  console.log(flag)

  $.ajax({
    headers : {"Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS"},
    url : deezerApi,
    //url : musicdemonsApi,
    method: "GET"

  }).then(function(response){
    console.log(response)
    if(result == null){
      result = response.data.slice(1);
      counter = 0;
    }else{
      //newCounter = result.length+1;

      result = result.slice(0, counter).concat(response.data.slice(1)).concat(result.slice(counter));
      counter;
      result = result.concat(response.data);
    }
  
  
    playMusic(result, result[counter].preview)
  // console.log (playlistId)
    
  })

}
//function that plays music, takes result of search and plays it as MP3
function playMusic(result, mp3Path){
  

  music(mp3Path);

  var aud = document.getElementById("myAudio");
    //   alert("Your music is playing");
  
  aud.onplaying = function() {
      
      currArtist = result[counter].artist.name;
      currTrack =   result[counter].title;
    
};
  
}
//insert media player into html
function music(mp3path){
  $('#playDiv').empty()
  // $('#playDiv').append(
  
  $('#playDiv').append(
    "<audio id='myAudio' controls autoplay><source src='"+mp3path+"' type='audio/mpeg'></audio>
    <button onclick="document.getElementById('myAudio').play()">Play Music</button>
<button onclick="document.getElementById('myAudio').pause()">Pause Music</button>
<button onclick="document.getElementById('myAudio').pause(); document.getElementById('myAudio').currentTime = 0;">Stop Music</button>

  ) 
}

//define api values to be pulled
function writeUserData(playlistURL,trackName,artist,album){
  connectionRef.push({
    playlistURL :playlistURL,
    trackName : trackName,
    artist : artist,
    album : album,
  })
}

//
   $('#playAgain').on('click',function(){
    var aud = document.getElementById("myAudio");
    // 
      counter= $(this).data("counter")
      console.log("counter is :" + counter)
      //counter =;
      aud.src=result[counter].preview
  
  })
  






