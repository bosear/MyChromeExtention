
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

        var div = document.createElement("div");
        div.innerHTML += '<b>' + ++number + '.' + '</b> ' +  msg.funcName + ' ' + msg.code;
        document.body.appendChild(div);
    });
}
