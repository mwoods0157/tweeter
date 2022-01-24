$(document).ready(function() {
    // --- our code goes here ---
    $("#tweet-text").on('input', function() { 
        let maxLength = 140;
        let tweetLength = $(this).val().length;
        
        $(this).siblings("div").children(".counter").html(maxLength - tweetLength);
        if (maxLength - tweetLength < 0) {
            $(this).siblings("div").children(".counter").html(maxLength - tweetLength).css("color", "red");
        }
    });
});

