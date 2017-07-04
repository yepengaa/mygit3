/**
 * Created by Administrator on 2017/6/17 0017.
 */


//敌机子弹


function EnemyBullet () {

    for(var i=0; i<gameEngine.allEnemy.length; i++){
        this.ele=document.createElement("div");

        this.ele=document.createElement("div");
        this.id = parseInt(Math.random()*100000);

        gameEngine.allFoeBullet[this.id] = this;
        gameEngine.ele.appendChild(this.ele);


        this.ele.style.left = gameEngine.allEnemy[i].ele.offsetLeft +"px";

        this.ele.className= "bullets";
    }



    this.move=function () {
        var y=this.ele.offsetTop + 5;
        var that = this;
        var timer = setInterval(function () {

            if(y>gameEngine.ele.offsetHeight){
                clearInterval(timer);
                gameEngine.ele.removeChild(that.ele);
            }
            that.ele.style.top=y +"px";

        },100)



    }




}

