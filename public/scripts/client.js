// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */
// //Basic user data for testing purposes
//var $ = require('jquery');

// const data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": "https://i.imgur.com/73hZDYK.png",
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1639421972741
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": "https://i.imgur.com/nlhLi3I.png",
//         "handle": "@rd"
//       },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1639508372741
//     }
// ];

//createTweetElement takes a tweet object and creates an html article block section
// const createTweetElement = function(tweetObj) {
//     //const time = timeago.format(tweetObj.created_at)
//     const $tweet = $(`
//     <article>
//     <header class="tweetHeader">
//       <img src="${tweetObj.user.avatars}" align="top">
//       <p>${tweetObj.user.name}</p>
//       <p id="rightEmail">${tweetObj.user.handle}</p>
//     </header>
//     <footer>
//       <p class="tweetContainer">${tweetObj.content.text}</p>
//       <p class="tweetTime">${Math.round((Date.now() - tweetObj.created_at)/86400000)+ ' Days ago'}</p>
//       <i class="fas fa-flag imageFloatRight"></i>
//       <i class="fas fa-exchange-alt imageFloatRight"></i>
//       <i class="fas fa-heart imageFloatRight"></i>
//     </footer>
//   </article>
//     `);
//     return $tweet;
// }

// const $tweeter = createTweetElement(data);
//console.log($tweeter);

// //renderTweets function which takes an array and appends
// const renderTweets = function(tweetArr) {
//     for (let tweet of tweetArr) {
//         const tweetElem = createTweetElement(tweet);
//         $(".new-tweet").append(tweetElem);
//     }
// }

// //renderTweets call to data for testing
//renderTweets(data);


//JQuery/Ajax request to update html page without reloading
$(document).ready(function() {
    $("#toptweet").submit(function(event) {
        event.preventDefault();
        //console.log("form submitted");
        let value = $(this).children("#tweet-text").val();
        console.log(value);
        if (value === null || value === "") {
            $('.counter').text(140);
            $(this).siblings(".error-tweets").children("#error-char").css("display", "none");
            $(this).siblings(".error-tweets").css("display", "block");
            //return alert("Tweet area is empty. Please write something first.");
        } else if ($(this).children("#tweet-text").val().length > 140) {
            $(this).siblings(".error-tweets").children("#error-empty").css("display", "none");
            $(this).siblings(".error-tweets").css("display", "block");
            $(this).children("#tweet-text").val("");
            $(".counter").text(140).css("color", "#545149");
            return;
            //return alert("Tweets can not be longer than 140 characters. Sorry");
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
        //const time = timeago.format(tweetObj.created_at)
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
            $("#bottom-post").prepend(tweetElem); //Switched from append to prepend
            //console.log("tweeet loaded to page");
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

    

