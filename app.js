//how does this keyword reference the buttion that was clicked? var foodType?
var foodSearch
var topics = ["pizza", "burger", "pasta", "bacon", "salad"];



function renderButtons(){
    $("#buttonDisplay").empty();
//Creating a for loop to create a button for each string in the array.
    for (var i=0; i < topics.length; i++){
        var a = $("<button>");
        // Adding a class and some bootstrap references to change display of buttons
        a.addClass("moreTopics btn btn-danger btn-lg");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", topics[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(topics[i]);
        // Adding the button to the HTML
        $("#buttonDisplay").append(a);
    }
};

    // This function handles events where one button is clicked
    $("#submitFood").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var addFood = $("#foodSearch").val().trim();
    // The movie from the textbox is then added to our array
    topics.push(addFood);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
    });


     function showFood() {
        // In this case, the "this" keyword refers to the button that was clicked
        var foodType = $(this).attr("data-name");
        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          foodType + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Performing our AJAX GET request
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;
            console.log(results)
            //Looping over every result item
            for (var i = 0; i < results.length; i++) {
  
              // Only taking action if the photo has an appropriate rating
              if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div for the gif
                var gifDiv = $("<div>");
                    gifDiv.addClass("float-left")
                // Storing the result item's rating
                var rating = results[i].rating;
  
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);
  
                // Creating an image tag
                var foodImage = $("<img>");
  
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                // also added appropriate attributes to pull gif stills and animated gifs.
                foodImage.attr({"src": results[i].images.fixed_height_still.url,
                  "data-animate": results[i].images.fixed_height.url,
                  "data-still": results[i].images.fixed_height_still.url,
                  "data-state": "still"
                });

                foodImage.addClass("gif")
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(foodImage);
  
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifDisplay").prepend(gifDiv);
              }
            }
          })};

          $(document).on("click",".gif", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });

          $(document).on("click", ".moreTopics", showFood);
          renderButtons();