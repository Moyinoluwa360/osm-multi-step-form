const navigationControls = (function(){
    // next btn funtionality
    const contentsArr = document.querySelectorAll(".render-element")
    const numArr = document.querySelectorAll(".num")
    let nextBtnTracker = 0
    const nextBtn = document.querySelector(".nextBtn")
    const goBackBtn = document.querySelector(".goBackBtn")
    nextBtn.addEventListener("click",next)
    goBackBtn.addEventListener("click",goBack)
    function next(){
        contentsArr[nextBtnTracker].setAttribute("style","display:none;")
        numArr[nextBtnTracker].setAttribute("style","background-color:inherit;")
        nextBtnTracker++
        if(nextBtnTracker === 1){
            goBackBtn.setAttribute("style", "display:flex")
        }
        if (nextBtnTracker === 3){
            nextBtn.textContent = "Confirm"
        }
        if (nextBtnTracker === 4){
            document.querySelector(".thanks-div").setAttribute("style", "display:flex")
            document.querySelector(".buttons-div").setAttribute("style", "display:none")
        }
        contentsArr[nextBtnTracker].setAttribute("style","display:flex;")
        numArr[nextBtnTracker].setAttribute("style","background-color:hsl(206, 94%, 87%);")  
    }
    function goBack(){
        contentsArr[nextBtnTracker].setAttribute("style","display:none;")
        numArr[nextBtnTracker].setAttribute("style","background-color:inherit;")
        nextBtnTracker--
        if(nextBtnTracker === 0){
            goBackBtn.setAttribute("style", "display:none")
        }
        if (nextBtnTracker === 2){
            nextBtn.textContent = "Next Step"
        }
        contentsArr[nextBtnTracker].setAttribute("style","display:flex;")
        numArr[nextBtnTracker].setAttribute("style","background-color:hsl(206, 94%, 87%);") 
    }
})()

let planName = "Arcade"
let planPrice = "$9/mo"
let duration = "Monthly"
let pickedAddsOn = {}
// select plan functionality
const selectPlan = (function(){
    const plansArr = document.querySelectorAll(".plan")
    plansArr.forEach(plan => {
        plan.addEventListener("click",()=>{
            plansArr.forEach(plan => {
                plan.setAttribute("style","border-color:hsl(229, 24%, 87%);")
            })
            plan.setAttribute("style","border-color:hsl(243, 100%, 62%);")
            const planDivChildren = plan.querySelectorAll("div")
            planName = planDivChildren[1].textContent
            planPrice = planDivChildren[2].textContent
            appendDetailsToSummary()
            updateTotal()
            console.log(planName)
            console.log(planPrice)
        })
    });
})()

const setPlanDuration = (function(){
    const toggleDiv = document.querySelector(".toggle-label")
    toggleDiv.addEventListener("click",()=>{
        if (planName = "Arcade"){
            planPrice = "$90/mo"
        }
        if (duration === "Monthly"){
            duration = "Yearly"
            document.querySelector(".monthly").setAttribute("style","color:hsl(231, 11%, 63%);")
            document.querySelector(".yearly").setAttribute("style","color:hsl(213, 96%, 18%);")
            add2monthsDiv("Yearly")
            appendDetailsToSummary()
            updateTotal()
        }else{
            duration = "Monthly"
            document.querySelector(".monthly").setAttribute("style","color:hsl(213, 96%, 18%);")
            document.querySelector(".yearly").setAttribute("style","color:hsl(231, 11%, 63%);")
            add2monthsDiv("Monthly")
            appendDetailsToSummary()
            updateTotal()
        }
        function add2monthsDiv(duration){
            const planInfoArr = document.querySelectorAll(".plan-info")
            if (duration === "Yearly"){
                planInfoArr.forEach(planInfo => {
                    const monthsFree = document.createElement("div")
                    monthsFree.textContent = "2 months free"
                    monthsFree.setAttribute("style", "color:hsl(213, 96%, 18%);")
                    monthsFree.classList.add("months-free")
                    planInfo.appendChild(monthsFree)
                    planInfo.children[1].textContent = planInfo.children[1].textContent.replace(/(\d{1,2})(\/mo)/,"$10$2")
                })
            }else{
                planInfoArr.forEach(planInfo => {
                    planInfo.children[1].textContent = planInfo.children[1].textContent.replace(/0+(\/mo)/,"$1")
                    planInfo.removeChild(planInfo.querySelector(".months-free"))
                })
            }
        }
    })
})()

// select adds on functions
const addOnsSelection = (function (){
    const addOnsCheckBoxArr = document.querySelectorAll(".add-on-check")
    addOnsCheckBoxArr.forEach(addOnCheckBox => {
        addOnCheckBox.addEventListener("click",()=>{
            if (addOnCheckBox.checked){
                allAddOnCheckBoxSiblings = addOnCheckBox.parentElement.children
                const addOnName = allAddOnCheckBoxSiblings[1].children[0].textContent
                const addOnPrice = addOnCheckBox.parentElement.parentElement.children[1].textContent
                const objName = addOnName.replace(/\s+/g,"")
                pickedAddsOn[objName] = {
                    name : addOnName,
                    price : addOnPrice
                }
                createElementForCheckedAddOns()
                updateTotal()
            }else{
                allAddOnCheckBoxSiblings = addOnCheckBox.parentElement.children
                const addOnName = allAddOnCheckBoxSiblings[1].children[0].textContent
                const addOnPrice = addOnCheckBox.parentElement.parentElement.children[1].textContent
                const objName = addOnName.replace(/\s+/g,"")
                delete pickedAddsOn[objName]
                createElementForCheckedAddOns()
                updateTotal()
            }
        })
    })
})()

// add append details to summmary

const appendDetailsToSummary = function(){
    // plan
    const finishingUp = document.querySelector(".finishing-up")
    document.querySelector(".subscribe-plan-name").textContent = planName
    document.querySelector(".subscribed-plan-price").textContent = planPrice
    document.querySelectorAll(".duration")[0].textContent = duration
    document.querySelectorAll(".duration")[1].textContent = duration
}
appendDetailsToSummary()

function createElementForCheckedAddOns(){
    if(document.querySelector(".subscribed-add-ons").children){
        const oldDivArr = document.querySelectorAll(".subscribed-add-on")
        oldDivArr.forEach(oldDiv =>{
            document.querySelector(".subscribed-add-ons").removeChild(oldDiv)
        })
    }
    Object.values(pickedAddsOn).forEach(obj =>{
        const subscribedAddOn = document.createElement("div")
        subscribedAddOn.classList.add("subscribed-add-on")
        const subscribedName = document.createElement("div")
        subscribedName.classList.add("subscribed-add-on-name")
        subscribedName.textContent = obj.name
        const subscribedPrice = document.createElement("div")
        subscribedPrice.classList.add("subscribed-add-on-price")
        subscribedPrice.textContent = obj.price
        subscribedAddOn.appendChild(subscribedName)
        subscribedAddOn.appendChild(subscribedPrice)
        document.querySelector(".subscribed-add-ons").appendChild(subscribedAddOn)
    })
}

function updateTotal(){
    let total = 0
    let planPriceNum = parseInt(planPrice.match(/\d+/g).join(""))
    total += planPriceNum
    Object.values(pickedAddsOn).forEach(obj =>{
        if (obj.price){
            const objPriceNum = parseInt(obj.price.match(/\d+/g).join(""))
            total += objPriceNum
        }
    })
    document.querySelector(".total").textContent = total
}
updateTotal()