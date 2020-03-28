const express = require('express')
const convert = require('./lib/convert')
const app = express()
const PORT = 3000
const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query
    if (cotacao && quantidade) {
        const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    } else {
        res.render('cotacao', { error: 'Valores inválidos' })
    }
})

app.listen(PORT, error => {
    if (error) {
        console.log(`Server not started in port: ${PORT}`)
    } else {
        console.log(`Server started ConvertMyMoney in port: ${PORT}`)
    }
})