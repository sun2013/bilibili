$(function(){
	/*<li style="margin-bottom: 20px;">
							<a href=<%='video.html?av=' + list[i].aid %> >
								<div class="l">
									<span class="num"><%= i+1 %></span>
									<i>
										<img src=<%= list[i].pic %> />
									</i>
								</div>
								<div class="r">
									<div class="r-box">
										<div class="title"><%= list[i].title %></div>
										<div class="meta">
											<div class="up">UP主：<span><%= list[i].author %></span></div>
										</div>
									</div>
								</div>
							</a>
						</li>*/
	//设置搜索框历史纪录；
	var history = decodeURI(location.search.slice(1));
	$(".nav input").attr("placeholder",history);
	var key = $(".nav input").val();
	var page = 1;
	var url = "http://www.bilibili.com/search?action=autolist&main_ver=v1&pagesize=20&keyword="+encodeURI(key)+"&page="+page+"&order=&tids=-1&type=video"
	getData(url,"get","",null,function(data){
		$("#list ul").html(data)
	})
	
	function getData(url, method, type, before, after, error) {
		var str = url;
		$.ajax({
			type: method,
			url: "php.php",
			async: true,

			data: {
				data: str
			},
			dataType: type,
			beforeSend: before,
			success: after,
			error: error
		});
	}
})
