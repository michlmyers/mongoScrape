$(function () {



    $('#home').on('click', function () {
        $('.container-fluid').load('/');
    });

// for scrape button. should display scrape worked. 
    $('.btn').on('click', function () {
        $.ajax({
            method: 'GET',
            url: '/scrape'
        }).then(
            function (data) {
                $('.container-fluid').load('/scrape');
                console.log('this scrape worked');
            }
        )
    })


})