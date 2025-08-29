export default class Page {
    constructor({key, title}) {
        this.pageElement = document.querySelector(`#root`)
        this.title = title
        this.key = key
    }

    render() {
        return ``
    }

    pageShow() {
        this.pageElement.innerHTML = '';
        this.pageElement.appendChild(this.render());
        document.title = this.title
    }

    pageHide() {
        this.pageElement.innerHTML = ''
    }
}