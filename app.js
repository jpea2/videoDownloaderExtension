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
        <li>
            <a href='${videos[i]}' target='_blank'>
                ${videos[i]} 
            </a>
        </li>` 
    }
    ulEl.innerHTML = listItems
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


