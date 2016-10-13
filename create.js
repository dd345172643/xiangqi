function create(oTab,oTds){
	//棋局开始
	for (var i = 0; i < oTds.length; i++) {
		var oChess = document.createElement('span')
		oTds[i].appendChild(oChess);
		if(i==0 || i==8){
			oChess.className = 'chess1';
			oChess.innerHTML = '車';
		}else if(i==1||i==7){
			oChess.className = 'chess1';
			oChess.innerHTML = '馬';
		}else if(i==2||i==6){
			oChess.className = 'chess1';
			oChess.innerHTML = '相';
		}else if(i==3||i==5){
			oChess.className = 'chess1';
			oChess.innerHTML = '仕';
		}else if(i==4){
			oChess.className = 'chess1';
			oChess.innerHTML = '帥';
		}else if(i==19||i==25){
			oChess.className = 'chess1';
			oChess.innerHTML = '炮';
		}else if(i==27||i==29||i==31||i==33||i==35){
			oChess.className = 'chess1';
			oChess.innerHTML = '兵';
		}if(i==89 || i==81){
			oChess.className = 'chess2';
			oChess.innerHTML = '車';
		}else if(i==88||i==82){
			oChess.className = 'chess2';
			oChess.innerHTML = '馬';
		}else if(i==87||i==83){
			oChess.className = 'chess2';
			oChess.innerHTML = '象';
		}else if(i==86||i==84){
			oChess.className = 'chess2';
			oChess.innerHTML = '士';
		}else if(i==85){
			oChess.className = 'chess2';
			oChess.innerHTML = '将';
		}else if(i==70||i==64){
			oChess.className = 'chess2';
			oChess.innerHTML = '炮';
		}else if(i==62||i==60||i==58||i==56||i==54){
			oChess.className = 'chess2';
			oChess.innerHTML = '卒';
		}
	}
}
function getStyleAttr(obj, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[attr];
    }
    return obj.currentStyle[attr];
}
function move(arr,pos,oTds){
	var num = arr[0].num;
	var rows = parseInt(num/9);//选中棋子所处行数
	var cols = num % 9;//选中棋子所处列数
	var xmax = parseInt(rows*9+8);//选中棋子所处行数最大值
	var xmin = parseInt(rows*9+0);//选中棋子所处行数最小值
	var arr1 = [];
	var cols1 = cols;
	var max1 = Math.max(num,pos);
	var min1 = Math.min(num,pos);
	for (var i = 0; i < 10; i++) {
		if(cols<9) arr1.push(cols);
		cols1 -= 9;
		cols +=9;
		if(cols1>=0) arr1.push(cols1);
		if(cols<90) arr1.push(cols);//存储棋子所处列数的每个位置坐标值（车炮使用）
	}
	//車移动
	if(arr[0].obj.innerHTML == '車'){
		for (var i = 0; i < arr1.length; i++) {
			if(pos<=xmax && pos>=xmin){
				var k = 1;
				for (var j = min1+1; j < max1; j++) {
					var oSpan = oTds[j].getElementsByTagName('span')[0];
					if(oSpan.innerHTML == '') k++;
				}
				if(k == max1-min1) return true;
				return false;
			}else if(pos == arr1[i]){
				var k = 1
				for (var j = min1+9; j < max1; j=j+9) {
					var oSpan = oTds[j].getElementsByTagName('span')[0];
					if(oSpan.innerHTML == '')k++;
				}
				if(k == (max1-min1)/9) return true;
				return false;
			}
		}
	}
	//炮移动
	if(arr[0].obj.innerHTML == '炮'){
		var oSpan1 = oTds[pos].getElementsByTagName('span')[0];
		//隔子打子
		if(oSpan1.innerHTML != ''){
			for (var i = 0; i < arr1.length; i++) {
				if(pos<=xmax && pos>=xmin){
					var k = 0;
					for (var j = min1+1; j < max1; j++) {
						var oSpan = oTds[j].getElementsByTagName('span')[0];
						if(oSpan.innerHTML != '') k++;
					}
					if(k == 1) return true;
					return false;
				}else if(pos == arr1[i]){
					var k = 0;
					for (var j = min1+9; j < max1; j=j+9) {
						var oSpan = oTds[j].getElementsByTagName('span')[0];
						if(oSpan.innerHTML != '')k++;
					}
					if(k == 1) return true;
					return false;
				}
			}
		}
		//正常移动
		for (var i = 0; i < arr1.length; i++) {
			if(pos<=xmax && pos>=xmin){
				var k = 1;
				for (var j = min1+1; j < max1; j++) {
					var oSpan = oTds[j].getElementsByTagName('span')[0];
					if(oSpan.innerHTML == '') k++;
				}
				if(k == max1-min1) return true;
				return false;
			}else if(pos == arr1[i]){
				var k = 1
				for (var j = min1+9; j < max1; j=j+9) {
					var oSpan = oTds[j].getElementsByTagName('span')[0];
					if(oSpan.innerHTML == '')k++;
				}
				if(k == (max1-min1)/9) return true;
				return false;
			}
		}	
	}
	//馬
	if(arr[0].obj.innerHTML == '馬'){
		if(num-9>=0){
			if(oTds[num-9].getElementsByTagName('span')[0].innerHTML==''){
				if(pos == num-17 || pos == num-19) return true;
			}
		}
		if(num+9<=89){
			if(oTds[num+9].getElementsByTagName('span')[0].innerHTML==''){
				if(pos == num+17 || pos == num+19) return true;
			}
		}
		if(num+1<=89){
			if(oTds[num+1].getElementsByTagName('span')[0].innerHTML==''){
				if(pos == num-7 || pos == num+11) return true;
			}
		}
		if(num-1>=0){
			if(oTds[num-1].getElementsByTagName('span')[0].innerHTML==''){
				if(pos == num-11 || pos == num+7) return true;
			}
		}
	}
	//相或象
	if(arr[0].obj.innerHTML == '相' || arr[0].obj.innerHTML == '象'){
		if((num<=44&&pos<=44) ||(num>44&&pos>44)){
			if(num-8>=0){
				if(oTds[num-8].getElementsByTagName('span')[0].innerHTML==''){
					if(pos==num-16) return true;
				}
			}
			if(num-10>=0){
				if(oTds[num-10].getElementsByTagName('span')[0].innerHTML==''){
					if(pos==num-20) return true;
				}
			}
			if(num+8<=89){
				if(oTds[num+8].getElementsByTagName('span')[0].innerHTML==''){
					if(pos==num+16) return true;
				}
			}
			if(num+8<=89){
				if(oTds[num+10].getElementsByTagName('span')[0].innerHTML==''){
					if(pos==num+20) return true;
				}
			}
		}
	}
	//仕或士
	if(arr[0].obj.innerHTML == '仕' || arr[0].obj.innerHTML == '士'){
		if(((pos>2&&pos<6)||(pos>11&&pos<15)||(pos>20&&pos<24))||((pos>65&&pos<69)||(pos>74&&pos<78)||(pos>83&&pos<87))){
			if(pos == num-8||pos == num-10||pos == num+8||pos == num+10) return true;
		}
	}
	//帥或将
	if(arr[0].obj.innerHTML == '帥' || arr[0].obj.innerHTML == '将'){
		if(((pos>2&&pos<6)||(pos>11&&pos<15)||(pos>20&&pos<24))||((pos>65&&pos<69)||(pos>74&&pos<78)||(pos>83&&pos<87))){
			if(pos == num-9||pos == num-1||pos == num+1||pos == num+9) return true;
		}
	}
	//兵
	if(arr[0].obj.innerHTML == '兵'){
		if(num<=44){
			if(pos==num+9) return true;
		}
		if(num>44){
			if(pos==num+9||pos==num-1||pos==num+1) return true;
		}
	}
	//卒
	if(arr[0].obj.innerHTML == '卒'){
		if(num>44){
			if(pos==num-9) return true;
		}
		if(num<=44){
			if(pos==num-9||pos==num-1||pos==num+1) return true;
		}
	}
}