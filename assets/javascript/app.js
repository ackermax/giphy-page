//cute animals for the buttons!
var topics = ["dog", "cat", "guinea pig", "bunny", "armadillo", "shiba inu", "horse"];

//make buttons on page load and each time we add an animal to the list
function makeButtons() {

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
function makeGIF() {
    //empty the #image-holder div
    $("#image-holder").empty();
    //grab our animal name to push through the API
    var animal = $(this).attr("data-name");
    //make our URL to push thorugh the GIPHY API
    var animalURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=4EGhS1dX9sZBAAACNt4FVolnUPNRLVYc&limit=10";
    console.log("Step one!")
    //Make that AJAX call!
    $.ajax({
        url: animalURL,
        method: "GET"
    }).done(function (r) {
        console.log("Step 2!");
        //when we got our stuff we gotta make some still images out of them
        for (var i = 0; i < r.data.length; i++) {
            //make an image tag
            $("<img>")
                //give it an attribute to go back to later so we know its static
                .attr({
                    "is-static": "yes",
                    //give it attributes that place the static and moving urls inside the img
                    "static": r.data[i].images.fixed_width_still.url,
                    "motion": r.data[i].images.fixed_width.url,
                    //give it the static url
                    "src": r.data[i].images.fixed_width_still.url,
                })
                //append this to the #image-holder div
                .appendTo("#image-holder");
            console.log("image " + i);
        }
    })
};

$(document).ready(function () {
    //function when someone adds an animal button
    $("#animal-submit").click(function (e) {
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

    //run our make animal GIF function when an animal is clicked
    $(document).on("click", ".animal", makeGIF);

    //call function to make buttons on page load
    makeButtons();

});