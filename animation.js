

function animatePioche(){
  console.log('animatePioche');
  $('#playerCartes').attr('nbCartes', currentPlayer.cartes.length);
  $('#currentCart').show();
  $('#currentCart').animate({left: piocheGap}, piocheAnim, function() {
    // Animation complete
    if(!currentPlayer.isIA){
      $('#currentCart').addClass('flipped');
    }
  });    
}


function animateDrop(event, boardCase, oppositCase){
  console.log('animateDrop');
  var offsetCase = boardCase.offset();
  var offsetPioche = $('#playerCartes').offset();  
  var newOffsetLeft = offsetCase.left - offsetPioche.left;
  var newOffsetTop = offsetCase.top - offsetPioche.top;  
	var oppositCart = oppositCase.attr('carte');
	$('#currentCart').removeClass('flipped');
  $('#currentCart').animate({left: newOffsetLeft, top: newOffsetTop}, dropAnim, function() {
    // Animation complete
		writeAttackInfo(event, boardCase, oppositCart);
    setCurrentCart(''); 
		if(event == JOKERWIN || event == JOKERLOOSE){
			oppositCase.removeAttr('carte');
			oppositCase.removeClass('full showned');
			oppositCase.find('.cartShowned').remove();
		}
		if(event == TAKE || event == WIN){
			boardCase.addClass('full');
		}
		if(event == WIN){
			oppositCase.removeAttr('carte');
			oppositCase.removeClass('full showned');
			oppositCase.find('.cartShowned').remove();
		}
		if(event == LOOSE){
			if(!oppositCase.hasClass('showned')){
				oppositCase.append(" <span class='cartShowned'>" + oppositCart + "</span>").addClass('showned');
			}
		}
		if(allowToSee && !currentPlayer.isIA){
			refreshPlayerInfo();
			setTimeout(function(){next();}, seeDelay);
		}
		else {
    	next();
		}
  });  
}