"use strict";var myPlane={ele:null,difficulty:500,init:function(){return this.ele=document.createElement("div"),this.ele.className="planes",gameEngine.ele.appendChild(this.ele),this.ele.style.left=(gameEngine.ele.offsetWidth-this.ele.offsetWidth)/2+"px",this.ele.style.top=gameEngine.ele.offsetHeight-this.ele.offsetHeight+"px",this},move:function(){var e=this;this.ele.onmousedown=function(t){var n=(t=t||event).offsetX,o=t.offsetY;document.onmousemove=function(t){var f=(t=t||event).pageX-n-gameEngine.ele.offsetLeft,i=t.pageY-o;f<0?f=0:f>gameEngine.ele.offsetWidth-e.ele.offsetWidth&&(f=gameEngine.ele.offsetWidth-e.ele.offsetWidth),i>gameEngine.ele.offsetHeight-e.ele.offsetHeight&&(i=gameEngine.ele.offsetHeight-e.ele.offsetHeight),e.ele.style.left=f+"px",e.ele.style.top=i+"px"},document.onmouseup=function(){document.onmousemove=document.onmouseup=null}};var t=0,n=0;document.onkeydown=function(e){(e=e||event).stopPropagation?e.stopPropagation():e.cancelBubble=!0,37==e.keyCode?t=-10:39==e.keyCode?t=10:38==e.keyCode?n=-10:40==e.keyCode&&(n=10)},document.onkeyup=function(){t=0,n=0},setInterval(function(){var o=e.ele.offsetLeft+t,f=e.ele.offsetTop+n;o<0?o=0:o>gameEngine.ele.offsetWidth-e.ele.offsetWidth?o=gameEngine.ele.offsetWidth-e.ele.offsetWidth:f<0?f=0:f>gameEngine.ele.offsetHeight-e.ele.offsetHeight&&(f=gameEngine.ele.offsetHeight-e.ele.offsetHeight),e.ele.style.left=o+"px",e.ele.style.top=f+"px"},30)},boom:function(){setInterval(function(){(new Bullet).init().move()},this.difficulty)},boomBullet:function(){var e=this,t=1,n=setInterval(function(){++t>=3&&clearInterval(n),e.ele.style.backgroundImage="url(images/me_die"+t+".png)"},100)}};