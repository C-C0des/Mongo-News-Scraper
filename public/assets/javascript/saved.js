$(document).ready(function(){
    $(".modal").modal();
    $(".sidenav").sidenav();
    $('.tooltipped').tooltip();

    $(".delete_note").on("click", function() {

        $.ajax({
            url: "/articles/notes/delete/" + $(this).attr("data-id"),
            type: "DELETE"
        }).then(function() {
            location.reload()
        });
    });

    $(".add_note").on("click", function() {
        $.ajax({
            url: "/articles/notes/create/" + $(this).attr("data-article"),
            type: "POST",
            data: { body: $("#addnote" + $(this).attr("data-id")).val().trim()}
        });
    });

    $(".remove_article").on("click", function() {
        
        $.ajax({
            url: "/articles/status/" + $(this).attr("data-id"),
            type: "POST",
            data: { saved: false }
        });
        
    });


});
          