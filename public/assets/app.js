$(function () {

// for scrape button. should display scrape worked. 
    $('.btn').on('click', function () {
        $.ajax({
            method: 'GET',
            url: '/scrape'
        }).then(
            function (data) {
                console.log('this scrape worked');
                location.reload();
            }
        )
    })


})