var host = window.location.host;
var appurl = 'http://' + host + '/';
var web_dir = 'http://localhost:81/pc/mindex.php';

//var appurl = 'http://' + host + '/huihuiquan/';
//var web_dir = 'http://bu.3tichina.com:8000/huihuiquan/pc/mindex.php';



//首页默认城市
var city_id =$.cookie('city');
var city_name = $.cookie('cityname');


//获取首页分类
function getCategory(m) {
		var postData = {

			'webservice': 3

		};

		$.ajax({
			'type': 'get',
			'dataType': 'json',
			'data': postData,
			'url': appurl + 'app/?url=shop/category',
			'success': function(data) {
				var str = "";
				if (data) {
					str += "<ul>";
					for (var i = 0; i < 8; i++) {
						var name = data.data[i].cat;
						var yurl = appurl + 'pc/fenlei.php?cat_id=' + data.data[i].catid;
						var stt = "";
						for (var j = 0; j < m; j++) {
							var ejname = data.data[i].scat[j].cat;
							var catid = data.data[i].scat[j].catid;
							var furl = appurl + 'pc/fenlei.php?cat_id=' + data.data[i].catid + '&scat_id=' + catid;
							stt += "<a href='" + furl + "' title='" + ejname + "'>" + ejname + "</a>";
						};

						str += "<li cat_id='" + i + "'><a href='" + yurl + "' title='" + name + "'>" + name + "</a><span class='ejfl'>" + stt + "</span></li>";
					};
					str += "</ul>";
					$("#fl").append(str);

					var sttr = "";
					$("#fl li").mouseover(function() {
						var k = $(this).attr("cat_id");
						$(".fl_zhankai").show().bind({
							mouseover: function() {
								$(this).show();
								//$("#fl li").trigger("mouseover");
							},
							mouseout: function() {
								$(this).hide();
								//	$("#fl li").trigger("mouseout");
							}
						});
						$(".flp_name").html(data.data[k].cat);
						$.each(data.data[k].scat, function(j, val) {
							var eurl = appurl + 'pc/fenlei.php?cat_id=' + data.data[k].catid + '&scat_id=' + val.catid;
							sttr += "<li><a href='" + eurl + "' title='" + val.cat + "'>" + val.cat + "</a></li>";
						});
						$("#ejfl").html(sttr);
					}).mouseout(function() {
						sttr = "";
						$(".fl_zhankai").hide();
					})

				} else {
					alert(data.message);
				};
			}
		});

	}

//获取首页商区
function getCenter(catid,scatid,areae) {
	
	var postData = {
		'webservice': 3,
		'city_id': $.cookie('city')
	};
	$.ajax({
		'type': 'get',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=shop/child_city',
		'success': function(data) {
			var str = "";
			if (data) {
				if(!areae ||areae=="" ){						
						str +='<a href="fenlei.php" class="colorl">全部</a>';
						}else{
							str +='<a href="fenlei.php">全部</a>';
						}
				$.each(data.data, function(i, val) {
						var sname = val.name;
						var area_id = val.id;
						
                      if(areae==area_id){    
  
						str += '<a href="fenlei.php?cat_id='+catid+'&scat_id='+scatid+'&area_id='+area_id+'" class="colorl">' + sname + '</a>';
				     }else{
				     	str += '<a href="fenlei.php?cat_id='+catid+'&scat_id='+scatid+'&area_id='+area_id+'">' + sname + '</a>';
				     }

					});

				$("#shangqu").append(str);
				$("#lb_sq").append(str);

			} else {
				alert(data.message);
			};
		}
	});
}

	//获取首页具体产品楼层

function getProduct() {
	var postData = {
		'sid': $.cookie('bsid'),
		'cat_id': '1002'
	};
	$.ajax({
		'type': 'get',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=shop/list',
		'success': function(data) {
			var str = "";
			if (data) {
				str += "<ul>";
				for (var i = 0; i < 8; i++) {
					var name = data.data[i].cat;
					var stt = "";
					for (var j = 0; j < 2; j++) {
						var ejname = data.data[i].scat[j].cat;
						stt += "<a href=''>" + ejname + "</a>";
					};
					str += "<li><a href=''>" + name + "</a><span class='ejfl'>" + stt + "</span></li>"
				}
				str += "</ul>"
				$("#fl").append(str);

			} else {
				alert(data.message);
			};
		}
	});
}

//获取分类页面分类
function getFlCategory(cat_id, scat_id,areae) {
	var postData = {
		'webservice': 3
	};

	$.ajax({
		'type': 'get',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=shop/category',
		'success': function(data) {
			var str = "";
			if (data) {
				var zurl = appurl + 'pc/fenlei.php?cat_id=' + cat_id+'&area_id='+areae;
				if (!cat_id || cat_id == "") {
					str += '<a href=' + zurl + ' class="colorl">全部</a>';
					$.each(data.data, function(i, val) {
						var name = val.cat;
						var catid = val.catid;
						var furl = appurl + 'pc/fenlei.php?cat_id=' + catid+'&area_id='+areae;
						str += '<a href=' + furl + '>' + name + '</a>';
					});
					$("#lb_fl").append(str);
				} else {
					var scatArray = getScat(cat_id, scat_id);
				}


			} else {
				alert(data.message);
			}
		}
	});
}

//获取二级分类
function getScat(cat_id, scat_id) {
		var postData = {
			'webservice': 3,
			'cat_id': cat_id
		};
		$.ajax({
			'type': 'get',
			'dataType': 'json',
			'data': postData,
			'url': appurl + 'app/?url=shop/child_cat',
			'success': function(data) {
				var str = "";
				if (data) {
					var zurl = appurl + 'pc/fenlei.php?cat_id=' + cat_id+'&area_id='+areae;
					if (!scat_id || scat_id == "") {
						str += '<a href=' + zurl + ' class="colorl">全部</a>';
					} else {
						str += '<a href=' + zurl + ' class="">全部</a>';
					}
					$.each(data.data, function(i, val) {
						var name = val.cat;
						var catid = val.catid;
						var furl = appurl + 'pc/fenlei.php?cat_id=' + cat_id + '&scat_id=' + catid+'&area_id='+areae;
						if (catid == scat_id) {
							str += '<a href=' + furl + ' class="colorl">' + name + '</a>';
						} else {
							str += '<a href=' + furl + '>' + name + '</a>';
						}

					});
					$("#lb_fl").append(str);

				} else {
					alert(data.message);
				}
			}
		});

	}

