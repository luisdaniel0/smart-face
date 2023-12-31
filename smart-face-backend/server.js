import express from "express" 
import cors from "cors"
import knex from "knex"
import bcrypt from "bcryptjs"

const database = knex({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : '',
      password : '',
      database : 'smart-brain'
    }
  }); 
  
       
const app = express();

app.use(express.json());
app.use(cors())


app.get("/", (req, res) => {
  res.send("success");
})

app.post("/signin", (req, res) => {
  const { email, password }  = req.body
  if (!email || !password) {
    return res.status(400).json("incorrect form submission")
  }
  database.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return database.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err=>res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
})

app.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  const hash = bcrypt.hashSync(password)
  if (!email || !password || !name) {
    return res.status(400).json("incorrect form submission")
  }
  database.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    }) 
    
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0])
          })
          .then(trx.commit)
          .catch(trx.rollback)
      })
      .catch(error=>res.status(400).json('Error'))
  })  
    
      
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  database.select('*').from('users').where({
    id: id
  })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not Found')
      }
    })
    .catch(error=>res.status(400).json('Error getting user'))
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  database('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries)
    })
    .catch(error=>res.status(400).json('Error!'))
})

app.listen(3000, () => {
  console.log("port is running on port: 3000")
})