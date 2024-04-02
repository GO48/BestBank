/* Data */
const accounts = [
    {
        id: 1,
        title: "Main Account",
        balance: "6700.56",
        spendings: [
            {
                category: "Rent",
                spent: "1450"
            },
            {
                category: "Groceries",
                spent: "564"
            },
            {
                category: "Restaurants",
                spent: "123"
            },
            {
                category: "Transport",
                spent: "81"
            },
            {
                category: "Internet",
                spent: "50"
            }
        ]
    },
    {
        id: 2,
        title: "Expenses",
        balance: "5134.63",
        spendings: [
            {
                category: "Netflix",
                spent: "19.99"
            },
            {
                category: "HBO Max",
                spent: "14.99"
            },
            {
                category: "Setapp",
                spent: "9.99"
            }
        ]
    },
    {
        id: 3,
        title: "Savings",
        balance: "36500.12",
        spendings: []
    }
]

/* DOM */
const accountsEl = document.getElementById("accounts")
const spendingsEl = document.getElementById("spendings")

/* onload Events */
window.addEventListener("load", renderAccounts())

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
    for (const child of parentEl.children) {
        if (child.classList.contains("active")){
            child.classList.remove("active")
        }
    }
}

function changeView() {
    if (accountsEl.classList.contains("in-one-row")) {
        accountsEl.classList.remove("in-one-row")
    } 
    if(spendingsEl.classList.contains("hidden")) {
        spendingsEl.classList.remove("hidden")
    }
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
