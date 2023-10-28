class Github{

    constructor(url){
        this.url = "https://api.github.com/users/";
    }

    async getGithubData(username){
        let token = "YOUR TOKEN";

        const headers = {
            Authorization: `token ${token}`,
        };

        // header eklenmek zorunda bunsuz çalışmaz
        const responseUser = await fetch(this.url + username, { headers });
        const responseRepo = await fetch(this.url + username + "/repos",{ headers });
        //? sürekli bir promise döndürme olduğundan dolayı bekliyoruz await ile async içinde
        const UserData = await responseUser.json();
        const repoData = await responseRepo.json();

        // obje olarak dönsün
        return {
            user : UserData,
            repo : repoData
        }
    }
}
