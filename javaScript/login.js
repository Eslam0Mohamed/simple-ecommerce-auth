// * Varibles
const userName = document.getElementById("user-name")
const userPassword = document.getElementById("user-password")
const loginButton = document.querySelector(".login-button")
const model = document.querySelector(".model")
const modelMessage = document.querySelector(".model-message")
const nameRegex = /^[a-zA-Z]{3,15}$/
const passwordRegex = /^[a-zA-Z]{3,15}$/
const menuBar = document.querySelector(".menu")
const mobileMenu = document.querySelector(".mobile-menu")
const invalidCredentials = document.querySelector(".invalid-credentials")
 

// * Api
async function logIn(){
    if (validation(userName,nameRegex)&&validation(userPassword,passwordRegex)) {
 try {
    const response = await fetch(`https://dummyjson.com/auth/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            username:userName.value,
            password:userPassword.value
        }),
        // credentials:"include"
    })    
    console.log(response);
     const userData =await response.json()
     console.log(userData.message);
       if (userData.message) {
           invalidCredentials.style.display = "block"
           invalidCredentials.textContent = userData.message
           //    throw Error(userData.message)
        }  
        else{
        invalidCredentials.style.display = "none"
    }
     if (!response.ok) {
        throw Error(userData.message)
    }    
    
//    const userData =await response.json()   
    return userData;
    
 } catch (error) {
    console.log(error);
    
 }}
}
// * Function
function validation(element,rege){
if (rege.test(element.value)) {
element.nextElementSibling.style.display = "none"
return true 
}
else{
element.nextElementSibling.style.display = "block"
return false
}
}
// * Events
loginButton.addEventListener("click",async function(event){
event.preventDefault()
const userData = await logIn()

console.log("user data from event" + userData);

// console.log(userData)
if (userData) {
    
   model.style.transform="translateX(0)"
   modelMessage.textContent = "You Will Be Rdirected To Home"
   setTimeout(()=>{
    
    model.style.transform="translateX(120%)"
    location.href = "../index.html"
   },2000)
   localStorage.setItem("userData",JSON.stringify(userData))
}
else{
    console.log("no user data");  
}


})
let isOpened = false
menuBar.addEventListener("click",function(){
    if (isOpened == false) {
        mobileMenu.style.transform = "translateX(0)"
        isOpened = true
    }
    else{
        mobileMenu.style.transform = "translateX(-100%)"
        isOpened = false
    }
})