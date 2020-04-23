const mongoose = require('mongoose');

// Sidebar Schema
const SidebarSchema = mongoose.Schema({
    content: {
        type: String
    }
}, { collection: 'sidebar' });

const Sidebar = module.exports = mongoose.model("Sidebar", SidebarSchema);
