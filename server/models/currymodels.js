const  mongoose  = require("mongoose");

const currySchema = new mongoose.Schema({
    name:{
        type: String,
        require
    },
    varients:[],
    price:[],
    tab_id:{
        type: String,
        require
    },
    tabAllId:{
        type: String,
        require
    },
    rating:{
        type: Number,
        require
    },
    availability:{
        type: String,
        require
    },
    description:{
        type: String,
        require
    },
    image:{
        type: String,
        require
    }
},{
    timestamps: true
});

const currymodels = mongoose.model('curries', currySchema);

module.exports = currymodels;
