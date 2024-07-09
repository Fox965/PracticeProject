let yesButton = document.querySelectorAll(`#buttonsYesNo > #yesButton`);
let noButton = document.querySelectorAll(`#buttonsYesNo > #noButton`);

// for(let i = 0; i < yesButton.length; i++){
//     yesButton[i].addEventListener(`click`, ()=>{
//         let res = fetch('/porposal', {
//             method: 'POST',
//         })
//         let data = res.json();
//         console.log(data)
//         console.log('Abab')
//     })
// }

// for(let i = 0; i < noButton.length; i++){
//     noButton[i].addEventListener(`click`, ()=>{
        
//     })
// }

function submitForm(endpoint) {
    
    let id = document.getElementById('id').value;
    let author = document.getElementById('author').value;    
    let genre = document.getElementById('genre').value;  
    let price = document.getElementById('price').value;  
    let name = document.getElementById('name').value;  
    let pages = document.getElementById('pages').value;  
    let email = document.getElementById('email').value;  
    let data = {'id': id, 'author': author, 'genre': genre, 'price': price, 'name': name, 'pages': pages, 'email': email, 'image': 'assets/book/imageBook.png'}
    // Отправка POST-запроса с использованием fetch и метода HTTP, который определяется параметром endpoint
    console.log(data)
    fetch('/submit-data/' + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: data })
    }).then(response => {
      // Обработка ответа
    }).catch(error => {
      // Обработка ошибки
    });
  }