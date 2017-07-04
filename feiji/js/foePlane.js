/**
 * Created by Administrator on 2017/6/16 0016.
 */

class FoePlane{

    constructor(type){
        this.ele = document.createElement("div");//创建敌机
        this.id = parseInt(Math.random()*10000);//给敌机添加编号
        this.Ph = 0;         //敌机血滴数
        this.speed = 10;    //速度
        this.imgs = []; //敌机爆炸图片
        this.score = 0;  //一个敌机分

    }

    init(type){

        gameEngine.allEnemy[this.id]=this;  //把敌机放到敌机对象

        gameEngine.ele.appendChild(this.ele); //把敌机加载到游戏页面

        if(type=="enemy_smallPlane"){  //小飞机
            this.ele.className = "small_plane";
            [this.Ph,this.speed,this.score] = [1,10,5];
            this.imgs = ["images/plane1_die1.png","images/plane1_die2.png","images/plane1_die3.png"];

        }
        else if(type=="enemy_middlePlane"){  //中型飞机
            this.ele.className = "middle_plane";
            [this.Ph,this.speed,this.score] = [3,4,20];
            this.imgs = ["images/plane2_die1.png","images/plane2_die2.png","images/plane2_die3.png","images/plane2_die4.png"];
        }
        else if(type=="enemy_maxPlane"){  //大型飞机
            this.ele.className = "max_plane";
            [this.Ph,this.speed,this.score] = [10,2,40];
            this.imgs = ["images/plane3_die1.png","images/plane3_die2.png","images/plane3_die3.png","images/plane3_die4.png","images/plane3_die5.png","images/plane3_die6.png"];
        }

        this.ele.style.top = 0;   //设置出来的位置
        this.ele.style.left = parseInt(Math.random()*(gameEngine.ele.offsetWidth-this.ele.offsetWidth)) +"px";  //设置出来的位置

        return this;
    };

    move () {

        let that = this;
        this.timer=setInterval(function () {

            let y = that.ele.offsetTop + that.speed;
            const heingt=gameEngine.ele.offsetHeight;

            if(y>heingt){
                gameEngine.ele.removeChild(that.ele); //从游戏界面删除敌机
                clearInterval(that.timer);  //移除定时器

                delete gameEngine.allEnemy[that.id];   //从敌机对象中移除敌机
            }
            that.ele.style.top = y +"px";

        },50);


        return this;
    };

    hurt(){
        this.Ph--;

        if(this.Ph==0){
            this.boom();
            gameEngine.result += this.score;

        }
        return this;
    };

    boom () {
        clearInterval(this.timer);

        let that = this;
        let n = 0;
        let dletimer=setInterval(function () {

            if(n>that.imgs.length){
                clearInterval(dletimer);
                gameEngine.ele.removeChild(that.ele);
                delete gameEngine.allEnemy[that.id];
            }
            else {
                that.ele.style.backgroundImage="url("+that.imgs[n++]+")";
            }

        },100);


        return this;

    };

    foebullet () {
        this.bulls=document.createElement("div");//
        this.figure=parseInt(Math.random()*100000);

        gameEngine.allFoeBullet[this.figure] = this;

        gameEngine.ele.appendChild(this.bulls);

        this.bulls.className="bullets";

        this.bulls.style.left=this.ele.offsetLeft + this.ele.offsetWidth/2 +"px";
        this.bulls.style.top=this.ele.offsetTop + this.ele.offsetHeight +"px";


        this.movebullet();
        return this;
    };
    movebullet () {
        let that = this;
        this.bullettimer = setInterval(function () {
            let yTop = that.bulls.offsetTop + 5;
            if(yTop>gameEngine.ele.offsetHeight){
                clearInterval(that.bullettimer);
                gameEngine.ele.removeChild(that.bulls);
                delete gameEngine.allFoeBullet[that.figure];

            }

            that.bulls.style.top = yTop +"px";

        },50);

        return this;
    };

    bulletBoom () {

        clearInterval(this.bullettimer);
        this.ele.className="bullets_bomb";

        let that = this;
        let n = 1;
        let timer2=setInterval(function(){
            n++;
            if(n>2){
                clearInterval(timer2);
                gameEngine.ele.removeChild(that.bulls);

                delete gameEngine.allFoeBullet[that.figure];

            }
            that.ele.style.backgroundImage="images/die"+n+".png";

        },60)


    }


}

