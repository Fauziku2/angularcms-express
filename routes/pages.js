const express = require('express');
const router = express.Router();

// Get Page Model
let Page = require('../models/page');

//Get all pages
router.get('/', (req, res) => {
    Page.find({}, (err, pages) => {
        if (err) console.log(err);
        res.json(pages)
    })
});

//Get a page
router.get('/:slug', (req, res) => {
    let slug = req.params.slug;
    Page.findOne({slug: slug}, (err, page) => {
        if (err) console.log(err);
        res.json(page)
    })
});

    // Post add page
router.post('/add-page', (req, res) => {
    let title = req.body.title;
    let slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
    let content = req.body.content;
    let hasSidebar = req.body.hasSidebar;
    let sidebar = hasSidebar ? 'yes' : 'no';

    Page.findOne({slug: slug}, (err, page) => {
        if (err) console.log(err);

        if (page) {
            res.json('pageExist')
        } else {
            let page = new Page({
                title: title,
                slug: slug,
                content: content,
                sidebar: sidebar
            });
            page.save(() => {
                if (err) {
                    console.log(err);
                } else {
                    res.json('ok')
                }
            })
        }
    })
});

// GET edit page
router.get('/edit-page/:id', (req, res) => {
    let id = req.params.id;

    Page.findById(id, (err, page) => {
        if (err) console.log(err);
        res.json(page)
    })
});

// Post edit page
router.put('/edit-page/:id', (req, res) => {
    let id = req.params.id;
    let title = req.body.title;
    let slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
    let content = req.body.content;
    let hasSidebar = req.body.hasSidebar;
    let sidebar = hasSidebar ? 'yes' : 'no';

    Page.findOne({slug: slug, _id: {'$ne': id}}, (error, p) => {
        if (error) console.log(error);
        if (p) {
            res.json('pageExist');
            return
        }

        Page.findById(id, (err, page) => {
            if (err) console.log(err);
            page.title = title;
            page.slug = slug;
            page.content = content;
            page.sidebar = sidebar;

            page.save((error) => {
                if (error) {
                    console.log(error);
                    res.json('problem')
                } else {
                    res.json('ok')
                }
            })
        })
    });
});

// GET delete page
router.delete('/delete-page/:id', (req, res) => {
    let id = req.params.id;

    Page.findByIdAndDelete(id, (err, page) => {
        if (err) {
            console.log(err);
            res.json('error');
            return
        }
        res.json('ok')
    })
});

// Exports
module.exports = router;
