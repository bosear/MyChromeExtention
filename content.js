console.log('content.js!');

var text = "\n" +
    "var old_eval = window.eval;\n" +
    "var old_write = document.write;\n" +
    "var old_setTimeout = window.setTimeout;\n" +
    "\n" +
    /*"window.eval = function (code) {\n" +
    "   logCall('eval', '' + code); \n" +
    "   old_eval(code);\n" +
    "}\n" +*/
    "\n" +
    "document.write = function (code) {\n" +
    "   logCall('write', '' + code);\n" +
    "   old_write(code);\n" +
    "}\n" +
    "\n" +
    "window.setTimeout = function (code, time) {\n" +
    "   logCall('setTimeout', '' + code + time);\n" +
    "   old_setTimeout(code, time);\n" +
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



//chrome.storage.local.set({array: arr});

var s = document.createElement("script");
s.textContent = text;
document.documentElement.appendChild(s);

document.addEventListener('extension', function (event) {
    var data = event.detail;
    chrome.storage.local.get('arrMsg', function (result) {
        var arrMsg = [];
        if (typeof result.arrMsg === 'undefined')
            console.log('Что-то пошло не так(');
        else
            arrMsg = result.arrMsg;
        arrMsg.push({
            funcName: data.funcName,
            code: data.code
        });
        chrome.storage.local.set({arrMsg: arrMsg});
        console.log('Данные получены от страницы и записаны: \n funcName: ' + data.funcName + '\n code: ' + data.code);
    })
});
