var txt = `<div class="container jumbotron col-mx-auto">
                <form action="javascript:void(0)" onsubmit="submitSearch();" id="searchForm" class="form-inline col-md-">
                    <div class="input-group">
                            <div class="form-group">
                                <select class="form-control" id="search-type">
                                <option>Title</option>
                                <option>Author</option>
                                </select>
                            </div>
                    </div>
                    <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Leave blank for all">
                    <button type="submit" class="btn btn-primary form-control">Submit</button>
                </form>
                <br><br>
                <div id="results" class="container row"></div>       
            </div>`



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

        //var txt = `<object id="obj" data="search.html" height="" width =""></object>`;

        document.body.innerHTML = txt;
    }
    xhttp.send();
}