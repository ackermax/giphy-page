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
            .addClass("animal btn btn-lg btn-primary")
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
    //make sure none of our buttons have active in them
    $(".animal").removeClass("active");
    //give our button the class of active to show it has been selected
    $(this).addClass("active");
    //empty the #image-holder div
    $("#image-holder").empty();
    //grab our animal name to push through the API
    var animal = $(this).attr("data-name");
    //make our URL to push thorugh the GIPHY API
    var animalURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=4EGhS1dX9sZBAAACNt4FVolnUPNRLVYc&limit=10";

    //Make that AJAX call!
    $.ajax({
        url: animalURL,
        method: "GET"
    }).done(function (r) {

        //if there's no images returned we should let the user know
        if (r.data.length == 0) {
            alert("Sorry, but it appears we couldn't find any images with the name " + animal + ". Please check to see if your spelling is off, make a new button, and try again!")
        }

        //otherwise if we got images back we're good to go!
        else {
            //when we got our stuff we gotta make some still images out of them
            for (var i = 0; i < r.data.length; i++) {
                //make a div to store the image and the rating
                $("<div>")
                    //add class so we can get these buddies looking good
                    .addClass("inline text-center")
                    //give it an id that we can use to append the picture to later
                    .attr("id", "animal" + i)
                    //add the rating to the div
                    .html("<p>Rating: " + r.data[i].rating + "</p>")
                    //append it to the #image-holder div
                    .appendTo("#image-holder");
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
                    //give it a class so we can animate it!
                    .addClass("animal-image")
                    //prepend this to the div with the rating we just made
                    .prependTo("#animal" + i);

            }
        }
    })
};

//function to make our GIFs animate!
function gifAnimate() {
    //if it's static
    if ($(this).attr("is-static") == "yes") {
        //change the static url to the animated one!
        $(this).attr("src", $(this).attr("motion"));
        //change is-static to "no"
        $(this).attr("is-static", "no");
    }
    //otherwise if it's not static
    else {
        //change the animated url to the static one!
        $(this).attr("src", $(this).attr("static"));
        //change is-static back to "yes"
        $(this).attr("is-static", "yes");
    }
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

    //run our function to make gifs animate or go static again
    $(document).on("click", ".animal-image", gifAnimate);

    //call function to make buttons on page load
    makeButtons();

});