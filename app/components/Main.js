require('../styles/App.less');

var React = require('react');

let logoImage = require('../images/logo.png');


var AppComponent = React.createClass({
  componentDidMount: function () {
    var img = new Image();
    img.src = logoImage;

    if(img.complete){
        init();
    }else{
        img.onload = init;
    }

    var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext('2d'),
        winWidth = document.documentElement.clientWidth,
        winHeight = document.documentElement.clientHeight;
    canvas.width = winWidth;
    canvas.height = winHeight;

    var dotList = [];

    function init(){
        var imgW = winWidth*0.8,
            imgH = imgW,
            sx = winWidth/2-imgW/2,
            sy = winHeight/2-imgH/2;
        ctx.drawImage(img,sx,sy,imgW,imgH);
        var imgData = ctx.getImageData(sx,sy,imgW,imgH);
        console.log(imgData);
        //每隔4像素取一点，直径2像素，空隙2像素。点所在的i的以y为高度，x为位移来计算
        for(var x = 0; x<=imgData.width; x+=6){
            for(var y = 0; y<=imgData.height; y+=6){
                var i = 4*(x+y*imgData.width); 
                if(imgData.data[i] <= 100 && imgData.data[i+3] >= 128){
                    var dot = new Dot(x,y,2);
                    dotList.push(dot);
                }       
            }
        }
        
        draw();
    }


    function Dot(cx,cy,cr){
        this.x = cx;
        this.y = cy;
        this.r = cr;
        this.now = 0;
        this.all = Math.ceil(3000/(16.66*2));
        this.delay = this.all*Math.random();
        this.delayCount = 0;
    }

    // t 当前时间
    // b 初始值
    // c 总位移
    // d 总时间
    function easeInOutCubic(t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    }

    var rafid;
    var allnum = 0;
    function draw(){
        var imgW = winWidth*0.8,
            imgH = imgW,
            sx = winWidth/2-imgW/2,
            sy = winHeight/2-imgH/2;
        ctx.clearRect(0, 0, winWidth, winHeight);
        var len = dotList.length;
        ctx.fillStyle = 'rgba('+255+','+255+','+255+','+(allnum+100)/(len+100)+')';
        //console.log(allnum+":"+len);
        var cn,ca;
        var curX,curY,curDot;
        allnum = 0;
        for(var i=0; i<len; i+=1){

            curDot = dotList[i];
            if(curDot.delayCount < curDot.delay){
                curDot.delayCount+=1;
                continue;
            }

            ctx.save();
            ctx.beginPath();
            cn = curDot.now;
            ca = curDot.all;
            
            if(cn < ca){
                //console.log(cn+"::::"+ca);
                curX = easeInOutCubic(cn, 0, sx+curDot.x, ca);
                curY = easeInOutCubic(cn, 0, sy+curDot.y, ca);
                ctx.arc(curX, curY, curDot.r, 0, 2*Math.PI);
                curDot.now+=1;
            }else{
                ctx.arc(sx+curDot.x, sy+curDot.y, curDot.r, 0, 2*Math.PI);
                allnum += 1;
            }
            
            ctx.fill();
            ctx.restore();
            if(len <= allnum){
                cancelAnimationFrame(rafid);
                return;
            }
        }

        rafid = requestAnimationFrame(draw);
        
    }
  },
  render:function(){
    return <div></div>
  }
}) ;

AppComponent.defaultProps = {
};

module.exports =  AppComponent;
