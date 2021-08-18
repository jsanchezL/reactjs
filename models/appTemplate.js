const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const AppTemplateSchema = Schema ({
  name: String,
  description: String,
  isSecure: {
    type: Boolean,
    default: true,
  },
  typePlatform: {
    type: String,
    unique: true,
  },
  versionAPI: String,
  avatar: String,
});

module.exports = mongoose.model ('AppTemplate', AppTemplateSchema);
