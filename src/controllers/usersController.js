const axios = require('axios');

const DUMMY_JSON_URL = 'https://dummyjson.com/users';

const usersController = {
    async getUserById(req, res) {
        const {id} = req.params;
        console.log(id);
        try{
            const user = await axios.get(`${DUMMY_JSON_URL}/${id}`);
            res.status(200).json(user.data);
        }catch(error){
            res.status(500).json({message : "impossible de charger l'utilisateur"})
        }
    },
};

module.exports = usersController;