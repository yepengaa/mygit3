/**
 * Created by Administrator on 2017/6/16 0016.
 */


var gameEngine = {

    ele:null,      //初始化

    allMyBullet: {},  //装我机的子弹
    allFoeBullet:{},   //装敌机的子弹
    allEnemy: {},    //装敌机

    result:0,  //成绩



    init:function () {
        gameEngine.ele=document.getElementById("load");  //初始化加载页面
        return this;
    },

    state:function () {

        gameEngine.upload();


    },

    //开始游戏

    upload:function () {

        var logo = document.createElement("div");
        logo.className="toplogo";

        this.ele.appendChild(logo);

        var load = document.createElement("div");
        load.className="progress";
        this.ele.appendChild(load);


        var n = 1;
        var timer=setInterval(function () {
            n++;
            if(n==4){
                clearInterval(timer);
                logo.remove();
                load.remove();

                myPlane.init().move();
                myPlane.boom();

                gameEngine.createEnemy();  //创建敌机

                gameEngine.crash();

                gameEngine.backgroundimg();

            }
            load.style.backgroundImage="url(images/loading"+n+".png)";


        },600)


    },


    //创建敌机
    createEnemy:function () {

        //小飞机
        setInterval(function () {
            var randoms = Math.random() > 0.4 ? true:false;
            if(randoms){
                var enemy = new FoePlane();
                enemy.init("enemy_smallPlane").move();
                enemy.foebullet();
            }


        },2000);

        //中型飞机
        setInterval(function () {
            var randoms = Math.random() > 0.5 ? true:false;
            if(randoms){
                var enemy = new FoePlane();
                enemy.init("enemy_middlePlane").move();
                enemy.foebullet();
            }


        },3000);

        //大型飞机
        setInterval(function () {
            var randoms = Math.random() > 0.7 ? true:false;
            if(randoms){
                var enemy = new FoePlane();
                enemy.init("enemy_maxPlane").move();
                enemy.foebullet();

            }


        },4000)

    },


    //监测碰撞
    crash:function () {

        var isCrashMyPlane = false; //表示是否碰撞到我的飞机

        //我机的子弹和敌机相撞
        setInterval(function () {
            for(var i in gameEngine.allEnemy){
                for(var j in gameEngine.allMyBullet){

                    //发生碰撞
                    if(isCrash(gameEngine.allEnemy[i].ele,gameEngine.allMyBullet[j].ele)){

                        gameEngine.allEnemy[i].hurt(); //敌机掉血
                       // delete gameEngine.allEnemy[i];

                        gameEngine.allMyBullet[j].boom();

                        delete gameEngine.allMyBullet[j];

                    }


                }

                if(!isCrashMyPlane&&isCrash(gameEngine.allEnemy[i].ele,myPlane.ele)){
                    isCrashMyPlane=true;

                    gameEngine.allEnemy[i].boom(); //敌机爆炸

                    myPlane.boomBullet();
                    var dletot=setTimeout(function () {

                        var myName = prompt("你的分数是:"+gameEngine.result+" 请输入你的大名");

                        if(myName){
                            ajax({
                                type: "post",
                                url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
                                data: {name:myName, score:gameEngine.result},
                                async: true,

                                success:function(data){
                                    //进入排行榜
                                    location.href = "list.html";

                                }
                            })

                        }
                        else {
                            location.reload();
                        }

                        clearTimeout(dletot);
                    },300);

                }

            }


            //

            for(var b in gameEngine.allFoeBullet){
                for(var d in gameEngine.allMyBullet){

                    //发生碰撞
                    if(isCrash(gameEngine.allFoeBullet[b].bulls,gameEngine.allMyBullet[d].ele)){

                        gameEngine.allFoeBullet[b].bulletBoom(); //敌机子弹

                        delete gameEngine.allFoeBullet[b];

                        gameEngine.allMyBullet[d].boom();
                        delete gameEngine.allMyBullet[d];

                    }


                }

                if(!isCrashMyPlane&&isCrash(gameEngine.allFoeBullet[b].bulls,myPlane.ele)){
                    isCrashMyPlane=true;

                    gameEngine.allFoeBullet[b].bulletBoom(); //

                    myPlane.boomBullet();
                    var dletots=setTimeout(function () {

                        var myName = prompt("你的分数是:"+gameEngine.result+" 请输入你的大名");

                        if(myName){
                            ajax({
                                type: "post",
                                url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
                                data: {name:myName, score:gameEngine.result},
                                async: true,

                                success:function(data){
                                    //进入排行榜
                                    location.href = "list.html";

                                }
                            })

                        }
                        else {
                            location.reload();
                        }

                        clearTimeout(dletots);
                    },300);

                }

            }





        },30)



    },





    backgroundimg:function () {
        var n = 0;
        setInterval(function () {
            n++;
            gameEngine.ele.style.backgroundPositionY = n + 2 +"px";

        },40)


    }




}