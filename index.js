let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const saveBtn = document.getElementById('input-btn')
const clearBtn = document.getElementById('clear-btn')
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

window.onload = function () {
    inputEl.focus();
    inputEl.select();
  }
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads) {
    let listItems = ""
    

    for (let i=0; i < leads.length; i++){      
        listItems += `
            <li>
                <a target="blank" href="${myLeads[i]}">
                    ${leads[i]}
                </a>
            </li>`
    
    }
    ulEl.innerHTML = listItems 
}

saveBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

})

clearBtn.addEventListener("dblclick", function() {
    myLeads = []
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})


