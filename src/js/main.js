$(function() {

    $('.ui.checkbox').checkbox();   // use semantic checkbox style
    $('select.dropdown').dropdown();    // use semantic select style

    $('.tabular.menu .item').tab(); // use semantic tabs


    
    // Active class in sidebar
    $(function () {
        var url = window.location.pathname;
        var activePage = url.substring(url.lastIndexOf('/') + 1);
        $('.left.menu a').each(function () { 
            var linkPage = this.href.substring(this.href.lastIndexOf('/') + 1); 

            if (activePage == linkPage) {
                $(this).addClass('active'); 
            }
        });
    })

});

