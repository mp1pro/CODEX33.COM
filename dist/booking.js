let triggerTabList = document.querySelectorAll('input[data-bs-toggle="tab"]')
console.log("shoot", triggerTabList)

for (let i = 0; i < triggerTabList.length; i++) {
    console.log("shoot",triggerTabList[i])

    triggerTabList[i].addEventListener('click', function (event) {
        let toShow = triggerTabList[i].attributes[1].nodeValue
        console.log(" ctoShow ",toShow)

        document.querySelectorAll(".tab-content .tab-pane").forEach(obj=>obj.classList.remove("active","show"));
        console.log(" ctoShow1 ",triggerTabList[i])
        if(toShow === "#one-hr-mission"){
            const element = document.getElementById("one-hr-mission")
            element.classList.add("show","active")
        }
        else if (toShow === "#twenty-hr-web1"){
            const element = document.getElementById("twenty-hr-web1")
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
