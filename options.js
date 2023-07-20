// options.js

document.addEventListener('DOMContentLoaded', function() {
    let saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', saveOptions);
});

function saveOptions() {
    let commentInput = document.getElementById('commentInput').value;
    chrome.storage.sync.set({ 'comments': commentInput }, function() {
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function restoreOptions() {
    chrome.storage.sync.get('comments', function(items) {
        document.getElementById('commentInput').value = items.comments;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);