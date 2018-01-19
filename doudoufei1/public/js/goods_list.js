AppendStr(1);
//点击下一页
var pageNum = 1;
var pageCnt = "";
function next () {
	var page = $(".page b").html();
	if(page == pageCnt){
		return;
	}
	pageNum = Number(page)+1;
	$(".page b").html(pageNum);
	$(".remove").remove();
	AppendStr(pageNum);
}
function first () {
	pageNum = 1;
	$(".page b").html(pageNum);
	$(".remove").remove();
	AppendStr(pageNum);
}
function last () {
	var page = $(".page b").html();
	if(page == 1){
		return;
	}
	pageNum = Number(page)-1;
	$(".page b").val(pageNum);
	$(".remove").remove();
	AppendStr(pageNum);
}
function end () {
	pageNum = pageCnt;
	$(".page b").html(pageNum);
	$(".remove").remove();
	AppendStr(pageNum);
}


//查询到数据并生成
function AppendStr (pageNum) {
	$.ajax({
  		url: "/api/goods4ajax",
  		type: "post",
  		data: {
  			pageNO:pageNum,
  			perPageCnt:$(".page input").val()
  		},
  		success:function (res) {
  			console.log(res);
  			var data = res.data;
  			var len = data.length;
  			pageCnt = Math.ceil(Number(res.total)/Number(res.perPageCnt));
  			console.log(res.total,res.perPageCnt);
  			$(".page i").html(res.total);
  			$(".page b").html(res.pageNO);
  			$(".page em").html(pageCnt);
  			for(var i = 0;i < len;i ++){
				var str = ` <tr class="remove">
								<td>${i + 1}</td>
								<td>${res.data[i].goods_name}</td>
								<td>${res.data[i].goods_number}</td>
								<td>${res.data[i].price}</td>
								<td><a href="javascript:;"><img src="/images/yes.gif"/></a></td>
								<td><a href="javascript:;"><img src="/images/yes.gif"/></a></td>
								<td><a href="javascript:;"><img src="/images/yes.gif"/></a></td>
								<td><a href="javascript:;"><img src="/images/yes.gif"/></a></td>
								<td>${100}</td>
								<td>${res.data[i].inventory}</td>
								<td>${res.data[i].virtual}</td>
								<td><a href="javascript:;"><img src="/images/icon_view.gif"/></a> <a href="javascript:;"><img src="/images/icon_edit.gif" title="编辑" class="update"/></a> <a href="javascript:;"><img src="/images/icon_copy.gif"/></a> <a href="javascript:;"><img src="/images/icon_trash.gif" title="删除" class="del" /></a></td>
							</tr>`;
						$(".right_bottom_list table").append(str);
			}
  		}
	}) 
}

//删除商品信息	
$("table").delegate(".del","click",function(){
	var condition = $(this).parents("tr").find("td").eq(1).html();
	$(this).parents("tr").remove();
	$.ajax({
  		url: "/api/remove_goods",
  		type: "post",
  		data: {
  			condition:condition
  		},
  		success:function (res) {
  			alert(res);
  		}
	})
})
//编辑商品信息
$("table").delegate(".update","click",function(){
	var condition = $(this).parents("tr").find("td").eq(1).html();
	$.ajax({
  		url: "/api/update_goods",
  		type: "post",
  		data: {
  			condition:condition
  		},
  		success:function (res) {
  			var goods_name = encodeURIComponent(res[0].goods_name);
  			var price = res[0].price;
  			var goods_number = res[0].goods_number;
  			window.location = "/add_list?" + goods_name + "&" + price + "&" + goods_number;
  		}
	})
})