//获取最新点评
function getDianping(){
var postData = {

		};
		$.ajax({
			'type': 'get',
			'dataType': 'json',
			'data': postData,
			'url': appurl + 'app/?url=shop/zan_list',
			'success': function(data) {
				var str = "";
				if (data) {
		//			console.log(data.data)
					$.each(data.data, function(j, val) {		
						str += '<li><div class="left">';
						str += '<span class="colorl">'+val.user+'</span> 表示：“<span class="colorl">'+val.company+'</span> ，非常赞！”</div>';
						str += '<div class="right">'+val.addtime+'</div></li>'
					});
					$("#dianping").append(str);
				} else {
					alert(data.message);
				};
			}
		});

	}	
	


//获取推荐商家列表

function getBusiness() {
		var postData = {
			'is_display': 3,
			'user_city':$.cookie('city'),
			'webservice': 3
		};
		$.ajax({
			'type': 'get',
			'dataType': 'json',
			'data': postData,
			'url': appurl + 'app/?url=shop/list',
			'success': function(data) {
				var str = "";

				if (data) {

					$.each(data.data.list, function() {
						var deurl = appurl + 'pc/detail.php?shop_id=' + this.shop_id;
						str += '<li><div class="left"><a href="' + deurl + '"><img src="' + this.logo + '" class="tjlogo"/></a></div>';
						str += '<div class="right" style="padding-top:15px;">';

						if (this.shop_type == 4 || this.shop_type == 5) {
							str += '<p class="colorh sjname">暂不支持提单</p>';
						} else {
							str += '<p class="colorh sjname">返成交额的' + this.rebate_rate + '% </p>';
						}

						//str += '<p class="colorh sjname">近成交额的' + this.rebate_rate + '%</p>';
						str += '<p class="sjname"><a href="' + deurl + '">' + this.company + '</a></p>';
						str += '</div><div class="clear"></div></li>'
					});
					$("#tj_content").append(str);
				} else {
					alert(data.message);
				};
			}
		});

	}


	//获取推荐商家列表详情
function getBusinessDetail(shop_id) {

	var postData = {
		'shop_id': shop_id,
		'webservice': 3
	};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=shop/detail',
		'success': function(data) {
			var newDate = new Date();
			newDate.setTime(data.data.detail.etime * 1000);
			//alert(newDate.getHours())
			var sttr = "";
			var str = "";
			if (data) {
				//上边区域				
				sttr += '<div class="left de_left"><img src="' + data.data.detail.logo + '" style="width:565px;height:345px;border:1px solid #e5e5e5;overflow:hidden;"/></div>';
				sttr += '<div class="right de_right">';
				sttr += '<p class="comname">[' + $.cookie('cityname') + '] ' + data.data.detail.company + '</p>';
				//判断是否支持提单
				if (this.shop_type == 4 || this.shop_type == 5) {
					sttr += '<p class="cje">暂不支持提单</p>';
				} else {
					sttr += '<p class="cje">返成交额的' + data.data.detail.rebate_rate + '%</p>';
				}

				//	sttr += '<p class="cje">返成交额的' + data.data.detail.rebate_rate + '%</p>';
				if(data.data.detail.stime==null||data.data.detail.etime==null){
				sttr += '<p>营业时间：</p>';	
				}else{
				sttr += '<p>营业时间：' + data.data.detail.stime + '-' + data.data.detail.etime + '</p>';	
				}
				sttr += '<p>电话：<span class="colorl">' + data.data.detail.tel + '</span></p>';
				sttr += '<p>地址：' + data.data.detail.addr + '</p>';
				sttr += '<p>备注：' + data.data.detail.remark + '</p>';
				sttr += '</div>';

				//底部右边区域	
				str += '<div class="de_bo_left"><div class="de_name">';
				str += '<ul>';
				str += '<li class="selected"><a href="#map">商家地址</a></li>';
				str += '<li><a href="#production">产品介绍</a></li>';
				str += '<li><a href="#detail">商家详情</a></li>';
				str += '</ul></div>';
				str += '<div class="de_body0"><div class="map" id="map"><div class="left map_left">';
				//地图开始
				str += '<div id="allmap" class="allmap"></div>';
				str += '<div id="allbig">查看完整地图</div>';
				//地图结束
				str += '</div>';
				str += '<div class="right map_right">';
				str += '<p>' + data.data.detail.company + '</p>';
				str += '<p>评价：' + data.data.detail.zan_num + '人点赞</p>';
				str += '<p>地址：' + data.data.detail.addr + '</p>';
				str += '<p>电话：' + data.data.detail.tel + '</p>';
				str += '</div><div class="clear"></div></div>';
				str += '<div class="bo_name" id="production"><p class="namem">产品介绍</p></div>';
				
				$.each(data.data.goods_list, function(j,val) {					
					str += '<p><img src="'+val.pic+'"/></p>';
				});
				
				
				
				str += '<div class="bo_name" id="detail"><p class="namem">商家详情</p></div>';
				str += '' + data.data.detail.shop_detail + '';
				str += '</div></div>';
				$("#de_box").append(sttr);
				$("#detail_left").append(str);
				$("#allbig").click(function() {
					$("#map2").show();
					$(".modle").show().bind("click", function() {
						$("#map2").hide();
						$(".modle").hide()
					});
					//第二个地图
					// 百度地图API功能
					var map2 = new BMap.Map("map2");
					map2.centerAndZoom(new BMap.Point(116.331398, 39.897445), 11);
					map2.enableScrollWheelZoom(true);
					if (data.data.detail.shop_longitude != "" && data.data.detail.shop_latitude != "") {
						map2.clearOverlays();
						var new_point2 = new BMap.Point(data.data.detail.shop_longitude,data.data.detail.shop_latitude);
						var marker2 = new BMap.Marker(new_point2); // 创建标注	
						map2.addOverlay(marker2); // 将标注添加到地图中	
						marker2.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
						map2.panTo(new_point2);
						//向地图中添加缩放控件
						var ctrl_nav2 = new BMap.NavigationControl({
							anchor: BMAP_ANCHOR_TOP_LEFT,
							type: BMAP_NAVIGATION_CONTROL_LARGE
						});
						map2.addControl(ctrl_nav2);

					}

				});
				//第一个地图
				// 百度地图API功能
				var map = new BMap.Map("allmap");
				map.centerAndZoom(new BMap.Point(116.331398, 39.897445), 11);
				map.enableScrollWheelZoom(true);
				if (data.data.detail.shop_longitude != "" && data.data.detail.shop_latitude != "") {
					map.clearOverlays();
					var new_point = new BMap.Point(data.data.detail.shop_longitude,data.data.detail.shop_latitude);
					var marker = new BMap.Marker(new_point); // 创建标注
					//向地图中添加缩放控件
					var ctrl_nav = new BMap.NavigationControl({
						anchor: BMAP_ANCHOR_TOP_LEFT,
						type: BMAP_NAVIGATION_CONTROL_LARGE
					});
					map.addControl(ctrl_nav);
					map.addOverlay(marker); // 将标注添加到地图中
					marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
					map.panTo(new_point);
				}


			} else {
				alert(data.message);
			};
		}
	});
}


