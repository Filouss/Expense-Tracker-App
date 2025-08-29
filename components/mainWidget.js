
/*
    Class that contains graphs showing statistics about user's expenses
*/
export default class MainWidget {
    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("mainWidgetWrapper");

        const header = document.createElement("div");
        header.classList.add("mainWidgetHeader");
        header.textContent = "Analytics";

        this.widget = document.createElement("div");
        this.widget.classList.add("main-widget");
		//if there are any expenses, create the canvas' for chart.js api to use
        if(localStorage.length === 0){
          this.widget.innerHTML = `no data to keep track of yet`
        } else {
          this.widget.innerHTML = `
            <canvas id="graph"></canvas>
            <canvas id="pieChart"></canvas>
        `;
        }
        
        this.container.appendChild(header);
        this.container.appendChild(this.widget);
    }

	/*
        This method gets the values and creates the bar chart
    */
    createGraph(){
		const canvas = document.getElementById("graph");
		if (!canvas) {return;}	
        var xVals = ["January","February","March","April","May","June","July","August","September","October","November","December"]
		//get the amount for each month in the last year
        var yVals = this._getCount()

		//create the bar chart
        const ctx = document.getElementById("graph").getContext("2d");
        var chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: xVals,
              datasets: [{
                backgroundColor: "#ff722b",
                data: yVals
              }]
            },
            options: {
              legend: {display: false},
              title: {
                display: true,
                text: "Last year's expenses",
                fontColor: '#E6E6E6'    
              },
              scales: {
                xAxes: [{
                  gridLines: {
                    color: "rgba(255, 255, 255, 0.2)"
                  },
                  ticks: {
                    fontColor: "#ffffff"
                  }
                }],
                yAxes: [{
                  gridLines: {
                    color: "rgba(255, 255, 255, 0.2)"
                  },
                  ticks: {
                    fontColor: "#ffffff"
                  }
                }]
              }
            }
          });

    }

	/*
        This method creates a pie chart containing distribution of categories of all expenses
    */
    createPieChart(){
		const canvas = document.getElementById("graph");
		if (!canvas) {return;}	
		//get the amounts spent for each category
        const totals = this._getCategoryTotals();
        const categories = Object.keys(totals);
        const values = Object.values(totals);

		//createthe pie chart
        const ctx = document.getElementById("pieChart").getContext("2d");
        new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: values,
                backgroundColor: [
                    '#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40'
                ]
            }]
        },
        options: {
            title: {
                display: true,
                text: "Overall expenses distribuition"    ,
                fontColor: '#E6E6E6'
              },
            legend: {
              labels: {
                fontColor: '#E6E6E6'
              }
            }
          }
    });
    }

	/*
        This method returns an array with amount of spendings for each month this year
    */
    _getCount(){
		//create an array filled with 0
        const monthlyTotals = Array(12).fill(0);
		let currentYear = new Date().getFullYear

		//go through each expense
        Object.keys(localStorage).forEach(key => {
            const item = JSON.parse(localStorage.getItem(key));
            if (item && item.date && item.amount) {
                const date = new Date(item.date);
                const month = date.getMonth();
                const amount = parseFloat(item.amount);
				//check if the expense is from this year and add it's amount to the array
                if (!isNaN(amount) && date.getFullYear === currentYear) {
                    monthlyTotals[month] += amount;
                }
            }
        });

        return monthlyTotals
    }

	/*
        This method returns an array with amounts spent for each category
    */
    _getCategoryTotals(){
        const totals = {};

        Object.keys(localStorage).forEach(key => {
        	const item = JSON.parse(localStorage.getItem(key));
        	if (item && item.category && item.amount) {
				const amount = parseFloat(item.amount);
				if (!isNaN(amount)) {
					//add the amount
					totals[item.category] = (totals[item.category] || 0) + amount;
				}
        	}
    	});

    	return totals;
    }

	/*
        This method ensures that the graphs are created before rendering
    */
    render(){
        requestAnimationFrame(() => this.createGraph());
        requestAnimationFrame(() => this.createPieChart());
        return this.container
    }
}