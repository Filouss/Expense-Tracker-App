/*
This is a data class containing expense attributes

*/

export default class Expense{
    constructor(amount, title, category, date, notes = '') {
        this.amount = amount;
        this.title = title;
        this.category = category
        this.date = date
        this.notes = notes
    }
}