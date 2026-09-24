import app  from "./src/app.js";
import { connectDB } from "./src/db/db.js";
import { ENV } from "./src/lib/env.js";


connectDB();

const PORT = ENV.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});