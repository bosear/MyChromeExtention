/*
chrome.storage.local.get("arrMsg", function(data) {
    var span = document.createElement("span");

    if (typeof data.arrMsg === "undefined")
        span.innerHTML = "Всё плохо(";
    else
        span.innerHTML = "Всё хорошо) " + data.arrMsg.toString();

    console.log(data.arrMsg);
    document.body.appendChild(span);
});
*/

var number = 0;
document.addEventListener("DOMContentLoaded", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {}, function(arrMsg) {

            drawCall(arrMsg);
            chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
                drawCall([msg]);
            });


            /*var span = document.createElement("span");

            /!*if (typeof data.arrMsg === "undefined")
             span.innerHTML = "Всё плохо(";
             else*!/
            span.innerHTML += arrMsg.length + ' ';

            document.body.appendChild(span);
            console.log(arrMsg.length);*/
        });
    });
});
/*setInterval(function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {}, function(arrMsg) {
            var span = document.createElement("span");

            /!*if (typeof data.arrMsg === "undefined")
                span.innerHTML = "Всё плохо(";
            else*!/
                span.innerHTML += arrMsg.length + ' ';

            document.body.appendChild(span);
            console.log(arrMsg.length);
        });
    });
}, 100);

chrome.runtime.onMessage.addListener(function(data, sender, sendResponse) {
    console.log(data);
});*/

function drawCall(arrMsg) {

    arrMsg.forEach(function (msg) {
        if (msg.type !== 'nirs')
            return;

        var span = document.createElement("span");

        span.innerHTML += ++number + '. ' +  msg.funcName + ' ';

        document.body.appendChild(span);

    });

}
