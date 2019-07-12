function submitCredentials() {
    var xhttp = new XMLHttpRequest();

    var username = (<HTMLInputElement>document.forms[0][0]).value;
    var password = (<HTMLInputElement>document.forms[0][1]).value;
    
    var searchString = '/loginrequest/?username='+username+'&password='+password;

    xhttp.open('GET', searchString, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    
    xhttp.onload = function() {
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
        if (xhttp.status == 401){
            alert('Invalid username or password');
        }

        var token = JSON.parse(xhttp.response).token;
        window.sessionStorage.setItem('token', token);

        var txt = `<div class="container jumbotron">
        <div id="our-content" class="container row justify-content-md-center">
            <object data="search.html"></object>
        </div>
    </div>`;

        document.body.innerHTML = txt;
    }
    xhttp.send();
}