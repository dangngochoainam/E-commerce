const dotenv = require('dotenv')
dotenv.config()
const app = require('./app')


app.listen(process.env.PORT, (req, res) => {
    console.log("Connected successfully !!")
})

