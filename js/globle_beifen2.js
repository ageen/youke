var host = window.location.host;
//var appurl = 'http://' + host + '/';
var appurl = 'http://61.155.169.176/';
var web_dir = 'http://localhost/index.html';


//首页默认城市
//var city_id =$.cookie('city');
//var city_name = $.cookie('cityname');



///////////////////////////////////////公用部分///////////////////////////////////////////////////
//获取url中的参数
function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null) return unescape(r[2]);
		return null; //返回参数值
	}

///////////////////////////////////////首页///////////////////////////////////////////
//公共-获取广告列表
function getAds(pos){
		var postData = {
			'cityId': 1,
			'pos':pos
		};

		$.ajax({
			'type': 'get',
			'dataType': 'json',
			'data': postData,
			'url': appurl + 'global/getAds',
			'success': function(data) {
				var str = "";
				var str1 = "";
				var i=0;
				if (data) {		
					$.each(data.body, function(j, val){			
						//banner滚动点的个数
							
						str1 += '<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>';
					    i++;
						
						//具体banner图片
						str += '<div class="item">';
						str += '<a href="'+val.link+'"><img src="'+val.image+'" alt="'+val.name+'"></a>';
					    str += '</div>';						
						
					});			
					$("#banner-generic").append(str1);
					$("#banner-generic").find("li").first().addClass("active");
					$("#banner").append(str);
					$("#banner").find(".item").first().addClass("active");
						
				} else {
					alert(data.message);
				};
			}
		});

}
//获取首页城市
function getCity(){
		var postData = {
		};

		$.ajax({
			'type': 'get',
			'dataType': 'json',
			'data': postData,
			'url': appurl + 'index/getCity',
			'success': function(data) {
				console.log(data);
				var str = "";
				if (data) {		
					$.each(data.body.list, function(j, val){			
					str+='<option id="'+val.rId+'">'+val.rName+'</option>';
						
					});			

					$("#address").append(str);
						
				} else {
					alert(data.message);
				};
			}
		});

}
//首页--精品房源推荐
function getRec(){
		var postData = {
			'cityId': 1
		};

		$.ajax({
			'type': 'get',
			'dataType': 'json',
			'data': postData,
			'url': appurl + 'index/getRec',
			'success': function(data) {
				var str = "";
				if (data) {		
					$.each(data.body, function(j, val){
						str += '<dl><dt>';
						str += '<a href="house_detail.html"><img src="'+val.logo+'" class="img-responsive" /></a>';
						str += '<span class="badge transparent-background-orange"><h4>'+val.price+'元/月</h4></span>';
						str += '</dt><dd>';
						str += '<div class="pull-left">';
						str += '<a href="house_detail.html"><h4 class="title">'+val.name+'</h4></a>';
						str += '<p>'+val.address+'</p>';
						str += '</div>';
						str += '<div class="pull-right">';
						if(val.isShort==1)
						{str += '<span class="badge btn-round-15 short-rent">短租</span>';}
						if(val.isLong==1)
						{str += '<span class="badge btn-round-15 m-l-5 long-rent">长租</span>';}
						
						str += '</div>';
						str += '</dd></dl>';
					});			
					
					$("#tuijian").append(str);
						
				} else {
					alert(data.message);
				};
			}
		});

}


///////////////////////////////////////我要租房///////////////////////////////////////////

//我要租房列表
function getList(){
		var postData = {
			'page':1,
			'limit':10,
			'rId':1
		};

		$.ajax({
			'type': 'get',
			'dataType': 'json',
			'data': postData,
			'url': appurl + 'house/getList',
			'success': function(data) {
				var str = "";
				if (data) {		
					$.each(data.body, function(j, val){			
										
					str+='<dl>';
					str+='<dt><a href="house_detail.html?id='+val.id+'"><img src="'+val.logo+'" class="img-responsive" /></a></dt>';
					str+='<dd>';
					str+='<table>';
					str+='<tr>';
					str+='<td colspan="3"><h4 class="pull-left"><a href="house_detail.html?id='+val.id+'" class="color-02">'+val.name+'</a></h4><span class="pull-right color-01">'+val.pos+'</span></td>';
					str+='</tr>';
					str+='<tr>';
					str+='<td colspan="3"><span class="introduce date color-03">'+val.address+'</span></td>';
					str+='</tr>';
					str+='<tr>';
					str+='<td class="price color-04"><span class="bigger color-04" >'+val.price+'</span>元/月</td>';
					str+='<td class="text-right">';
					if(val.isShort==1)
					{str+='<span class="badge btn-round-15 short-rent">短租</span>';}
					if(val.isLong==1)
					{str+='<span class="badge btn-round-15 long-rent m-l-5">长租</span>';}
					
					str+='</td>';
					str+='</tr>';
					str+='</table>';
					str+='</dd>';
				    str+='</dl>';
								
						
					});			

					$("#area-list").append(str);
						
				} else {
					alert(data.message);
				};
			}
		});

}

