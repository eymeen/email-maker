import EmailMaker from "./email-maker";

const button = document.querySelector("#generate")
const input = document.querySelector("#email")

button.addEventListener("click", _=>{
    let username = input.value;
    let file = new EmailMaker(username);

    try{
        if(file.check()){
            file.download("frontend")
        }
    }catch(e){
        console.log(e)
    }
})
