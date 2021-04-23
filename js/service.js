const allCodes = 'https://v6.exchangerate-api.com/v6/0b3990f53d64e7f4b6abfbf4/codes'
const changeRate = `https://v6.exchangerate-api.com/v6/0b3990f53d64e7f4b6abfbf4/latest/`

export function getAllCodes() {
return   fetch('https://v6.exchangerate-api.com/v6/0b3990f53d64e7f4b6abfbf4/codes')
       
}

export function getChangeValue(cureentValute) {
  return     fetch(`${changeRate}${cureentValute}`)
    
}
