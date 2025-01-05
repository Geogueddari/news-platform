const axios = require('axios');

const DUMMY_JSON_URL = 'https://dummyjson.com/posts';

const newsController = {
    async getAllNews(req, res) {
        try {
            const response = await axios.get(DUMMY_JSON_URL);
            res.status(200).json(response.data);
        }catch (error) {
            res.status(500).json({message:'Impossible de charger les articles'});
        }
    },

    async getNewsById(req, res) {
        try {
            const {id} = req.params;
            const response = await axios.get(`${DUMMY_JSON_URL}/${id}`);
            res.status(200).json(response.data);
        }catch (error) {
            res.status(500).json({ message: "Impossible de charger l'article" });
        }
    },

    async createNews(req, res) {
        const newArticle = req.body;
        try {
            const response = await axios.post(`${DUMMY_JSON_URL}/add`, newArticle);
            res.status(201).json(response.data);
        } catch (error) {
            res.status(500).json({ message: "Impossible de créer l'article" });
        }
    },

    async updateNewsById(req, res) {
        const { id } = req.params;
        const updatedArticle = req.body;
        try {
            const response = await axios.put(`${DUMMY_JSON_URL}/${id}`, updatedArticle);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: "Impossible de mettre à jour l'article" });
        }
    },

    async deleteNewsById(req, res) {
        const { id } = req.params;
        try {
            const response = await axios.delete(`${DUMMY_JSON_URL}/${id}`);
            res.status(200).json({ message: "Article supprimé avec succès", data: response.data });
        } catch (error) {
            res.status(500).json({ message: "Impossible de supprimer l'article" });
        }
    }
};

module.exports = newsController;