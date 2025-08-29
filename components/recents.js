/*
    Class containing the recent expenses sidebar
*/
class Recents {
    constructor({ onShowDetail, onRefreshList }) {
        this.onShowDetail = onShowDetail;
        this.onRefreshList = onRefreshList;
        
        this.container = document.createElement("div");
        this.container.classList.add("recentsWrapper");

        const header = document.createElement("div");
        header.classList.add("recents-header");
        header.textContent = "Recent Expenses";
        this.container.appendChild(header);

        
        this.widget = document.createElement("div");
        this.widget.classList.add("sideBar");

        this.widget.innerHTML = `
            <a href="?page=addExpense" class="addExpenseBtn">Add Expense</a>
        `;

        
        this.expenses = document.createElement("div");
        this.expenses.classList.add("expenseList");

        this.widget.appendChild(this.expenses);

       
        this.container.appendChild(this.widget);

        this.listExpenses();
    }

    render(){
        return this.container;
    }

    /*
        This creates the html buttons of last months expenses 
    */
    listExpenses(){
        let currentMonth = new Date().getMonth()
        let currentYear = new Date().getFullYear
        this.expenses.innerHTML = ''
        const expenseList = [];
        
        //go through each expense and check if it's from current year and month
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            let val = localStorage.getItem(key);

            if(val){
                val = JSON.parse(val)
                if(new Date(val.date).getMonth() === currentMonth && new Date(val.date).getFullYear === currentYear){
                    //add the key to the list
                    val._key = key
                    expenseList[i] = val
                }

            }
        }

        //sort them from the newest
        expenseList.sort((a,b) =>
            new Date(b.date) - new Date(a.date)
        )

        //create the html
        expenseList.forEach(val => {
            this.expenses.innerHTML += `
                <button class="expense" data-key="${val._key}">
                    <span class="expense-title">${val.title}</span>
                    <span class="expense-amount"><span class="amountDetail">${val.amount}</span>&nbsp;CZK</span>
                </button>
            `
        });

        
        this._initEvents();
    }

    /*
        This method adds event listeners to the expenses so that the detail can be displayed
    */
    _initEvents(){
        const buttons = this.container.querySelectorAll(".expense");
        buttons.forEach(btn => {
            btn.addEventListener("click", this._showDetail.bind(this));
        });
    }

    /*
        This method opens the expense detail
    */
    _showDetail(e){
        const clickedBtn = e.currentTarget;
        const key = clickedBtn.dataset.key;

        if(key){
            this.onShowDetail(key)
        }

    }
}

export default Recents;