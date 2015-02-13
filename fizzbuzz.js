// get the first p element
var p_first = document.getElementsByTagName("P").item(0);

// the main counter
var inc = 0;

var count_id = null;

function count()
{
	var pout = "";
	
	inc = inc + 1;
	
	if (inc % 3 === 0)
	{
		pout = " fizz ";
	}
	
	if (inc % 5 === 0)
	{
		pout = pout + " buzz ";
	}
	
	if (inc % 7 === 0)
	{
		pout = pout + " blargh ";
	}
	
	pout = inc + pout;
			
	// work with the first child node of the first p element, its text
	p_first.firstChild.data = pout;
	
	count_id = setTimeout(count, 1400);
}

function begin()
{
	if (count_id === null)
	{
		count_id = setTimeout(count, 1400);
	}
	else
	{
		// there's an timeout set, clear it
		clearTimeout(count_id);
		count_id = null;
	}
}