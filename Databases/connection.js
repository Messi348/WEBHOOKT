const moongose = require("mongoose");
const URL = "mongodb://webhook:webhook@139.59.5.96:27017/webhook"

moongose.Promise = global.Promise

module.exports = () => {
    return moongose.connect(URL, {
        useNewUrlParser : true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("con established");
    }).catch(err =>{
        console.log("error => ", err)
        process.exit()
    })
}