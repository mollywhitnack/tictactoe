var player = ['X', 'O'];
var toggle=0;
var xs =[];
var os = [];
var gameOver = false;
var cats = 0;
var rand =0;
var names = [];

$(document).ready(init); 

function init(){
  console.log("ready");
  console.log("player o's turn");

  //player clicked on a box
  $('.col').click(turn);
  $('.restart').click(restartGame);
  $('.startGame').click(startGame);


}

function turn(event){
  var empty = $(event.target).text();
  console.log("empty: " ,empty);
  if(!gameOver && empty === ''){
  console.log("Turn");
  cats++;
  console.log(event.target.id);
  var place = parseInt(event.target.id);
  //var child = event.target;
  var row =  parseInt($(event.target).parent().attr('id'));
  console.log("row:" , row);
  console.log("place: " , place);
  //$(event.target).css()
  $(event.target).text(player[toggle]);
  if(toggle ==0){
    toggle =1;
    $('.player').text("Player O's turn");
    $('.player').css('padding-top', '4px');
    $('.player').css('padding-bottom', '14px');
    xs.push(place);
    if(checkWin(xs)){
      console.log("X is the WINNER");
      console.log('Name: ' , names[0]);
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
      console.log("O is the WINNER");
      console.log('Name: ' ,names[1]);
      if(names[1]!= undefined)
        $('.winner').text( `Player O: ${names[1]} is the WINNER!`);
      else
        $('.winner').text( `Player O is the WINNER!`);
      gameOver = true;
    }
  }

  console.log("xs:" , xs);
  console.log("os:", os);
}

if(cats == 9){
  $('.winner').text("Cat's Game!")
  gameOver =true;
}
}

/* Ways to win (0,1,2) (3,4,5) (6,7,8) (0,3,6) (1,4,7) (2,5,8)*/
function checkWin(places){
  //must have atleast 3 to win
  var winners = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
  console.log("winners: " , winners.length);
  console.log(places);
  if(places.length < 3)
    return false;
  places.sort()
  console.log("sorted: " , places);
  for(let i =0; i<places.length; i++){
    for(let j = 0; j<winners.length; j++){
      //if the places array contains any of the possible winning combos
      if(contains(winners[j], places)){
        console.log("WIN");
        return true;
      }
    }
  }
}

function contains(isThis, insideThis){
  console.log("check if ", isThis, " is in " , insideThis);
    var boolWin = isThis.every(function (val) { 
      console.log("outer arr: " , insideThis.indexOf(val));
      return insideThis.indexOf(val) >= 0; 
    });
    return boolWin;
  }


function restartGame(){
  console.log("Restart Game");
  toggle=0;
  xs =[];
  os = [];
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
  rand = Math.floor(Math.random() * (2));
  console.log("rand: " ,rand);
  console.log("players: ", names);
  $('.player').text(`${names[rand]} go first!`);
  $('.player').css('padding-top', '4px');
  $('.player').css('padding-bottom', '14px');
  toggle = rand;
}