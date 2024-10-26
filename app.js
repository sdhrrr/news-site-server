require('dotenv').config();
const express = require("express")
const cors = require("cors");
const app = express()
const port =  process.env.PORT || 3000

const API_KEY = process.env.API_KEY
app.use(cors())

app.get('/news/:country?/:category?' , (req , rsp) =>{
    url = urlBuilder(req.params.country , req.params.category)
    var request = new Request(url)

    fetch(request)
        .then(function(response) {

            if(!response.ok){
                throw new Error(`Response status not 200 status ${response.status}`)
            }

            return response.json()
        })
        .then(function(data){
            console.log(data)
            rsp.send(data)
        })
        .catch((e)=>{
            console.log(`Fetch error: ` , e)
            rsp.status(500).send("Failed to fetch data")
        })
})


function urlBuilder(country , category) {
    let url = `https://newsapi.org/v2/top-headlines`

    if(category) {
        url += `?category=${category}`
        url += `&apiKey=${API_KEY}`
        return url
    }

    if(country) {
        url += `?country=${country}`
    }else {
        url += `?country=us`
    }

    url += `&apiKey=${API_KEY}`

    return url
}

app.listen(port , ()=>{console.log(`Listing on ${port} port`)})