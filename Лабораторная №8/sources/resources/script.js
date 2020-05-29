// Об'єкт для створення запитів
let request = new XMLHttpRequest(); 
const key = prompt("Введіть ключ");
const urlStatic = 'https://cloud.iexapis.com/v1/stock/market/batch?symbols=NFLX,INTC,ATVI,EA,GOOGL,AMD,MSFT,TSLA&types=quote&filter=symbol,companyName,latestPrice,change&token=' + key;
const urlDinamic = 'https://cloud.iexapis.com/v1/stock/market/batch?symbols=NFLX,INTC,ATVI,EA,GOOGL,AMD,MSFT,TSLA&types=quote&filter=latestPrice,change&token=' + key;
let tableUpdate = 0;
// Перший запит на отримання всіх необхідних данних
request.open('GET', urlStatic, true); 
 // Відповідь
request.onreadystatechange = function()
{
	if (request.readyState === XMLHttpRequest.DONE && request.status === 200){ 
		table(JSON.parse(request.response));
		tableUpdate = Date.now();
	}
}

function update_table(data)
{
	const rows =  document.getElementById('NewTable').rows;
	let x = 0;
	for (i in data)
	{
		let z = 2;
		for (j in data[i].quote)
		{
			rows[x].cells[z].textContent = data[i].quote[j] + " $";
			z++;
		}
		x++;
	}
}
request.send('');
//Виклик оновлення данних кожні 20 секунд
rxjs.interval(20000) 
.subscribe(() => {
	// запити для оновлення всіх необхідних данних
	request.open('GET', urlDinamic, true); 
	request.onreadystatechange = function() 	
	 {
		if (request.readyState === 4 && request.status === 200) {
				update_table(JSON.parse(request.response),Date.now());
			tableUpdate = Date.now();
		}
	}
	request.send('');
});
//Таймер часу останнього оновлення
rxjs.interval(100) 
.subscribe(() => { document.getElementById('latestUpdate').textContent = ((Date.now() - tableUpdate) / 1000).toFixed(1); });
//Створити таблицю
function table(data) 
{
	let table = document.getElementById("NewTable");

	for (i in data)
	{
		let tr = document.createElement('tr');
		let z = 0;
		for (j in data[i].quote)
		{
			let td = document.createElement('td');
			td.textContent = data[i].quote[j] + ((z>1)?" $":"");
			tr.appendChild(td);
			z++;
		}
		table.appendChild(tr);
	}
	document.getElementById('Table').appendChild(table);
}