//获取推荐商家列表

function getNearBusiness(pagesize) {
		var postData = {
			'pageSize': pagesize,
			'webservice': 3
		};
		$.ajax({
			'type': 'get',
			'dataType': 'json',
			'data': postData,
			'url': appurl + 'app/?url=shop/list',
			'success': function(data) {
				var str = "";
				if (data) {

					$.each(data.data.list, function() {
						var deurl = appurl + 'pc/detail.php?shop_id=' + this.shop_id;

						str += '<li><p><a href="">';

						if (this.logo != null) {
							str += '<img src="' + this.logo + '" alt="" />';
						} else {
							str += '<img src="img/yun.png" alt="" />';
						}

						str += '</a></p>'
						str += '<p><a href="' + deurl + '">' + this.company + '</a></p>';

						if (this.shop_type == 4 || this.shop_type == 5) {
							str += '<p class="colorh">暂不支持提单</p></li>';
						} else {
							str += '<p class="colorh">返成交额的' + this.rebate_rate + '% </p></li>';
						}


					});
					$("#de_body").append(str);
				} else {
					alert(data.message);
				};
			}
		});

	}
	//首页楼层

function getFloor(cateid, idname, page, pagesize) {
	var postData = {
		'cat_id': cateid,
		'user_city': $.cookie('city'),
		'page': page,
		'pageSize': pagesize,
		'webservice': 3
	};
	$.ajax({
		'type': 'get',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=shop/list',
		'success': function(data) {
			var str = "";
			if (data) {
				$.each(data.data.list, function() {
					var deurl = appurl + 'pc/detail.php?shop_id=' + this.shop_id;
					str += '<li><a href="' + deurl + '" style="width:250px;height:160px;display:block">';
					if (this.logo != null) {
						str += '<img src="' + this.logo + '" alt="" style="width:250px;height:160px;"/>';
					} else {
						str += '<img src="img/yun.png" alt="" style="width:250px;height:160px;"/>';
					}

					str += '</a>'
					str += '<p class="cname"><a href="' + deurl + '">' + this.company + '</a></p>';
					//判断是否可以支持提单

					if (this.shop_type == 4 || this.shop_type == 5) {

						str += '<p class="cjiao">暂不支持提单</p>';
					} else {
						str += '<p class="cjiao">返成交额的' + this.rebate_rate + '% </p>';
					}
					//str += '<p class="cjiao">近成交额的' + this.rebate_rate + '%</p>';
					str += '<p class="cdetai">' + this.shop_des + '</p>';
					str += ' </li>	'
				});

				$(idname).append(str);

			} else {
				alert(data.message);
			};
		}
	});
}



//获取产品分类页面的数据

