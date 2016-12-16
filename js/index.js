;
(function($) {
	//搜索
	$(".zoom").on("touchend", function() {
		$("#search").show().animate({
			left: 0,
			width: '100vw',
			height: '100vh'
		});
		return false;
	});
	$(".remove").on("touchend", function() {
		$("#search").animate({
			left: '100vw',
			width: 0,
			height:0
		}).hide();
		return false;
	});
	$(".search-top i").on("touchend",function(){
		location.href = "search.html?"+ $(".search-top input").val();
	})
	
	
	//轮播图；
	var url = "http://api.bilibili.com/x/web-show/res/loc?jsonp=jsonp&pf=0&id=23";
	getData(url, "get", 'json', function() {
		$("#banner .swiper-slide").html("<img src='img/loading.gif'/>")
	}, function(data) {
		var html = template("pic_run", data);
		$("#banner ul").html(html);
		var mySwiper = new Swiper(".swiper-container", {
			loop: true,
			auto: 3000,
			coninuous: true,
			pagination: '.swiper-pagination'
		});
	}, function() {
		$("#banner ul").html("加载失败！")
	});

	//热门加载；
	var hot_url = "http://www.bilibili.com/index/ranking-3day.json";
	getData(hot_url, "get", "json", function() {
		$("#hot .hot_error").html("<img src='img/loading.gif'/>");
	}, function(data) {
		var data = data.recommend;
		var html = template("hotList", data);

		$("#hot .content").find("ul").html(html);
	});

	//直播加载；
	var loadingUrl = "http://live.bilibili.com/h5/recommendRooms";
	getData(loadingUrl, "get", "jsonp", function() {
		$("#isLoading .load_error").html("<img src='img/loading.gif'/>");
	}, null, function(data) {
		var data = data.responseText;
		data = JSON.parse(data.slice(1, -2));
		var html = template("loadList", data);
		$("#isLoading .content").find("ul").html(html);
	});

	//番剧更新；
	var update_url = "http://www.bilibili.com/api_proxy?app=bangumi&action=timeline_v2";

	getData(update_url, "get", "json", function() {
		$("#upDate .up_error").html("<img src='img/loading.gif'/>");
	}, function(data) {
		console.log(data)
		var html = template("upList", data);
		$("#upDate .content").find("ul").html(html);
	});

	//动画频道；
	var cartoonUrl = "http://m.bilibili.com/index/ding.html";
	getData(cartoonUrl, "get", "json", function() {
		$("#cartoon,#music,#dance,#game,#technology,#life,#kichiku,#fashion,#happy,#tv,#movie,#ad").find(".car_error").html("<img src='img/loading.gif'/>");
	}, function(data) {
		var cartoonHtml = template("cartoonList", data);
		$("#cartoon .content").find("ul").html(cartoonHtml);
		var musicHtml = template("musicList", data);
		$("#music .content").find("ul").html(musicHtml);
		var danceHtml = template("danceList", data);
		$("#dance .content").find("ul").html(danceHtml);
		var gameHtml = template("gameList", data);
		$("#game .content").find("ul").html(gameHtml);
		var technologyHtml = template("technologyList", data);
		$("#technology .content").find("ul").html(technologyHtml);
		var lifeHtml = template("lifeList", data);
		$("#life .content").find("ul").html(lifeHtml);
		var kichikuHtml = template("kichikuList", data);
		$("#kichiku .content").find("ul").html(kichikuHtml);
		var fashionHtml = template("fashionList", data);
		$("#fashion .content").find("ul").html(fashionHtml);
		var happyHtml = template("happyList", data);
		$("#happy .content").find("ul").html(happyHtml);
		var tvHtml = template("tvList", data);
		$("#tv .content").find("ul").html(tvHtml);
		var movieHtml = template("movieList", data);
		$("#movie .content").find("ul").html(movieHtml);
		var adHtml = template("adList", data);
		$("#ad .content").find("ul").html(adHtml);
	});

	//底层关闭；
	$(".dl-close").on("touchstart", function() {
		$("#b_app_link").slideUp();
	})

	//ajax方法；
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
})(jQuery)