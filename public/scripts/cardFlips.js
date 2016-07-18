$('.flip_icon').on('click', function(){
	$(this).parent().parent().parent( ".friend_card" ).toggleClass( 'flipped' );
})

$('.flip_icon_up').on('click', function(){
	$(this).parent().parent().parent( ".sub_friend_card" ).toggleClass( 'flipped-up' );
})