function getSort(catid, page, pagesize, order,city,keyword,area_id) {
	var postData = {
		'cat_id': catid,
		'page': page,
		'pageSize': pagesize,
		'order_by': order,
		'user_city':city,
		'keyword': keyword,	
		'area_id':area_id,
		'webservice': 3
	};
	$.ajax({
		'type': 'get',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=shop/list',
		'success': function(data) {
			var str = "";
			var str1 = "";
			var str2 = "";
			var ys = "";
			if (data) {
				var dalength = data.data.list.length;
				if (dalength > 0) {
					//var surl = appurl + 'pc/fenlei.php?cat_id=' + catid + '&page=' + page;
					var surl = appurl + 'pc/fenlei.php?cat_id=' + catid +'&area_id=' + area_id + '&keyword=' + encodeURI(encodeURI(keyword)) + '&order_by=' + order + '&page=';
					var upage = parseInt(page) - 1;
					var dpage = parseInt(page) + 1;
					$.each(data.data.list, function() {
						var deurl = appurl + 'pc/detail.php?shop_id=' + this.shop_id;
						str += "<li>";
						str += "<a href='" + deurl + "'><img src='" + this.logo + "' alt='' /></a>";
						str += "<p class='cname'><a href='" + deurl + "'>" + this.company + "</a></p>";


                       if (this.shop_type == 4 || this.shop_type == 5) {
							str += "<p class='cjiao'>暂不支持提单</p>";
						} else {
							str += "<p class='cjiao'>返成交额的" + this.rebate_rate + "% </p>";
						}
//						    str += "<p class='cjiao'>近成交额的" + this.rebate_rate + "% </p>";

						str += "<p class='cdetai'>" + this.shop_des + "</p>";
						str += "</li>";
					});

					str1 += '<div class="left">';
					str1 += '<div class="pagena" >';
					str1 += '<ul class="tcdPageCode">';
					str1 += '</ul>';
					str1 += '<span><input type="text" name="tz" id="tz" value="" /></span>';
					str1 += '<span><a id="tzb" href="javascript:void(0)">跳转</a></span>';
					str1 += '</div>';
					str1 += '</div>';
					str1 += '<div class="right">';
					str1 += '<p>';
					str1 += '每页<span class="colorl">&nbsp;' + pagesize + '&nbsp;</span>条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共<span class="colorl">&nbsp;' + data.data.page_num + '&nbsp;</span>页&nbsp;&nbsp;&nbsp; <span class="colorl">&nbsp;' + data.data.total_num + '&nbsp;</span>条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
					str1 += '当前 <span class="colorl">&nbsp;' + page + '&nbsp;</span>/&nbsp;' + data.data.page_num + '&nbsp;页';
					str1 += '</p>';
					str1 += '</div>';


					//翻页代码jquery
					var ms = {
						init: function(obj, args) {
							return (function() {
								ms.fillHtml(obj, args);
								ms.bindEvent(obj, args);
							})();
						},
						//填充html
						fillHtml: function(obj, args) {
							return (function() {
								obj.empty();
								//上一页
								if (args.current > 1) {
									obj.append('<a href="' + surl + upage + '" class="prevPage">上一页</a>');
								} else {
									obj.remove('.prevPage');
									obj.append('<span class="disabled">上一页</span>');
								}
								//中间页码
								if (args.current != 1 && args.current >= 4 && args.pageCount != 4) {
									//	alert(args.current)
									obj.append('<a href="' + surl + 1 + '" class="tcdNumber">' + 1 + '</a>');
								}
								if (args.current - 2 > 2 && args.current <= args.pageCount && args.pageCount > 5) {
									obj.append('<span>...</span>');
								}
								var start = args.current - 2,
									end = args.current + 2;
								if ((start > 1 && args.current < 4) || args.current == 1) {
									end++;
								}
								if (args.current > args.pageCount - 4 && args.current >= args.pageCount) {
									start--;
								}
								for (; start <= end; start++) {
									if (start <= args.pageCount && start >= 1) {
										if (start != args.current) {
											obj.append('<a href="' + surl + start + '" class="tcdNumber">' + start + '</a>');
										} else {
											obj.append('<span class="current">' + start + '</span>');
										}
									}
								}
								if (args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5) {
									obj.append('<span>...</span>');
								}
								if (args.current != args.pageCount && args.current < args.pageCount - 2 && args.pageCount != 4) {
									obj.append('<a href="' + surl + args.pageCount + '" class="tcdNumber">' + args.pageCount + '</a>');
								}
								//下一页
								if (args.current < args.pageCount) {
									obj.append('<a href="' + surl + dpage + '" class="nextPage">下一页</a>');
								} else {
									obj.remove('.nextPage');
									obj.append('<span class="disabled">下一页</span>');
								}
							})();
						},
						//绑定事件
						bindEvent: function(obj, args) {
							return (function() {
								obj.on("click", "a.tcdNumber", function() {
									var current = parseInt($(this).text());
									ms.fillHtml(obj, {
										"current": current,
										"pageCount": args.pageCount
									});
									if (typeof(args.backFn) == "function") {
										args.backFn(current);
									}
								});
								//上一页
								obj.on("click", "a.prevPage", function() {
									var current = parseInt(obj.children("span.current").text());
									ms.fillHtml(obj, {
										"current": current - 1,
										"pageCount": args.pageCount
									});
									if (typeof(args.backFn) == "function") {
										args.backFn(current - 1);
									}
								});
								//下一页
								obj.on("click", "a.nextPage", function() {
									var current = parseInt(obj.children("span.current").text());
									ms.fillHtml(obj, {
										"current": current + 1,
										"pageCount": args.pageCount
									});
									if (typeof(args.backFn) == "function") {
										args.backFn(current + 1);
									}
								});
							})();
						}
					}
					$.fn.createPage = function(options) {
							var args = $.extend({
								pageCount: 10,
								current: 1,
								backFn: function() {}
							}, options);
							ms.init(this, args);
						}
						//翻页代码结束

					$("#lb_product").append(str);
					$("#page").append(str1);
					//调用
					$(".tcdPageCode").createPage({
						pageCount: parseInt(data.data.page_num),
						current: parseInt(page),
						backFn: function(p) {
							console.log(p);
						}
					});
					//跳转页面
					$("#tzb").click(function(newpage) {
						var newpage = parseInt($("#tz").attr("value"));
						if ((newpage > 0) && (data.data.page_num - newpage) >= 0) {
							//	alert($(this))
							$(this).attr("href", surl + newpage);
						}else if(!$("#tz").attr("value")){
			                 //判断如果tz的值为空则不进行任何操作
						} else {
							$(this).attr("href", surl + data.data.page_num);
						}
					});
					//					//判断是否敲击了Enter键 
					//					$(document).keyup(function(event) {
					//						if (event.keyCode == 13) {
					//							$("#tzb").trigger("click");
					//
					//						}
					//					});

				} else {
					str2 += '<p>还没有商品哦！</p>';
					$("#lb_product").append(str2);
				}
			} else {
				alert(data.message);
			};
		}
	});
}

//首页获取城市列表

function getCityList() {
		var postData = {
			'webservice': 3
		};
		$.ajax({
			'type': 'get',
			'dataType': 'json',
			'data': postData,
			'url': appurl + 'app/?url=user/city_list',
			'success': function(data) {
				var citys = new Array();
				var str = "";
				var sttr = "";
				var tzurl = appurl + 'pc/mindex.php?city=';
				var myArray = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
				if (data) {
					citys = AZarray(data.data.allcity);
					//	console.log(citys)
					for (var i = 0; i < myArray.length; i++) {
						str = "";
						sttr = "";
						if (citys[myArray[i]] && citys[myArray[i]].length > 0) {
							str += '<li>';
							str += '<div class="left zleft"><p>' + myArray[i] + '</p></div>';
							str += '<div class="left zright margin_left_25"><p>';

							for (var j = 0; j < citys[myArray[i]].length; j++) {
								sttr += '<a href="' + tzurl + citys[myArray[i]][j].cityid + '" cityid="' + citys[myArray[i]][j].cityid + '">' + citys[myArray[i]][j].city_name + '</a>';

							}
							//循环出城市
							str += sttr;


							str += '</p></div><div class="clear"></div>';
							str += '</li>';

						}
						$("#citycontent").append(str);
						$("#citycontent").find("a").each(function() {
							$(this).click(function() {
								var value = $(this).html();
								var cityid = $(this).attr("cityid");
								$("#cityid").html(value);
								$("#cityid").attr("cityid", cityid);
								$.cookie('city', cityid, {
									expires: 30
								});
								$.cookie('cityname', value, {
									expires: 30
								});
							});
						})
					}






					//     AZarray(data.data.allcity);


				} else {
					alert(data.message);
				};
			}
		});
	}
	//分组

