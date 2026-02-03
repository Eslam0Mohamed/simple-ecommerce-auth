// * Varibles
const userName = document.getElementById("user-name")
const userPassword = document.getElementById("user-password")



// * Api
function logIn(){
 try {
    const response = fetch(`https://dummyjson.com/auth/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        bode:JSON.stringify({
            username:userName.valu,
            password:userPassword
        }),
        credentials:"include"
    })
    if (!response.ok) {
        throw Error("Error From Server")
    }
 } catch (error) {
    console.log(error);
    
    // alert(error) 
 }
}
// * Function
// * Events