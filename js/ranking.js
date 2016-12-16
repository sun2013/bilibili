//   nav
(function() {
	$(".rank-links li").eq(0).find(".arrow").show();
	$(".rank-links li").on("touchstart", function() {
		$(this).find(".arrow").show().end().siblings().find(".arrow").hide();
	});
	//滚动nav
	var mySwiper = new Swiper(".swiper-container", {
		slidesPerView: 5,
		auto: true,
		preventClicks:true
	});
	$("#roll-bar li").on("touchend", function() {
		$(this).find("a").addClass("curr").end().siblings().find("a").removeClass("curr");
	});
	//var url = "http://www.bilibili.com/index/rank/all-7-0.json";

	$("#rank-link li").on("touchend", function() {
		var index = $(this).index();
		var url = "";
		switch(index) {
			case 0:
				url = "data/all-7-0.json";
				break;
			case 1:
				url = "data/origin-7-0.json";
				break;
			case 2:
				url = "data/all-7-33.json";
				
				break;
		};
		if(index == 2){
			$("#roll-bar").hide();
		}
		else{
			$("#roll-bar").show();
		}
		allAjax(url);
	})

	//全部排行；
	var all_url = "data/all-7-0.json";
	allAjax(all_url);
	$("#roll-bar li").on("touchend", function() {
		var index = $(this).index();
		var url = "data/all-7-" + index + ".json";
		allAjax(url);

	});

	function allAjax(url) {
		$.ajax({
			type: "get",
			url: url,
			async: true,
			success: function(data) {
				data = data.rank;
				var html = template("all_rank", data);
				$("#rank ul").html(html);
			}
		});
	}

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
})(jQuery);