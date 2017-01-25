
function refreshPlayerInfo(){
  console.log('refreshPlayerInfo');
  $('#board .playerRow').removeClass('active');
  $('#board').find('[playerId='+currentPlayer.id+']').addClass('active');
  $('#playerName').text(currentPlayer.name);
  $('#playerCartes').attr('nbCartes', currentPlayer.cartes.length);	
	$('#currentCart').css("left", "0");
	$('#currentCart').css("top", "0");
	$('#currentCart').hide();
}


function next() {
  console.log('next');
  if(player1.cartes.length === 0 && player2.cartes.length === 0) {
    end();
  }
  else {
    otherPlayer = currentPlayer;
    if(currentPlayer.id == 1) {
      currentPlayer = player2;
    }
    else {
      currentPlayer = player1;
    }
    allowToDrop = false;
		allowToPioche = true;
		allowToSee = false;
    refreshPlayerInfo();
		if(currentPlayer.isIA){
			iaPlay();
		}
  }
}

function end() {
  console.log('end');
	// check cases 8
	if($('#board').find('[playerId=1]').find('[special=double].full').length == 2){
		player1.score += doubleCaseBonus;
	}
	if($('#board').find('[playerId=2]').find('[special=double].full').length == 2){
		player2.score += doubleCaseBonus;
	}
  var score = '<div>' + player1.name + ': ' + player1.score + '</div>';
  score += '<div>' + player2.name + ': ' + player2.score + '</div>';
  if(player1.score == player2.score){
    $('#endPopupContent').html(score + "<div class='endResult'>" + S_DRAW + "</div>");
  }
  if(player1.score > player2.score){
    $('#endPopupContent').html(score + "<div class='endResult'>" + player1.name + S_WIN + "</div>");
  }
  if(player2.score > player1.score){
    $('#endPopupContent').html(score + "<div class='endResult'>" +  player2.name + S_WIN + "</div>");
  }
  $('#overlay').show();
  $('#endPopup').show();
}


function dropCarte(boardCase) {
  console.log('dropCarte');
	var event = '';	
	if(!boardCase.hasClass('full') && allowToDrop){
		var currentCart = getCurrentCart();
		var oppositCase = getOppositCase(boardCase);		
		// empty case
		if(!oppositCase.hasClass('full')){    
			boardCase.attr('carte', currentCart);
			if(currentCart != 'J'){
				currentPlayer.score += Number(boardCase.attr('value'));
			}
			if(boardCase.attr('special') == 'see'){
				allowToSee = true;
			}
			event = TAKE;
		}  
		// fight
		else {
			event = fight(currentCart, boardCase, oppositCase);
		}
		allowToDrop = false;
		animateDrop(event,boardCase,oppositCase);
	}
}



function fight(currentCart, boardCase, oppositCase){
  console.log('fight');
  var oppositCart = oppositCase.attr('carte');
	// self joker
	if(currentCart == 'J'){
		otherPlayer.score -= Number(boardCase.attr('value'));
		return JOKERWIN;
	}
	// other joker
	if(oppositCart == 'J'){
		return JOKERLOOSE;
	}
	// compare cartes
	var otherHasTieBreak = $('#board .playerRow:not(.active)').find('[special=tieBreak]').hasClass('full');
	// attack win
	if(Number(currentCart) > Number(oppositCart) || (Number(currentCart) == Number(oppositCart) && !otherHasTieBreak)) {    		
		otherPlayer.score -= Number(boardCase.attr('value'));
		boardCase.attr('carte', currentCart);
		currentPlayer.score += Number(boardCase.attr('value'));
		if(boardCase.attr('special') == 'see'){
			allowToSee = true;
		}
		return WIN;
	}
	// attack loose
	else {
		return LOOSE;  
	}
}

function nameValidate(){
	console.log('nameValidate');
	if($('#checkboxIA').is(':checked')){
		player2 = playerIA;
	}	
	if($('#name1').val()){
		player1.name = $('#name1').val();
	}
	if($('#name2').val()){
		player2.name = $('#name2').val();
	}		
	$('#playerName').text(currentPlayer.name);
	$('#namePopup').hide();
	$('#overlay').hide();
}

function nameCancel(){
	console.log('nameCancel');	
	$('#namePopup').hide();
	$('#overlay').hide();
}


function pioche() {
	console.log('pioche');
	if(allowToPioche){
		setCurrentCart(currentPlayer.cartes.shift());		
		animatePioche();
		allowToPioche = false;
		allowToDrop = true;
	}
}


function see(boardCase){
	console.log('see');
	if(boardCase.hasClass('full') && allowToSee){
		alert(boardCase.attr('carte'));
		allowToSee = false;
	}
}


function showInfo(){
	console.log('showInfo');
	$('#infoPopup').toggle();
	$('#overlay').toggle();
}



// ShortCodes

function getCurrentCart(){
	return $('#currentCart #cartFront').text();
}
function setCurrentCart(value){
	$('#currentCart #cartFront').text(value);
}

function getOppositCase(boardCase){
	return $('#board .playerRow:not(.active)').find('[position='+boardCase.attr('position')+']');
}

function writeAttackInfo(event, boardCase, oppositCart){
	console.log('writeAttackInfo');
	var attackInfo = '';
	switch(event) {
    case TAKE:
      	attackInfo = currentPlayer.name + S_TAKE + boardCase.attr('value');
				$('#attackInfo').text(attackInfo).removeClass('win loose');
        break;
    case LOOSE:
        attackInfo = currentPlayer.name + S_ATTACKLOOSE + boardCase.attr('value') + S_AGAINSTA + oppositCart;
				$('#attackInfo').text(attackInfo).removeClass('win').addClass('loose');
        break;
		case WIN:
        attackInfo = currentPlayer.name + S_ATTACKWIN + boardCase.attr('value') + S_AGAINSTA + oppositCart;
				$('#attackInfo').text(attackInfo).removeClass('loose').addClass('win');
        break;
		case JOKERWIN:
				attackInfo = currentPlayer.name + S_JOKERWIN + boardCase.attr('value') + S_AGAINSTA + oppositCart;
				$('#attackInfo').text(attackInfo).removeClass('loose').addClass('win');
				break;
		case JOKERLOOSE:
			attackInfo = currentPlayer.name + S_ATTACKLOOSE + boardCase.attr('value') + S_AGAINSTA + S_JOKER;
			$('#attackInfo').text(attackInfo).removeClass('win').addClass('loose');
				break;
    default:
        $('#attackInfo').text(attackInfo).removeClass('win loose');
		}
}

