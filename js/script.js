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
  } else if (e.target.dataset.reply) {
    handleReplyBtn(e.target.dataset.reply);
  } else if (e.target.dataset.replysend) {
    handleReplySendBtn(e.target.dataset.replysend);
  }
});
// loadEventListeners();
// LocalStorage Functions
// Utility Functions
// Functions
function render() {
  let tweetsHtml = '';

  tweetsData.forEach(function (tweet) {
    let repliesHtml = '';

    tweet.replies.forEach(function (reply) {
      repliesHtml += `
          <div class="tweet-reply">
              <div class="tweet-inner">
                  <img src="${reply.profilePic}" class="profile-pic">
                      <div>
                          <p class="handle">${reply.handle}</p>
                          <p class="tweet-text">${reply.tweetText}</p>
                      </div>
                  </div>
          </div>
          `;
    });

    tweetsHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>

                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>

                    <div class="tweet-details">
                    
                        ${renderReplyBtn(tweet)}

                        ${renderLikeBtn(tweet)}

                        ${renderRetweetBtn(tweet)}
                        
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">

                ${renderReplies(tweet)}
            </div>   
        </div>
        `;
  });

  document.getElementById('feed').innerHTML = tweetsHtml;
}
render();

function renderReplies(tweet) {
  let repliesHtml = `
  <textarea id="reply-input-${tweet.uuid}" class="reply-input"></textarea>
  <button class="reply-btn" data-replysend="${tweet.uuid}">Send</button>
  `;

  tweet.replies.forEach(function (reply) {
    repliesHtml += `
            <div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
            </div>
            `;
  });

  return repliesHtml;
}

function renderReplyBtn(tweet) {
  return `<span class="tweet-detail" id="replies-btn-${tweet.uuid}">
    <i class="fa-regular fa-comment-dots"
    data-reply="${tweet.uuid}"></i>
    ${tweet.replies.length}
    </span>`;
}

function renderLikeBtn(tweet) {
  let likedClass = '';
  if (tweet.isLiked) likedClass = 'liked';

  return `<span class="tweet-detail" id="like-btn-${tweet.uuid}">
    <i class="fa-solid fa-heart ${likedClass}"
    data-like="${tweet.uuid}"></i>
    ${tweet.likes}
    </span>
    `;
}

function renderRetweetBtn(tweet) {
  let retweetedClass = '';
  if (tweet.isRetweeted) retweetedClass = 'retweeted';

  return `<span class="tweet-detail" id="retweet-btn-${tweet.uuid}">
    <i class="fa-solid fa-retweet ${retweetedClass}"
    data-retweet="${tweet.uuid}"></i>
    ${tweet.retweets}
    </span>
    `;
}

function handleLikeBtn(uuid) {
  const targetTweet = getTargetTweet(uuid);

  if (targetTweet.isLiked) {
    targetTweet.likes--;
  } else {
    targetTweet.likes++;
  }
  targetTweet.isLiked = !targetTweet.isLiked;
  document.getElementById(`like-btn-${uuid}`).innerHTML = renderLikeBtn(targetTweet);
}

function handleRetweetBtn(uuid) {
  const targetTweet = getTargetTweet(uuid);

  if (targetTweet.isRetweeted) {
    targetTweet.retweets--;
  } else {
    targetTweet.retweets++;
  }
  targetTweet.isRetweeted = !targetTweet.isRetweeted;

  document.getElementById(`retweet-btn-${uuid}`).innerHTML = renderRetweetBtn(targetTweet);
}

function handleReplyBtn(uuid) {
  document.getElementById(`replies-${uuid}`).classList.toggle('hidden');
}

function handleReplySendBtn(uuid) {
  const replyInput = document.getElementById(`reply-input-${uuid}`).value;
  const targetTweet = getTargetTweet(uuid);

  const reply = {
    handle: `@Scrimba ✅`,
    profilePic: `images/scrimbalogo.png`,
    tweetText: replyInput,
  };

  if (replyInput) targetTweet.replies.unshift(reply);

  //   console.log(document.getElementById(`replies-btn-${tweet.uuid}`).innerHTML);

  document.getElementById(`replies-btn-${uuid}`).innerHTML = renderReplyBtn(targetTweet);

  document.getElementById(`replies-${uuid}`).innerHTML = renderReplies(targetTweet);
}

function getTargetTweet(uuid) {
  return tweetsData.filter(function (tweet) {
    return tweet.uuid === uuid;
  })[0];
}
