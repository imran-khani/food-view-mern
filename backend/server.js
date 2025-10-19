import app from "./src/app.js";
import connectDB from "./src/db/db.js";

let PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT,()=>{
    console.log(`Server started at http://www.localhost:${PORT}`)
})