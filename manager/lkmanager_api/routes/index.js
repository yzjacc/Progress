import express from 'express';
const router = express.Router({});


router.get('/', (req, res, next)=>{
    res.render('index.html');
});

module.exports = router;