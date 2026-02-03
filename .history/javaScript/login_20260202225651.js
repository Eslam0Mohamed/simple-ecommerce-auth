// * Varibles
const userName = document.getElementById("user-name")
const userPassword = document.getElementById("user-password")
const loginButton = document.querySelector(".login-button")
const model = document.querySelector(".model")
const modelMessage = document.querySelector(".model-message")
const regex = /^[a-zA-Z]{3,15}$/

 

// * Api
async function logIn(){
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
    if (!response.ok) {
        throw Error("Error From Server")
    }
   const userData =await response.json()
    return userData;
    
 } catch (error) {
    console.log(error);
    
    // alert(error) 
 }
}
// * Function

// validation(userName,regex)

function validation(element,rege){
if (rege.test(element.value)) {
    console.log(element);
element.nextElementSibling.style.display = "none"
console.log("true");
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
if (validation(userName,regex)&&validation(userName,regex)) {
    
const userData = await logIn()
console.log(userData);
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
    console.log("checkedmmmmmmmmmm");  
}
}
else{
    
}


})
//  ! validation not started yet