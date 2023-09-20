const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Site Index']
    res.send('Joshua Beale | CSE 341 - Week 1 | Contacts Part 2');
});

router.use('/contacts', require('./contacts'));

module.exports = router;