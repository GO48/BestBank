/* import */
import { accounts } from "./data.js"

/* DOM */
const accountsEl = document.getElementById("accounts")
const spendingsEl = document.getElementById("spendings")

/* onload Events */
window.addEventListener("load", renderAccounts)

/* Functions */
function renderAccounts() {
    accounts.forEach((account) => {
        const newAccount = document.createElement("div")
        newAccount.className = "account"
        newAccount.innerHTML = `
            <p>${account.title}</p>
            <p>$ ${account.balance}</p>
        `
        accountsEl.appendChild(newAccount)
        newAccount.addEventListener("click", function(){
            clearActive(accountsEl)
            changeView()
            newAccount.classList.add("active")
            spendingsEl.innerHTML = "<h2>Spendings</h2>"
            if (account.spendings.length > 0) {
                renderSpendings(account.id)
            } else {
                spendingsEl.innerHTML += "<p>No spendings in this account.</p>"
            }
        })
    })
}

function clearActive(parentEl) {
    for (let child of parentEl.children) {
        child.classList.remove("active")
    }
}

function changeView() {
    accountsEl.classList.toggle("in-one-row")
    spendingsEl.classList.toggle("hidden")    
}

function renderSpendings(id) {
    let decreasedWidth = 100
    accounts[id - 1].spendings.forEach((spending) => {
        if (decreasedWidth >= 40) decreasedWidth -= 10
        const newSpending = document.createElement("div")
        newSpending.className = "spending"
        newSpending.setAttribute("style", `width: ${decreasedWidth}%;`)
        newSpending.innerHTML = `
            <p>${spending.category}</p>
            <p>${calculatePercentage(spending.spent, accounts[id - 1])}%</p>
            <p>$ ${spending.spent}</p>
        `
        spendingsEl.appendChild(newSpending)
    })
}

function calculatePercentage(spent, account) {
    let spentSum = 0
    account.spendings.forEach((spending) => {
        spentSum += parseInt(spending.spent)
    })
    return Math.floor(spent / spentSum * 100)
}
