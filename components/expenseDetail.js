/*
    This class is a component conatining expense detail and allows for deleting and editing an expense
    param onRefresList method that handles displaying the changes in other components
    param toggleDetail method that handles toggling the overlay when displayng expense detail
*/
export default class ExpenseDetail {
    constructor({ onRefreshList, toggleDetail }) {
        this.element = document.createElement("div");
        this.element.classList.add("expenseDetail");
        this.element.style.display = "none"

        this.expenseKey = null
        this.expense = null
        this.onRefreshList = onRefreshList
        this.toggleDetail = toggleDetail
    }

    render(){
        return this.element
    }

    /*
        This method creates the html structure for the expense detail 
        param key key of the shown expense
    */
    show(key){
        //toggle the overlay
        this.toggleDetail()
        this.expenseKey = key
        this.expense = JSON.parse(localStorage.getItem(this.expenseKey))

        this.element.style.display = "block"

        this.element.innerHTML = `
        <form class="editForm">
            <div class="detailBtns">
                <button type="button" name="close" class="fa fa-circle-xmark" />
                <button type="button" name="edit" class="fa fa-pencil"></button>
                <button type="submit" name="save" class="fa fa-check" style="display:none"></button>
            </div>
            <div class="formContent">
            <h3>Expense Detail</h3>
            <label>Title:<br><input type="text" id="title" value="${this.expense.title}" readonly autofocus/></label>
            <label>Amount:<br><input type="text" id="amount" value="${this.expense.amount}" readonly /></label>
            <label>Category <br>
                    <select name="category" id="category" value="${this.expense.category}" disabled>
                        <option value="food">Food</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="other">Other</option>
                    </select>
                </label>
            <label>Date:<br><input type="date" id="date" value="${this.expense.date}" readonly /></label>
            <label>Notes:<br><input type="text" id="notes" value="${this.expense.notes}" readonly /></label>
            <div class="error">Please fill all required fields</div>
            </div>
            <div><button type="button" name="delete" class="deleteBtn"/>Delete</div>
        </form>
    `;

        this._initEvents()

        // display selected category value
        const categorySelect = this.element.querySelector("#category");
        if (categorySelect) { categorySelect.value = this.expense.category;}
    }

    /*
        This method hides the detail and the overlay
    */
    _hide(){
        this.element.style.display= "none"
        this.toggleDetail()
    }

    /*
        This method enables editing of an expense
    */
    _edit(){
        //get the input fields
        const inputs = this.element.querySelectorAll("input[type='text'], input[type='date']");
        const category = this.element.querySelector("select")

        //set them to an editable state
        category.removeAttribute("disabled")
        inputs.forEach(input => 
            input.removeAttribute("readonly")
        );

        //focus the first input field
        const titleInput = this.element.querySelector("#title");
        titleInput.focus();

        //display the save button instead of the edit button
        this.element.querySelector("button[name='edit']").style.display = "none";
        this.element.querySelector("button[name='save']").style.display = "inline-block";
    }

    /*
        This method handles saving the edited changes after clicking the save button
    */
    _saveChanges(e){
        e.preventDefault()
        //if the changes are valid create new expense and save it 
        if(this._validateChanges(e.target)){
            const newExpense = {
                title: this.element.querySelector("#title").value,
                amount: this.element.querySelector("#amount").value,
                category: this.element.querySelector("#category").value,
                date: this.element.querySelector("#date").value,
                notes: this.element.querySelector("#notes").value
            }
            // remove the old expense
            localStorage.removeItem(this.key)
            //save the new one
            localStorage.setItem(this.expenseKey,JSON.stringify(newExpense))
            //refresh the components
            this.onRefreshList();
            //hide the detail
            this._hide();

        }
    }

    /*
        This method checks if the edited changes are valid for saving
        param form the form to validate the inputs for
    */
    _validateChanges(form){
        const error = this.element.querySelector(".error")
        let allCorrect = true;

        Array.from(form.elements).forEach((input) =>{
            //check if required are filled
            if((input.type === 'text' || input.type ==='date') && input.id !== 'notes'){
                if(input.value === ''){
                    error.style.display = "block";
                    input.style.borderColor ="red"
                    allCorrect = false;
                }
                else{
                    input.style.borderColor = "black"
                }
            }
            //check if amount is a number
            if(input.id === 'amount'){
                if(isNaN(Number(input.value))){
                    amount.style.border = "1px solid red"
                    error.style.display = "block"
                    error.innerHTML = "Amount must be a number"
                    allCorrect = false;
                }
            }
        }
        )
        return allCorrect
    }

    /*
        This method assigns event handlers to the buttons and form on the detail widget
    */
    _initEvents(){
        const closeBtn = this.element.querySelector("button[name='close']");
        const deleteBtn = this.element.querySelector("button[name='delete']");
        const editBtn = this.element.querySelector("button[name='edit']");
        const form = this.element.querySelector(".editForm");

        closeBtn.addEventListener('click', () => this._hide())
        editBtn.addEventListener('click',() => this._edit())
        form.addEventListener('submit', this._saveChanges.bind(this))
        deleteBtn.addEventListener('click',this._deleteExpense.bind(this))
    }

    /*
        This method handles deleting an expense
    */
    _deleteExpense(){
        //delete the expense from the local storage
        localStorage.removeItem(this.expenseKey)
        this.onRefreshList();
        this._hide();
    }
}