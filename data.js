

var nbCartes = 12;
var doubleCaseBonus = 3;

// allow flag
var allowToDrop = false;
var allowToPioche = true;
var allowToSee = false;

// delay
var iaPiocheDelay = 700;
var iaDropDelay = 1200;
var seeDelay = 5000;

// anim
var piocheAnim = 500;
var dropAnim = 500;

// size
var piocheGap = '90px';


// Players
var player1 = {
  'id': 1,
  'name': 'Joueur 1',
  'isIA': false,
  'cartes': generateCartes(),
  'score': 0
};
var player2 = {
  'id': 2,
  'name': 'Joueur 2',
  'isIA': false,
  'cartes': generateCartes(),
  'score': 0
};
var playerIA = {
  'id': 2,
  'name': 'IA',
  'isIA': true,
  'cartes': generateCartes(),
  'score': 0
};
var currentPlayer = player1;
var otherPlayer = player2;


// Data functions
function generateCartes() {
  var cartesArray = ['J']; // joker
  for(var n=1; n<=nbCartes; n++) {
    cartesArray.push(n);
  }
  // shuffle
  for (var i = cartesArray.length; i; i--) {
      var j = Math.floor(Math.random() * i);
      var x = cartesArray[i - 1];
      cartesArray[i - 1] = cartesArray[j];
      cartesArray[j] = x;
  }
  return cartesArray;
}

