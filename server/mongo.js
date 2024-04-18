
const { Schema, model, default: mongoose } = require("mongoose");
// mongoose.connect("mongodb+srv://test:test@cluster0.vp4srop.mongodb.net/Artist")
mongoose.connect("mongodb://localhost:27017/Artist")
.then(() => {
    console.log("mongodb connected")
}).catch(() => {
    console.log("failed");
})
const artSchema = new Schema({
    artName: { type: String},
    serial: { type: Number},
    src: { type: String, required: true },
    alt: {type: String},
    bids: [{user: {type: String, required: true}, bid: {type: Number, required: true}}]
}, { versionKey: false });

const artModel = model('artrecords', artSchema);

module.exports = artModel;
