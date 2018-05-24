var signedout = function () {
    var storSession = localStorage.session * 1;
    console.log(storSession);
    if (storSession !== 1) {
        window.location.href = "index.html";
    } else {
        console.log(' logged in')
    }
};


signedout();