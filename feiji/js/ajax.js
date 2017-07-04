/**
 * Created by Administrator on 2017/6/13 0013.
 */

function createXHR() {
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
    return new ActiveXObject("Microsoft.XMLHTTP");

}

function ajax(obj) {
    //1创建xhr对象
    var xhr = createXHR();

    //2 open
    var paramStr = params(obj.data);
    if(obj.type.toLowerCase()=="get"){
        obj.url += obj.data.length>0?("?"+paramStr):"";
    }
    xhr.open(obj.type, obj.url, obj.async);

    //3 send
    if(obj.type.toLowerCase()=="get"){
        xhr.send(null);
    }else {
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(paramStr);
    }

    //4

    if(obj.async){
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4){
                receive();
            }

        }
    }else {
        receive();
    }



    function receive() {
        if(xhr.status==200){
            if(obj.success){
                obj.success(xhr.responseText);
            }
        }else {
            if(obj.error){
                obj.error();
            }
        }
    }


}

function params(data) {
    var arr = [];
    for(var k in data){
        var str = k + "=" + data[k];
        arr.push(str);
    }
    return arr.join("&");
}




