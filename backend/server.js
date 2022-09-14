const app = require('./app')
const dotenv = require('dotenv')
dotenv.config()


app.listen(process.env.PORT, (req, res) => {
    console.log("Connected successfully !!")
})

