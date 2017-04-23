console.log("JS IS LINKED");
var topics = ["sushi", "bbq", "dessert"];

$(document).ready(function () {

    function makeButtons() {
        for (i = 0; i < topics.length; i++) {
            console.log(topics[i]);
            $(".buttonArea").append("<button class='topics' data-topic=" + topics[i] + ">" + topics[i]);
        }
    }

    function addButton() {
        var enteredText = $("#sushiSearch").val().split(" ").join("+");
        console.log(enteredText);
        $(".buttonArea").append("<button class='topics' data-topic=" + enteredText + ">" + enteredText.split("+").join(" "));
    }

    function appendGifs(response) {
        $(".gifArea").empty();
        for (i = 0; i < 10; i++) {
            var gifDiv = $("<div class='col-lg-6'> </div>");
            var rating = $("<h2>").append("Rating: " + response.data[i].rating);
            var gifImage = $("<img>").attr("src", response.data[i].images.fixed_height_downsampled.url);
            gifImage.attr("data-animated", response.data[i].images.fixed_height_downsampled.url);
            gifImage.attr("data-still", response.data[i].images.fixed_height_still.url);
            gifImage.attr("data-status", "animated");
            gifDiv.append(rating);
            gifDiv.append(gifImage);
            $(".gifArea").append(gifDiv);
        }
    }

    function callGifs() {
        var btnValue = $(this).data("topic");
        console.log(btnValue);
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?",
            data: {
                q: btnValue,
                rating: "pg",
                limit: 10,
                api_key: "dc6zaTOxFJmzC"
            },
        }).done(function (response) {
            console.log(response);
            appendGifs(response);
        });
    }

    function playPause() {
        if ($(this).attr("data-status") == "animated") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-status", "still");
        } else {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-status", "animated");
        }
    }

    $(".submit").on("click", function () {
        addButton();
         $('#sushiSearch').val("");
    });

    makeButtons();

    $(document).on("click", ".topics", callGifs);
    $(document).on("click", "img", playPause);

});