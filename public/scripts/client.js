//JQuery/Ajax request to update html page without reloading
$(document).ready(function() {
    $("#toptweet").submit(function(event) {
        event.preventDefault();
        let value = $(this).children("#tweet-text").val();
        if (value === null || value === "") {
            $('.counter').text(140);
            $(this).siblings(".error-tweets").children("#error-char").css("display", "none");
            $(this).siblings(".error-tweets").css("display", "block");
            $(this).siblings(".error-tweets").children("#error-empty").css("display", "block");
            return;
        } else if ($(this).children("#tweet-text").val().length > 140) {
            $(this).siblings(".error-tweets").children("#error-empty").css("display", "none");
            $(this).siblings(".error-tweets").css("display", "block");
            $(this).siblings(".error-tweets").children("#error-char").css("display", "block");
            $(this).children("#tweet-text").val("");
            $(".counter").text(140).css("color", "#545149");
            return;
        }
        $(this).siblings(".error-tweets").css("display", "none");
        $.ajax({
            url: "/tweets/",
            type: "POST",
            data: $(this).serialize(),
            success: function(data) {
                console.log('success!');
                loadTweets(data);
            }
        })
        
    })
    const createTweetElement = function(tweetObj) {
        const $tweet = $(`
        <article>
        <header class="tweetHeader">
          <img src="${tweetObj.user.avatars}" align="top">
          <p>${tweetObj.user.name}</p>
          <p id="rightEmail">${tweetObj.user.handle}</p>
        </header>
        <footer>
          <p class="tweetContainer">${escape(tweetObj.content.text)}</p>
          <p class="tweetTime">${Math.round((Date.now() - tweetObj.created_at)/86400000)+ ' Days ago'}</p>
          <i class="fas fa-flag imageFloatRight"></i>
          <i class="fas fa-exchange-alt imageFloatRight"></i>
          <i class="fas fa-heart imageFloatRight"></i>
        </footer>
      </article>
        `);
        return $tweet;
    }


    const renderTweets = function(tweetArr) {
        for (let tweet of tweetArr) {
            const tweetElem = createTweetElement(tweet);
            $("#bottom-post").prepend(tweetElem); 
        }
    }

    const loadTweets = function() {
        $.ajax({
            url: "/tweets/",
            type: "GET",
        }).done(function($tweet) {
            renderTweets($tweet);
            console.log("tweets loaded to page");
        });
    };
    loadTweets();
});

const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

    

