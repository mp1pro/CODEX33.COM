(async () => {
// DSChatSDK construction accepts two parameters:
// 1. Chat Room Id
// 2. ID of the iFrame tag
// 3. Dead Simple Chat Public API Key.
    const sdk = new DSChatSDK("o1J4btZoe", "chat-frame", "pub_43666f655169444a326862686262526c653656464d414f683143624a593948316a566e6d575064595967576e7951576e")
// Call the connect method to connect the SDK to the Chat iFrame.
    await sdk.connect();
})();

/**
 * Listening to Message Event.
 * This is triggered Each Time a message arrives in the chat room
 */
sdk.on("message", (message) => {
    console.log("New Message Arrived", message);
});

/**
 * Calling the Join Method to Join the Chat Room
 */
sdk.join({
    uniqueUserIdentifier: "10001"
});

/**
 * Sending a message in the chat room.
 */
sdk.sendMessage("Hello World");

let triggerTabList = document.querySelectorAll('input[data-bs-toggle="tab"]')
let hour = document.getElementById("hours");
//console.log("shoot", triggerTabList)

for (let i = 0; i < triggerTabList.length; i++) {
    console.log("shoot",triggerTabList[i])

    triggerTabList[i].addEventListener('click', function (event) {
        let toShow = triggerTabList[i].attributes[1].nodeValue
        //console.log(" ctoShow ",toShow)

        document.querySelectorAll(".tab-content .tab-pane").forEach(obj=>obj.classList.remove("active","show"));
        //console.log(" ctoShow1 ",triggerTabList[i])
        console.log(" hour ",hour.value)
        if(toShow === "#one-hr-mission" && hour.value === "1"){
            const element = document.getElementById("one-hr-mission")
            element.classList.add("show","active")
        }
        else if(toShow === "#one-hr-mission" && hour.value === "2"){
            const element = document.getElementById("two-hr-mission")
            element.classList.add("show","active")
        }
        else if(toShow === "#one-hr-mission" && hour.value === "4"){
            const element = document.getElementById("four-hr-mission")
            element.classList.add("show","active")
        }
        else if (toShow === "#twenty-hr-web1"){
            const element = document.getElementById("twenty-hr-web1")
            element.classList.add("show","active")
        }
        else if (toShow === "#html5-4hr"){
            const element = document.getElementById("html5-4hr")
            element.classList.add("show","active")
        }
        else if (toShow === "#css-flex"){
            const element = document.getElementById("css-flex")
            element.classList.add("show","active")
        }
        else if (toShow === "#intro-to-js"){
            const element = document.getElementById("intro-to-js")
            element.classList.add("show","active")
        }
        else if (toShow === "#ajax-api"){
            const element = document.getElementById("ajax-api")
            element.classList.add("show","active")
        }
        else if (toShow === "#fetch-api"){
            const element = document.getElementById("fetch-api")
            element.classList.add("show","active")
        }
        // let thisOne = document.getElementById(""+toShow+"")
        // thisOne.classList.add("active","show");
    })
}
/* Setup click in list checks radio*/
const coMission = document.getElementById("co-mission")
coMission.addEventListener("click", (event) => {
    document.getElementById('firstRadio1').click();
});
window.addEventListener("load", (event) => {
    hour.value = "1"
    let on_load = document.getElementById('firstRadio1')
    on_load.click();
    on_load.classList.add("show","active")
    //set button to 1 hour
});
