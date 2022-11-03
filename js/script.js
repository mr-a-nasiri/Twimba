'use strict';

// Import Data
import { tweetsData } from '/js/data.js';

// Elements & Input
// Btn Elements
// Values
// Event listeners
document.addEventListener('click', function (e) {
  if (e.target.dataset.like) {
    handleLikeBtn(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetBtn(e.target.dataset.retweet);
  }
});
// loadEventListeners();
// LocalStorage Functions
// Utility Functions
// Functions
function render() {
  let feedHtml = '';

  tweetsData.forEach(function (tweet) {
    let likedClass = '';
    let retweetedClass = '';

    if (tweet.isLiked) likedClass = 'liked';
    if (tweet.isRetweeted) retweetedClass = 'retweeted';

    retweetedClass = feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>

                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>

                    <div class="tweet-details">
                    
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots"
                            data-reply="${tweet.uuid}"></i>
                            ${tweet.replies.length}
                        </span>

                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likedClass}"
                            data-like="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>

                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetedClass}"
                            data-retweet="${tweet.uuid}"></i>
                            ${tweet.retweets}
                        </span>
                        
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="">
                
            </div>   
        </div>
        `;
  });

  document.getElementById('feed').innerHTML = feedHtml;
}
render();

function handleLikeBtn(uuid) {
  const targetTweet = getTargetTweet(uuid);

  if (targetTweet.isLiked) {
    targetTweet.likes--;
  } else {
    targetTweet.likes++;
  }
  targetTweet.isLiked = !targetTweet.isLiked;
  render();
}

function handleRetweetBtn(uuid) {
  const targetTweet = getTargetTweet(uuid);

  if (targetTweet.isRetweeted) {
    targetTweet.retweets--;
  } else {
    targetTweet.retweets++;
  }
  targetTweet.isRetweeted = !targetTweet.isRetweeted;
  render();
}

function getTargetTweet(uuid) {
  return tweetsData.filter(function (tweet) {
    return tweet.uuid === uuid;
  })[0];
}
