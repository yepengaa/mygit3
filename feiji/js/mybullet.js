/**
 * Created by Administrator on 2017/6/16 0016.
 */

function Bullet() {

    this.ele = document.createElement("div"); //创建子弹
    this.id = parseInt(Math.random()*10000);  //给创建的子弹添加ID名


    //给子弹初始化值
    this.init=function () {

        gameEngine.allMyBullet[this.id] = this; //把创建的子弹放进子弹对象

        gameEngine.ele.appendChild(this.ele); //把创建的子弹添加到游戏界面

        this.ele.className = "bullets";
        this.ele.style.left = myPlane.ele.offsetLeft + (myPlane.ele.offsetWidth+this.ele.offsetWidth-8)/2 +"px";
        this.ele.style.top = myPlane.ele.offsetTop - 18 + "px";

        return this;
    };



    //子弹运动
    this.move = function () {
        var that = this;

        this.timer=setInterval(function () {

            var yspeed = that.ele.offsetTop - 10;
            if(yspeed<-18){
                gameEngine.ele.removeChild(that.ele);
                clearInterval(that.timer);

                delete gameEngine.allMyBullet[that.id];
            }
            that.ele.style.top = yspeed +"px";

        },30)



    };


    //爆炸

    this.boom= () =>{
        clearInterval(this.timer);
        this.ele.className="bullets_bomb";

        var that = this;
        var n = 1;
        var timer2=setInterval(function(){
            n++;
            if(n>=2){
                clearInterval(timer2);
                gameEngine.ele.removeChild(that.ele);

            }
            that.ele.style.backgroundImage="images/die"+n+".png";

        },60)


    }




}
