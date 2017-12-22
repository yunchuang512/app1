function getBaseUrl() {
//			return 'http://qizhuanbao.com/';
		return 'http://54.223.209.97:8008/';
//	return 'http://139.217.25.169/';	
}

//关闭log输出，即重写log方法
/*console.log = (function(oriLogFunc) {
	return function(str) {
//		oriLogFunc.call(console, plus.webview.currentWebview().id+str);
	}
})(console.log);*/

var  regBox  =   {        
	regEmail :   /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, //邮箱
	        regName :   /^[a-z0-9_-]{3,16}$/, //用户名
	        regMobile :   /^0?1[3|4|5|8][0-9]\d{8}$/, //手机
	        regTel :   /^0[\d]{2,3}-[\d]{7,8}$/,
	    
	regID: /^\d{17}[0-9|X]$/
}

function getBaseUrlt() {
	return 'http://192.168.199.201/';
}

function getDefaultNumber() {
	return '12345678910';
}

function getDefaultUserId() {
	return 51;
}

function check(value) {
	//长度
	if(value.length < 6 || value.length > 20) {
		return false;
	}

	//数字
	var number = /[0-9]/;
	if(!number.test(value)) {
		return false;
	}
	var alpha = /[a-z]/i;
	if(!alpha.test(value)) {
		return false;
	}
	return true;
}

//修改服务端的弹窗状态
function changePopResult() {
	var url = getBaseUrl() + '/user/ClientUser/setBigCSingleData?type=0';
	mui.ajax(url, {
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(data) {
			if(data.status == 'success') {
				console.log('修改弹窗状态成功');
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(JSON.stringify(xhr));
			console.log(type);
		}
	});
}

//设置rem单位的根font-size
(function(doc, win) {
	var docEl = doc.documentElement,
		isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
		dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
		dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	docEl.dataset.dpr = dpr;
	var recalc = function() {
		var width = docEl.clientWidth;
		//		console.log("---  " + width + ' ' + dpr + ' ' + width / dpr);
		if(width / dpr > 750) {
			width = 750 * dpr;
		}
		docEl.dataset.width = width
		docEl.dataset.percent = 100 * (width / 750);
		docEl.style.fontSize = 100 * (width / 750) + 'px';
	};
	recalc()
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
})(document, window);

function openLoginpage2() {
	mui.openWindow({
		url: '../../login.html',
		id: 'login',
		show: {
			duration: 200
		},
		waiting: {
			autoShow: false
		}
	});
	//alert("aa");
}

//检查每个控件
function checkabox(boxname) {
	var text = boxname.value;
	if(text == null || text.length == 0 || Trim(text).length == 0) {
		return false;
	}
	return true;
}
//去除空格
function  Trim(str) {              
	return  str.replace(/(^\s*)|(\s*$)/g,  "");     
}

//复制文字context
function copyToClip(context) {
	if(mui.os.android) {
		var Context = plus.android.importClass("android.content.Context");
		var main = plus.android.runtimeMainActivity();
		var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
		plus.android.invoke(clip, "setText", context);
	} else if(mui.os.ios) {
		var UIPasteboard = plus.ios.importClass("UIPasteboard");
		var generalPasteboard = UIPasteboard.generalPasteboard();
		// 设置/获取文本内容:
		generalPasteboard.setValueforPasteboardType(context, "public.utf8-plain-text");
		//var value = generalPasteboard.valueForPasteboardType("public.utf8-plain-text");
	}
}

//保存网络图片到本地相册，传入参数为网络图片的url
function saveNetPicture(imgUrl) {
	var suffix = cutImageSuffix(imgUrl);
	var downLoader = plus.downloader.createDownload(imgUrl, {
		method: 'GET',
		filename: '_downloads/inviteFans' + suffix
	}, function(download, status) {
		var fileName = download.filename;
		
		console.log('文件名:' + fileName);
		console.log('下载状态：' + status);
		//保存至本地相册
		plus.gallery.save(fileName, function() {
			mui.alert("二维码保存成功，请到系统相册查看");
		}, function(e){
			alert("失败"+ JSON.stringify(e));
		});
	});
	downLoader.start();
}

// 截取图片后缀用于重命名图片，防止%E5%85%89%E6%98%8E%E8%A1%8C编码的文件不被系统相册识别；
function cutImageSuffix(imageUrl) {
	var index = imageUrl.lastIndexOf('.');
	var tm = imageUrl.substring(index);
	if(tm.length>10){
		return '.jpg';
	}
	else {
		return imageUrl.substring(index);	
	}
}

//错误处理
window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
	console.log("错误信息：", errorMessage);
	console.log("出错文件：", scriptURI);
	console.log("出错行号：", lineNumber);
	console.log("出错列号：", columnNumber);
	console.log("错误详情：", errorObj);
}