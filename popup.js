chrome.storage.local.get("arrMsg", function(data) {
    var span = document.createElement("span");

    if (typeof data.arrMsg === "undefined")
        span.innerHTML = "Всё плохо(";
    else
        span.innerHTML = "Всё хорошо) " + data.arrMsg.toString();

    console.log(data.arrMsg);
    document.body.appendChild(span);
});
