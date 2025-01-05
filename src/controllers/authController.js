const mockUsers = [
  {
    userName: "abdeljabbar",
    email: "abdeljabbarelgaddari7@gmail.com",
    password: "123",
  },
  {
    userName: "mohammed",
    email: "mohammedelgaddari5@gmail.com",
    password: "147",
  },
];

const authController = {
  async signIn(req, res) {
    const user = req.body;
    const userPredicate = (mockuser) => mockuser.userName === user.userName && mockuser.password === user.password;

    if (mockUsers.find(userPredicate)) {
      res.status(200).json({ message: "user sign in" });
    } else {
      res.status(400).json({ message: "login or password not valid" });
    }
  },

  async signUp(req, res) {
    const user = req.body;
    const userPredicate = (mockuser) => mockuser.userName  === user.userName || mockuser.email === user.email;

    if (mockUsers.find(userPredicate)){
        res.status(400).json({ message: "user already exists" });
    } else {
        mockUsers.push(user);
        res.status(200).json({ message: "user registred successfully" });
    }
  },
  async resetPassword(req, res) {
    const account = req.body;
    const userPredicate = (mockuser) => mockuser.email === account.email;

    if (mockUsers.find(userPredicate)){
        res.status(200).json({ message: "verify your email box" });
        // send reset password email
    } else {
        mockUsers.push(user);
        res.status(400).json({ message: "any user have this email" });
    }
  },
};

module.exports = authController;