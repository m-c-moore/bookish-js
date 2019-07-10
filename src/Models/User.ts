export default class User {
    id: number;
    username: string;
    name: string;
    password: string;
    
    constructor(id) {//, username, name, password) {
        this.id       = id;
        //this.username = username;
        //this.name     = name;
        //this.password = password;
    }
    

    getUserHistory() {
        console.log('copy id, book name, dateBorrowed, dateReturned, dateDue');
    }

}