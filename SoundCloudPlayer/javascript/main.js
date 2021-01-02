document.querySelector(".js-search").addEventListener('keyup',function(e) 
{
	// If the key Enter is pressed then
	if (e.which ===13 ) 
	{
		submit();
	}
});

function submit()
{
	var input = document.getElementById('inp').value;
	input=input.replace(/ /gi,'+');
	document.getElementById('result').innerHTML="";
	SoundCloudAPI.getTrack(input);

}
var SoundCloudAPI={};
SoundCloudAPI.init=function(){
	SC.initialize({
	  client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
	});

}

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue) {
	SC.get('/tracks', {
	  q: inputValue
	}).then(function(tracks) 
	{
		//console.log(tracks);
		SoundCloudAPI.renderTracks(tracks);
	});

}
//SoundCloudAPI.getTrack("Rilo Kiley");

SoundCloudAPI.renderTracks=function(tracks){
	tracks.forEach(function(track){
		
	var card=document.createElement('div');
	card.classList.add('card');

	var imageDiv=document.createElement('div');
	imageDiv.classList.add('image');

	var image=document.createElement('img');
	image.classList.add('image_img');
	image.src=track.artwork_url||'http://lorempixel.com/100/100/abstract/';
	imageDiv.appendChild(image);

	var content=document.createElement('div');
	content.classList.add('content');

	var header=document.createElement('div');
	header.classList.add('header');
	header.innerHTML='<a href="'+track.permalink_url+'" target="_blank">'+track.title+'</a>';

	var button=document.createElement('div');
	button.classList.add('ui','bottom','attached', 'button', 'js-button');
	var icon=document.createElement('i');
	icon.classList.add('add','icon');
	var buttonText=document.createElement('span');
	buttonText.innerHTML="Add to playlist";

	content.appendChild(header);
	button.appendChild(icon);
	button.appendChild(buttonText);

	button.addEventListener('click',function(){
		SoundCloudAPI.getEmbed(track.permalink_url);
	});

	card.appendChild(imageDiv);
	card.appendChild(content);
	card.appendChild(button);

	var searchResults = document.querySelector(".js-search-results");
	searchResults.append(card);


	});
}

SoundCloudAPI.getEmbed=function(trackURL){
SC.oEmbed(trackURL, {
  auto_play: true
}).then(function(embed){
  //console.log('oEmbed response: ', embed);
  var sidebar = document.querySelector('.js-playlist');
  
  var box=document.createElement('div');
  box.innerHTML=embed.html;
  
  sidebar.insertBefore(box,sidebar.firstChild);
  localStorage.setItem("key",sidebar.innerHTML);

});
}

var sideBar=document.querySelector(".js-playlist");
sideBar.innerHTML=localStorage.getItem("key");

function clearPlaylist() {
	localStorage.clear();
	sideBar.innerHTML="";
}