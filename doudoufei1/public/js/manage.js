
$(".top_nav li").mouseenter(function(){
	$(this).css("background","#575757");
})
$(".top_nav li").mouseleave(function(){
	$(this).css("background","#303030");
})
$(".middle_nav li").mouseenter(function(){
	$(this).css("background","#666");
})
$(".middle_nav li").mouseleave(function(){
	$(this).css("background","#575757");
})
$(".left_list li").mouseenter(function(){
	$(this).css("background","#454545");
})
$(".left_list li").mouseleave(function(){
	$(this).css("background","#575757");
})
$(".left_list2 li").mouseenter(function(){
	$(this).css("background","#797979");
})
$(".left_list2 li").mouseleave(function(){
	$(this).css("background","#575757");
})
$(".left_list li").click(function(e){
	e.stopPropagation();
	$(this).find(".left_list2").toggle();
})
function toggle(){
	var toggle = true;
	$(".left_list li").click(function(e){
		e.stopPropagation();
		if(toggle){
			$(this).find("em").html("-");
			toggle = false;
		}else{
			$(this).find("em").html("+");
			toggle = true;
		}
		
	})
}
toggle();

