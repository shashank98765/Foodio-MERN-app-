const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');
const mongoURI='mongodb+srv://<username>:<password>@cluster0.0g4nuco.mongodb.net/foodiomern?retryWrites=true&w=majority&appName=Cluster0'

// Connect to MongoDB Atlas

/*mongoose.connect(
  "mongodb+srv://shashankraishetty00:3d2yshashank150803@cluster0.0g4nuco.mongodb.net/foodiomern?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(async () => {
  console.log("Connected to DB");
  //try {
    const fetched_data = await mongoose.connection.db.collection("food_items");
    
    fetched_data.find({}).toArray(async function(err,data){
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        foodCategory.find({}).toArray( function(err,catData){
          if(err) console.log(err);
          else{
            global.food_items=data;
            global.foodCategory=catData;
          }
        })

    });
  })*/

  mongoose.connect(
    "mongodb+srv://<username>:<password>@cluster0.0g4nuco.mongodb.net/foodiomern?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to DB");
    return Promise.all([
      mongoose.connection.db.collection("food_items").find({}).toArray(),
      mongoose.connection.db.collection("foodCategory").find({}).toArray()
    ]);
  })
  .then(([foodItems, categories]) => {
    global.food_items = foodItems;
    global.foodCategory = categories;
  })
  .catch(err => {
    console.error("Error connecting to DB:", err);
  });
  
    //global.food_items = data;
   
 // } //catch (err) {
    //console.error("Error fetching data:", err);
  //}
//.catch((except) => {
//  console.error("Connection error:", except);
//});


app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next()
})


/*mongoose.connect(
  "mongodb+srv://shashankraishetty00:3d2yshashank150803@cluster0.0g4nuco.mongodb.net/foodiomern?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => {
  console.log("Connected to DB");
  const fetched_data=mongoose.connection.db.collection("food_items");
  fetched_data.find({}).toArray(function(err,data){
    if(err) console.log(err);
    else console.log(data);
  })
})
.catch((except) => {
  console.log(except);
})*/


/*const mongoDB= async()=>{
  
  await mongoose.connect(mongoURI,{useNewUrlParser: true},async(err,result)=>{
    if(err) console.log("---",err);
    else{
      console.log("connected to database");
    }
  })
}*/

//const mongoDB = require("./db")
//mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
