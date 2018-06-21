$(function() {

    $('.btn btn-outline-success').on('click', function(event) {

        $ajax('/scrape', {
            method:'GET'
        }).then(
            function(data) {
                console.log('this scrape worked');
                // need to finish the following statement and enter more data for 
                // posting articles to the page
                $('.articleList').append('<h2>' + + '</h2');
                location.reload();
            }
        )
    })


})