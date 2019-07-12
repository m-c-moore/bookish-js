function submitSearch() {
    var xhttp = new XMLHttpRequest();

    var searchType = (<HTMLInputElement>document.forms[0][0]).value;
    var searchTerm = (<HTMLInputElement>document.forms[0][1]).value;
    
    var searchString = '/booksearch/?type='+searchType+'&term='+searchTerm;

    xhttp.open('GET', searchString, true);
    var token = window.sessionStorage.getItem('token');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader('Authorization', 'Bearer ' + token);
    
    xhttp.onload = function() {
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
        if (xhttp.status == 404){
            alert("Invalid search. Try Again!\n" + searchString);
        } else if (xhttp.status == 401){
            alert('Unauthorised: Pres OK to refresh');
            window.location.reload(true);
        }
        var bookJSON = JSON.parse(xhttp.response);
        var resultsHTML = createResultsHTML(bookJSON);
        document.getElementById("results").innerHTML = resultsHTML;
    }
    xhttp.send();
}

function createResultsHTML(bookJSON) {
    var resultsText = '';
    resultsText += '<div class="col-md-6"><ul class="list-group">';
    resultsText += '<li class="list-group-item active h3">Search Results</li>'
    
    for (var id in bookJSON) {
        var book = bookJSON[id]
        resultsText += '<li class="list-group-item list-group-item-action">'
        resultsText += `<b>${book.title}</b>, by <i>${book.author}</i> (ISBN: ${book.isbn})</li>`;
    }
        
    if (bookJSON.length === 0) {
        resultsText += '<li class="list-group-item list-group-item-action"><b>No books found</b></li>'
    }

    resultsText += '</ul></div><br>';

    return resultsText;
}
