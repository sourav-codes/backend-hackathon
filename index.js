const express = require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');

var app = express()
app.get("/",function(request,response){
response.send("Team crazy coopers")
})
app.listen(10000, function () {
console.log("Started application on port %d", 10000)
});

const uri = "mongodb+srv://hackathon:hB3ScjSnlPq06hSi@cluster0.3zzvg80.mongodb.net/?retryWrites=true&w=majority";


async function main(){

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
        // Connect to the MongoDB cluster
        await client.connect(
            console.log('Connected to Mongodb')
        );

 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);