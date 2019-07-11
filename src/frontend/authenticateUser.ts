import Queries from '../Queries/Queries';
import UserQueries from '../Queries/UserQueries';
import {IMain, IDatabase} from 'pg-promise';

//import {passport} from 'passport';
//import {Strategy as LocalStrategy} from 'passport-local';

const db: IDatabase<any> = Queries.createDB();
const userQuery : any = new UserQueries(db);

//import  postgresLocal = from'passport-local-postgres')(pool);

/*
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));
*/
//passport.serializeUser(postgresLocal.serializeUser);
//passport.deserializeUser(postgresLocal.deserializeUser);

function submitCredentials() {
    var credentials: any = {'username':document.forms,//.loginForm[0].value,
                            'password':document.forms}//.loginForm[1].value}
    
    console.log(credentials);
    //console.log(userQuery);

    const correctPassword :string = userQuery.getPasswordFromUserName(credentials.username);
    console.log(correctPassword);
    
    if (correctPassword === undefined) {
        alert('Invalid username');

    } else if (credentials.password === correctPassword) {
        window.location.replace("http://localhost:3000/library.html");

    } else {
        alert('Invalid password');
    }
}

/*
var xhttp = new XMLHttpRequest();
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

*/
 
