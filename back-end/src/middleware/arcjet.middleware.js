// import aj from "../lib/arcjet.js";
// import { isSpoofedBot } from "@arcjet/inspect";

// export const arcjetProjection = async(req,res,next)=>{
//     try {
//         const decision = await aj.protect(req);

//         if(decision.isDenied()){
//             if(decision.reason.isRateLimit()){
//                 return res.status(429).json({message:"Rate limit exceeded. Please try again later."});
//             }
//         }else if(decision.reason.isBot()){
//             return res.status(403).json({message:"Bot access denied"});
//         }else{
//             return res.status(403).json({
//                 message:"Access denied by security policy."
//             });
//         }
//         //check for spoofed bots
//         if(decision.results.some(isSpoofedBot)){
//             return res.status(403).json({
//                 error:"Spoofed bot detected",
//                 message:"Malicious bot activity detected"
//             });
//         }
//         next();
//     } catch (error) {
//         console.error("Arcjet Projection Error",error);
//     }
// }
import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProjection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    // Agar Arcjet ne request block ki hai:
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Rate limit exceeded. Please try again later." });
      }
      
      if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied" });
      }

      return res.status(403).json({ message: "Access denied by security policy." });
    }

    // Check for spoofed bots
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected",
      });
    }

    // Agar sab theek hai toh aage badhein
    next();
  } catch (error) {
    console.error("Arcjet Projection Error:", error);
    // Error aane par request ko crash hone se bachayein aur aage pass karein
    next();
  }
};