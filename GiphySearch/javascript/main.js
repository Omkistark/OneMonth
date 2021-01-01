document.querySelector(".js-go").addEventListener('click',function() 
{
	document.querySelector('.js-container').innerHTML='';
	var input = document.querySelector("input").value;
	//pushToDOM(input);
	sendKey(input);
});

document.querySelector(".js-userinput").addEventListener('keyup',function(e) 
{
	document.querySelector('.js-container').innerHTML=''
	var input = document.querySelector("input").value;
	// If the key Enter is pressed then
	if (e.which ===13 ) 
	{
		//pushToDOM(input);
		sendKey(input)
	}
});

var GiphyAJAXCall = new XMLHttpRequest();
function sendKey(input)
{
	input=input.replace(/ /gi,'+');
	var url = "http://api.giphy.com/v1/gifs/search?q="+input+"&api_key=dc6zaTOxFJmzC";
	// AJAX Request
	GiphyAJAXCall.open( 'GET', url );
	GiphyAJAXCall.send();
}


GiphyAJAXCall.addEventListener('load', function(e) 
{
	var data=e.target.response;
	pushToDOM(data);
});

function pushToDOM(a)
{
	var response=JSON.parse(a);
	var imageURLs = response.data;
	imageURLs.forEach(function(image)
	{
		var src=image.images.fixed_height.url
		document.querySelector('.js-container').innerHTML+='<img src="'+src+'" class="container-image" >';
	})
}