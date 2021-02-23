//  jshint esversion:6
// * Variable we are going to use

const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');

// * showError Function
const showError = (error) => {
	// Get elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	// Create a new Div element
	const errDiv = document.createElement('div');
	errDiv.className = 'alert alert-danger';
	errDiv.appendChild(document.createTextNode(error));

	// insert errDiv above heading
	card.insertBefore(errDiv, heading);

	// Alert message disappear after 2 seconds
	setTimeout(() => {
		document.querySelector('.alert').remove();
	}, 2000);
};

// * CalculateResult Function
const calculateResult = (e) => {
	const principal = parseFloat(amount.value);

	// Here first we convert the interest from percent to decimal, then anual rate to monthly rate.
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;

	// Convert payment from anually to monthly;
	const calculatedPayment = parseFloat(years.value) * 12;

	// compute the monthly payment figure
	const x = Math.pow(1 + calculatedInterest, calculatedPayment);
	const monthly = (principal * x * calculatedInterest) / (x - 1);

	// Check if the result is finite or not
	if (isFinite(monthly)) {
		// round upto 2 decimals
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayment).toFixed(2);
		totalInterest.value = (monthly * calculatedPayment - principal).toFixed(
			2
		);
	} else {
		showError('Please Check your numbers');
	}
	e.preventDefault();
};

// * adding event to the Submit Button
document
	.querySelector('#loan-form')
	.addEventListener('submit', calculateResult);
