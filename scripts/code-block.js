// $(function(){

//     var codeBlock = $('.highlight');

//     codeBlock.each(function(){

//         var codeToCopy = $(this).find('.hljs.no-highlight').text();
//         codeToCopy = codeToCopy.replace(/"/g, '\\"');

//         $(this).prepend('<button data-clipboard-text="' + codeToCopy + '" class="btn btn-link copy-code-block" type="button" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Copy URL"><img src="/images/icons/copy-url.png" alt=""></button>');
        
//     });

//     codeBlock
//         .mouseenter(function(){
//             $(this).find('button').show();
//         })
//         .mouseleave(function(){
//             $(this).find('button').hide();
//         });


//     $('.copy-code-block').click(function(){

//         var apiSpecLink = new ZeroClipboard( $(this) );

//         apiSpecLink.on( "ready", function( readyEvent ) {

//              apiSpecLink.on( "aftercopy", function( event ) {
//                 console.log('copied');

//                 // ZeroClipboard.destroy();
//                  // update tooltip content once url is copied 
//                 // $('#copy-api-spec').parent().parent().hide();
//             });

//         });

//     });

// });

// var y = "We are the so-called \"Vikings\" from the north."

// code block 
// $(function(){     
    
//     $("div.code").each(function(i, block){

//         var codeData = $(this).html(),
//             caption = $(this).attr("data-caption");

//         $(this).html('');

//         var template = [];
//         template.push('<pre class="highlight">');
//         template.push('<code>');
//         template.push('<h3>' + caption + '</h3>');
//         template.push(codeData);
//         template.push('</pre>');
//         template.push('</code>');

//         $(this).html(template.join(''));

//         var elem = $(this).find('code')[0]

//         hljs.highlightBlock(elem);

//     });

// });