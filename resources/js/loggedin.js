var loggedin = function () {
    var storSession = localStorage.session * 1;
    console.log(storSession);
    if (storSession === 1) {
    window.location.href = "home.html";
    } else {
        console.log('not logged in')
    }
};


loggedin();