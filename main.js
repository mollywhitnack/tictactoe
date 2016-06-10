var player = ['X', 'O'];
var toggle=0;
var xs =[];
var os = [];
var gameOver = false;
var cats = 0;
var rand =0;
var names = [];
var winningCombos =[];
var n = 3;

$(document).ready(init); 

function init(){

  $('.submit').click(setBoard);
  
}

function setBoard(){
  $('.board').empty();
  console.log("clicked");
  n = $('.boardSize').val();
  console.log("n: ", n );

  //Should write to dom at end.
  for(let i=0; i<n; i++){
    var $trEl = $('<tr>');
    $trEl.addClass(`row row${i}`);
    $trEl.attr('id', `${i}>`);
    $('.board').append($trEl);
    for(let j=0; j<n; j++ ){
       var $tdEl = $('<td>');
       $tdEl.addClass(`col col${j+(i*n)}`);
       //.attr('id', 'value');
       $tdEl.attr('id', `${j+(i*n)}>`);
       $trEl.append($tdEl);
    }
  }

  winningCombos = findWinners(n);
  console.log(winningCombos);

  $('.col').click(turn);
  $('.restart').click(restartGame);
  $('.startGame').click(startGame);
}

function turn(event){
  console.log("event: " , event);
  var empty = $(event.target).text();
  if(!gameOver && empty === ''){
  if(cats === n*n){
    $('.winner').text("Cat's Game!")
    gameOver =true;
  }

  var place = parseInt(event.target.id);
  console.log("place: " , place);
  //var child = event.target;
  var row =  parseInt($(event.target).parent().attr('id'));
  $(event.target).text(player[toggle]);
  if(toggle ==0){
    toggle =1;
    $('.player').text("Player O's turn");
    $('.player').css('padding-top', '4px');
    $('.player').css('padding-bottom', '14px');
    xs.push(place);
    if(checkWin(xs)){
      if(names[0] != undefined)
        $('.winner').text( `Player X: ${names[0]} is the WINNER!`);
      else
        $('.winner').text( `Player X is the WINNER!`);
      gameOver = true;
    }
  }
  else{
    toggle =0;
    $('.player').text("Player X's turn");
    os.push(place);
    if(checkWin(os)){
      if(names[1]!= undefined)
        $('.winner').text( `Player O: ${names[1]} is the WINNER!`);
      else
        $('.winner').text( `Player O is the WINNER!`);
      gameOver = true;
    }
  }
  cats++;
  console.log("CATS: " ,cats);

}

}

/* Ways to win (0,1,2) (3,4,5) (6,7,8) (0,3,6) (1,4,7) (2,5,8)*/
function checkWin(places){
  if(places.length < n)
    return false;
  places.sort()
  console.log("sorted: " , places);
  for(let i =0; i<places.length; i++){
    var b = parseInt(n)//+n+2);
    var c = (b*2)+2;
    console.log("c: " , c);
    console.log(winningCombos);
    for(let j = 0; j<c; j++){
      //if the places array contains any of the possible winning combos
      console.log("wining combos at " , j , " , " , winningCombos[j]);
      if(contains(winningCombos[j], places)){
        console.log("WIN");
        return true;
      }
    }
  }
}

function contains(isThis, insideThis){
  console.log("check if ", isThis, " is in " , insideThis);
    var boolWin = isThis.every(function (val) { 
      //console.log("outer arr: " , insideThis.indexOf(val));
      return insideThis.indexOf(val) >= 0; 
    });
    return boolWin;
  }


function restartGame(){
  //console.log("Restart Game");
  toggle=0;
  xs =[];
  os = [];
  //winningCombos = [];
  places  = [];
  names = [];
  $('.col').text('');
  $('.winner').text('');
  $('.player').text('');
  gameOver = false;
  cats = 0;
  $('.playerx').val('');
  $('.playero').val('');
  $('.player').css('padding-top', '20px');
  $('.player').css('padding-bottom', '20px');
}

function startGame(){

  var playerx = $('.playerx').val();
  var playero = $('.playero').val();
  names = [playerx, playero];
  if(names[0] == '' && names[1] ==''){
    alert("Please Enter Player Names");
  }
  else{
  rand = Math.floor(Math.random() * (2));
  //console.log("rand: " ,rand);
  //console.log("names: ", names[0], names[1]);
  $('.player').text(`${names[rand]} go first!`);
  $('.player').css('padding-top', '4px');
  $('.player').css('padding-bottom', '14px');
  toggle = rand;
  }
}

function findWinners(n){
  var winnersTemp = [];
  //create psuedo board
  var rows = [];
  for(var i = 0; i<n;i++){
    var cols = [];
    for(var j=0; j<n; j++){
     cols.push(j+i*n);
    }
    rows.push(cols);
    //console.log(cols);
    //horizontal wins
    winnersTemp.push(cols);
  }
  //console.log(winnersTemp);
  
  for(var l =0; l<n; l++){
    var win = []
    for(let k =0; k<n; k++){
      //verticle wins
      win.push(rows[k][l]);
      //console.log(rows[k][l])
    }
    //console.log(win);
    winnersTemp.push(win);
  }
  //console.log(winnersTemp);

// find first horizontal
var winh1 = []
for(let l=0; l<n; l++){
  winh1.push(rows[l][l]);
  }
 //console.log(winh1);
 winnersTemp.push(winh1);
 //console.log(winnersTemp);

var winh2 = []
  for(let l=0; l<n; l++){
  winh2.push(rows[l][(n-l-1)]);
  }
  //console.log(winh2);
  winnersTemp.push(winh2);
  //console.log(winnersTemp);
  return winnersTemp;
}






