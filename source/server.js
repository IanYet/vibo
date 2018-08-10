const express = require('express')

const app = express()

app.use(express.static(`${__dirname}/post`))
app.listen(8930, () => {
    console.log('server started. Please visit http://localhost:8930/2018/08/vi-blog.html')
})