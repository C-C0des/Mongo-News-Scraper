$(document).ready(function(){
    $(".modal").modal({ dismissible: false });
    $(".sidenav").sidenav();


    $("#scrape_now").on("click", function() {
        $.ajax({
            url: "/scrape",
            type: "GET"
        });
    });


});
          