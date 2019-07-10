
function submitCredentials() {
    var xhttp = new XMLHttpRequest();
    //var form     = this.form;
    var username = document.forms.loginForm[0].value;
    var password = document.forms.loginForm[1].value;
    xhttp.open('GET', '/library/', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    
    xhttp.onload = function() {
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
        if(xhttp.status == "404"){
            alert("Invalid login. Try Again!");
        }

        var jsonArray = JSON.parse(xhttp.response);
        var resultsText = createResultsHTML(jsonArray);
        change_loc(postcode);
        document.getElementById("results").innerHTML = resultsText;
    }
    
    xhttp.send();
}