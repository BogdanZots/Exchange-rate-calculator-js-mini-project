import {getAllCodes} from './service.js'
import {getChangeValue} from './service.js'
let firstChangebleCurrency = document.getElementById('currency-one')
let secondChangeCurrency = document.getElementById('currency-two')
const firstCurrencyAmount = document.getElementById('amount-one')
const changeValutesBtn = document.getElementById('rate')
let output = document.getElementById('rate-output')

getAllCodes()
    .then(response => response.json())
    .then(data => {
        const renderAllCodes = function () {
            data.supported_codes.map(valutesArrays => {
                let optionCurrencyArrays1 = document.createElement('option')
                optionCurrencyArrays1.setAttribute('id', 'option-value1')
                firstChangebleCurrency.append(optionCurrencyArrays1)
                optionCurrencyArrays1.innerHTML = `${valutesArrays.toString().slice(0,3)}`
                return optionCurrencyArrays1.value = `${valutesArrays.toString().slice(0,3)}`
            })
            data.supported_codes.map(valutesArrays => {
                let optionCurrencyArrays2 = document.createElement('option')
                optionCurrencyArrays2.setAttribute('id', 'option-value2')
                secondChangeCurrency.append(optionCurrencyArrays2)
                optionCurrencyArrays2.innerHTML = `${valutesArrays.toString().slice(0,3)}`
                return optionCurrencyArrays2.value = `${valutesArrays.toString().slice(0,3)}`
            })
        }
        renderAllCodes()
    })

    .then(() => {
        firstChangebleCurrency.addEventListener('change', e => {
            secondChangeCurrency = document.getElementById('currency-two')
            getChangeValue(e.target.value)
                .then(response => response.json())
                .then(data => {
                    changeValue('*', firstChangebleCurrency.value, +firstCurrencyAmount.value, data.conversion_rates[secondChangeCurrency.value], secondChangeCurrency.value)
                })
        })

    })
    
output.innerHTML = '1 AED = 1 AED'
secondChangeCurrency.addEventListener('change', function (e) {
    secondChangeCurrency = e.target.value
    getChangeValue(firstChangebleCurrency.value)
        .then(response => response.json())
        .then(data => {
            changeValue('*', firstChangebleCurrency.value, firstCurrencyAmount.value, data.conversion_rates[secondChangeCurrency], secondChangeCurrency)
        })
})

firstCurrencyAmount.addEventListener('input', function (e) {
    secondChangeCurrency = document.getElementById('currency-two')
    getChangeValue(firstChangebleCurrency.value)
        .then(response => response.json())
        .then(data => {
            changeValue('*', firstChangebleCurrency.value, firstCurrencyAmount.value, data.conversion_rates[secondChangeCurrency.value], secondChangeCurrency.value)
        })
})

changeValutesBtn.addEventListener('click', function (params) {
    firstChangebleCurrency = document.getElementById('currency-one')
    secondChangeCurrency = document.getElementById('currency-two')
    changeValutes()
})

function changeValutes() {
    let previoseValueFirst = firstChangebleCurrency.value
    let previouseValueSecond = secondChangeCurrency.value
    firstChangebleCurrency.value = previouseValueSecond
    secondChangeCurrency.value = previoseValueFirst
    getChangeValue(firstChangebleCurrency.value)
        .then(response => response.json())
        .then(data => {
            console.log(firstChangebleCurrency, firstCurrencyAmount, data.conversion_rates[secondChangeCurrency.value], secondChangeCurrency)
            changeValue('*', firstChangebleCurrency.value, firstCurrencyAmount.value, data.conversion_rates[secondChangeCurrency.value], secondChangeCurrency.value)
        })
}

function changeValue(action, firstChangebleCurrency, firstCurrencyAmount, exchangeRate, secondChangeCurrency) {
    let operation = (new Function('a', 'b', `return a ${action} b`))(exchangeRate, firstCurrencyAmount)
    return output.innerHTML = `${firstCurrencyAmount } ${firstChangebleCurrency} =` + `${parseInt(operation).toFixed(2)}` + `${secondChangeCurrency}`
}