//我要租房列表--楼盘详情

function getInfo(louid){
		var postData = {
			'id':louid
		};

		$.ajax({
			'type': 'get',
			'dataType': 'json',
			'data': postData,
			'url': appurl + 'house/getInfo',
			'success': function(data) {
				console.log(data);
				var str = "";
				var str1 = "";
				if (data) {		
					    str+='<li><img src="'+data.body.logo+'" class="img-responsive" /></li>';	
						str+='<li>';	
						str+='<span class="pull-left"><span class="glyphicon glyphicon-map-marker"></span>'+data.body.address+'</span>';	
						str+='<span class="pull-right">共'+data.body.floors+'层</span>';	
						str+='</li>';	
						str+='<li>';	
						str+='<span class="glyphicon glyphicon-earphone"></span> 联系电话：'+data.body.telephone+'';	
						str+='</li>';	
						str+='<li class="border">';	
						str+='<span class="glyphicon glyphicon-info-sign pull-left"></span> ';	
						str+='<p class="pull-left" id="wrap">'+data.body.routes+'</p>';	
						str+='<div id="read-more" class="pull-right"></div>';	
						str+='</li>';	
						
					$.each(data.body.households, function(j, val){																		
						str1+='<dl>';
						str1+='<a href="rent_long.html?hId='+val.hId+'"><dt>';
						if(val.image !==""){
						str1+='<img src="'+val.image+'" class="img-responsive" />';	
						}else{
						str1+='<img src="images/nopic.jpg" class="img-responsive" />';		
						}						
						
						str1+='</dt><dd>';
						str1+='<table>';
						str1+='<tr>';
						str1+='<td colspan="3"><span class="title pull-left">'+val.name+'</span>';
						str1+='<div class="pull-right">'+val.area+'m²</div></td>';
						str1+='</tr>';
						str1+='<tr>';
						str1+='<td colspan="3">';
						str1+='<span>一居室LOFT白色简约风格，上下层空间设计，loft bed是嵌入式，有效利用。</span>';
						str1+='</td>';
						str1+='</tr>';
						str1+='<tr>';
						str1+='<td class="price color-04"><span class="bigger color-04" >'+val.minPrice+' - '+val.maxPrice+'</span>'+val.unit+'</td>';
						str1+='<td class="text-right">';
						if(val.isShort==1)
						{str1+='<a href="rent_short.html"><span class="badge btn-round-15 short-rent">短租</span></a>';}
						if(val.isLong==1)
						{str1+='<a href="rent_long.html"><span class="badge btn-round-15 long-rent">长租</span></a>';}
						str1+='</td>';
						str1+='</tr>';
						str1+='</table>';
						str1+='</dd></a>';
						str1+='</dl>';							
					});			

					$("#house-detail").append(str);
					$("#house-list").append(str1);
						
				} else {
					alert(data.message);
				};
			}
		});

}

//楼盘详情-具体户型-户型详情
function getHouseholdInfo(hId){
		var postData = {
			'hId': hId,
		};

		$.ajax({
			'type': 'get',
			'dataType': 'json',
			'data': postData,
			'url': appurl + 'house/getHouseholdInfo',
			'success': function(data) {
				console.log(data);
				var str = "";
				var str1 = "";
				var str2 = "";
				var i=0;
				if (data) {		
					$.each(data.body.info.images, function(j, val){			
						//banner滚动点的个数
							
						str1 += '<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>';
					    i++;
						
						//具体banner图片
						str += '<div class="item">';
						str += '<img src="'+val+'">';
					    str += '</div>';						
						
					});			
					$("#banner-generic").append(str1);
					$("#banner-generic").find("li").first().addClass("active");
					$("#banner").append(str);
					$("#banner").find(".item").first().addClass("active");
					
					$.each(data.body.list, function(j, val){
						str2+='<li data-price="'+val.price+'"><a href="javascript:void(0)">'+val.room+'室</a></li>';
					});
					$("#floor").append(str1);
					
					$("#floor li").each(function(){					
						$(this).click(function(){
							$("#floor li").removeClass("active");
							$(this).addClass("active");
							var price = $(this).attr("data-price");
							$("#f-price").html(price)
						});
					});
						
				} else {
					alert(data.message);
				};
			}
		});

}




	

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


function search() {
	var key = $("#search").attr("value");
	//var surl = appurl + 'pc/fenlei.php?key='key';
	window.location.href = "fenlei.php?keyword=" + encodeURI(encodeURI(key));

}