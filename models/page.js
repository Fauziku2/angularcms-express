const mongoose = require('mongoose');

// Page Schema
const PageSchema = mongoose.Schema({
    title: {
        type: String
    },
    slug: {
        type: String
    },
    content: {
        type: String
    },
    sidebar: {
        type: String
    }
});

const Page = module.exports = mongoose.model("Page", PageSchema);