function AZarray(allcity) {
	var citys = new Array();
	var myArray = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
	$.each(allcity, function(i, val) {
		var first = val.city_pinyin.substring(0, 1);
		val.first = first;
	});
	var k = 0;
	for (var i = 0; i < myArray.length; i++) {
		k = 0;
		citys[myArray[i]] = new Array();
		$.each(allcity, function(j, val) {
			if (val.first == myArray[i].toLowerCase()) {
				citys[myArray[i]][k] = val;
				k++;
			}
		});

	}
	return citys;
}

//获取url中的参数

function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null) return unescape(r[2]);
		return null; //返回参数值
	}
	//登录开始

//function denglu(username, pwd) {
//	var userData = {
//		'type': 1,
//		'username ': username,
//		'password': 1
//	}
//	$.ajax({
//		'type': 'post',
//		'dataType': 'json',
//		'data': userData,
//		'url': appurl + 'app/?url=user/signin',
//		'success': function(data) {
//			if (data.status == 1) {
//				alert(123);
//				//登录成功写入用户数据
//
//				$('.userName').text(data.data.name);
//				alert(data.data.name)
//				var icon = (data.object.icon == null || data.object.icon == '') ? 'images/default_face.png' : (weburl + data.object.icon);
//				$('#usercenterface').attr("src", icon);
//				localStorage.setItem("userid", data.data.userid);
//				localStorage.setItem("icon", data.data.logo);
//				localStorage.setItem("loginName", data.data.user);
//				localStorage.setItem("name", data.object.name);
//				localStorage.setItem("privacyLevel", data.object.privacyLevel);
//				$.ajax({
//					'type': 'post',
//					'dataType': 'json',
//					'data': {
//						'userDevice': userDevice,
//						'userId': data.object.tId
//					},
//					'url': appurl + '/m/info/findNotReadMessageCount',
//					'success': function(data) {
//						if (data.object > 0) {
//							$(".userNoRead").css('display', 'block');
//							$(".noRead").html(data.object);
//						}
//					}
//				})
//			} else {
//				//登录失败
//				alert(data.message);
//			}
//		}
//	});
//}

//登录结束

//注册并登录开始
$('#regBtn').click(function() {
	//    检测昵称是否为空
	if (!$.trim($('#yqm').val())) {
		alert('邀请码不能为空');
		return;
	}
	//检测UID是否为空
	if (!$.trim($('#uid').val())) {
		alert('手机号不能为空');
		return;
	}

	//图片识别是否为空
	if (!$.trim($('#inputCode').val())) {
		alert('图片识别不能为空');
		return;
	}
	//检测确认密码是否为空
	if (!$.trim($('#yzm').val())) {
		alert('验证码不能为空');
		return;
	}


	//获取注册数据
	var inviteCode = $.trim($('#yqm').val());
	var phone = $.trim($('#uid').val());
	var code = $.trim($('#yzm').val());

	//请求注册接口
	var userData = {
		'inviteCode': inviteCode,
		'phone': phone,
		'code': code
			//	'password': password

	}
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': userData,
		'url': appurl + 'app/?url=user/signup',
		'success': function(data) {
			if (data.status == 1) {
				alert("恭喜你注册成功！");
				window.location.href = "personal.php"
					//				var uname = $.trim($('#uid').val());
					//				var upassword = 1;
					//				$('#s_zhanghao').attr("value",uname);
					//				$('#s_mima').attr("value",upassword)
					//注册成功后立刻登录
					//					$('#regBtn').trigger('click');
					//					slogin(1);
			} else {
				//注册失败
				alert(data.error_desc);
			}
		}
	});
});
//注册并登录结束


//验证码
$("#get_yzm").click(function() {
	//var ymz1=$("#inputCode").val();
	//var yzm2= code.strCode;
	//alert(yzm2)
	var that = $(this);
	if (!$.trim($('#uid').val())) {
		alert('请输入手机号');
		$('#uid').focus();
		return false;
	}
			//图片识别是否为空
	if (!$.trim($('#inputCode').val())) {
		alert('图片识别不能为空');
		return false;
	}
	if ($(this).attr('status') == 0) {
		return false;
	}
	//TODO 60秒后可重新获取验证码
	that.attr('status', 0);
	$('#get_yzm').css({
		'borderColor': '#ccc',
		'background': '#ccc'
	});
	$(this).text('获取中...');
	var userData = {
		'phone': $('#uid').val()
	};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': userData,
		'url': appurl + 'app/?url=user/phone_code',
		'success': function(data) {
			that.text('获取验证码');
			if (data.status == 1) {
				var s = 60;
				var t = setInterval(function() {
					s--;
					if (s == 0) {
						$('.smstip span').empty();
						$('.smstip').hide();
						clearInterval(t);
						that.attr('status', 1);
						$('#get_forget_code').css({
							'borderColor': '',
							'background': ''
						});
						return false;
					}
					$('.smstip').show();
					$('.smstip span').text(s);

				}, 1000)
			} else {
				alert(data.error_desc)
					//				that.attr('status', 1);
					//				$('#get_yzm').css({
					//					'borderColor': '',
					//					'background': ''
					//				});
			}
		}
	})
})








//商家登录

