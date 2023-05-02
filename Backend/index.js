const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require("path")
const adminRoute = require("./routers/adminRoute")
 
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/upload', express.static('upload'));


app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
 
app.use(adminRoute)






const PORT = process.env.PORT || 5000

dotenv.config()


const connect = async () => {
    try {
        mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        
        mongoose.connection.on('connected', () => {
            console.log("DB Connected")
        })
        
        mongoose.connection.on('error', (err) => {
            console.log("this is error", err)
        })
    } catch (error) {
        console.log(error.message);
    }
}
connect()


app.listen(PORT, (req, res) => {
    console.log(`Connection running on ${PORT}`);
})
