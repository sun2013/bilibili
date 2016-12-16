$(function() {
		$(".dl-close").on("touchstart", function() {
			$("#b_app_link").slideUp();
		});

		//数目统计  接口
		var countInfo = {
			c11: 169,
			c4: 971,
			c129: 36,
			c160: 474,
			c119: 17,
			c1: 127,
			c3: 283,
			c13: 35,
			c36: 254,
			c5: 403,
			c23: 83,
			c155: 89,
			c165: 13
		};
		//ajax;
		var n, g;
		if(countInfo) {
			for(n in countInfo) {
				if(countInfo.hasOwnProperty(n) && (g = countInfo[n], !(0 >= g))) {
					var h = $(".channel-" + n),
						l = $('<i class="channel_num"/>');
					g = 99 < g ? "99+" : g;
					l.text(g);
					h.append(l)
				}
			}
		}

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
	///
	//bangumi
	//www.bilibili.com/api_proxy?app=bangumi&action=timeline_v2