function slogin(type) {
		if (!$.trim($('#s_zhanghao').val())) {
			alert('账号不能为空！');
			return;
		}
		//检测UID是否为空
		if (!$.trim($('#s_mima').val())) {
			alert('密码不能为空！');
			return;
		}
		//获取登录数据
		var username = $.trim($('#s_zhanghao').val());
		var password = $.trim($('#s_mima').val());
		var autologin = 1;
		if (!$("#auto").attr("checked")) {
			var autologin = 2;
		}

		var userData = {
			'username': username,
			'password': password,
			'type': type

		}
		$.ajax({
			'type': 'post',
			'dataType': 'json',
			'data': userData,
			'url': appurl + 'app/?url=user/signin',
			'success': function(data) {
				if (data.status == 1) {
					var day = '';
					if (autologin == 1) {
						day = 30;
					}
					$.cookie('buser', data.data.user, {
						expires: day
					});
					$.cookie('bsid', data.data.session, {
						expires: day
					});
					window.location.href = "business-tidan.php";
				} else {
					//登录失败
					alert(data.error_desc);
				}
			}
		});
	}
	//判断是否敲击了Enter键 
$(document).keyup(function(event) {
	if (event.keyCode == 13) {
		$("#s_denglu").trigger("click");
	}
});







//用户注销 TODO两次弹出alert
function logout() {
	var postData = {
		'sid': $.cookie('bsid')
	};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=user/logout',
		'success': function(data) {
			console.log(data)
			if (data) {
				$.cookie('bsid', null);
				window.location.href = 'business-login.html';
			} else {
				//alert(data.error_desc);
			};
		}
	});
}



//退出登录
$("#exit").click(function() {
	if (confirm("您确定要退出吗？")) {
		logout();
	}
})

//修改密码
$("#rPsw").click(function() {
	if (!$.trim($('#currentPassword').val())) {
		alert('原密码不能为空');
		return;
	}
	if (!$.trim($('#newPassword').val())) {
		alert('新密码不能为空');
		return;
	}
	if (!$.trim($('#ConfirmPassword').val())) {
		alert('确认新密码不能为空');
		return;
	}

	//检测密码是否为大于6位
	if ($.trim($('#newPassword').val()).length < 6 ) {
		alert('密码要大于6位');
		return;
	}
	//检测密码是否为大于6位
	if ($.trim($('#ConfirmPassword').val()).length <6 ) {
		alert('密码要大于6位');
		return;
	}
	var newP = $('#newPassword').val();
	var newCP = $('#ConfirmPassword').val();
	if (newP !== newCP) {
		alert('新密码两次输入不一致');
		return;
	}
	//获取用户输入的密码
	var oldPassword = $('#currentPassword').val();
	var newPassword = $('#newPassword').val();
	var password2 = $('#ConfirmPassword').val();

	//请求修改密码接口
	var userData = {
		'sid': $.cookie('bsid'),
		'old_password': oldPassword,
		'password': newPassword,
		'password2': password2
	}
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': userData,
		'url': appurl + 'app/?url=user/editPwd',
		'success': function(data) {
			if (data.status == 1) {
				alert(data.error_desc);
				window.location.href = "business-mima.php";
			} else {
				alert(data.error_desc);
			}
		}
	});
	//请求修改密码接口结束
});
//修改密码结束


// 如果登录转入页面 如果没有登录则转向登录页面
function jumpTo(p, url) {
	var customerId = $.cookie('bsid');
	if (customerId == undefined || !customerId) {
		confirm('获取用户信息失败，请重新登录');
		p.attr("href", "business-login.html");
	} else {
		p.attr("href", url);
	}
}

//遍历商家系统所有导航链接 判断是否已经登录
function isLogin() {
	$('#dha a').each(function(e) {
		$(this).click(function() {
			var p = $(this);
			var url = $(this).attr("href");
			jumpTo(p, url);
		});
	});
}




//商家系统
//本周好评商家
function getZan(pagesize) {
	var postData = {
		'pageSize': pagesize,
		'order_by':4,
		'webservice': 3
	};
	$.ajax({
		'type': 'get',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=shop/list',
		'success': function(data) {
			var str = "";
			if (data) {
				var i = 0;
				var zan = "";
				$.each(data.data.list, function() {
					var deurl = appurl + 'pc/detail.php?shop_id=' + this.shop_id;
					i++;
					if (this.view_times == 0) {
						zan = 0;
					} else {
						zan = (this.zan_num / this.view_times).toFixed(0);
					}
					str += '<li><a href="' + deurl + '" class="zanname">' + i + '.' + this.company + '</a>';
					str += '<span class="colorred">点赞数：' + this.zan_num + '</span>';
					str += '</li>'
				//	data.data.list.sort(createComparionFun("zan_num"));
				});

				$("#goodsj").append(str);
			} else {
				alert(data.message);
			};
		}
	});

}

//给赞进行排序
function createComparionFun(propertyName) {
		return function(object1, object2) {
			var value1 = object1[propertyName];
			var value2 = object2[propertyName];
			if (value1 < value2) {
				return 1;
			} else if (value1 > value2) {
				return -1;
			} else {
				return 0;
			}
		}
	}
	//获取商家系统右边具体信息

function getYxin() {
	var postData = {
		'sid': $.cookie('bsid')
	};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=shop/info',
		'success': function(data) {
			var str = "";
			if (data) {
				str += '<p class="name">' + data.data.company + '</p>';
				str += '<p>绑定会员号：' + data.data.user_code + '</p>';
				str += '<p>商家账户余额：<span class="price">' + data.data.balance + '</span></p>';
				str += '<p>开户时间：' + data.data.create_time + '</p>';
				//赋值
				$("#company").html(data.data.company);//公司名称
				
				$("#xbiaoqian").val(data.data.keyword);//标签
				$("#xluxian").val(data.data.traffic_routes);//公交路线
				$("#xlianxi").val(data.data.contact);//联系人
				$("#xtel").val(data.data.tel);//联系电话
				$("#xtime").val(data.data.use_time);//营业时间
				$("#suggestId").val(data.data.addr);//地址
				$("#area").attr("lng",data.data.shop_longitude);//地图定位经度
				$("#area").attr("lat",data.data.shop_latitude);//地图定位经度
				$("#bumen").val(data.data.shop_detail);//部门简介
				
				
				
				
				
				
				
				$("#piaoqi").append(str);
			} else {
				alert(data.message);
			};
		}
	});
}










