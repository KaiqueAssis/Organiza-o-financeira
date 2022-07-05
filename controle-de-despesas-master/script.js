const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector("#money-plus")
const expenseDisplay = document.querySelector("#money-minus")
const balanceDisplay = document.querySelector("#balance")
const form = document.querySelector("#form")
const inputTansactionName = document.querySelector("#text")
const inputTansactionAmount = document.querySelector("#amount")



const LocalStorageTransaction = JSON.parse(localStorage
    .getItem('transactions'))

let transactions = localStorage
    .getItem('transactions') !== null ? LocalStorageTransaction : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-': '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
`

    transactionUl.append(li)
}

const updateBalaceValues = () => {
    const  transactionsAmount = transactions
        .map(transactions => transactions.amount)
    const total = transactionsAmount
        .reduce((acumulador, transaction) => acumulador + transaction, 0)
        .toFixed(2)
    const income = transactionsAmount
        .filter(value => value> 0)
        .reduce((acumulador, value) => acumulador + value, 0)
        .toFixed(2)
    const expense = Math.abs(transactionsAmount
        .filter(value => value < 0)
        .reduce((acumulador, value) => acumulador + value, 0)
        .toFixed(2))

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent =  `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
    
}

const init = () => {
    transactionUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalaceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}
const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTansactionName.value.trim()
    const transactionsAmount = inputTansactionAmount.value.trim()

    if(inputTansactionName.value.trim() === '' || inputTansactionAmount.value.trim() === ''){
        alert('Por favor, preencha os Espaços vazios')
        return
    }

    const transaction = {
        id: generateID(),
        name: transactionName, 
        amount: Number(transactionsAmount)
    }
    
    transactions.push(transaction)

    init()
    updateLocalStorage()

    inputTansactionName.value = ''
    inputTansactionAmount.value = ''
})