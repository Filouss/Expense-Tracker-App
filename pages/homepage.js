import MainWidget from "../components/mainWidget.js";
import Topbar from "../components/topbar.js";
import Recents from "../components/recents.js";
import Page from "./page.js";
import ExpenseDetail from "../components/expenseDetail.js";

/*
    Homepage class which holds all it's components and handles communication between them
*/
export default class Homepage extends Page{

    constructor(settings) {
        super(settings)
        this.createHtml();
        this.detailVisible = false;
    }

    render() {
        return this.element;
    }

    pageShow(){
        //refresh changes in the components on refresh
        this.createHtml()
        super.pageShow()
    }

    /*
    This method creates the html structure to render
    */
    createHtml(){
        const container = document.createElement("div");
        container.classList.add("homepage");

        //create the components and append them to the container div
        const content = document.createElement("div");
        this.topBar = new Topbar();
        this.mainWidget = new MainWidget();
        this.detail = new ExpenseDetail({
            onRefreshList: this.refreshList.bind(this),
            toggleDetail: this.toggleDetail.bind(this)
        });
        this.recents = new Recents({
            onShowDetail: (expenseData) => this.detail.show(expenseData),
            onRefreshList: this.refreshList.bind(this),
        });
        content.classList.add("content");

        container.appendChild(this.topBar.render());
        container.append(this.detail.render())
        content.appendChild(this.recents.render());
        content.appendChild(this.mainWidget.render());

        container.appendChild(content)

        this.overlay = document.createElement("div");
        this.overlay.classList.add("overlay");
        container.appendChild(this.overlay);

        this.element = container;
    }

    /*
    This method handles refresh of the dynamic elements
    */
    refreshList() {
        this.recents.listExpenses();
        this.mainWidget.createGraph();
        this.mainWidget.createPieChart();
        this.topBar.refresh()
    }

    /*
    This method toggles the visibility of the overlay that darkens the page
    */
    toggleDetail(){
        this.detailVisible = !this.detailVisible;

        if(this.detailVisible){
            document.body.classList.add("detail-visible")
        } else{
            document.body.classList.remove("detail-visible")
        }
    }
}
