/*
    This class ensures routing between pages
*/

class Router {
    constructor({pages, defaultPage}) {
        this.pages = pages;
        this.defaultPage = defaultPage;
        this.currentPage = null;

        this.route(window.location.href);

        // listen on url changes from user clicking back button
        window.addEventListener('popstate', e => {
            this.route(window.location.href);
        });

        // listen on url changes from user clicks
        window.addEventListener('click', e => {
            const element = e.target
            if (element.nodeName === 'A') {
                e.preventDefault();
                this.route(element.href);
                window.history.pushState(null, null, element.href)
            }
        });
    }

    route(href){
        // get the page key from url
        const url = new URL(href)
        const page = url.searchParams.get('page') ?? this.defaultPage

        this.currentPage && this.currentPage.pageHide()

        //if the page is not found, return the 404 page
        const page404 = this.pages.find(p => p.key === '404')
        const pageInstanceMatched = this.pages.find(p => p.key === page)

        this.currentPage = pageInstanceMatched ?? page404
        this.currentPage.pageShow()
    }
   
}

export default Router;