class Storage{
    static getSearchedUsersFromStorage(){
        //? tum kullanıcıları al
    
        let users;

        if(localStorage.getItem("searched") === null){
            users = [];
        }
        else{
            users = JSON.parse(localStorage.getItem("searched"));
        }
    
        return users;
    }

    static addSearchedUsersToStorage(username){
        //? Kullanıcı ekle

        
        let users = this.getSearchedUsersFromStorage();
        // console.log(users);
        //* username sorgusu IndexOf
        if(users.indexOf(username) === -1){
            //* birden cok aynı tutulmasın
            users.push(username);
        }

        localStorage.setItem("searched",JSON.stringify(users));
        
    }

    static clearAllSearchedUsersFromStorage(){
        //? hepsini sil


        localStorage.removeItem("searched");
    }
}