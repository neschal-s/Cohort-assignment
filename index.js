const express=require('express');
const app=express();


// function isOldEnough(age){
//     if(age>=14)
//         return true;
//     else   
//         return false;
// }

function isOldEnoughMiddleware(req,res,next)
{
    const age=req.query.age;
    if(age>=14)
        next();
    else
    {
        res.status(411).json({
            msg: "sorry you are undeage."
        })
    }
}


app.get("/ride1",isOldEnoughMiddleware,function(req,res){
    res.json({
        msg: "You have successfully riden the ride 1"
    });
});



app.get("/ride2",isOldEnoughMiddleware,function(req,res){
    res.json({
        msg: "You have successfully riden the ride 2"
    });
});

app.listen(3000)