const express = require("express")
const bodyparser = require("body-parser")
const MongoClient = require("./Databases/connection")
const app = express()
const WebHookModel = require("./Databases/WebHook.model")

MongoClient().then(()=> {
    console.log("connected")
})
.catch(console.log)

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.get("/",(req,res)=>{
    res.send("welcome to hands on session.....")
})

//get all webhooks
app.get("/api/webhook",(req,res)=>{
    WebHookModel.find().then((wh)=>{
        res.json({
            flag: true,
            data: wh,
            message: "Successfully fetched"
        });
    }).catch(err=>{
        // console.log(err)
        res.json({
            flag: false,
            data: null,
            message: err.message
        })
    })
})

//create webhook
app.post("/api/webhook", (req, res)=>{
    let body = req.body;
    WebHookModel.create(body).then((wh)=>{
        res.json({
            flag: true,
            data: wh,
            message: "Successfully fetched"
        });
    }).catch(err=>{
        res.json({
            flag: false,
            data: null,
            message: err.message
        })
    })
})

// Update webhook

app.put("/api/webhook/:id",(req,res)=>{
    let body = req.body;

    WebHookModel.findByIdAndUpdate(req.params.id, body)
    .then((wh)=>{
        res.json({
            flag: true,
            data: wh, 
            messsage: "Successfully Updated"
        });
    }).catch(err=>{
        res.json({
            flag: false,
            data: null,
            message: err.message
        })
    });
})

app.delete("/api/webhook/:id",(req, res)=>{
    WebHookModel.findByIdAndDelete(req.params.id,(err, wh)=>{
        if(err) {
            res.json({
                flag: false,
                data: null,
                message: err.message
            })
        }
        else {
            res.json({
                flag: true,
                data: wh, 
                messsage: "Successfully Deleted"
            });
        }
    });
})

app.listen(3000)
// .then((wh)=> {
//     console.log("Called")
//     res.json({
//         flag: true,
//         data: wh,
//         message: "Successfully"
//     });
// })