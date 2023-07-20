```javascript
let comments = {};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveButton').addEventListener('click', saveComment);
    document.getElementById('optionsButton').addEventListener('click', openOptions);
    loadComments();
});

function saveComment() {
    let commentInput = document.getElementById('commentInput');
    let comment = commentInput.value.trim();
    if (comment) {
        let url = window.location.href;
        let timestamp = new Date().toISOString();
        if (!comments[url]) {
            comments[url] = [];
        }
        comments[url].push({ comment, timestamp });
        chrome.storage.sync.set({ 'comments': comments }, function() {
            commentInput.value = '';
            displayComments();
        });
    }
}

function loadComments() {
    chrome.storage.sync.get('comments', function(data) {
        comments = data.comments || {};
        displayComments();
    });
}

function displayComments() {
    let url = window.location.href;
    let commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    if (comments[url]) {
        comments[url].forEach(function(commentObj) {
            let listItem = document.createElement('li');
            listItem.textContent = `${commentObj.comment} (${commentObj.timestamp})`;
            commentList.appendChild(listItem);
        });
    }
}

function openOptions() {
    chrome.runtime.openOptionsPage();
}
```