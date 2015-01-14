var rt = "Click to enter numbers and operators";
var current = 0;
var past_decimal = 0;
//var incoming = 0;
var out = document.getElementById("out");

out.innerHTML = rt;

function update_display()
{
	// this updates the currently displayed number
	out.innerHTML = current;
}

function clear_total()
{
	// respond to the C button
	out.innerHTML = "Clearing...";
	rt = 0;
	current = 0;
	past_decimal = 0;
	update_display();
}

function number_pressed(incoming)
{
	// respond to number buttons
	out.innerHTML = "hey, " + incoming + " was pressed";
	
	if (past_decimal = 0)
	{
		// this adjusts the current number to account for ordinary numeric input
		current = current * 10 + incoming;
	}
	else
	{
		// this adjusts the current number to account for numeric input after the decimal point has been entered
		// past_decimal (effectively) keeps track of how many times a number has been added after the decimal
		// raising 1/10 to the power of the position past the decimal produces 0.1, 0.01, 0.001, etc.,
		// allowing for easy scaling
		current = current + (((1 / 10) ^ past_decimal) * incoming);
		past_decimal++;
	}
	update_display();

}

function decimal_pressed()
{
	// respond to the decimal point button
	if (past_decimal = 0)
	{
		past_decimal = 1;
	}
	out.innerHTML = "the decimal point button was pressed";
}

function division()
{
	// respond to the / button
	out.innerHTML = "the / button was pressed";
	past_decimal = 0;
}

function multiplication()
{
	// respond to the * button
	out.innerHTML = "the * button was pressed";
	past_decimal = 0;
}

function subtraction()
{
	// respond to the - button
	out.innerHTML = "the - button was pressed";
	past_decimal = 0;
}

function addition()
{
	// respond to the + button
	out.innerHTML = "the + button was pressed";
	past_decimal = 0;
}

function calculate()
{
	// this is called whenever an operator button is pressed,
	// and is the only thing called when the = button is pressed
	out.innerHTML = "the = button was pressed";
	past_decimal = 0;
}
