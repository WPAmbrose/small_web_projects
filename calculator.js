var rt = null;
var current = 0;
var past_decimal = 0;
var in_operation = false;

var out = document.getElementById("out");
var calc_status = document.getElementById("status");

calc_status.innerHTML = "Click to enter numbers and operators";
out.innerHTML = "0";

function update_output()
{
	// update the currently displayed number
	out.innerHTML = current;
} // update_output

function update_status(stat)
{
	// update the status
	calc_status.innerHTML = stat;
} // update_status

function clear_total()
{
	// respond to the C button
	update_status("Clearing...");
	rt = null;
	current = 0;
	past_decimal = 0;
	update_status("Click to enter numbers and operators");
	update_output();
} // clear_total

function number_pressed(incoming)
{
	// respond to number buttons
	if (past_decimal == 0)
	{
		// this adjusts the current number to account for ordinary numeric input
		current = current * 10 + Number(incoming);
	}
	else
	{
		// this adjusts the current number to account for numeric input after the decimal point has been entered
		// past_decimal (effectively) keeps track of how many times a number has been added after the decimal
		// raising 1/10 to the power of the position past the decimal produces 0.1, 0.01, 0.001, etc.
		current = current + (Math.pow((1 / 10), past_decimal) * Number(incoming));
		past_decimal++;
	}
	update_output();
} // number_pressed

function decimal_pressed()
{
	// respond to the decimal point button
	if (past_decimal == 0)
	{
		past_decimal = 1;
	}
} // decimal_pressed

function division()
{
	// respond to the / button
	update_status("the / button was pressed");
	past_decimal = 0;
} // division

function multiplication()
{
	// respond to the * button
	update_status("the * button was pressed");
	past_decimal = 0;
} // multiplication

function subtraction()
{
	// respond to the - button
	update_status("the - button was pressed");
	past_decimal = 0;
} // subtraction

function addition()
{
	// respond to the + button
	update_status("the + button was pressed");
	past_decimal = 0;
} // addition

function calculate()
{
	// this is called whenever an operator button is pressed,
	// and is the only thing called when the = button is pressed
	past_decimal = 0;
} // calculate