//消息列表
function getMeassage(pagesize) {
	var postData = {
		//'pageSize': pagesize,
		'type': 1,
		'sid': $.cookie('bsid')

	};
	$.ajax({
		'type': 'get',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=shop/shopinfo_list',
		'success': function(data) {
			var str = "";
			var i = 0;
			if (data.data != []) {
				$.each(data.data, function(j, val) {
					var xurl = appurl + 'pc/business-dxxdetail.php?shopinfo_id=' + val.shopinfo_id;
					i++;
					str += '<li>';
					str += '<input type="checkbox" id="id1" ch_id="' + val.shopinfo_id + '"  name="checkname" value="' + i + '" />';

					if (val.ischecked == 1) {
						str += '<span class="xx_img"><img src="img/o1.jpg"/></span>';
					} else {
						str += '<span class="xx_img"><img src="img/o2.jpg"/></span>';
					}

					str += '<span class="xx_sorce">系统消息</span>';
					str += '<span class="xx_time">' + val.createtime.substring(0, 10) + '</span>';
					str += '<span class="xx_info">' + val.title + '</span>';
					str += '<a class="colorl right" href="' + xurl + '">[查看]</a>';
					str += '<div class="clear"></div>';
					str += '</li>';
				});
				$("#info_list").append(str);
			} else {
				str += '<li>';
				str += '<span>暂无消息</span>';
				str += '</li>';
				$("#info_list").append(str);
			};
		}
	});

}

//消息列表详情
function getMeassageDetail(shopinfo_id) {
		var postData = {
			'shopinfo_id': shopinfo_id,
			'sid': $.cookie('bsid')
		};
		$.ajax({
			'type': 'get',
			'dataType': 'json',
			'data': postData,
			'url': appurl + 'app/?url=shop/shopinfo_detail',
			'success': function(data) {
				var str = "";
				if (data) {
					//	console.log(data.data.title)
					str += '<div class="xx_name">系统消息</div>';
					str += '<div class="xxcontent">';
					str += '<p class="xx_bt">' + data.data.title + '</p>';
					str += '<p class="xx_sj">' + data.data.createtime + '</p>';
					str += '<div class="xx_content">' + data.data.intro + '</div>';
					str += '</div>';

					$("#xxcontent").append(str);

				} else {
					alert(data.message);
				};
			}
		});

	}
	//TODO 分页
	//批量删除消息  

function delshopinfo(dlist) {
	var postData = {
		'dlist': dlist,
		'sid': $.cookie('bsid')
	};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=shop/shopinfo_del',
		'success': function(data) {
			if (data) {
				if (data.status == 1) {
					window.location.href = "business-duanxiaoxi.php";
				}
			} else {
				alert(data.message);
			};
		}
	});
}




//商家--提单
$("#xiugaibtn").click(function() {
	var phone = $('#tel').val();
	var money = $('#money').val();
	var remark = $('#remark').val();
	var type = $('input:radio[name="tidan"]:checked').val();
	//检测手机号是否为空
	if ($.trim($('#tel').val()).length != 11) {
		$("#tip_info").html('请输入正确的手机号');
		showdiv();
		return;
	}
	//检测输入金额是否大于1
	if ($.trim($('#money').val()) < 1) {
		$("#tip_info").html('提现金额必须大于1.00');
		showdiv();
		return;
	}

	var postData = {
		'phone': phone,
		'money': money,
		'type': type,
		'sid': $.cookie('bsid')
	};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=merchant/tidan',
		'success': function(data) {
			var str = "";
			if (data) {
				if (data.status == 1) {
					var postData2 = {
						'phone': phone,
						'money': money,
						'remark': remark,
						'type': type,
						'sid': '39cacc4c7298ee1505c6a345860c7fd5'
					};
					$.ajax({
						'type': 'post',
						'dataType': 'json',
						'data': postData2,
						'url': appurl + 'app/?url=merchant/qdtidan',
						'success': function(data) {
							var str = "";
							if (data) {

								if (type == 1) {
									$("#tip_info").html("全单提单提交成功");
									showdiv();
								} else {
									$("#tip_info").html("套餐提单 提交成功");
									showdiv();
								}

							} else {
								alert(data.message);
							};
						}
					});
				} else {
					$("#tip_info").html(data.error_desc);
					showdiv();

				}
			} else {
				alert("成功");
			};
		}
	});
});

//商家--留言
$("#xiugailiuyan").click(function() {
	var type = $('input:radio[name="liuyan"]:checked').val();
	var content = $("#lycontent").val();
	if (!$.trim($('#lycontent').val())) {
		$("#tip_info").html('内容不能为空');
		showdiv();
		return;
	}
	if (!$.trim($('#inputCode').val())) {
		$("#tip_info").html('请输入验证码');
		showdiv();
		return;
	}
	var postData = {
		'type': type,
		'content': content,
		'sid': $.cookie('bsid')
	};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=shop/message',
		'success': function(data) {
			if (data) {
				if (type == 2) {
					$("#tip_info").html("系统留言成功");
					showdiv();
				} else {
					$("#tip_info").html("财务留言成功");
					showdiv();
				}
			} else {
				$("#tip_info").html(data.message);
				showdiv();
			}

		}
	});

})




//账户明细
function getMingXi(page, pageSize) {
	var postData = {
		'page': page,
		'pageSize': pageSize,
		'sid': $.cookie('bsid')
	};
	$.ajax({
		'type': 'get',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=merchant/account',
		'success': function(data) {
			var str = "";
			if (data) {
				$.each(data.data.list, function(j, val) {
					if (val.remark == null) {
						val.remark = "";
					}
					str += '<tr>';
					str += '<td>' + val.rebate_id + '</td>';
					if (val.type == 2) {
						str += '<td>+ ' + val.money + '</td>';
					} else {
						str += '<td>- ' + val.money + '</td>';
					}

					str += '<td>' + val.add_time + '</td>';
					str += '<td>' + val.remark + '</td>';
					str += '</tr>';
				});

				$("#mingxilist").append(str);
			} else {
				alert(data.message);
			}

		}
	});
}

