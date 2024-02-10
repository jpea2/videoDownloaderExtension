const inputBtn = document.querySelector("#input-btn")
let myVideos = []
const clearInputBtn = document.querySelector("#clear-input-btn")
const ulEl = document.querySelector("#ul-el")
const inputEl = document.querySelector("#input-el")
const deleteBtn = document.querySelector("#delete-btn")
const inputTabBtn = document.querySelector("#input-tab-btn")
const storedVideosLocal = JSON.parse(localStorage.getItem("myVideos"))
const autoAddTab = document.querySelector("#auto-add-tab-btn")

if (storedVideosLocal) {
    myVideos = storedVideosLocal
    render(myVideos)
}

clearInputBtn.addEventListener("click", function() {
    if (inputEl.value) {
        inputEl.value = ""
    }
})



//.innerHTMl comes at a cost. So do we want it done once or for     
//each time in the loop? Thats why we can set it once at the end of the loop

autoAddTab.addEventListener("click", function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myVideos.push(tabs[0].url)
        localStorage.setItem("myVideos", JSON.stringify(myVideos))
        render(myVideos)
        updateListCount()
    })
})

inputTabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    inputEl.value = tabs[0].url
    })
})

function render(videos) {
    let listItems = ""
    // start // finish // increment
    for (i = 0; i < videos.length; i++){
        listItems += `
        <li class>
            <a href='${videos[i]}' target='_blank'>
                ${videos[i]}
            </a>
            <button onclick="downloadVideo('${videos[i]}')">Download</button>
        </li>
        ` 
    }
    ulEl.innerHTML = listItems
}

//Download link parsing to python 
function downloadVideo(videoLink) {
    console.log(videoLink)
    fetch(videoLink)
    .then(response => response.blob())
    .then(blob => {
        // Create a link element
        const link = document.createElement('a');

        // Create a Blob URL for the video blob
        const url = URL.createObjectURL(blob);

        // Set the link's href to the Blob URL
        link.href = url;

        // Set the download attribute with the desired file name
        link.download = 'video.mp4';

        // Append the link to the document
        document.body.appendChild(link);

        // Trigger a click on the link to start the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
  })
  .catch(error => {
    console.error('Error downloading video:', error);
  });

}


//deletes local storage of saved links
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myVideos = []
    render(myVideos) 
})


inputBtn.addEventListener("click", function () {
    if (inputEl.value){
        myVideos.push(inputEl.value)
        render(myVideos)
        localStorage.setItem("myVideos", JSON.stringify(myVideos))
        console.log(localStorage.getItem("myVideos"))
        inputEl.value = ""
    }
})

render(myVideos)

console.log(storedVideosLocal)


