var express = require('express');
var router = express.Router();
var multiparty = require("multiparty");

var GoodsModel = require("../model/Goods");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
  res.render('manage', { title: '后台管理' });
//var goods_list = GoodsModel.find({level: 1}, function (err, docs){
//		console.log(docs);
//		res.json(docs);
//	});
});

router.get('/goods_list', function(req, res, next) {
  res.render('goods_list');
})

router.get('/add_list', function(req, res, next) {
  res.render('add_list');
})

router.get('/login', function(req, res, next) {
  res.render('login', { title: '欢迎登录' });
});

router.post('/api/login4ajax', function(req, res, next) {
	var username = req.body.username;
	var psw = req.body.psw;
	var result = {
		code: 1,
		message: "登录成功"
	};
	if(username == "admin" && psw == "h5h5h5h5"){
		res.json(result);
	}else{
		result.code = 2;
		result.message = "您的用户名或密码错误，请重新填写";
		res.json(result);
	}
})

router.post('/api/add_goods', function(req, res, next) {
	var form = new multiparty.Form({
		uploadDir: "public/images"
	});
	var result = {
		code: 1,
		message: "商品信息添加成功"
	};
	form.parse(req, function(err, body, files){
		if(err) {
			console.log(err);
		}
		console.log(body);
		var goods_name = body.goods_name[0];
		var goods_number = body.goods_number[0];
		var inventory = body.inventory[0];
		var virtual = body.virtual[0];
		var price = body.price[0];
		var imgPath = files["img"][0].path.replace("public\\", "");
		var gm = new GoodsModel();
		gm.goods_name = goods_name;
		gm.goods_number = goods_number;
		gm.inventory = inventory;
		gm.virtual = virtual;
		gm.price = price;
		gm.imgPath = imgPath;
		gm.level = 1;
		gm.save(function(err){
			if(err) {
				result.code = -99;
				result.message = "商品保存失败";
			}
			res.json(result);
		})
	})
});

router.post('/api/goods4ajax', function(req, res, next) {
	console.log(req.body.pageNO);
	var pageNO = req.body.pageNO || 1;
	pageNO = parseInt(pageNO);
	var perPageCnt = req.body.perPageCnt || 15;
	perPageCnt = parseInt(perPageCnt);
//	var condition = req.body.condition;
//	console.log("condition:" + condition);
//	if(condition){
//		GoodsModel.remove({goods_name : condition})
//		console.log(GoodsModel.find({goods_name : condition}))
//	}
	GoodsModel.count({level: 1}, function(err, count){
		console.log("数量:" + count);
		var query = GoodsModel.find({level: 1})
		.skip((pageNO-1)*perPageCnt).limit(perPageCnt);
		query.exec(function(err, docs){
//			console.log(err, docs);
				var result = {
				total: count,
				data: docs,
				pageNO: pageNO,
				perPageCnt: perPageCnt
			}
			console.log(result);
			res.json(result);
		});
	})
})

router.post('/api/remove_goods', function(req, res, next) {
	var condition = req.body.condition;
	GoodsModel.update({goods_name : condition},{$set:{level:2}},function(err){
		if(err){
			console.log(err);
		}else{
			var result = "删除成功";
			res.send(result);
		}
	});
})

router.post('/api/update_goods', function(req, res, next) {
	var condition = req.body.condition;
	GoodsModel.find({goods_name : condition},function(err,doc){
		if(err){
			console.log(err);
		}else{
			console.log("doc:" + doc);
			res.json(doc);
			
		}
	});
})

module.exports = router;
