// * Varibles
const userName = document.getElementById("user-name")
const userPassword = document.getElementById("user-password")
const loginButton = document.querySelector(".login-button")
const model = document.querySelector(".model")
console.log(model);

 

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
    // console.log(response);
    
    if (!response.ok) {
        throw Error("Error From Server")
    }
   const userData =await response.json()
    // console.log(userData);
    return userData;
    
 } catch (error) {
    console.log(error);
    
    // alert(error) 
 }
}
// * Function
// * Events

loginButton.addEventListener("click",async function(event){
event.preventDefault()
// console.log(await logIn());
const userData = await logIn()
console.log(userData);
if (userData) {
    console.log("checked");
   model.style.transform="transportX(0)"
    
}
else{
    console.log("checkedmmmmmmmmmm");
    
}


})
