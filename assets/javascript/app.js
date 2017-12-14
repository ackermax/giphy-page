//cute animals for the buttons!
var topics = ["dog", "cat", "guinea pig", "bunny", "armadillo", "fox", "horse"];

//make buttons on page load and each time we add an animal to the list
function makeButtons () {
    
    //empty the button-holder div
    $("#button-holder").empty();

    //for loop to make each button dynamically
    for (var i = 0; i < topics.length; i++) {
        //make the button
        $("<button>")
        //give it the animal class as well as our bootstrap classes
        .addClass("animal btn btn-lg btn-info")
        //give the button an attribute of the animal name
        .attr("data-name", topics[i])
        //add button text
        .text(topics[i])
        //append the button to the #button-holder div
        .appendTo("#button-holder");
    }
};

//function to make animal gifs!
function makeGIF () {
    //grab our animal name to push through the API
    var animal = $(this).attr("data-name");
    //make our URL to push thorugh the GIPHY API
    var animalURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=4EGhS1dX9sZBAAACNt4FVolnUPNRLVYc&limit=10";

    //Make that AJAX call!
    $.ajax({
        url: animalURL,
        method: "GET"
    }).done(function(r){
        console.log(r);
    })
};

$(document).ready(function(){
//function when someone adds an animal button
$("#animal-submit").click(function(e){
    //stops button from doing stupid things I don't want it to do
    e.preventDefault();
    //grab animal choice from text box
    var animal = $("#animal-choice").val().trim();
    //clear text box
    $("#animal-choice").val("");
    //push the choice to the topics array to make buttons DYNAMICALLY (ooooooh)
    topics.push(animal);
    //run the button maker function to make those buttons, yo!
    makeButtons();
})

//call function to make buttons on page load
makeButtons();

});