$.ajax({
	'type': 'get',
	'data': {},
	'url': appurl + 'account/getInfo',
	success: function(data){
		setSessionStorage("user_info", JSON.stringify(data.body));
	},
	error: function(){
		sessionStorage.removeItem("user_info")
		sessionStorage.removeItem("prev_url")
		redirectToUrl("../login.html");
	}
});