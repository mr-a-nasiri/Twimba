'use strict';

// Import Data
import { tweetsData } from '/js/data.js';

// Elements & Input
// Btn Elements
// Values
// Event listeners
// loadEventListeners();
// LocalStorage Functions
// Utility Functions
// Functions
function render() {
  let feedHtml = '';

  tweetsData.forEach(function (tweet) {
    feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>

                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>

                    <div class="tweet-details">
                    
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots"></i>
                            ${tweet.replies.length}
                        </span>

                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart"></i>
                            ${tweet.likes}
                        </span>

                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet"></i>
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
