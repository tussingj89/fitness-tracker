const db = require("../models")

module.exports = function(app){ 
    // database call to get workout information
    app.get("/api/workouts", (req,res) => {  
        db.Workout.find()
        .then(data =>{  
            res.json(data)
        })
        .catch(err => { 
            res.json(err)
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
        db.Workout.find()
        .then(data =>{  
            res.json(data)
        })
        .catch(err => { 
            res.json(err)
        })
    });
    // database call to get workout information
    app.get("/api/workouts/range", (req,res) => {  
        db.Workout.aggregate([ 
            {$unwind: "$exercises"},
            {
              $group: { 
                  _id: "$_id",
                totalDuration: {
                  $sum: "$exercises.duration"
                }
              }
            }],
            ).then(data =>{  
            res.json(data)
            console.log(data)
        })
        .catch(err => { 
            res.json(err)
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