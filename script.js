const incomeArea = document.querySelector(`.income-area`)
const expensesArea = document.querySelector(`.expenses-area`)

const aviableMoney = document.querySelector(`.aviable-money`)
const transactionPanel = document.querySelector(`.add-transaction-panel`)

const nameInput = document.querySelector(`#name`)
const amountInput = document.querySelector(`#amount`)
const categoryInput = document.querySelector(`#category`)
const error = document.querySelector(`.error`)

const deleteBtn = document.querySelector(`.delete`)
const addBtn = document.querySelector(`.add-transaction`)
const deleteAllBtn = document.querySelector(`.delete-all`)
const saveBtn = document.querySelector(`.save`)
const cancelBtn = document.querySelector(`.cancel`)

const lightBtn = document.querySelector(`.light`)
const darkBtn = document.querySelector(`.dark`)

// const transactionAmount = document.querySelector(`.transaction-amount`)

let root = document.documentElement
let id = 0
let categoryIcon
let selectedCategory
let moneyArr = [0]

const showPanel = () => {
	transactionPanel.style.display = `flex`
}
const hidePanel = () => {
	transactionPanel.style.display = `none`
	clearInputs()
}
const checkForm = () => {
	if (nameInput.value != `` && (amountInput.value != `` || amountInput.value != 0) && categoryInput.value != `none`) {
		createNewTransaction()
	} else {
		error.style.visibility = `visible`
	}
}
const clearInputs = () => {
	nameInput.value = ``
	amountInput.value = ``
	categoryInput.value = `none`
	error.style.visibility = `hidden`
}

const checkCategory = transaction => {
	switch (transaction) {
		case `0`:
			categoryIcon = `<i class="fas fa-money-bill-wave"></i>`
			break
		case `1`:
			categoryIcon = `<i class="fas fa-hamburger"></i>`
			break
		case `2`:
			categoryIcon = `<i class="fas fa-cart-arrow-down"></i>`
			break
		case `3`:
			categoryIcon = `<i class="fas fa-film"></i>`
			break
		case `4`:
			categoryIcon = `<i class="fas fa-bed"></i>`
			break
		case `5`:
			categoryIcon = `<i class="fas fa-pills"></i>`
			break
	}
}

const createNewTransaction = () => {
	if ((categoryInput.value != 0 && amountInput.value > 0) || (categoryInput.value == 0 && amountInput.value < 0)) {
		amountInput.value *= -1
	}
	const newTransaction = document.createElement('div')
	newTransaction.classList.add(`transaction`)
	newTransaction.setAttribute(`id`, id)
	checkCategory(categoryInput.value)
	newTransaction.innerHTML = ` 
	<p class="transaction-name">	
		${categoryIcon} ${nameInput.value}
	</p>
	<p class="transaction-amount">
		${amountInput.value} PLN <button class="delete" onclick="deleteTransaction(${id})"><i class="fas fa-times"></i></button>
	</p>`

	if (categoryInput.value == 0) {
		incomeArea.append(newTransaction)
	} else {
		expensesArea.append(newTransaction)
	}

	moneyArr.push(parseFloat(amountInput.value))
	countMoney(moneyArr)
	id++
	hidePanel()
}

const countMoney = money => {
	const newMoney = money.reduce((a, b) => a + b)
	aviableMoney.textContent = `${newMoney} PLN`
}

const deleteTransaction = id => {
	const transactionToDel = document.getElementById(id)
	const transactionAmount = parseFloat(transactionToDel.childNodes[3].innerText)
	const indexOfTransaction = moneyArr.indexOf(transactionAmount)

	moneyArr.splice(indexOfTransaction, 1)
	countMoney(moneyArr)

	if (transactionAmount > 0) {
		incomeArea.removeChild(transactionToDel)
	} else {
		expensesArea.removeChild(transactionToDel)
	}
}

const deleteAll = () => {
	incomeArea.innerHTML = `<h3>Income:</h3>`
	expensesArea.innerHTML = `<h3>Expenses:</h3>`
	moneyArr = [0]
	aviableMoney.textContent = `0 PLN`
}

const lightMode = () => {
	root.style.setProperty(`--first-color`, `#F9F9F9`)
	root.style.setProperty(`--second-color`, `#14161F`)
	root.style.setProperty(`--border-color`, `rgba(0, 0, 0, 0.2)`)
}

const darkMode = () => {
	root.style.setProperty(`--first-color`, `#14161F`)
	root.style.setProperty(`--second-color`, `#F9F9F9`)
	root.style.setProperty(`--border-color`, `rgba(255, 255, 255, 0.3)`)
}

addBtn.addEventListener(`click`, showPanel)
cancelBtn.addEventListener(`click`, hidePanel)
saveBtn.addEventListener(`click`, checkForm)
deleteAllBtn.addEventListener(`click`, deleteAll)
lightBtn.addEventListener(`click`, lightMode)
darkBtn.addEventListener(`click`, darkMode)
