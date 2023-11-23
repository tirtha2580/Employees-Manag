const express = require('express')
const app = express()
const mysql= require("mysql");
var cors = require('cors')

// const port = 3000
app.use(cors())
app.use(express.json());

const db =mysql.createConnection({
    user:"root",
    host : 'localhost',
    password:"",
    database:"nodedb"
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/employees', (req, res) => {
  const q="SELECT * FROM employees";
  db.query(q,(err,data)=>{
    if(err){
      console.log(err);
      return res.json(err);
}
return res.json(data);
  });
});

app.post("/create",(req,res)=>{
  const name=req.body.name;
  const email=req.body.email;
  const address=req.body.address;
  const salary=req.body.salary;

db.query(
  "INSERT INTO employees  (name,email,address,salary) VALUES (?,?,?,?)",
  [name,email,address,salary],
  (err,result)=> {
    if(err){
      console.log(err);
    } else {
      res.send("Registration Successfully!");
    }
  }
);
});
app.get("/employeesDetails/:id",(req,res)=>{
  const id = req.params.id
  db.query("select * from employees where id = ?",id,(err,result)=>{
    if(err)
    {
      console.log(err)
    }
    else
    {
      res.send(result)
    }
  })
})

app.put("/employees/:id",(req,res)=>{
  const employeesId=req.params.id;
const q = "UPDATE employees SET `name`= ?,`email`= ?,`address`= ?,`salary`= ? WHERE id = ?";

const values = [
  req.body.name,
  req.body.email,
  req.body.address,
  req.body.salary
]

db.query(q,[...values,employeesId],(err,data)=>{
  if(err)return res.send(err);
  return res.json(data);
});
});
app.delete("/employees/:id",(req,res)=>{
  const emp_id = req.params.id;
  const q = "DELETE FROM employees WHERE id = ?";
  db.query(q,[emp_id],(err,data)=>{
    if(err)
    {
      return res.send(err);
    }
    else
    {
      return res.json(data);
    }
  })
})

app.listen(3001, () => {
  console.log(`server is running on port 3001`)
})


// app.get("")

// app.post('/create',(req,res)=>{
//     const name=req.body.name;
//     const email=req.body.email;
//     const address=req.body.address;
//     const salary=req.body.salary;
    
// })