$(document).ready(function(){

    const snacks = [ "hotdog", "cheese", "pizza", "noodles", "chicken", "fruit", "vegetables", "pasta", "candy"]

    function makeButtons(arrayUse, classAdd, areaAdd){
        $(areaAdd).empty();

        for (var i = 0; i < arrayUse.length; i++) {
            var a = $("<button>");
            a.addClass(classAdd);
            a.attr("data-type", arrayUse[i]);
            a.text(arrayUse[i]);
            $(areaAdd).append(a);
          }

    }
    $(document).on("click", ".snacks-button", function() {
        $("#snacks").empty();
        $(".snacks-button").removeClass("active");
        $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var snackDiv = $("<div class=\"snack-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var stay = results[i].images.fixed_height_still.url;

          var snackImage = $("<img>");
          snackImage.attr("src", stay);
          snackImage.attr("data-stay", stay);
          snackImage.attr("data-animate", animated);
          snackImage.attr("data-state", "stay");
          snackImage.addClass("snack-image");

          snackDiv.append(p);
          snackDiv.append(snackImage);

          $("#snacks").append(snackDiv);
        }
      });

    });
    $(document).on("click", ".snack-image", function() {

        var state = $(this).attr("data-state");
    
        if (state === "stay") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-stay"));
          $(this).attr("data-state", "stay");
        }
      });

      $("#add-snacks").on("click", function(event) {
        event.preventDefault();
        var newSnack = $("input").eq(0).val();
    
        if (newSnack.length > 2) {
          snacks.push(newSnack);
        }
    
    makeButtons(snacks, "snacks-button", "#snacks-buttons");
    
      });
    
    makeButtons(snacks, "snacks-button", "#snacks-buttons");






});