/*
function FoePlane (type){

    this.ele = document.createElement("div");//创建敌机



    this.id = parseInt(Math.random()*10000);//给敌机添加编号
    this.Ph = 0;         //敌机血滴数
    this.speed = 10;    //速度
    this.imgs = []; //敌机爆炸图片
    this.score = 0;  //一个敌机分

    this.init=function () {

        gameEngine.allEnemy[this.id]=this;  //把敌机放到敌机对象

        gameEngine.ele.appendChild(this.ele); //把敌机加载到游戏页面

        if(type=="enemy_smallPlane"){  //小飞机
            this.ele.className = "small_plane";
            [this.Ph,this.speed,this.score] = [1,10,5];
            this.imgs = ["images/plane1_die1.png","images/plane1_die2.png","images/plane1_die3.png"];

        }
        else if(type=="enemy_middlePlane"){  //中型飞机
            this.ele.className = "middle_plane";
            [this.Ph,this.speed,this.score] = [3,4,20];
            this.imgs = ["images/plane2_die1.png","images/plane2_die2.png","images/plane2_die3.png","images/plane2_die4.png"];
        }
        else if(type=="enemy_maxPlane"){  //大型飞机
            this.ele.className = "max_plane";
            [this.Ph,this.speed,this.score] = [10,2,40];
            this.imgs = ["images/plane3_die1.png","images/plane3_die2.png","images/plane3_die3.png","images/plane3_die4.png","images/plane3_die5.png","images/plane3_die6.png"];
        }

        this.ele.style.top = 0;   //设置出来的位置
        this.ele.style.left = parseInt(Math.random()*(gameEngine.ele.offsetWidth-this.ele.offsetWidth)) +"px";  //设置出来的位置

        return this;
    };


    //让敌机动起来
    this.move=function () {

        let that = this;
      this.timer=setInterval(function () {

            let y = that.ele.offsetTop + that.speed;
            const heingt=gameEngine.ele.offsetHeight;

            if(y>heingt){
                gameEngine.ele.removeChild(that.ele); //从游戏界面删除敌机
                clearInterval(that.timer);  //移除定时器

               delete gameEngine.allEnemy[that.id];   //从敌机对象中移除敌机
            }
            that.ele.style.top = y +"px";

      },50)


        return this;
    };


    //掉血
    this.hurt=()=>{
        this.Ph--;

        if(this.Ph==0){
            this.boom();
            gameEngine.result += this.score;

        }
        return this;
    };



    //爆炸
    this.boom=function () {
        clearInterval(this.timer);

        let that = this;
        let n = 0;
        let dletimer=setInterval(function () {

            if(n>that.imgs.length){
                clearInterval(dletimer);
                gameEngine.ele.removeChild(that.ele);
                delete gameEngine.allEnemy[that.id];
            }
            else {
                that.ele.style.backgroundImage="url("+that.imgs[n++]+")";
            }

        },100)


        return this;

    };


    //创建子弹

    this.foebullet=function () {
        this.bulls=document.createElement("div");//
        this.figure=parseInt(Math.random()*100000);

        gameEngine.allFoeBullet[this.figure] = this;

        gameEngine.ele.appendChild(this.bulls);

        this.bulls.className="bullets";

        this.bulls.style.left=this.ele.offsetLeft + this.ele.offsetWidth/2 +"px";
        this.bulls.style.top=this.ele.offsetTop + this.ele.offsetHeight +"px";


        this.movebullet();
        return this;
    };



    //发射子弹
    this.movebullet=function () {
        let that = this;
       this.bullettimer = setInterval(function () {
            let yTop = that.bulls.offsetTop + 5;
            if(yTop>gameEngine.ele.offsetHeight){
                clearInterval(that.bullettimer);
                gameEngine.ele.removeChild(that.bulls);
                delete gameEngine.allFoeBullet[that.figure];

            }

            that.bulls.style.top = yTop +"px";

        },50)

        return this;
    };

    //子弹爆炸

    this.bulletBoom=function () {

        clearInterval(this.bullettimer);
        this.ele.className="bullets_bomb";

        let that = this;
        let n = 1;
        let timer2=setInterval(function(){
            n++;
            if(n>2){
                clearInterval(timer2);
                gameEngine.ele.removeChild(that.bulls);

                delete gameEngine.allFoeBullet[that.figure];

            }
            that.ele.style.backgroundImage="images/die"+n+".png";

        },60)


    }

}

*/