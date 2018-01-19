var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Goods = new Schema({
    goods_name   : String,
    goods_number : Number,
    inventory    : Number,
    virtual      : Number,
    price        : String,
    imgPath      : String,
    level        : Number,
    create_date: { type: Date, default: Date.now }
});
// 创建model对象
var GoodsModel = mongoose.model('add_goods', Goods);
// 公开对象，暴露接口
module.exports = GoodsModel;