---
id: gettingEventsFrom2016_minerva_v1_minerva_v1
interactive: true
type: Tutorial
title: 'Getting conference events for 2016'
service: 'Minerva'
--- 
<div class="u-position-relative u-min-height--off u-vertical-centering u-horizontal-centering flex-column u-transition-all">
  <div class="alert alert-success u-transition-all" role="alert">
    <p class="h4 text-center u-max-width--xs">
      <strong>Interactive Tutorial</strong>
    </p>
    <p class="text-center u-max-width--xs no-margin">
      After the tutorial is loaded, you can read it, modify its code, and trigger it to see real-time communication with the service.
    </p>
  </div>
  <p class="text-center u-transition-all no-margin">
    <button id="notebookgettingEventsFrom2016_minerva_v1" class="btn btn-lg btn-primary" type="button">Load tutorial</button>
  </p>
  <div class="js-notebook-loader spinner-backdrop spinner-backdrop--secondary spinner-backdrop--half-opacity spinner-backdrop--secondary-filled-background u-transition-all u-opacity-0">
    <div class="spinner">
      <div class="spinner-container spinner-container1 spinner-container1--secondary">
        <div class="spinner-circle1"></div>
        <div class="spinner-circle2"></div>
        <div class="spinner-circle3"></div>
        <div class="circle4"></div>
      </div>
      <div class="spinner-container spinner-container2 spinner-container2--secondary">
        <div class="spinner-circle1"></div>
        <div class="spinner-circle2"></div>
        <div class="spinner-circle3"></div>
        <div class="circle4"></div>
      </div>
      <div class="spinner-container spinner-container3 spinner-container3--secondary">
        <div class="spinner-circle1"></div>
        <div class="spinner-circle2"></div>
        <div class="spinner-circle3"></div>
        <div class="circle4"></div>
      </div>
    </div>
    <p class="spinner-paragraph text-center h3">Loading tutorial...</br></p>
  </div>
  <iframe style="min-height: 430px;" class="u-transition-all u-hidden width-100 interactive-tutorial" src="" scrolling="no" frameBorder="0" id="gettingEventsFrom2016_minerva_v1"></iframe>

</div>


<script>

  $('#notebookgettingEventsFrom2016_minerva_v1').click(function() {

    $(this).parent().slideUp(300);
    $(this).parent().siblings('.alert').slideUp(300);

    var frame = $(this).parent().siblings('iframe');
    frame.attr('src', 'http://derberg.github.io/build/embedded.html#gettingEventsFrom2016_minerva_v1');
    frame.addClass('apinotebookFrame');

    $(this).parent().siblings('.js-notebook-loader').removeClass('u-opacity-0').addClass('u-opacity-100');
    $(this).parent().parent().addClass('u-min-height--on');
  });

</script> <!-- ---
---
id: gettingEventsFrom2016_minerva_v1_minerva_v1
interactive: true
type: Tutorial
title: 'Getting conference events for 2016'
service: 'Minerva'
---


Minerva service exposes its API contract using RAML specification. Thanks to it, you can generate a JavaScript client that you will later use in your code.
This is what is done in this tutorial, first you create a REST client and then you make proper API calls using it

```javascript
API.createClient('minervaService',
'http://derberg.github.io/services/minerva/v1/api.raml');
```

To get from the server only conference events from 2016 you need to request data with a proper query parameter.
The `type` attribute defines if it is a conference that will take place in 2016.

```javascript
confEvents = minervaService.events.get(null, {
  query: {
    'q': 'type:"Conference 2016"'
  }
})
```

Now once you have the list, grab it with some code

```javascript
confEvents = confEvents.body;
```


Now extract only conferences that will occure in Poland.

```javascript
confsInPoland = [];

confEvents.forEach(function(conf){

  if(conf.address.indexOf('Poland') !== -1) {

    confsInPoland.push(conf);
  }
})

confsInPoland;
```
 -->