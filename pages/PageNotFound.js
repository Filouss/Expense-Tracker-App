import Page from "./page.js";

/*
    This class represents the 404 page when the url query is incorrect
*/

export default class PageNotFound extends Page {
    constructor(parameters) {
        super(parameters)

        this.content = document.createElement("div")
        this.content.classList.add("notFound")
        this.content.innerHTML = `
            <h2>Couldn't find the page you're looking for</h2>
            <p>:(</p>
        `

        this.render()
    }

    render(){
        return this.content
    }
}