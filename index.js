import Homepage from "./pages/homepage.js";
import Summary from "./pages/summary.js";
import Router from "./routing/router.js";
import AddExpense from "./pages/addExpense.js"
import PageNotFound from "./pages/PageNotFound.js";

new Router({
    pages:[
        new AddExpense({key: 'addExpense', title: 'Add Expense'}),
        new Homepage({key: 'homepage', title: 'Homepage'}),
        new Summary({key: 'summary', title: 'Summary'}),
        new PageNotFound({key: '404', title: 'Page not found'}),
    ],
    defaultPage: 'homepage',
})