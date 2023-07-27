const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const mongoURL='mongodb+srv://bitebuddy:Shashank2910@cluster0.ucx3jwn.mongodb.net/bitebuddymern?retryWrites=true&w=majority'

const mongoDB=async()=>{
    await mongoose.connect(mongoURL, {useNewUrlParser: true},async(err,result)=>{    
        if(err) console.log("---",err)
        else{
            console.log("Connected Successfully");
            const fetched_data=await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err,data){
                const foodCategory=await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function(err,catData){
                    if(err) console.log(err);
                    else{
                        global.food_items=data;
                        global.foodCategory=catData;
                    }
                })
            })
        }
    });
}

module.exports=mongoDB;

