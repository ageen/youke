var appurl = location.protocol + '//' + location.host + '/';
var web_dir = 'http://localhost/index.html';

var page = 1;
var limit = 8;
var expire = {};

if(getGlobalVal("cityId") == ''){
    setCookie("cityId", 1);
}
if(getGlobalVal("page") == ''){
    setSessionStorage("page", page);
}
if(getGlobalVal("limit") == ''){
    setSessionStorage("limit", limit);
}
$(document).ajaxStart(function() {
	createLoading();
    $('button').each(function(index, e){
        $(e).attr("disabled",true);
    });
});
$(document).ajaxSuccess(function(event, request, settings){
	var responseJson = jQuery.parseJSON(request.responseText);
	if(responseJson.code == 0){
		closeResponseMessage();
	}
    $('button').each(function(index, e){
        $(e).attr("disabled",false);
    });
});
$(document).ajaxError(function(event, jqxhr, settings, thrownError){
	$("#response-message>span").html(settings.url +" error: "+ thrownError);
	$("#response-message").attr("class", "error-message");
});
$(document).ajaxComplete(function(){
});
$(document).ajaxStop(function () {
});
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

///////////////////////////////////////公用部分///////////////////////////////////////////////////
//获取url中的参数
/**
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return unescape(r[2]);
	return null; //返回参数值
}
**/
function getQueryStringByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function createLoading(){
	$("#response-message>span").html("加载中...");
	$("#response-message").attr("class", "loading");
	$("#response-message").fadeIn();
}
function errorMessage(obj){
	if(obj.code == 0){
		return true;
	}else{
		$("#response-message>span").html(obj.message);
		$("#response-message").attr("class", "error-message");
		$("#response-message").fadeIn();
		return false;
	}
}
function errorMessageText(text){
    $("#response-message>span").html(text);
    $("#response-message").attr("class", "error-message");
    $("#response-message").fadeIn();
    return false;
}
function closeResponseMessage(){
	$("#response-message").fadeOut();
}
/* 显示遮罩层 */
function showOverlay() {
    $("#overlay").height(pageHeight());
    $("#overlay").width(pageWidth());
    // fadeTo第一个参数为速度，第二个为透明度
    // 多重方式控制透明度，保证兼容性，但也带来修改麻烦的问题
    $("#overlay").fadeTo(200, 0.5);
}

/* 隐藏覆盖层 */
function hideOverlay() {
    $("#overlay").fadeOut(200);
}

/* 当前页面高度 */
function pageHeight() {
    return document.body.scrollHeight;
}

/* 当前页面宽度 */
function pageWidth() {
    return document.body.scrollWidth;
}

function redirectToUrl(url){
	window.location.replace(url);
}

function timestampToDate(unix_timestamp, delimiter, format){
        if(delimiter === undefined){
            delimiter = "/";
        }
      var a = new Date(unix_timestamp * 1000);
      var year = a.getFullYear();
      var month = a.getMonth() + 1;
      var date = a.getDate();
      var hour = a.getHours();
      var min = padTwo(a.getMinutes());
      if(format == "datetime"){
        var time = year + delimiter + month + delimiter + date + ' ' +  hour + ':' + min;  
      }else{
        var time = year + delimiter + month + delimiter + date;    
      }
      
      return time;
}

function subString(str, len, hasDot)
{
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex,"**").length;
    for(var i = 0;i < strLength;i++)
    { 
        singleChar = str.charAt(i).toString(); 
        if(singleChar.match(chineseRegex) != null) 
        { 
            newLength += 2; 
        }else{ 
            newLength++; 
        } 
        if(newLength > len) 
        { 
            break;
        } 
        newStr += singleChar; 
    }

    if(hasDot && strLength > len) 
    { 
        newStr += "...";
    }
    return newStr;
}

function setCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(name + "=");
        if (c_start != -1) {
            c_start = c_start + name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }else{
            return false;
        }
    }else{
        return false;
    }
}

function setSessionStorage(name, value){
    sessionStorage.setItem(name, value);
}

function setLocalStorage(name, value){
    localStorage.setItem(name, value);
}

function getGlobalVal(name){
    if(getCookie(name)){
        return getCookie(name);
    }else if(sessionStorage.getItem(name)){
        return sessionStorage.getItem(name);
    }else if(localStorage.getItem(name)){
        return localStorage.getItem(name);
    }else{
        return false;
    }
}
function datastrToTimestamp(datastr){
    datastr = datastr.replace("-","/").replace("-","/");
    var timestamp = datastr.split(" / ").map(function(date){
        return Date.parse(date)/1000;
    });
    return timestamp[0];
}

function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURIComponent(r[2]); 
    return null; //返回参数值
}

function padTwo(num){
    if(num<10){
        return "0"+num;
    }else{
        return ""+num;
    }
}