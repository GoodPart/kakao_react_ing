const express = require('express')
const app = express()
const port = 5000 //포트 번호는 마음대로 >_<

const users = [
    {
        id: "idtest",
        name : "john"
    },
    {
        id: "idtest22",
        name : "john22"
    },

]

app.get('/api/user', (req,res) => {
    res.json(users)
})

app.post('/account/kakao', (req,res)=> {
    res.json()
})

app.get('/', (req, res) => res.send('Hello GoodPart!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))