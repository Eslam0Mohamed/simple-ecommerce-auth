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
// * Validation Functions
const validators = {
    username: (value) => {
        const regex = /^[a-z0-9_-]{3,15}$/i
        return {
            isValid: regex.test(value),
            error: value.length < 3 ? "Username must be at least 3 characters" : 
                   value.length > 15 ? "Username must not exceed 15 characters" :
                   !/^[a-z0-9_-]+$/i.test(value) ? "Username can only contain letters, numbers, underscore, and hyphen" : ""
        }
    },
    password: (value) => {
        const hasUpperCase = /[A-Z]/.test(value)
        const hasLowerCase = /[a-z]/.test(value)
        const hasNumbers = /[0-9]/.test(value)
        const hasSpecialChar = /[!@#$%^&*]/.test(value)
        const isLongEnough = value.length >= 8
        
        return {
            isValid: isLongEnough && hasUpperCase && hasLowerCase && hasNumbers,
            error: !isLongEnough ? "Password must be at least 8 characters" :
                   !hasUpperCase ? "Password must contain at least one uppercase letter" :
                   !hasLowerCase ? "Password must contain at least one lowercase letter" :
                   !hasNumbers ? "Password must contain at least one number" : ""
        }
    },
    email: (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return {
            isValid: regex.test(value),
            error: !value ? "Email is required" : "Please enter a valid email"
        }
    }
}

function validation() {
    const usernameValidation = validators.username(userName.value.trim())
    const passwordValidation = validators.password(userPassword.value)
    
    if (!usernameValidation.isValid) {
        showValidationError(usernameValidation.error)
        return false
    }
    
    if (!passwordValidation.isValid) {
        showValidationError(passwordValidation.error)
        return false
    }
    
    return true
}

function showValidationError(message) {
    model.style.transform = "translateX(0)"
    modelMessage.textContent = message
    modelMessage.style.color = "#ff4444"
    setTimeout(() => {
        model.style.transform = "translateX(120%)"
    }, 3000)
}

// * Events

loginButton.addEventListener("click",async function(event){
event.preventDefault()
// console.log(await logIn());
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


})
//  ! validation not started yet