var player = ['X', 'O'];
var toggle=0;
var xs =[];
var os = [];

$(document).ready(init); 

function init(){
  console.log("ready");
  console.log("player o's turn");

  //player clicked on a box
  $('.col').click(turn);
  $('.restart').click(restartGame);
}

function turn(event){
  console.log("Turn");
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
    xs.push(place);
    if(checkWin(xs)){
      console.log("X is the WINNER");
      //$('.col').text('');
      $('.winner').text("X is the WINNER");
    }
  }
  else{
    toggle =0;
    $('.player').text("Player X's turn");
    os.push(place);
    if(checkWin(os)){
      console.log("O is the WINNER");
      //$('.col').text('');
      $('.winner').text("O is the WINNER");
    }
  }

  console.log("xs:" , xs);
  console.log("os:", os);
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


  /*for(let i =0; i<isThis.length; i++){
    console.log("check: ", isThis[i]);
    if($.inArray(isThis[i], insideThis) == -1){
      return false;
      console.log("NOT in it");
    }
    else{
      return true;
      console.log("Is in it");
    }
  }*/


function restartGame(){
  console.log("Restart Game");
  toggle=0;
  xs =[];
  os = [];
  places  = [];
  $('.col').text('');
  $('.winner').text('');
}