//返利明细 --用的商家返利明细

function getFanli(type,page,psize) {
	var postData = {
		'page': page,
		'pageSize':psize,
		'type': type,
		'sid': $.cookie('bsid')
	};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=merchant/rebate',
		'success': function(data) {
			var str = "";
			var str1 = "";
			var str2 = "";
			var surl = appurl + 'pc/business-fanli.php?type='+type+ '&page=';
			var upage = parseInt(page) - 1;
			var dpage = parseInt(page) + 1;
			var aa="";
			
			if (data.data) {	
			//	alert(data.data.total_num)
			aa= Math.ceil(data.data.total_num/psize);
			
			if(upage<=0){
				upage=1;
		//		$("#pre").addClass("defalt");
			}
			if(dpage>=aa){
				dpage=aa;
		//		$("#next").css({ backgroundColor: "#efefef", "cursor": '"not-allowed"' });
			
			}
			if(data.data.total_order== null ||data.data.total_rebate== null){
				data.data.total_order=0;
				data.data.total_rebate=0;
			}
				str1 += '订单金额合计：￥' + data.data.total_order + ' 订单分成合计：￥' + data.data.total_rebate + '';
				str2 += '<a href="' + surl + upage + '" id="pre">上一页</a><a href="' + surl + dpage + '" id="next">下一页</a>'
				$.each(data.data.list, function(j, val) {

					str += '<tr>';
					str += '<td>' + val.user_code + '</td>';
					str += '<td>' + val.add_time + '</td>';
					str += '<td>' + val.company + '</td>';
					str += '<td>' + val.order_money + '</td>';
					str += '<td>' + val.money + '</td>';
					//					str += '<td>' + val.add_time + '</td>';
					str += '</tr>';
				});
				$(".dd_price").append(str1);
				$("#fanlilist").append(str);
				$("#fanye").append(str2);
			} else {
				alert(data.message);
			}

		}
	});
}


//个人中心---文章页面
function getArticle(aid,hhq,contentid) {
	
	$.ajax({
	'type': 'post',
	'dataType': 'json',
	'data': postData,
	'url': appurl + 'app/?url=user/article',
	'success': function(data) {
		var str = "";
		var i = 0;
		if (data) {
			if (!aid) {
				aid = data.data[0].aid;
			}
			$.each(data.data, function(j, val) {
				var zurl = appurl + 'pc/personal.php?aid=' + val.aid;
				if (val.aid == aid) {
					str += '<li class="selected"><a href="' + zurl + '">' + val.title + '</a></li>';
					$("#per_name").html(val.title);
					$("#percontent").html(val.content);
				} else {
					str += '<li><a href="' + zurl + '">' + val.title + '</a></li>';
				}
				i++;
			});
			$("#info_list").append(str);

		} else {
			alert(data.message);
		}

	}
	});
	if(hhq){
		var postData = {
		'type': hhq,
		};
		$.ajax({
			'type': 'get',
			'dataType': 'json',
			'data': postData,
			'url': appurl + 'app/?url=user/aboutus',
			'success': function(data) {		
				if (data) {
					$("#info_list li").removeClass("selected");
					$("#per_name").html("平台介绍");
					$('#'+contentid).html(data.data.content);
					
				} else {
					alert(data.message);
				}
			}
		});
	}
	
	
}

function search() {
	var key = $("#search").attr("value");
	//var surl = appurl + 'pc/fenlei.php?key='key';
	window.location.href = "fenlei.php?keyword=" + encodeURI(encodeURI(key));

}


$("#xiugai1").click(function() {
	//检测联系人是否为空
	if (!$.trim($('#xlianxi').val())) {
		alert('联系人不能为空！');
		return;
	}
	//检测电话是否为空
	if (!$.trim($('#xtel').val())) {
		alert('联系电话不能为空！');
		return;
	}

	//图片地图是否为空
	if (!$.trim($('#suggestId').val())) {
		alert('地图不能为空！');
		return;
	}
	//获取资料修改数据
	var keyword = $.trim($('#xbiaoqian').val());
	var addr = $.trim($('#suggestId').val());
	var traffic_routes = $.trim($('#xluxian').val());
	var contact = $.trim($('#xlianxi').val());
	var tel = $.trim($('#xtel').val());
	var use_time = $.trim($('#xtime').val());
	var shop_longitude = $.trim($("#area").attr("lng"));
	var shop_latitude = $.trim($("#area").attr("lat"));
	var shop_detail = editor.html();
	//console.log(shop_detail);
	var postData = {
		'keyword': keyword,
		'addr': addr,
		'traffic_routes': traffic_routes,
		'contact': contact,
		'tel': tel,
		'use_time': use_time,
		'shop_longitude': shop_longitude,
		'shop_latitude': shop_latitude,
		'shop_detail': shop_detail,
		'sid': $.cookie('bsid')
	};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=shop/edit',
		'success': function(data) {
			if (data) {
				if (data.status == 1) {
					alert(data.error_desc);
					window.location.href = "business-dianpu.php";
				} else {
					alert(data.error_desc);
				}
			}
		}
	});
});
//重置
$("#xiugai").click(function() {

	$('#xbiaoqian').val("");
	var addr = $.trim($('#suggestId').val(""));
	var traffic_routes = $.trim($('#xluxian').val(""));
	var contact = $.trim($('#xlianxi').val(""));
	var tel = $.trim($('#xtel').val(""));
	var use_time = $.trim($('#xtime').val(""));
	var shop_longitude = $.trim($("#area").attr("lng"));
	var shop_latitude = $.trim($("#area").attr("lat"));
	var shop_detail = editor.html("");	
	});
//关于我们
function getAbout(typemz,contentid) {
	var postData = {
		'type': typemz,
	};
	$.ajax({
		'type': 'get',
		'dataType': 'json',
		'data': postData,
		'url': appurl + 'app/?url=user/aboutus',
		'success': function(data) {		
			if (data) {
				$('#'+contentid).append(data.data.content);
			} else {
				alert(data.message);
			}
		}
	});
}