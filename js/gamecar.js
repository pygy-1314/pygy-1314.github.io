$(document).keydown(function(e){
	var _e = window.event || e;
	keyCodeEvent(_e.keyCode);
});
var _movePx = 50;
var _revisePx = _movePx + 20;
var _moveTag = "px";
var _$car = $("#blackcar");
var _$gamebox = $("#gamebox");
var _$gameboxWidth = _$gamebox.width();
var _$gameboxHeight = _$gamebox.height();
var _stopKeyEvent = true;

// 汽车向左移动
function carMoveLeft(){
	var _carLeft = _$car.position().left;
	if(_carLeft < _revisePx) return; 
	_carLeft = _carLeft - _movePx + _moveTag;
	_$car.css("left",_carLeft);
}
// 汽车向上移动
function carMoveTop(){
	var _carTop = _$car.position().top;
	if(_carTop < _revisePx) return; 
	_carTop = _carTop - _movePx + _moveTag;
	_$car.css("top",_carTop);
}
// 汽车向右移动
function carMoveRight(){
	//var _carWidth = _$car.outerWidth();
	var _carRight = _$car.position().left;
	if(_carRight > _$gameboxWidth - _revisePx) return; 
	_carRight = _carRight + _movePx + _moveTag;
	_$car.css("left",_carRight);
}
// 汽车向下移动
function carMoveBottom(){
	var _carBottom = _$car.position().top;
	if(_carBottom > _$gameboxHeight - _revisePx) return; 
	_carBottom = _carBottom + _movePx + _moveTag;
	_$car.css("top",_carBottom);
}

//键盘事件
function keyCodeEvent(keycode){
	if(_stopKeyEvent) return;
	switch(keycode){
		case 37:
			carMoveLeft();
			break;
		case 38:
			carMoveTop();
			break;
		case 39:
			carMoveRight();
			break;
		case 40:
			carMoveBottom();
			break;
		default:
			break;
	}
	carTouchThing();
}
window.onload = function(){
	contrlButton();
	bindBtnEvent();
};
//控制按钮
function contrlButton(){
	$(".ctrlBtn").on("click",function(){
		$(".ctrlBtn").toggleClass("disnone");
	});
}
// 按钮绑定事件
function bindBtnEvent(){
	$("#startBtn").on("click",startEvent);
	$("#pauseBtn").on("click",pauseEvent);
}
//开始事件
function startEvent(){
	showHiddenTargets();
	startAnimateGroup();
}
//暂停事件
function pauseEvent(){
	pauseAnimateGroup();
}
//显示影藏目标
function showHiddenTargets(){
	$("#gamebox").find("img").css("display","block");
}
//启动页面动画
function startAnimateGroup(){
	_stopKeyEvent = false;
	$(".g-animate").css("animation-play-state","running");
}
//暂停页面动画
function pauseAnimateGroup(){
	_stopKeyEvent = true;
	$(".g-animate").css("animation-play-state","paused");
}
// 汽车碰物体
function carTouchThing(){
	var _touch = false;
	$(".g-animate").each(function(i,evt){
		_touch = weatherTouch($("#blackcar"),$(this));
		if(_touch) return false;
	});
	if(_touch){
		pauseAnimateGroup();
		_stopKeyEvent = true;
		$("#car_dead").fadeIn(4000);
		$("#dead_txt")[0].innerText = "你已经车毁人亡,即将重启!"
		$("#dead_txt").fadeIn(3000,function(){
			var _endTime = 5;
			var _interval =setInterval(function(){
				$("#dead_txt")[0].innerText ="重启倒计时 "+_endTime--+" S";
				if(_endTime<1){
					clearInterval(_interval);
					location.reload();
				}
			},1000);
		});
	}
}
// 两物相碰撞算法
function weatherTouch(_obj1,obj2){
	var _obj1 = _obj1[0],_obj2 = obj2[0];
	var _leftBoxDistance_1 = _obj1.offsetLeft;
	var _rightBoxDistance_1 = _obj1.offsetLeft + _obj1.offsetWidth;
	var _topBoxDistance_1 = _obj1.offsetTop;
	var _bottomBoxDistance_1 = _obj1.offsetTop + _obj1.offsetHeight;
	var _leftBoxDistance_2 = _obj2.offsetLeft;
	var _rightBoxDistance_2 = _obj2.offsetLeft + _obj2.offsetWidth;
	var _topBoxDistance_2 = _obj2.offsetTop;
	var _bottomBoxDistance_2 = _obj2.offsetTop + _obj2.offsetHeight;
	if(_leftBoxDistance_1 >_rightBoxDistance_2 || _rightBoxDistance_1 < _leftBoxDistance_2 ||
	   _topBoxDistance_1 > _bottomBoxDistance_2 || _bottomBoxDistance_1 < _topBoxDistance_2){
		return false;
	}else{
		return true;
	}
}