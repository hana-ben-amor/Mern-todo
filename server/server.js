const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://localhost:27017/mern-todo",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(()=>console.log("Connected to database successfully"))
    .catch(console.error);

const Todo =require("./models/todo")

//CRUD routes
app.get('/todos',async(req,res)=>{
    const todos=await Todo.find();
    res.json(todos);
}
)

app.post('/todo/new',(req,res) => {
    const todo =new Todo({
        text: req.body.text
    });
    todo.save()
    res.json(todo);
});

app.delete('/todo/delete/:id',async (req,res)=>{
    const result=await Todo.findByIdAndDelete(req.params.id);
    res.json(result)
})

app.get('/todo/complete/:id',async (req,res)=>{
    const result=await Todo.findById(req.params.id);
    result.completed=!result.completed
    result.save()
    res.json(result)
})


app.listen(3001,()=>{
    console.log('Server listening on 3001') 
})    