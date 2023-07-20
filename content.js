```javascript
let comments = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'SAVE_COMMENT') {
    saveComment(request.data);
  } else if (request.message === 'LOAD_COMMENTS') {
    loadComments(request.data);
  }
});

function saveComment(data) {
  const { url, comment } = data;
  if (!comments[url]) {
    comments[url] = [];
  }
  comments[url].push(comment);
  chrome.storage.sync.set({ [url]: comments[url] }, () => {
    console.log('Comment saved');
  });
}

function loadComments(url) {
  chrome.storage.sync.get(url, (result) => {
    comments[url] = result[url] || [];
    chrome.runtime.sendMessage({
      message: 'COMMENTS_LOADED',
      data: comments[url]
    });
  });
}
```