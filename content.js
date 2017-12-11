console.log('content.js!');

var text = "\n" +
    "window.old_eval = window.eval;\n" +
    "document.old_write = document.write;\n" +
    "window.old_setTimeout = window.setTimeout;\n" +
    "\n" +
    /*"window.eval = function (code) {\n" +
    "   logCall('eval', '' + code); \n" +
    "   window.old_eval(code);\n" +
    "}\n" +*/
    "\n" +
    "document.write = function (code) {\n" +
    "   logCall('write', '' + code);\n" +
    "   document.old_write(code);\n" +
    "}\n" +
    "\n" +
    "window.setTimeout = function (code, time) {\n" +
    "   logCall('setTimeout', '' + code + time);\n" +
    "   window.old_setTimeout(code, time);\n" +
    "}\n" +
    "\n" +
    "function logCall(funcName, code) {\n" +
    "   var data = {\n" +
    "       funcName: funcName,\n" +
    "       code: code\n" +
    "   };\n" +
    "   console.log('Передано из страницы в content-script.js');\n" +
    "   document.dispatchEvent(new CustomEvent('extension', {detail: data}));\n" +
    "};\n";



var s = document.createElement("script");
var arrMsg = [], msg = null;
s.textContent = text;
document.documentElement.appendChild(s);

document.addEventListener('extension', function (event) {
    var data = event.detail;
    msg = {
        funcName: data.funcName,
        code: data.code,
        type: 'nirs'
    };
    arrMsg.push(msg);
    chrome.runtime.sendMessage(msg);

});

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        sendResponse(arrMsg);
    }
);

