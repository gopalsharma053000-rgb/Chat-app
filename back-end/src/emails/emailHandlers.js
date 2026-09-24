import { resendClient , sender} from "../lib/resend.js";


export const sendWelcomeEmail = async(email,name)=>{
    const {data , error} = await resendClient.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to:email,
        subject:"Welcome to the Chatify!",
        html:`<h1>This is a Welcome email from ${sender.email}</h1>`,
        text:`${name},Thanks for Joining us.`
    });
    if(error){
        console.error("Failed to Send Welcome Email",error);
    }else{
        console.log("Successfully Send to Welcome Email",data);
    }
};