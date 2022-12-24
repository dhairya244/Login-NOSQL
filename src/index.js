const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const LogInCollection = require("./mongo")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


//hbs.registerPartials(partialPath)

app.get('/', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.name === req.body.name) {
            res.status(201).render("signup_success", { naming: `${req.body.name}+${req.body.password}` })
        }
        else {
            res.send("incorrect password")
        }
    }
    catch (e) {
        res.send("wrong details")
    }
})

app.listen(port, () => {
    console.log('port connected');
})