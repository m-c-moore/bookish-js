function submitCredentials() {
    var xhttp = new XMLHttpRequest();
    var username = document.forms[0][0].value;
    var password = document.forms[0][1].value;
    console.log(username, password);
    var searchString = '/loginrequest/?username=' + username + '&password=' + password;
    xhttp.open('GET', searchString, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function () {
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
        if (xhttp.status == 404) {
            alert("Invalid login\n" + searchString);
        }
        var token = JSON.parse(xhttp.response).token;
        window.sessionStorage.setItem('token', token);
        var txt = `<div id="nav-placeholder"></div>
                    <div class="container jumbotron col-mx-aut">
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
                            </div>
                        </div>`;
        document.body.innerHTML = txt;
    };
    xhttp.send();
}
function submitSearch() {
    var xhttp = new XMLHttpRequest();
    var searchType = document.forms[0][0].value;
    var searchTerm = document.forms[0][1].value;
    console.log(searchType, searchTerm);
    var searchString = '/booksearch/?type=' + searchType + '&term=' + searchTerm;
    xhttp.open('GET', searchString, true);
    var token = window.sessionStorage.getItem('token');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader('Authorization', 'Bearer' + token);
    xhttp.onload = function () {
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
        if (xhttp.status == 404) {
            alert("Invalid search. Try Again!\n" + searchString);
        }
        var bookJSON = JSON.parse(xhttp.response);
        var resultsHTML = createResultsHTML(bookJSON);
        document.getElementById("results").innerHTML = resultsHTML;
    };
    xhttp.send();
}
function createResultsHTML(bookJSON) {
    var resultsText = '';
    resultsText += '<div class="col-md-6"><ul class="list-group">';
    resultsText += '<li class="list-group-item active h3">Search Results</li>';
    for (var id in bookJSON) {
        var book = bookJSON[id];
        resultsText += '<li class="list-group-item list-group-item-action">';
        resultsText += `<b>${book.title}</b>, by <i>${book.author}</i> (ISBN: ${book.isbn})</li>`;
    }
    if (bookJSON.length === 0) {
        resultsText += '<li class="list-group-item list-group-item-action"><b>No books found</b></li>';
    }
    resultsText += '</ul></div><br>';
    return resultsText;
}
