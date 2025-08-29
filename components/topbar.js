/*
    Component containing the homepage top bar elements
*/
class Topbar{
    constructor(params) {
        this.overall = 0;
        this.lastMonths = 0;

        this.highest = this._getHighestExpense()
        this.sum = this._getSumOfAll()
        this._calculateLastMonths()

        this.highestDisplay = "None"
        this.widget = document.createElement("header");
        this.widget.classList.add("topBar");

        this.refresh()
    }

    render(){
        return this.widget
    }

    /*
        This method refreshes the html
    */
    refresh(){
        //calculate the expenses for the last month and add them to lastMonths
        this._calculateLastMonths()
        //get the overall highes expense if there is any
        if(this._getHighestExpense() !== null){
            this.highest = this._getHighestExpense()
            let highestDate = new Date(this.highest.date)
            this.highestDisplay = `${this.highest.title} | ${this.highest.amount} CZK | ${highestDate.getDate()}.${highestDate.getMonth()+1}.${highestDate.getFullYear()}`
        }

        //get the sum of all expenses
        this.sum = this._getSumOfAll()

        //create the html
        this.widget.innerHTML = `
        <div class = 'appBanner'>
            <div class="logo"></div>
            <div class="appTitle">Expense Tracker</div>
        </div>
        <div class=topStatWrapper>
            <div class=topStatTitle>Last month's expenses: </div> 
            <div>${this.lastMonths.toFixed(1)}</div>
        </div>
        <div class=topStatWrapper>
            <div class=topStatTitle>Biggest overall expense: </div> 
            <div>${this.highestDisplay}</div>
        </div>
        <div class=topStatWrapper>
            <div class=topStatTitle>Sum of all expenses: </div> 
            <div>${this.sum.toFixed(1)}</div>
        </div>
        <a href="?page=summary" class="summaryBtn">Summary</a>
    `;

    //create the svg logo
    this._createLogo()
    
    }

    /*
        This method creates the path of the svg logo and starts the animation after its created
    */
    _createLogo(){
        const logo = this.widget.querySelector(".logo");
        logo.innerHTML = `<svg viewBox="0 0 130 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 74Q102.375 67.05 67.275 19.275Z" fill="none" />
            <path d="M117 83.625C135.525 55.35 86.775-9 85.8 18.3S117 83.625 10 83Z" fill="none" />
        </svg>`;

        setTimeout(() => this._drawSVG(logo), 0);
    }

    /*
        This method animates the draw of the svg logo
    */
    _drawSVG() {
        //get the path elements
        const pathElements = document.querySelectorAll("path");
        const style = document.createElement("style");
        style.innerHTML = `
            @keyframes draw {
                from { stroke-dashoffset: 100%; }
                to { stroke-dashoffset: 0%; }
            }
        `;
        document.head.appendChild(style);
        
        //add animation to each stroke in the path
        pathElements.forEach((path, index) => {
        const pathLength = path.getTotalLength();

        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        path.style.stroke = "rgb(201, 139, 46)";
        path.style.strokeWidth = "2";
        path.style.fill = "none";

        path.style.animation = `draw${index} 3s ease forwards`;

        const style = document.createElement("style");
        style.textContent = `
            @keyframes draw${index} {
                from { stroke-dashoffset: ${pathLength}; }
                to { stroke-dashoffset: 0; }
            }
        `;
        document.head.appendChild(style);
    });
    }

    /*
        This method returns the overall highest expense
    */
    _getHighestExpense(){
        const keys = Object.keys(localStorage);
        let highestKey = keys[0];

        for (const key of keys) {
            let val = JSON.parse(localStorage.getItem(key)); 
            if(val){
                if (Number(val.amount) > Number(JSON.parse(localStorage.getItem(highestKey)).amount)){
                    highestKey = key
                }
            }
        }
        return JSON.parse(localStorage.getItem(highestKey));
        
    }

    /*
        This method returns sum of all expenses
    */
    _getSumOfAll(){
        const keys = Object.keys(localStorage);
        let sum = 0; 
        for (const key of keys) {
            let val = localStorage.getItem(key); 
            const parsed = JSON.parse(val);
            const amount = Number(parsed.amount);
            if (!isNaN(amount)) {
                sum += amount;
            }
        }
        
        return sum;
    }

    /*
        This method calculates the expenses made in the current month
    */
    _calculateLastMonths(){
        const keys = Object.keys(localStorage);
        const d = new Date()
        let thisMonth = d.getMonth()+1
        let sum = 0;

        for (const key of keys) {
            let val = localStorage.getItem(key); 
            if (val) {
                const parsed = JSON.parse(val);
                if(this._isSameMonth(thisMonth, parsed.date)){
                    const amount = Number(parsed.amount); 

                    if (!isNaN(amount)) {
                        sum += amount;
                    }
                }
            }
        }
        this.lastMonths = sum
    }

    _isSameMonth(monthNum, date){
        const d = new Date(date)
        return d.getMonth()+1 === monthNum
    }
}

export default Topbar;