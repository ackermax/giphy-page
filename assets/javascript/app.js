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

$(document).ready(function(){
//function when someone adds an animal button
$("#animal-submit").click(function(e){
    //stops button from doing stupid things I don't want it to do
    e.preventDefault();

})

//call function to make buttons on page load
makeButtons();

});