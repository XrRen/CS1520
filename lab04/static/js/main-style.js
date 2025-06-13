function main_driver() {
    let loanInformation = getLoanInformation(); // See Note #1
    let housePrice = loanInformation[0];
    let downPayment = loanInformation[1];
    let annualInterestRate = loanInformation[2];
    let loanPeriodInYears = loanInformation[3];
    // derived data from loan information
    let principal_P = housePrice - downPayment;// your code here; // See note #2
    let montlyInterestRate_r = (annualInterestRate / 100) / 12;// your code here // See note #3;
    let totalNumberOfPayments_n = loanPeriodInYears * 12;// your code here // See note #4
    let monthlyMortgagePayments_M = computeMontlyMortgagePayments(principal_P, montlyInterestRate_r, totalNumberOfPayments_n);
    displayResults(housePrice, downPayment, annualInterestRate, loanPeriodInYears, monthlyMortgagePayments_M); // see note #5
    plotMortgageCurves(principal_P, montlyInterestRate_r, totalNumberOfPayments_n, monthlyMortgagePayments_M);
}
function plotMortgageCurves(principal_P, montlyInterestRate_r, totalNumberOfPayments_n, monthlyMortgagePayments_M) {
    let plottingArrays = getLoanPaymentValues(principal_P, montlyInterestRate_r, totalNumberOfPayments_n, monthlyMortgagePayments_M); // see note #6
    plotValues(plottingArrays); // see note #7
}
function computeMontlyMortgagePayments(p, r, n) {
    return p * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
}
function displayResults(housePrice, downPayment, annualInterestRate, loanPeriodInYears, monthlyMortgagePayments_M) {
    document.write("Mortgage Calculator: <br>");
    document.write("House Price: $" + housePrice + "<br>");
    document.write("Down Payment: $" + downPayment+ "<br>");
    document.write("Annual Interest Rate: " + annualInterestRate + "%" + "<br>");
    document.write("Loan Period: " + loanPeriodInYears + " years" +"<br>");
    document.write("Monthly Mortgage Payment: $" + monthlyMortgagePayments_M.toFixed(2) + "<br>");
    document.write("Minimum Monthly Income Per Household: $" + (monthlyMortgagePayments_M * 3).toFixed(2) + "<br>");
}
function getLoanInformation() {
    let housePrice = 600000;
    let downPayment = 100000;
    let annualInterestRate = 5;
    let loanPeriodInYears = 30;

    return [housePrice, downPayment, annualInterestRate, loanPeriodInYears];
}
function getLoanPaymentValues(principal_P, montlyInterestRate_r, totalNumberOfPayments_n, monthlyMortgagePayments_M) {
    let paymentNumbers = [];
    let interestPayments = [];
    let principalPayments = [];
    let remainingPrincipal = [];

    for (let i = 1; i <= totalNumberOfPayments_n; i++) {
        // Interest portion of this month's payment
        let interestPayment = principal_P * montlyInterestRate_r;
        let principalPayment = monthlyMortgagePayments_M - interestPayment;

        // Update remaining principal
        principal_P -= principalPayment;

        // Store values
        paymentNumbers[i - 1] = i;
        interestPayments[i - 1] = interestPayment;
        principalPayments[i - 1] = principalPayment;
        remainingPrincipal[i - 1] = principal_P;
    }

    return [paymentNumbers, interestPayments, principalPayments, remainingPrincipal];
}
function plotValues(plottingArrays) {
    // Define Data
    let xArray = plottingArrays[0]; // Payment numbers (1, 2, ..., n)
    let interestMonthlyPayments = plottingArrays[1]; // Monthly payments towards interest
    let principalMonthlyPayments = plottingArrays[2]; // Monthly payments towards principal
    let remainingPrincipal = plottingArrays[3];
    // Define data for the Plotly plot
    const data1 = [
        {
            x: xArray,
            y: interestMonthlyPayments,
            mode: "markers", // Could also use "lines" for line chart
            name: "Interest Monthly Payment",
            marker: { color: 'blue' } // Custom marker color for interest
        },
        {
            x: xArray,
            y: principalMonthlyPayments,
            mode: "markers", // Could also use "lines" for line chart
            name: "Principal Monthly Payment",
            marker: { color: 'green' } // Custom marker color for principal
        }
    ];
    const data2 = [
        {
            x: xArray,
            y: remainingPrincipal,
            mode: "markers", // Could also use "lines" for line chart
            name: "Principal Monthly Payment",
            marker: { color: 'green' } // Custom marker color for principal
        }
    ];

    // Define layout for the plot (optional)
    const layout = {
        title: 'Mortgage Payments',
        xaxis: {
            title: 'Number of Months',
        },
        yaxis: {
            title: 'Dollars($)',
        },
    };
    // Plot the data using Plotly
    Plotly.newPlot('monthlyInterestRateAndPrincipalPayments', data1, layout);
    Plotly.newPlot('monthlyPrincipalValues', data2, layout);
}