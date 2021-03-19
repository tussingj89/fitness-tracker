const db = require("../models")

module.exports = function(app){ 
    // database call to get workout information
    app.get("/api/workouts", (req,res) => {  
       db.Workout.aggregate([ 
        {$project: 
            {exercises: 1, day: 1,
            totalDuration: 
            {$sum: "$exercises.duration"}}}
       ])
       .sort({_id: -1})
        .limit(1)
        .then(data =>{
            console.log(data)
            res.json(data)

        })
        .catch(err => { 
            // res.json(err)
            console.log(err)
        })
    });

    // database call to input new exercise into the database
    app.post("/api/workouts", (req,res) => {    
        db.Workout.create({})
        .then(data => res.json(data))
        .catch(err => { 
            res.json(err)
        })
    });
    app.get("/api/workouts/range", (req,res) => {  
        db.Workout.aggregate([ 
            {$project: 
                {exercises: 1, day: 1,
                totalDuration: 
                {$sum: "$exercises.duration"}}}
           ])
        .then(data =>{
            console.log(data)
                res.json(data)
    
            })
            .catch(err => { 
                // res.json(err)
                console.log(err)
            })
        });
    
    // database call to change infromation about a workout
    app.put("/api/workouts/:id",({body,params},res)=>{   
        db.Workout.findByIdAndUpdate(  
         params.id,
         {$push:{exercises:body} },
         {new: true,runValidators:true }
        )
        .then(data => res.json(data))
        .catch(err => { 
            res.json(err)
        })
    });
}