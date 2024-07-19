var snake={
  hx:0,
  hy:20,
  bx:[0,0],
  by:[10,0],
  backupx:0,
  backupy:0,
  move:function(state){
    switch (state){
      case 't':
        $(".head").css({"top":this.hy+"px","border-radius":"10px 10px 0px 0px"})
        this.hy-=10;
        this.put();
        this.follow();

        break;
      case 'l':
        $(".head").css({"left":this.hx+"px","border-radius":"10px 0px 0px 10px"})
        this.hx-=10;
        this.put();
        this.follow();
        break;
      case 'r':
        $(".head").css({"left":this.hx+"px","border-radius":"0px 10px 10px 0px"})
        this.hx+=10;
        this.put();
        this.follow();
        break;
      case 'b':
        $(".head").css({"top":this.hy+"px","border-radius":"0px 0px 10px 10px"})
        this.hy+=10;
        this.put();
        this.follow();
        break;
      case 's':
        break;
    } 
    this.rules();
  },
  follow:function(){
    this.backupx=this.bx[this.bx.length-1];
    this.backupy=this.by[this.length-1];
    var name='.item';
    for(var i=0;i<=this.by.length;i++){
      $(name+i).css({"top":this.by[i]+"px","left":this.bx[i]+"px"})
    }
  },
  put:function(){
    this.bx.pop();
    this.bx.unshift(this.hx);
    this.by.pop();
    this.by.unshift(this.hy);
  },
  add:function(){
    this.bx.push(this.backupx);
    this.by.push(this.backupy);
    $(".snake-body").append("<div class='item item"+(this.bx.length)+"'></div>");
    $(".score").text(Number($(".score").text())+1)
    $(".item"+(this.bx.length-1)).show()
    $(".item"+this.bx.length).hide()
  },
  replay:function(){
    $(".snake-body").html('<div class="head item0"></div><div class="item item1"></div><div class="item item2"></div>')
    $(".dot").css({left:(Math.floor(Math.random()*100)*10),top:(Math.floor(Math.random()*50)*10)}); 
    this.hx=0;
    this.hy=20;
    this.bx=[0,0];
    this.by=[10,0];
    this.backupx=0;
    this.backupy=0;
    $(".item"+this.bx.length).hide();
    direction='b';
    if (Number($(".score").text())>Number($(".best").text())){
      $(".best").text(Number($(".score").text()))
    }
    $(".score").text(0)
    $(".lose").fadeOut(500,function(){
      direction='b'
    });
    $(".body").css({"background-image":"url(../images/back.jpg)"})
  },
  end:function(){
    direction='s';
    $(".lose").fadeIn(500);
    // $(".game-frame").hide()
    direction='s'
    // $(".f").hide()
    $(".body").css({"background-image":"none"})
    $(".score2").text($(".score").text())
    num=Number($(".best").text());
    if(num<Number($(".score").text())){
      num=Number($(".score").text());
    }
    $(".best2").text(num)
  },
  rules:function(){
    if (this.hy==getNum($(".dot").css("top"))&&this.hx==getNum($(".dot").css("left"))){
        $(".dot").css({left:(Math.floor(Math.random()*100)*10),top:(Math.floor(Math.random()*50)*10)});
      this.add();
    }
    if (this.hy>=$(".game-frame").height()){
      this.hy=0;
    }
    else if (this.hy<0){
      this.hy=$(".game-frame").height();
    }
    else if (this.hx>=$(".game-frame").width()){
      this.hx=0;
    }
    else if (this.hx<0){
      this.hx=$(".game-frame").width();
    }
    for(var i=1;i<this.bx.length;i++){
      if(this.hy==this.by[i]&&this.hx==this.bx[i]){
        this.end();
      }
    }
  }
}
var direction='b',old;
$( "body" ).keypress(function( event ) {
  console.log(event.whi)
  switch (event.which){
    case 119:
    case 87:
    case 1589: //top
      if(old != 'b'){
        direction='t';
        break;
      }
    case 100:
    case 68:
    case  1610://right
      if(old != 'l'){
        direction='r';
        break;
      }
    case 115:
    case 83:
    case 1587: //bottom
      if(old != 't'){
        direction='b';
        break;
      }
    case 97: 
    case 65:
    case 1588: //left 
      if(old != 'r'){
        direction='l';
        break;
      }

  }
  console.log(" :: ",event.which)
  old=direction;
})
$(".replay").click(function(){
  snake.replay();
})
function getNum(str){
  var num="";
  for(var i=0;i<str.length;i++){
    if(str[i]!="p"){
      num+=str[i];
    }else{
      return Number(num); 
    }
  }
}
function startSetting(){
  direction='b'
  $(".begin").css({"height":($(window).height())})
  // $(".game").hide();
  // $(".begin").hide();
  // $(".begin").show(function(){
  //   $(".begin").fadeOut(10000,function(){
  //     $(".game").fadeIn(500,function(){
  //         direction='b';
  //     })
  //   })
  // })
  $(".head").css({"top":snake.hy+"px","border-radius":"0px 0px 10px 10px"})
  $(".dot").css({left:(Math.floor(Math.random()*100)*10),top:(Math.floor(Math.random()*50)*10)});
  $(".item"+snake.bx.length).hide()
  $(".lose").hide();

  snake.follow();
}
startSetting();
function run(){
  snake.move(direction)
}
 setInterval(run,50)
