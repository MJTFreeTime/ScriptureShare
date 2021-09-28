function addImage(src, toName) {
    var img = document.createElement("img");
    img.src = src;
    img.alt = toName;
    document.getElementById("images").insertAdjacentHTML("afterbegin", 
    '<div class="img_box" id="g_photo"> \
    <img src="' + src + 
    '"/> \
    </div>'
    )
}

var imageNames;

if (!!window.EventSource) {
    var source = new EventSource('/gallery/sendStr')

    source.addEventListener('message', function(e) {
        imageNames = e.data.split(',');
        console.log(imageNames)

        for (let i = 0; i < imageNames.length; i++) {
            addImage("/pictures/" + imageNames[i], "item" + imageNames[i].substr(5, imageNames[i].length - 10))
        }
    }, false)

    source.addEventListener('open', function(e) {
        console.log("Connected")
    }, false)

    source.addEventListener('error', function(e) {
        if (e.eventPhase == EventSource.CLOSED)
            source.close()
        if (e.target.readyState == EventSource.CLOSED) {
            console.log("Disconnected")
        }
        else if (e.target.readyState == EventSource.CONNECTING) {
            console.log("Connecting...")
        }
    }, false)
    } else {
        console.log("Your browser doesn't support SSE")
}