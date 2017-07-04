/**
 * Created by Administrator on 2017/6/16 0016.
 */

var myPlane = {
    ele:null,  //初始化
    difficulty:500,    //接收难度级别的数据


    //创建我机并初始化
    init:function () {
        this.ele = document.createElement("div");
        this.ele.className="planes";
        gameEngine.ele.appendChild(this.ele);    //加载到游戏引擎

        this.ele.style.left=(gameEngine.ele.offsetWidth-this.ele.offsetWidth)/2 + "px"; //初始化离左边位置
        this.ele.style.top=gameEngine.ele.offsetHeight-this.ele.offsetHeight + "px";    //初始化纵轴的位置

        return this;

    },

    //让我机动起来
    move:function () {

        var that = this;

        //鼠标控制我机
        //鼠标按下
        this.ele.onmousedown=function (e) {
            e = e|| event;

            var x = e.offsetX;   //获取鼠标按下时鼠标距离我机左边界的距离
            var y = e.offsetY;   //获取鼠标按下时鼠标距离我机上边界的距离

            //移动鼠标传参
            document.onmousemove=function (e) {
                e = e||event;

                var moveLeft = e.pageX - x - gameEngine.ele.offsetLeft;   //得到鼠标移动时我机距离游戏界面左边的距离
                var moveTop = e.pageY - y;            //得到鼠标移动时我机距离游戏界面上边界的距离

                //设置我机到左边界的值
                if(moveLeft<0){
                    moveLeft = 0;
                }
                //设置我机到右边界的值
                else  if(moveLeft>gameEngine.ele.offsetWidth-that.ele.offsetWidth){
                    moveLeft = gameEngine.ele.offsetWidth-that.ele.offsetWidth;
                }
                //设置我机到下边界的值
                if(moveTop>gameEngine.ele.offsetHeight-that.ele.offsetHeight){
                    moveTop = gameEngine.ele.offsetHeight-that.ele.offsetHeight;
                }

                //给我机赋值移动
                that.ele.style.left = moveLeft + "px";
                that.ele.style.top = moveTop + "px";

            };

            //松开鼠标结束事件
            document.onmouseup=function () {
                document.onmousemove=document.onmouseup=null;
            }

        };

        //键盘控制我机
        var xspeed = 0;  //横向移动的方向速度
        var yspeed = 0;  //纵向移动的方向速度

        //监测移动方向
        document.onkeydown=function (e) {
            e = e||event;
            if(e.stopPropagation){
                e.stopPropagation();
            }
            else {
                e.cancelBubble = true;
            }

            //向左移动
            if(e.keyCode==37){
                xspeed = -10;  //速度
            }
            //向右移动
            else if(e.keyCode==39){
                xspeed = 10;  //速度

            }
            //向上移动
            else if(e.keyCode==38){
                yspeed = -10;  //速度

            }
            //向下移动
            else if(e.keyCode==40){
                yspeed = 10;  //速度

            }

        };

        //键盘松开停止运动
        document.onkeyup=function () {
            xspeed = 0;
            yspeed = 0;
        };


        //赋值并运动起来
        setInterval(function () {
            var x = that.ele.offsetLeft + xspeed;  //横向运动的值
            var y = that.ele.offsetTop + yspeed;   //纵向运动的值

            //设置左边界的临界值
            if(x<0){
                x = 0;
            }
            //设置右边界的临界值
            else if(x>gameEngine.ele.offsetWidth-that.ele.offsetWidth){
                x = gameEngine.ele.offsetWidth-that.ele.offsetWidth;
            }
            //设置上边界的临界值
            else if(y<0){
                y = 0;
            }
            //设置下边界的临界值
            else if(y>gameEngine.ele.offsetHeight-that.ele.offsetHeight){
                y = gameEngine.ele.offsetHeight-that.ele.offsetHeight;
            }

            //赋值并运动
            that.ele.style.left = x +"px";
            that.ele.style.top = y +"px";

        },30)



    },


    //发射子弹
    boom:function () {
        setInterval(function () {
            var sbullet = new Bullet();  //初始化子弹
            sbullet.init().move();      //调用

        },this.difficulty)

    },


    //我机爆炸
    boomBullet:function () {

        var that = this;
        var n = 1;
       var dletimer = setInterval(function () {
            n++;
            if(n>=3){
                clearInterval(dletimer);
            }
            that.ele.style.backgroundImage="url(images/me_die"+n+".png)";


        },100)


    }






}