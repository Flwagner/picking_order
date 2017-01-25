
function iaPlay(){
  console.log('iaPlay');
  setTimeout(function(){pioche();}, iaPiocheDelay);
  var caseChoosen;
  setTimeout(function(){caseChoosen = bestChoice();}, iaPiocheDelay+100);  
  setTimeout(function(){dropCarte(caseChoosen);}, iaPiocheDelay+iaDropDelay);
}

function bestChoice(){
  console.log('bestChoice');
  var currentCart = getCurrentCart();
  var availableCases = $('.playerRow.active').find('td:not(.full)');
  // remove known loose fight
  /*
  for(var i = 0; i < availableCases.length; i++) {
      var boardCase = availableCases.eq(i);
      var oppositCase = getOppositCase(boardCase);
      if(oppositCase.attr('carte') >= currentCart) {
         availableCases.splice(i,1);
      }
  }
  */
  // random
  var random = Math.floor(Math.random() * availableCases.length);
  return availableCases.eq(random);
}



