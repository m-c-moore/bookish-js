var CleanCodeEmbedLink = "B001GSTOAM";
var BibleEmbedLink     = "B005IYICEO";

var iframeStart = '<iframe type="text/html" width="100%" height="100%" frameborder="0" allowfullscreen src="https://read.amazon.co.uk/kp/embed?asin=';
var iframeEnd   = '&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_g1jlDbS5J7MS&hideBuy=true&hideShare=true"></iframe>'

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
        createResultsHTML(bookJSON);
        
    }
    xhttp.send();
}

function createResultsHTML(bookJSON) {
    var bookListHTML = '';
    bookListHTML += '<div class="col-md-12"><ul class="list-group">';
    bookListHTML += '<li class="list-group-item active h3">Search Results</li>'

    var bookEmbedHTML = '';
    
    for (var id in bookJSON) {
        var book = bookJSON[id]
        bookListHTML += '<li class="list-group-item list-group-item-action">'
        bookListHTML += `<b>${book.title}</b>, by <i>${book.author}</i> (ISBN: ${book.isbn})</li>`;

        if (book.embedref !== null) {
            bookEmbedHTML += '<div class="card mx-auto" style="width: 600px; height: 700px; margin-top: 20px">';
            bookEmbedHTML += '<div class="card-header p-3 mb-2 bg-dark text-white">';
            bookEmbedHTML += `<p class="card-text">Here's a preview of <b>${book.title}</b></p></div>`;
            bookEmbedHTML += iframeStart + book.embedref + iframeEnd + '</div>';
        }
    }

    if (bookJSON.length === 0) {
        bookListHTML += '<li class="list-group-item list-group-item-action"><b>No books found</b></li>'
    }

    bookListHTML += '</ul></div><br>';
    
    document.getElementById("results").innerHTML  = bookListHTML;
    document.getElementById("previews").innerHTML = bookEmbedHTML;
}
