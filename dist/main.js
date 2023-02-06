let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const fromLocalStorage = JSON.parse( localStorage.getItem("myLeads")) 
const tabBtn=document.getElementById("tab-btn")
if (fromLocalStorage) {
  myLeads=fromLocalStorage
  render(myLeads)
}

tabBtn.addEventListener("click", function() {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
  })

  })

function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
      listItems +=
      `<li>
         <a href= '${leads[i]}' target='_blank'>${leads[i]}
       </a>
     </li>`
    }
   ulEl.innerHTML = listItems
  }

let deleteBtn=document.getElementById("delete-btn")
deleteBtn.addEventListener("dblclick",function() {
  localStorage.clear()
  myLeads=[]
  render(myLeads)
})

let inputBtn = document.getElementById("input-btn")
inputBtn.addEventListener("click", function() {
    
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    
})
//localStorage.clear()
// alternative to innerHtml
// const li= document.createElement("li")
// li.textContent = myLeads[i]
// ulEl.append(li)
//template string (`) next - ${}
