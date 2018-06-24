$(function () {

function displayResults(articles) {
    $('.articleList').empty();

    articles.forEach(function(article) {
        $('.articleList').append('<h3>' + article.title + '</h3>' + 
        '<p>' + article.excerpt + '</p>' + 
        `<p><a href="${article.link}"> ${article.link} </a></p><br>` 
    );
    });
};

$('#home').on('click', function () {
    $('.container-fluid').load('/');
});

// for scrape button. should display scrape worked. 
$('.btn').on('click', function () {
    $.ajax({
        method: 'GET',
        url: '/scrape'
    }).then(
            // function (data) {
            //     // $('.container-fluid').load('/scrape');
            //     $('.container-fluid').load('/articles');
            //     console.log('this scrape worked');
            // });
    $.getJSON('/articles', function(data) {
        displayResults(data);
    }));
});


});