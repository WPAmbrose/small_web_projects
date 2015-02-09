// set up status variables used by multiple functions
var rt = null;
var current = 0;
var current_stale = false;
var past_decimal = 0;
var in_operation = null;

var out = document.getElementById("out");
out.innerHTML = "Click to enter numbers and operators";

// get relevant page elements
var button_table= document.getElementById("button_holder");
var function_buttons = button_table.getElementsByClassName("function_button");
var number_buttons = button_table.getElementsByClassName("number_button");

// add event listeners for digit buttons
for (to_add = 0; to_add < number_buttons.length; to_add++) {
	number_buttons[to_add].addEventListener("click",
	function (event) { digit_pressed(event.target.value); },
	false);
}

// add event listeners for operator buttons and other special buttons
for (to_add = 0; to_add < function_buttons.length; to_add++) {
	function_buttons[to_add].addEventListener("click",
	function (event) {
		evt = event.target.value;
		switch (evt) {
			case "C":
				clear_total();
				break;
			case "/":
				division();
				break;
			case "*":
				multiplication();
				break;
			case "-":
				subtraction();
				break;
			case "+":
				addition();
				break;
			case ".":
				decimal_pressed();
				break;
			case "=":
				calculate();
				break;
		}
	},
	false);
}

function update_output(out_number) {
	// update the currently displayed number
	
	var out_string = out_number;
		
	// This detects and handles the decimal point and any zeroes after it.
	if (past_decimal > 0 && current === Math.floor(current)) {
		out_string = out_string + ".";
		for (decm = 0; decm < past_decimal - 1; decm++) {
			out_string = out_string + "0";
		}
	}
	
	out.innerHTML = out_string;
} // update_output

function clear_total() {
	// respond to the C button
	update_output("Clearing...");
	rt = null;
	current = 0;
	past_decimal = 0;
	in_operation = null;
	update_output("0");
} // clear_total

function digit_pressed(incoming) {
	// respond to digit buttons
	
	// check if current number is stale and reset it if it is
	if (current_stale) {
		current = 0;
		current_stale = false;
	}

	if (past_decimal === 0) {
		// This adjusts the current number to account for ordinary numeric input.
		current = current * 10 + Number(incoming);
	}
	else {
		// This adjusts the current number to account for numeric input after the decimal point has been entered.
		// The variable past_decimal (effectively) keeps track of how many times a number has been added after the decimal.
		// Raising 1/10 to the power of the position past the decimal produces 0.1, 0.01, 0.001, etc.
		current = current + (Math.pow((1 / 10), past_decimal) * Number(incoming));
		past_decimal++;
	}
	update_output(current);
} // digit_pressed

function decimal_pressed() {
	// respond to the decimal point button
	if (past_decimal === 0)	{
		past_decimal = 1;
	}
	update_output(current);
} // decimal_pressed

function division() {
	// respond to the / button
 	if (current_stale == false) calculate();
	in_operation = "divide";
} // division

function multiplication() {
	// respond to the * button
	if (current_stale == false) calculate();
	in_operation = "multiply";
} // multiplication

function subtraction() {
	// respond to the - button
	if (current_stale == false) calculate();
	in_operation = "subtract";
} // subtraction

function addition() {
	// respond to the + button
 	if (current_stale == false) calculate();
	in_operation = "add";
} // addition

function calculate() {
	// This is called whenever an operator button is pressed, and is the only thing called when the = button is pressed.
	// It does all of the actual user-relevant calculation.
	
	// var do_calc = true;
	
	if (rt === null) {
		rt = current;
	}
	else {
		switch (in_operation) {
			case ("add"):
				rt = rt + current;
				break;
			case ("subtract"):
				rt = rt - current;
				break;
			case ("multiply"):
				rt = rt * current;
				break;
			case ("divide"):
				rt = rt / current;
				break;
			/*
			default:
				// Operations have happened since the last clear, but no operation is in progress,
				// so don't do calculations, to prevent erratic behavior.
				do_calc = false;
				break;
			*/
		}
	}
	/*
	if (do_calc) {
		current = null;
		in_operation = null;
		*/
		current_stale = true;
		past_decimal = 0;
		update_output(rt);
	//}
} // calculate
