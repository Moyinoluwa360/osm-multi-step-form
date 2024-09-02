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
            console.log(planName)
            console.log(planPrice)
        })
    });
})()

const setPlanDuration = (function(){
    const toggleDiv = document.querySelector(".toggle-label")
    toggleDiv.addEventListener("click",()=>{
        if (duration === "Monthly"){
            duration = "Yearly"
            document.querySelector(".monthly").setAttribute("style","color:hsl(231, 11%, 63%);")
            document.querySelector(".yearly").setAttribute("style","color:hsl(213, 96%, 18%);")
            add2monthsDiv("Yearly")
        }else{
            duration = "Monthly"
            document.querySelector(".monthly").setAttribute("style","color:hsl(213, 96%, 18%);")
            document.querySelector(".yearly").setAttribute("style","color:hsl(231, 11%, 63%);")
            add2monthsDiv("Monthly")
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
                })
            }else{
                console.log('kkkkkkkkkk')
                planInfoArr.forEach(planInfo => {
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
                const addOnName = allAddOnCheckBoxSiblings[1].children[0]
                const addOnPrice = addOnCheckBox.parentElement.parentElement.children[1]
            }
        })
    })
})()