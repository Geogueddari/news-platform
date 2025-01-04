const mockUsers = [
    {
        username : "abdeljabbar",
        password : "123"

    },
    {
        username : "mohammed",
        password : "147"
    }

];

const authController = {
    async signIn(req, res) {
           const user = req.body;
           if(mockUsers.includes(user)){
                res.status.json({message : "user sign in"});
           }
       
    },

    async signUp(req, res) {
        const user = req.body;
           if(mockUsers.includes(user)){
                res.status(400).json({message : "user already exists"});
           }
    },
};

module.exports = authController;