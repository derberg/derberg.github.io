// cache needed elements
var apiInput        = $('#apiFilterInput'),
    packageList     = $('#packageFilterList'),
    apiClose        = $('.clear-api-input'),
    apis            = $('.apis'),
    packages        = $('.packages'),
    noResultsApi    = $('.noResultsApi'),
    navHeader       = $('.package-header'),
    apiFilter       = localStorage.getItem("apiFilter"),
    packageFilter   = localStorage.getItem("packageFilter");

// Check browser support for local storage
if (typeof (Storage) != "undefined") {

    // initiate local storage or load saved values
    (!localStorage.apiFilter || localStorage.apiFilter == "undefined") ? localStorage.setItem("apiFilter", "") : apiInput.val(apiFilter);
    (!localStorage.packageFilter || localStorage.packageFilter == "undefined") ? localStorage.setItem("packageFilter", "") : packageList.val(packageFilter);

}

// check wether to show the header or not.
var checkAipLenght = function() {

    // hide api header is no matching aip is visible
    packages.each(function () {

        // count visible children and hide header if none found
        var childLen = $(this).find('ul li:visible').length;
        (childLen == 0) ? $(this).find('.package-header').hide() : $(this).find('.package-header').show();

    });
};

// api key word filter
var apiFilter = function () {

    // match keyword and filter out apis
     if (apiInput.length){

      var valThis = apiInput.val().toLowerCase();
      apis.each(function () {

          // do the filtering
          var text = $.trim($(this).text().toLowerCase());
          (text.indexOf(valThis) > -1) ? $(this).show() : $(this).hide();

          // show no results if no matches are found
          var apiLen = $('.apis:visible').length;
          (apiLen === 0) ? noResultsApi.show() : noResultsApi.hide();

          // show keyword clear button
          var keyword = apiInput.val().length;
          (keyword === 0) ? apiClose.hide() : apiClose.show();
      });
     }

    // header show/hide check
    checkAipLenght();

};

// search bar clear functionality
var clearApiFilter = function () {

    apiInput.val('').focus();
    apiClose.hide();
    noResultsApi.hide();
    apiFilter();

};

// save filters to local storage
var saveApiFilter = function () {

    localStorage.apiFilter = apiInput.val();
    localStorage.packageFilter = packageList.val();

};

// filter package list based on menu selection
var packageFilter = function () {

    if (packageList.length){

      var valThis = packageList.val().toLowerCase();
      packages.each(function () {

          var text = $.trim($(this).text().toLowerCase());
          (text.indexOf(valThis) === 0) ? $(this).show() : $(this).hide();

      });

     if (valThis == "") { packages.show(); }
    }

};

$(function () {


    if ( $( ".api-nav" ).length ) {
        // initiate api filter only if the api nav exists
        apiFilter();
        packageFilter();
    }

    // clear filter
    apiClose.click(clearApiFilter);

    // bind api keyword
    $('#apiFilterInput').keyup(function () {
        apiFilter();
    });

    // bind package selection
    $('#packageFilterList').change(function () {
        packageFilter();
        checkAipLenght();
    });

    // save filters term to local storage on page unload
    $(window).unload(saveApiFilter);

});
