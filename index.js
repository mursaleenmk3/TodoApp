const express=require("express")
const bodyParser=require("body-parser")
require('dotenv').config()
let app=express()
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

const mongoose=require("mongoose")
mongoose.connect(process.env.MONGO_URI)
const trySchema=new mongoose.Schema({
    name:String
})
const item=mongoose.model("task",trySchema)
const todo=new item({
    name:"Create some videos"
})
// todo.save()
app.get("/",(req,res)=>{
    item.find({})
    .then((foundItems)=>{
       res.render("list",{todolist:foundItems})
    })
    .catch((error)=>{
        console.error("Error while saving element:", error);
       

    })

})
app.post("/",(req,res)=>{
    const itemName=req.body.ele1
    const todo4=new item({
        name:itemName
    })
    todo4.save()
    res.redirect("/")
     
})
app.post("/delete",(req,res)=>{
    const checked=req.body.checkbox1
    item.findByIdAndRemove(checked)
    .then(()=>{
        console.log("task done")
        res.redirect("/")
    })
    .catch((error)=>{
        console.error("task is not deleted",error)
    })
})

const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`sever started on port number ${port}`)
})