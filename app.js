const express = require('express')
const app = express()
const port = 3000

//api
app.get('/page1', async (request, response) => {

    try{
        //
    }
    catch{
        response.sendStatus(404);
    }
});

//serve frontend directory
app.use(express.static('frontend'));

//custom routes
//app.use('/test', express.static('frontend/test.html'));


//listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`))