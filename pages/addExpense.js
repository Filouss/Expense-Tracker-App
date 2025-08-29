import Page from "./page.js";
import Expense from "../data/Expense.js";

/*
    Class containig the logic and ui for adding an expense
*/
export default class AddExpense extends Page {
    constructor(settings) {
        super(settings)
        this.element = document.createElement("div");
        this.element.classList.add("addExpensePage");

        //create the html structure
        this.element.innerHTML = `
            <div class ="addTop">
                <a href="?page=homepage" class="homepageBtn">< Homepage</a>
                <h1>Add New Expense</h1>
            </div>
            <div class="addContent">
                <div class="formWrapper">
                <form class="addForm">
                    <label>Title <br>
                        <input type="text" id="title">
                    </label>
                    <label><br> Amount <br>
                        <input type="text" id="amount">
                    </label>
                    <label><br> Date <br>
                        <input type="date" id="date">
                    </label>
                    <label><br> Category <br>
                        <select name="category" id="category">
                            <option value="food">Food</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="bills">Bills</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label><br> Notes <br>
                        <input type="text" id="notes">
                    </label>
                    <div class="error"></div>
                    <br>
                    <input type="submit" name="submit" id="submit" value="Create expense">
                </form>
                </div>
            </div>
        `;

        //create event listeners
        this._initEvents();
    }

    /*
    This method creates event listeners for the form
    */
    _initEvents(){
        const form = this.element.querySelector("form")

        form.addEventListener('submit',this._createExpense.bind(this))
    }

    /*
        This method handles the logic of creating the expense after submiting the form
    */
    _createExpense(e){
        let allFilled = true;

        //get the fields
        const error = this.element.querySelector(".error")
        const title = this.element.querySelector("#title")
        const amount = this.element.querySelector("#amount")
        const date = this.element.querySelector("#date")
        const category = this.element.querySelector("#category")
        const notes = this.element.querySelector("#notes")

        //check if all the required fields are filled
        const reqFields = [title,amount,date]
        for (const field of reqFields) {
            //if not filled, display an error
            if(!field.value){
                e.preventDefault();
                field.style.border = "1px solid red"
                error.style.display = "block"
                error.innerHTML = "Please fill all required fields"
                allFilled = false
            }
        }
        if(!allFilled){return}
        //check if amount is a number and if not display appropriate error
        if(isNaN(Number(amount.value))){
            e.preventDefault();
            amount.style.border = "1px solid red"
            error.style.display = "block"
            error.innerHTML = "Amount must be a number"
            return
        }
        //create and save the expense to local storage
        const exp = new Expense(amount.value,title.value,category.value,date.value,notes.value)
        const uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
        localStorage.setItem(uid, JSON.stringify(exp));

    }

    render() {
        return this.element;
    }

}