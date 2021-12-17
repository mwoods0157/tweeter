$(document).ready(function() {
    // --- our code goes here ---
    //console.log('Hey, Ive loaded');
    $("#tweet-text").keypress(function() {
        //console.log(this);
        let maxLength = 140;
        let tweetLength = $(this).val().length;
        //console.log(totalValue);
        $(this).siblings("div").children(".counter").html(maxLength - tweetLength);
        if (maxLength - tweetLength < 0) {
            $(this).siblings("div").children(".counter").html(maxLength - tweetLength).css("color", "red");
        }
    });
});

