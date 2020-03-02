const routes = require('express').Router();
const multer = require('multer');
const multerConfigs = require('./config/multer');
const Post = require('./models/Post');

routes.get("/", (req, res) => {
    return res.json({ hello: 'World'})
});

routes.get('/posts', async (req, res) => {
    const posts = await Post.find();
    return res.json(posts)
});

// Upload files
routes.post("/posts", multer(multerConfigs).single('file'), async(req, res) => {
    // console.log(req.file);
    const { originalname: name, size, key, location: url = "" } = req.file;
        // name: req.file.originalname,
        // size: req.file.size,
        // key: req.file.fieldname,
        // url: ''
    const uploadFile = await Post.create({
        name,
        size,
        key,
        url,
    });
    
    return res.json(uploadFile)
});

// Delete
routes.delete('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
});

module.exports = routes;