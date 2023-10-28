//! github api nasıl kullanılır döküman
// const token = "YOUR TOKEN";
// const username = "bugraozdmr";

// const url = `https://api.github.com/users/${username}`;

// const headers = {
//     Authorization: `token ${token}`,
// };

// fetch(url, { headers })
//     .then((response) => {
//         if (response.status === 200) {
//             return response.json();
//         } else {
//             throw new Error(`API isteği başarısız oldu. Hata kodu: ${response.status}`);
//         }
//     })
//     .then((userData) => {
//         console.log("Kullanıcı Bilgileri:");
//         console.log(`Kullanıcı Adı: ${userData.login}`);
//         console.log(`Adı: ${userData.name}`);
//         console.log(`Takipçi Sayısı: ${userData.followers}`);
//         console.log(`Takip Ettiği Kişi Sayısı: ${userData.following}`);
//         console.log(`Hesap Oluşturma Tarihi: ${userData.created_at}`);
//     })
//     .catch((error) => {
//         console.error(error);
//     });




//* elementleri seçme
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUser = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
//* obje oluşturma
const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    
    //? sayfa yuklendiğinde çalışır
    document.addEventListener("DOMContentLoaded",getAllSearched);

    clearLastUser.addEventListener("click", () => {
        //duzgun dusununce cok daha az satır yazarak bitti
        $('#exampleModalCenter').modal('show');

    });

}

//! burda yazıldılar
document.getElementById("confirmYesButton").addEventListener("click", function(){
    
    $('#exampleModalCenter').modal('hide');
    
    // silme islemleri
    ui.clearAllSearchedFromUI();
    Storage.clearAllSearchedUsersFromStorage();
    ui.showAlert("Silme başarılı","success")
});


//! fonksiyon çağırılamadı
// function clearAllSearch(e){
//     console.log("worked");
//     if(confirm("emin misiniz ?")){
//         // silme islemleri

//         ui.clearAllSearchedFromUI();
//         Storage.clearAllSearchedUsersFromStorage();
//         ui.showAlert("Silme başarılı","success")
//     }
// }



function getData(e){
    //? boşluk değerleri olmasın diye trim ettik
    let username = nameInput.value.trim();

    if(username === ""){
        ui.showAlert("Kullanıcı girin","warning");
    }
    else{
        //? bu fonksiyon catch içine girerse bilgi çekmeyi bekler ondan dolayı yavaş çalışır
        ui.clearInput();
        //? async olarak yazıldı ve promise yapısı return edeceği için yakalanması gerekiyor
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                console.log("Böyle bir kullanıcı yok");
                ui.showAlert("Kullanıcı bulunamadı","danger");
            }
            else{
                // ui.showUserInfo(response.user);
                // ui.showRepoInfo(response.repo);
                
                ui.addSearchedUsersToUI(username);
                Storage.addSearchedUsersToStorage(username);
                
                ui.showAlert("Kullanıcı eklendi","success");

                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
                console.log(response);
            }
        })
        .catch(err => console.log(err));
    }

    e.preventDefault();
}

function clearAllSearch(){
    //? tüm arananları temizler
}

function getAllSearched(){
    //? arananları storagedan al ui'a ekle
    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach((res)=>{
        result += `<li class="list-group-item">${res}</li>`;
    })

    lastUsers.innerHTML = result;
}







//! Hazır liste vererek oluşturma
//! mesela kendi sayfana gidip seni takip edenlerin isimlerini alıp teker teker basabilirsin
//!

// liste gonderip listedekileri direkt eklesin

let list = ["bugraozdmr","epicgames","microsoft","github" ,"abs0luty"];

list.forEach((element) => {
    github.getGithubData(element)
        .then(response => {
            if(response.user.message === "Not Found"){
                console.log("Böyle bir kullanıcı yok");
                ui.showAlert("Kullanıcı bulunamadı","danger");
            }
            else{
                // ui.showUserInfo(response.user);
                // ui.showRepoInfo(response.repo);
                
                ui.addSearchedUsersToUI(element);
                Storage.addSearchedUsersToStorage(element);
                
                ui.showAlert("Kullanıcı eklendi","success");

                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
                console.log(element);
            }
        })
        .catch(err => console.log(err));
})
