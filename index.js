const express = require("express")
var app = express()
app.get("/",function(request,response){
response.send("Team crazy coopers")
})
app.listen(10000, function () {
console.log("Started application on port %d", 10000)
});