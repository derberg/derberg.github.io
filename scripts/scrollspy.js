$('body').scrollspy({
    target: '.bs-docs-sidebar',
    offset: 40
});

$('.bs-docs-sidebar li a').click(function() {
      $(this).parent('li').addClass('active').siblings().removeClass('active');
;
});


