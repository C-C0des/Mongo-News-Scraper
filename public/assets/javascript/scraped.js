$(document).ready(function(){
    $(".modal").modal({ dismissible: false });
    $(".sidenav").sidenav();


    $(".save_article").on("click", function() {
        
        $.ajax({
            url: "/articles/status/" + $(this).attr("data-id"),
            type: "POST",
            data: { saved: true }
        });
        
    });


});
          