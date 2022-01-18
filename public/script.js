function addImage(src, toName) {
	// Create document fragment to temporarily hold a virtual "fragment" of DOM manipulation
	let tempFrag = document.createDocumentFragment();
	
	let img_container = document.createElement("div");
	img_container.className = "img_container";

	let img_item = document.createElement("div");
	img_item.className = "img_item";
	img_container.appendChild(img_item);

	let anchor = document.createElement("a");
	anchor.href = src;
	anchor.target = "_blank"; // To open href in new tab
	anchor.rel = "noopener noreferrer" // To address tabnabbing vulnerability
	img_item.appendChild(anchor)

	let img = document.createElement("img");
	img.src = src;
	anchor.appendChild(img);

	let desc = document.createElement("div");
	desc.className = "desc";
	img_container.appendChild(desc);

	let desc_text = document.createElement("p");
	desc_text.className = "desc_text";
	desc_text.innerText = "Uploaded By: Soobinator";
	desc.appendChild(desc_text);
	
	// Append img_container div to tempFrag
	tempFrag.appendChild(img_container);
	
	document.querySelector(".img_gallery").appendChild(tempFrag);
}

function loadImages() {
	var imageNames;

	if (!!window.EventSource) {
		var source = new EventSource('/gallery/sendStr/')

		source.addEventListener('message', function(e) {
			imageNames = e.data.split(',');

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
}

loadImages();