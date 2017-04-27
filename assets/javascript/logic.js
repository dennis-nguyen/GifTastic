var topics = ["sushi", "bbq", "icecream"];
var colors = [
    "red",
    "blue",
    "yellow",
    "orange",
    "teal",
    "black",
    "green",
    "lightblue",
    "darkgrey",
    "pink"
];

$(document).ready(function () {
    function makeButtons() {
        $(".buttonArea").empty();
        if (localStorage.getItem("topics")) {
            topics = JSON.parse(localStorage.getItem("topics"));
        }
        for (i = 0; i < topics.length; i++) {
            $(".buttonArea").append("<button class='topics' data-topic=" + topics[i].split(" ").join("+") + ">" + topics[i]);
        }
    }
    //Adds Buttons, Didn't want to push and call makeButtons every time.
    function addButton() {
        if ($("#sushiSearch").val().length > 0) {
            var enteredText = $("#sushiSearch").val();
            topics.push(enteredText);
            topics = JSON.stringify(topics);
            localStorage.setItem("topics", topics);
        }
        makeButtons();
    }

    function appendGifs(response) {
        $(".gifArea").empty();
        var randomNumber = Math.floor(Math.random() * 10) + 1; //Choosing Random Index for Gifs
        for (i = randomNumber; i < randomNumber + 10; i++) {
            var gifDiv = $("<div class='col-lg-6 text-center'> </div>");
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
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?",
            data: {
                q: btnValue,
                rating: "pg",
                limit: 25,
                api_key: "dc6zaTOxFJmzC"
            }
        }).done(function (response) {
            appendGifs(response);
        });
        changeColor();
    }

    function playPause() {
        if ($(this).attr("data-status") == "animated") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-status", "still");
        } else {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-status", "animated");
        }
        changeColor();
    }

    function clearStorage() {
        topics.splice(topics.length - 1, 1); //Splicing out the last item of the topics array
        topics = JSON.stringify(topics); //
        localStorage.setItem("topics", topics);
        makeButtons();
    }

    function changeColor() {
        $(".topTitle").css(
            "color",
            colors[Math.floor(Math.random() * colors.length)]
        );
    }

    function applyClickHandlers() {
        $(".submit").on("click", function () {
            addButton();
            $("#sushiSearch").val("");
        });
        $(".refund").on("click", function () {
            clearStorage();
        });
    }
    applyClickHandlers();
    makeButtons();

    $(".container-fluid").on("click", ".topics", callGifs);
    $(".container-fluid").on("click", "img", playPause);
});