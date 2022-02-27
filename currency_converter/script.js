const requestCurrencyAPI = async (from, to) => {
    const apiUrl = `http://economia.awesomeapi.com.br/json/last/${from}-${to}`
    response = await fetch(apiUrl);
    data = await response.json();
    return parseFloat(data[from+to].bid);
}

window.onload = () => {
    const convertButton = document.querySelector("#convertButton")
    const currencyIn = document.querySelector("#currencyIn")
    const currencyOut = document.querySelector("#currencyOut")
    const coinInput = document.querySelector("#coinInput")
    const textOut = document.querySelector("#textOut")
    convertButton.onclick = async () => {
        const value = parseFloat(coinInput.value);
        const from = currencyIn.value;
        const to = currencyOut.value;
        const currencyRatio = await requestCurrencyAPI(from,to)
        const res = value * currencyRatio
        textOut.innerHTML = `Result: ${value} ${from} = ${res} ${to}`
    };
}