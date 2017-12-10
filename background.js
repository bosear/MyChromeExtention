function logMessage(msg){
    chrome.tabs.executeScript({code:"var xuylo = 5; console.log('"+msg+"'); console.log(document.getElementById('1'));"});
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.storage.local.remove('arrMsg');
        chrome.storage.local.set({arrMsg: []});
    }
});
