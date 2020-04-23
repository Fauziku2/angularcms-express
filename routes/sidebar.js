const express = require('express');
const router = express.Router();

// Get Sidebar Model
let Sidebar = require('../models/sidebar');

/*
    GET edit sidebar
 */
router.get('/edit-sidebar', (req, res) => {
    let id = '5e4783384492bf62dc155f9f';
    Sidebar.findById(id, (err, sidebar) => {
        if (err) {
            console.log(err);
        }
        res.json(sidebar)
    })
});


// Post add sidebar
router.post('/edit-sidebar', (req, res) => {
    let id = '5e4783384492bf62dc155f9f';
    let content = req.body.content;
    Sidebar.findById(id, (err, sidebar) => {
        if (err) throw err;
        sidebar.content = content;

        sidebar.save((error) => {
            if (error) {
                console.log(err);
                res.json('problem')
            } else {
                res.json('ok')
            }
        });
    })
});

// Exports
module.exports = router;
