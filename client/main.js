$(document).on('click', '.flip_icon', function(){
	if ( $(this).parent().parent().parent( ".friend_card" ).hasClass( 'flipped' ) ) {
		$(this).parent().parent().parent( ".friend_card" ).removeClass( 'flipped' )
	} else {
		$('.flipped').removeClass('flipped')
		$(this).parent().parent().parent( ".friend_card" ).addClass( 'flipped' )
	}
})

$(document).on('click', '.flip_icon_up', function(){
	if ( $(this).parent().parent().parent( ".sub_friend_card" ).hasClass( 'flipped-up' ) ) {
		$('.flipped-up').removeClass('flipped-up')
		$(this).parent().parent().parent( ".sub_friend_card" ).removeClass( 'flipped-up' )
	} else {
		$(this).parent().parent().parent( ".sub_friend_card" ).addClass( 'flipped-up' )
	}
})

$(document).on('mouseenter', '.inactiveBox', function(){
	$(this).addClass('show_hidden');
})

$(document).on('mouseleave', '.inactiveBox', function(){
	console.log('here')
	$(this).removeClass('show_hidden');
})

$(document).on('click', '.new_message_container img', function(){
	$('.text_area').siblings('button').remove();
	$('.text_area').remove();
	$('.new_message').addClass('hidden');
	$('.rotate_45').removeClass('rotate_45');
	$('.border_bottom_flat').removeClass('border_bottom_flat');
	$(this).addClass('rotate_45');
	$(this).siblings('.new_message').append('<textarea type="text" class="text_area" name="message"/><button type="submit">Send</button>');
	$(this).siblings('.new_message').removeClass('hidden');
	$('.text_area').focus();
	$(this).parent().parent().parent('.activeBox').addClass('border_bottom_flat');
})

$(document).on('click', '.rotate_45', function(){
	$('.new_message').addClass('hidden');
	$('.rotate_45').removeClass('rotate_45');
	$('.border_bottom_flat').removeClass('border_bottom_flat')
	$('.text_area').siblings('button').remove();
	$('.text_area').remove();
})

$(document).on('keydown', '.new_message', function(e){
  	if(e.which == 13){
  		// e.preventDefault();
	}
})

$(document).on('click', '.flip_icon_cluster', function(){
	if ( !$(this).parent().parent().parent( ".cluster_card" ).hasClass( 'flipped' ) ) {
		$('.flipped').removeClass('flipped')
		$(this).parent().parent().parent( ".cluster_card" ).addClass( 'flipped' )
	}
})

$(document).on('click', '.flip_icon_close', function(){
	$('.flipped').removeClass('flipped')
})


$(document).on('submit', 'form', function(e){
	$('.new_message').addClass('hidden');
	$('.rotate_45').removeClass('rotate_45');
	$('.border_bottom_flat').removeClass('border_bottom_flat')
	$('.text_area').siblings('button').remove();
	$('.text_area').remove();
	// e.preventDefault();
	// $(this).submit();
})