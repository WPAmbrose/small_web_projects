var rt = null;
var current = 0;
var past_decimal = 0;
var in_operation = null;

var out = document.getElementById("out");
var calc_status = document.getElementById("status");

calc_status.innerHTML = "Click to enter numbers and operators";
out.innerHTML = "0";
/* 
var seven_button = document.getElementById("seven");
seven_button.addEventListener("click",
	function (event) { calc_status.innerHTML = "seven was clicked"; },
	false);
 */
function update_output(out_number)
{
	// update the currently displayed number
	out.innerHTML = out_number;
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
	in_operation = null;
	update_status("Click to enter numbers and operators");
	update_output(0);
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
	update_output(current);
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
 	calculate();
	in_operation = "divide";
} // division

function multiplication()
{
	// respond to the * button
	update_status("the * button was pressed");
	calculate();
	in_operation = "multiply";
} // multiplication

function subtraction()
{
	// respond to the - button
	update_status("the - button was pressed");
calculate();
	in_operation = "subtract";
} // subtraction

function addition()
{
	// respond to the + button
	update_status("the + button was pressed");
 	calculate();
	in_operation = "add";
} // addition

function calculate()
{
	// this is called whenever an operator button is pressed,
	// and is the only thing called when the = button is pressed
	if (rt === null)
	{
		rt = current;
	}
	else
	{
		if (in_operation == "add")
			{ rt = rt + current; }
		else if (in_operation == "subtract")
			{ rt = rt - current; }
		else if (in_operation == "multiply")
			{ rt = rt * current; }
		else if (in_operation == "divide")
			{ rt = rt / current; }
	}
	current = 0;
	update_output(rt);
	past_decimal = 0;
} // calculate
