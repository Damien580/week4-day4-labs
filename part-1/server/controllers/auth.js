const bcrypt = require('bcryptjs')

const users = []


module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && bcrypt.compareSync(password, users[i].password)) {
          res.status(200).send(users[i])
          return
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const { username, email, firstName, lastName, password } = req.body
      const salt = bcrypt.genSaltSync(5)
      const hash = bcrypt.hashSync(password, salt)
      console.log(req.body)
      let newUser = {
        username,
        email,
        firstName,
        lastName,
        password: hash
      }
      console.log('Registering User')
        users.push(newUser)
        let userToSend = {...newUser}
        delete userToSend.password
        res.status(200).send(newUser)
    }
}