var accepted = function () {
    var acceptNote = localStorage.accepted * 1;
    console.log(acceptNote);
    if (acceptNote !== 1) {
        window.location.href = "index.html";
        $('.accept').css( "display", "flex" )
    } else {
        console.log(' logged in')
    }
};


accepted();