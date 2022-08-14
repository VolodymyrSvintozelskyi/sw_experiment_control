

function modal_popup_make_handlers(parent) {	
	/*
	Modal Dismiss
	*/
	parent.find('.modal-dismiss').eq(0).on('click', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});

	/*
	Modal Confirm
	*/
	parent.find('.modal-confirm').eq(0).on('click', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
		make_notification('Success!', 'Settings are updated.', 'success');
	});

	/*
	Form
	*/
	parent.find('.modal-with-form').eq(0).magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',
		modal: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});

}
// ).apply( this, [ jQuery ]);