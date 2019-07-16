var txt = `<div id="nav-div">
                <div class="navbar navbar-dark navbar-expand-lg bg-secondary">
                    <div class="container">
                        <h1>
                            The Grubb Club Book Hub
                        </h1>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto"></ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container jumbotron col-mx-auto">
                <div id="our-content" class="container row justify-content-md-center">
                    <form action="javascript:void(0)" onsubmit="submitSearch();" id="searchForm" class="form-inline col-md-">
                        <div class="input-group">
                                <div class="form-group">
                                    <select class="form-control mr-sm-2" id="search-type">
                                    <option>Title</option>
                                    <option>Author</option>
                                    </select>
                                </div>
                        </div>
                        <input type="text" class="form-control mr-sm-2" aria-label="Text input with dropdown button" placeholder="Leave blank for all">
                        <button type="submit" class="btn btn-primary form-control">Submit</button>
                    </form>
                    <br><br><br>
                    <div id="results" class="container row justify-content-md-center"></div>
                    <div id="previews" class="container row justify-content-md-center"></div>   
                </div>
            </div>`;
function submitCredentials() {
    var xhttp = new XMLHttpRequest();
    var username = document.forms[0][0].value;
    var password = document.forms[0][1].value;
    var searchString = '/loginrequest/?username=' + username + '&password=' + password;
    xhttp.open('GET', searchString, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function () {
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
        if (xhttp.status == 401) {
            alert('Invalid username or password');
        }
        var token = JSON.parse(xhttp.response).token;
        window.sessionStorage.setItem('token', token);
        //var txt = `<object id="obj" data="search.html" height="" width =""></object>`;
        document.body.innerHTML = txt;
    };
    xhttp.send();
}
