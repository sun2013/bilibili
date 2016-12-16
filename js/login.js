$(function(){
	$.ajax({
		type:"get",
//		url:"passport.bilibili.com/captcha?1481707034555",
		async:true,
		success:function(data){
			console.log(data)
		}
	});
})