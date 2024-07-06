let countBooksAll = document.querySelectorAll(`#buttonsCount > #countBooks`);
let minuses = document.querySelectorAll(`#buttonsCount > #minus`)
let pluses = document.querySelectorAll(`#buttonsCount > #plus`)

let startPriceAll = document.querySelectorAll(`#startPriceAll > #startPrice`);
let discountAll = document.querySelectorAll(`#discountAll > #discount`);
let finalPriceAll = document.querySelectorAll(`#finalPriceAll > #finalPrice`);


let totalPrice = document.querySelector(`#totalPrice`);
let startPriceTotal = document.querySelector(`#startPriceTotal`);
let discountTotal = document.querySelector(`#discountTotal`);

let countFor = 0;
let summ = 0;
let dis = 0;
let start = 0;

function amount(){
    for(let i = 0; i < minuses.length; i++){
        discountAll[i].innerHTML = (Number(startPriceAll[i].innerHTML)*Number(countBooksAll[i].innerHTML))/10;
        finalPriceAll[i].innerHTML = (Number(startPriceAll[i].innerHTML)*Number(countBooksAll[i].innerHTML)) - Number(discountAll[i].innerHTML);

        summ += Number(finalPriceAll[i].innerHTML);
        dis += Number(discountAll[i].innerHTML);
        start += (Number(startPriceAll[i].innerHTML)*Number(countBooksAll[i].innerHTML));
    }
    totalPrice.innerHTML = summ;
    discountTotal.innerHTML = dis;
    startPriceTotal.innerHTML = start;
}

function summCount(char){
    summ = 0;
    dis = 0;
    start = 0;
    
    amount();
}

amount();

function summPrices(i){
    discountAll[i].innerHTML = (Number(startPriceAll[i].innerHTML)*Number(countBooksAll[i].innerHTML))/10;
    finalPriceAll[i].innerHTML = (Number(startPriceAll[i].innerHTML)*Number(countBooksAll[i].innerHTML)) - Number(discountAll[i].innerHTML);
    summCount();
}

for(let i = 0; i < minuses.length; i++){
    minuses[i].addEventListener(`click`, ()=>{
        if(Number(countBooksAll[i].innerHTML) > 1){
            countBooksAll[i].innerHTML--;
        }
        summPrices(i);
    })
}

for(let i = 0; i < pluses.length; i++){
    pluses[i].addEventListener(`click`, ()=>{
        countBooksAll[i].innerHTML++;
        summPrices(i);
    })
}