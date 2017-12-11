
var number = 0;
document.addEventListener("DOMContentLoaded", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {}, function(arrMsg) {

            drawCall(arrMsg);
            chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
                drawCall([msg]);
            });
        });
    });
});

function drawCall(arrMsg) {
    arrMsg.forEach(function (msg) {
        if (msg.type !== 'nirs')
            return;

        var span = document.createElement("span");
        span.innerHTML += ++number + '. ' +  msg.funcName + ' ';
        document.body.appendChild(span);
    });
}
