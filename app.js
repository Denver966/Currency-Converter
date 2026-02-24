let input = document.querySelector('#input');


let selects = document.querySelectorAll('.select');
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let button = document.querySelector('form button')
let msg = document.querySelector('.msg')
let newOption;
// let option = document.querySelector('.option')


const populate = async () => {
    let amountVal = input.value;
    // API URL mein base_currency specify karein taake USD ke ilawa bhi kaam kare
    let BASE_URL = `https://api.currencyapi.com/v3/latest?apikey=cur_live_fqyzeJ8daejkNmeGnuaE89aFkqG5N4Lxo10ddPpT&base_currency=${fromCurr.value}`;
    
    try {
        let res = await fetch(BASE_URL);
        let rJson = await res.json();
        
        // Target currency ka rate nikalna
        let rate = rJson['data'][toCurr.value]['value'];
        
        // Final calculation
        let finalAmount = (amountVal * rate).toFixed(0);
        
        // Display message
        msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Error fetching data. Please try again.";
        console.error(error);
    }
}
for (let select of selects) {
    for (currCode in countryList) {
        newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === 'form' && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === 'to' && currCode === "PKR") {
            newOption.selected = "selected";
        }

        select.append(newOption)
    }
    select.addEventListener('change', (e) => {
        uptadeFlag(e.target)
    })

}




const uptadeFlag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    let amount = input;
    let amountVal = input.value;
    if (amountVal === '' || amountVal < 1) {
        alert('Enter Amount')
    }
    populate()
});

window.addEventListener("load", () => {
    populate();
});
