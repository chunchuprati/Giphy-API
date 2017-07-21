$(document).ready(function(){
//Initialize array of some Animals
var animals = ["dog", "cat", "sparrow", "frog", "snake", "tiger", "elephant", "monkey", "dolphin", "lion", "pig", "eagle", "parrot"];

//display the information through html to display the content

function displayInfo(){
	var animalName = $(this).attr('data-name');
	// var api = "http://api.giphy.com/v1/gifs/search";
	// var key = "?api_key=dc6zaTOxFJmzC"; 
	// var query = "&q=animals";
	// calling giphy - apikey
	var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + animalName +"&api_key=dc6zaTOxFJmzC&limit=10";
	console.log(queryUrl);
		$.ajax({
			 url: queryUrl,
			method:"GET"
		}).done(function(response){
			$('#animals').empty();// Everytime you click the button it erases the previous data from that div
			console.log(response);
			var animalDiv = $("<div class='animalDiv'>");// adding div to store data adding class to that
			var results = response.data;// taking results from the api 
			if (results == ""){
				alert("There is no gif for this selected button");
			}
			
			for (var i = 0; i < results.length; i++){
				var animalDiv = $("<div>");// adding div to the gifs
				animalDiv.addClass("animalDiv");
				//console.log(results[i].images.original.url);
				//pulling rating of gif
				var gifRating = $("<P>").text("Rating: " + results[i].rating);
				animalDiv.append(gifRating);
				var gifImg = $("<img>");//pulling gif images
				gifImg.attr("src", results[i].images.original_still.url);
				//console.log(results[i].images.fixed_height_small_still.url);
				//pulling still gifs
				gifImg.attr("data-still", results[i].images.original_still.url);
				//pulling animate images
				gifImg.attr("data-animate",results[i].images.original.url);

				gifImg.attr("data-state", "still");
				//adding class to that images
				gifImg.addClass("image");
				animalDiv.append(gifImg);
				//adding div of images to animals
				$("#animals").prepend(animalDiv);
			}
		});
	}

function renderbuttons(){
	$("#animal-div").empty();
	for( var i = 0; i < animals.length; i++){
		// adding button from jquery 
		var a = $("<button>");
		// adding class to that button
		a.addClass("btn btn-primary btn-md");
		//adding data to that attribute
		a.attr("data-name", animals[i]);
		a.attr("id","renderBtn");
		//sending text to that button
		a.text(animals[i]);
		//console.log(a.text(animals[i]));
		//adding button from that div
		$("#animal-div").append(a);
	}
 }
 //we are adding buttons through this function
 function addNewButton(){
		$("#add-animal").on("click", function(event){
			event.preventDefault();
			var animal = $("#animal-input").val().trim();
			//console.log(animal);
			if (animals.indexOf(animal.toLowerCase()) === -1)
				animals.push(animal);
			renderbuttons();
		});
	}
	renderbuttons();
	addNewButton();


	//$(document).on("click", "#submit", renderbuttons);
	// When we click the document, we want to target the animal buttons and then run the displayinfo function
	$(document).on("click", "#renderBtn", displayInfo);
	$(document).on("click", ".image", function(){
		var state = $(this).attr('data-state');
		var animate = $(this).attr('data-animate');
		//console.log(animate);
		var still = $(this).attr('data-still');
		//console.log(still);

		if ( state == 'still'){
			$(this).attr("src", animate);
			$(this).attr('data-state','animate');
		}else{
			$(this).attr("src", still);
			$(this).attr('data-state','still');
		}

	});

      //Calling the renderButtons function to display the intial buttons
      	 //renderbuttons();
});