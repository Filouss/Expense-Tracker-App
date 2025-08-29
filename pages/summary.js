import Page from "./page.js";
import ExpenseDetail from "../components/expenseDetail.js";

/*
    This class creates the html for showing the user all created expenses
*/
export default class Summary extends Page {
    constructor(settings,) {
        super(settings)
        this.monthlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.overlayVisible = false

        //use the detail component the same way as in homepage
        this.detail = new ExpenseDetail({
                    onRefreshList: this.refreshList.bind(this),
                    toggleDetail: this._toggleOverlay.bind(this)
                });
        this.element = document.createElement("div");
        this.element.classList.add("summary");
        this.element.innerHTML = ``;

        //create the top bar
        this.backArrowWrapper = document.createElement("div")
        this.backArrowWrapper.classList.add("backArrowWrapper")
        this.backArrowWrapper. innerHTML = `
            <div class="summaryTop">
                <a href="?page=homepage" class="homepageBtn">< Homepage</a>
                <p> List of your expenses</p>
            </div>
        `
        this.element.appendChild(this.backArrowWrapper)

        this.overall = document.createElement("div");
        this.overall.classList.add("months");
        this.element.appendChild(this.overall)
        this.element.appendChild(this.detail.render())

        this.overlay = document.createElement("div");
        this.overlay.classList.add("overlay");
        this.element.appendChild(this.overlay);

        //create the summary content
        this._createSummary()
    }

    render() { 
        return this.element;
    }

    /*
        This method handles changes in the summary content by re-rendering it
    */
    refreshList() {
        this._createSummary();
    }

    /*
        This method groups the expenses by years and months for rendering them afterwards
    */
    _createSummary(){
        const expensesList = {}
        
        //handle no expenses saved
        if(window.localStorage.length === 0){
            this.overall.innerHTML = `No expenses added so far. Create expenses on the homepage to keep track of your spendings!`
        } else{
            const keys = Object.keys(localStorage);

            //go through each val by it's key
            for (const key of keys) {
                let val = localStorage.getItem(key); 
                if(val){
                    //get the item and save it in the array into an appropriate spot
                    val = JSON.parse(val)
                    const date = new Date(val.date); 
                    const month = date.getMonth(); 
                    const year = date.getFullYear()
                    if (!expensesList[year]) {
                            expensesList[year] = {};
                    }
                    if (!expensesList[year][month]) {
                        expensesList[year][month] = [];
                    }
                    expensesList[year][month].push(key);
                }
            }
            this._renderSummary(expensesList)
        }
    }

    /*
        This method creates the html structure for the collapsible lists with expenses
    */
    _renderSummary(expensesList){
        this.overall.innerHTML = ''
        //for each year create a clickable button that will trigger a collapsible event
        for (const year in expensesList) {
            let wrapper = document.createElement('div')
            wrapper.classList.add('wrapper')
            let yearElement = document.createElement('button')
            yearElement.classList.add("collapsible")
            yearElement.innerHTML = `${year}`
            wrapper.appendChild(yearElement)
            let monthWrapper = document.createElement('div')
            monthWrapper.classList.add("monthWrapper", "collapsed")

            //for each month create a section which contains its expenses
            for (const month in expensesList[year]) {
                let monthElement = document.createElement('div')
                monthElement.classList.add("month")
                monthElement.innerHTML = `<p class="nameMonth">${this.monthlist[month]}</p>`
                let expenses = document.createElement('ul')
                expenses.classList.add("expenses")
                monthElement.appendChild(expenses)

                //each expense is displayed as clickable the same way on homepage
                for (const expenseKey of expensesList[year][month]) {
                    let exp = document.createElement('li')
                    exp.classList.add('expense')
                    let val = localStorage.getItem(expenseKey); 
                    if(val){
                        val = JSON.parse(val)
                        let date = new Date(val.date) 
                        exp.innerHTML = `<button class="expenseBtn" data-key="${expenseKey}">
                                <span class="expense-title">${val.title}</span>
                                <span class="expense-date">${date.getUTCDate()}.${this.monthlist[date.getMonth()]}</span>
                                <span class="expense-amount"><span class="amountDetail">${val.amount}</span>&nbsp;CZK</span>
                            </button>
                        `
                    }
                    expenses.appendChild(exp)
                }
                monthWrapper.appendChild(monthElement)
            }
            wrapper.appendChild(monthWrapper)
        this.overall.appendChild(wrapper)
        }

        //add event listeners to the created elements
        this._initEvents();
    }

    /*
        This method toggles the visibility of the overlay that darkens the page
    */
    _toggleOverlay(){
        this.overlayVisible = !this.overlayVisible;

        if(this.overlayVisible){
            document.body.classList.add("detail-visible")
        } else{
            document.body.classList.remove("detail-visible")
        }
    }

    /*
        This method adds event handlers to elements and handles toggling of the collapsibles
    */
    _initEvents(){
        const buttons = this.element.querySelectorAll(".expenseBtn");
        buttons.forEach(btn => {
            btn.addEventListener("click", this._showDetail.bind(this));
        });

        const collapsible = this.element.querySelectorAll(".collapsible")
        collapsible.forEach(element => {
            element.addEventListener("click",function() {
                element.classList.toggle("open")
                const parentChildren = element.parentElement.children;
                for (let i = 0; i < parentChildren.length; i++) {
                    if (parentChildren[i].classList.contains('monthWrapper')) {
                        parentChildren[i].classList.toggle("collapsed");
                    }
                }
            })
        });
        
    }

    /*
        This method displays the detail of an expense
    */
    _showDetail(e){
        const clickedBtn = e.currentTarget;
        const key = clickedBtn.dataset.key;

        if(key){
            this.detail.show(key)
        }
    }
}
