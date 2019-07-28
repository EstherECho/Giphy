// create an array of strings called topics
var topics = ["Tom Hanks", "Tom Brady", "Tom Cruise", "Tom and Jerry", "Tom Brokaw", "Tom Sawyer", "Tom Clancy"];

// take topics in string of arrays and create buttons on HTML
function renderButtons() {
  // make function call that takes each topic in the array and remakes the buttons on the page
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("giph");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $("#buttons-view").append(newButton);
    }
}

  // when user clicks on button, page will grab 10 static images and place on page
  $(".giph").on("click", function() {
    displayGiphInfo();
    });
    
    function displayGiphInfo() {
        var giph = $(this).attr("data-name");
    
        var queryURL="https://api.giphy.com/v1/gifs/search?api_key=aEmDt5ON9DgG82JWzhfw0vorSP9zWX0h&q="+ giph + "&limit=10&offset=0&rating=PG-13&lang=en";

        // Creates AJAX call for the specific person button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            // Retrieves 10 giphs on same topic
          for (i=0; i<response.data.length; i++) {
            var animateUrl=response.data[i].images.original.url;
            var stillUrl=response.data[i].images.original_still.url;

            // under each gif, display rating
            var rating=response.data[i].rating;
            var giphRating=$("<p>").text("Rating: " + rating);
            $("#giph-view").prepend(giphRating);

            // Creates an image tag to hold the giph
            var giphImage= $("<img>");
            giphImage.attr("data-state", "still");
            giphImage.attr("data-still", stillUrl);
            giphImage.attr("src", stillUrl);
            giphImage.attr("data-animate", animateUrl);
            giphImage.attr("class", "clips");
            $("#giph-view").prepend(giphImage);
            }
        })
    }

  $(document).on("click", ".clips", function () {
        console.log("you clicke me!");

        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
        // Then, set the image's data-state to animate
          $(this).attr("data-state", "animate");
        // Else set src to the data-still value
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
  });

  // $(document).on("click", ".clips", animate);
  // console.log("you clicked me!");
    
// add a form to page that takes value from user input and pushes to topics array
$("#submit").on("click", function(event) {

    event.preventDefault();
    
    $("#giph-input").empty();
    // This line of code will grab the input from the textbox
    var giphsToAdd = $("#giph-input").val().trim();
  
    // The text from the textbox is then added to our array
    topics.push(giphsToAdd);
  
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });
  renderButtons();
  $(document).on("click", ".giph", displayGiphInfo);


