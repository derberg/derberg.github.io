// opens up a bootstrap modal to show the image that contains a class 'img-click-modal'. 
$(function () {

	// build modal markup 
	var modalMarkup = '<div class="modal fade" id="imgClickModal" tabindex="-1" role="dialog" aria-labelledby="imgClickModalTitle" aria-hidden="true"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" id="imgModalClose" data-dismiss="modal" aria-hidden="true">&times;</button> <h4 class="modal-title" id="imgClickModalTitle">Modal title</h4> </div> <div class="modal-body"> <img id="mimg" src="" width="100%"> </div> </div> </div> </div> '; 


	$('.img-click-modal').on('click',function(){

		if ( !$( "#imgClickModal" ).length ) {	$('body').append(modalMarkup);	}

	    var sr = $(this).attr('src'),
	    	title = $(this).attr('alt'); 

	    $('#mimg').attr('src',sr);
	    $('#imgClickModalTitle').text(title);
	    $('#imgClickModal').modal('show');

	});

}); 
