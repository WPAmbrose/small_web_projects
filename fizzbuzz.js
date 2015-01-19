// get the first p element
var p_first = document.getElementsByTagName("P").item(0);

// the main counter
var inc = 0;

var interval_id = null;

function count()
{
	var pout = "";
	
	inc = inc + 1;
	
	if (inc % 3 == 0)
	{
		pout = " fizz ";
	}
	
	if (inc % 5 == 0)
	{
		pout = pout + " buzz ";
	}
	
	if (inc % 7 == 0)
	{
		pout = pout + " blargh ";
	}
	
	pout = inc + pout;
			
	// work with the first child node of the first p element, its text
	p_first.firstChild.data = pout;
}

function begin()
{
	if (interval_id === null)
	{
		interval_id = setInterval(count, 1400);
	}
	else
	{
		// there's an interval set, clear it
		clearInterval(interval_id);
		interval_id = null;
	}
}