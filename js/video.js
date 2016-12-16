$(function() {
	var str = location.search;
	str = str.slice(4);
	/*var url = "http://www.bilibilijj.com/Video/Av" + str;
	getData(url,'get',"",null,function(data){
		var url = data.indexOf('DownLoad/Cid');
		var url1 = data.indexOf("' target='_blank'");
		data = data.slice(url+13,url1);
		var url_1 = "http://www.bilibilijj.com/FreeDown/"+data+".php";
		getData(url_1,"get","",null,function(data){
			var data1 = data.indexOf("/FreeDown/DownLoad/");
			var data2 = data.indexOf('" target="_blank" download="BilibiliJJ.COM')
			data = data.slice(data1,data2);
			$("#display .video").html("<source src= http://www.bilibilijj.com/"+ data +">");
		})
		
	})*/
	//弹幕视频加载；
	$("#send").on("touchend",function(){
		var item = {
			info: $("#content_chat").val(), //文字 
			close: true, //显示关闭按钮 
			speed: 6, //延迟,单位秒,默认6 
			color: '#fff', //颜色,默认白色 
			old_ie_color: '#000000', //ie低版兼容色,不能与网页背景相同,默认黑色 
		};
		$('body').barrager(item);
	})
	
	$.ajax({
		url: "http://api.bilibili.com/playurl",
		type: "GET",
		data: {
			aid: str,
			page: 1,
			platform: "html5",
			quality: "2",
			vtype: "mp4",
			type: "jsonp",
			token: window.token || ""
		},
		dataType: "jsonp",
		beforeSend: function() {},
		success: function(data) {
				console.log(data)
				if(data.message == "playurl bad request" || data.message == "bad request") {
					$("#display .title").html("<h3>加载失败！资源可能失效！</h3>");
				} else {
					$("#display .video").attr("poster", data.img);
					$("#display .video").html("<source src=" + data.durl[0].url + ">");

					$.ajax({
						url: data.cid,
						type: "GET",
						success: function(data) {
							var chat = data.getElementsByTagName("d");
							var arr = [];
							for(var i = 0, len = chat.length; i < len; i++) {
								var newData = chat[i].outerHTML;
								var start = newData.indexOf('"');
								var end = newData.indexOf('"', start + 1);
								newData = newData.slice(start + 1, end).split(",");
								newData.push(chat[i].innerHTML);
								arr.push(newData);
							};
							$(".video")[0].addEventListener("timeupdate", function() {
								startTime = newData[4];
								for(var i in arr) {
									var currTime = (arr[i][4] - startTime) >= 0 ? arr[i][4] : arr[i][5];
									if(parseInt(arr[i][4] - startTime) <= this.currentTime) {
										var str = document.createElement("li");
										str.innerHTML = arr[i][8];
										$(".barrage_c").append(str);
										$(str).css({
											position: 'absolute',
											right: '-100vw',
											color: getRandomColor(),
											top: Math.random() * 80 + "%",
										}).animate({
											left: -1000
										}, 15000, function() {
											$(this).remove();
										});
										arr.shift();
										return;
									}
								}
							})
						}
					})

				}
			}
			//						$("#display .video").html("<source src="+ data.durl[0].url +">");
	});
	//ajax
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
	//随机色生成；
	function getRandomColor() {
		var c = '#';
		var cArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
		for(var i = 0; i < 6; i++) {
			var cIndex = Math.round(Math.random() * 15);
			c += cArray[cIndex];
		}
		return c;
	};
})