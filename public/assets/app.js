// append article info
$.getJSON('/articles', function(data) {
    for (var i = 0; i < data.length; i++) {
        $('#articles').append('<p data-id="' + data[i]._id + '">' + data[i].title +
        '<br />' + data[i].link + '<br />' + data[i].excerpt + '</p>');
    }
});    

$('#scrapeButton').on('click', function() {
    console.log('this click worked');
    $.ajax({
        url:'/scrape',
        type:'GET',
        })
        .done(function() {
            location.reload();
        });
        return false;    
    });

// get notes for article
$(document).on('click', 'p', function() {
    $('#notes').empty();
    var thisId = $(this).attr('data-id');

    $.ajax({
        method: 'GET',
        url: '/articles/' + thisId
    })
    .then(function(data) {
        console.log(data);
        $('#enterNotes').append('<p>Enter subject and comment in boxes below<br/>');
        $('#enterNotes').append('<input id="titleInput" name="title" >' + '<br/>');
        $('#enterNotes').append('<textarea id="bodyInput" name="body"></textarea>');
        $('#enterNotes').append('<button data-id="' + data._id + '" id="saveNote">Save Comment</button');

        if (data.note) {
            $('titleInput').val(data.note.title);
            console.log('this is the note title:' + data.note.title);
            $('#bodyInput').val(data.note.body);
            console.log('this is the note body:' + data.note.body);
            $('#notes').append('<h3>' + data.note.title + '</h3>');
            $('#notes').append('<h6>' + data.note.body + '</h6>');
        }
    });
});

// post note for article
$(document).on('click', '#saveNote', function() {
    var thisId = $(this).attr('data-id');

    $.ajax({
        method: 'POST',
        url: '/articles/' + thisId,
        data: {
            title: $('#titleInput').val(),
            body: $('#bodyInput').val()
        }
    })
    .then(function(data) {
        console.log(data);
        $('#notes').empty();
        $('#enterNotes').empty();  
    });  

    $('#titleInput').val('');
    $('#bodyInput').val('');
});