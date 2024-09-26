
// function convertCurrency() {
//     const amount = parseFloat(document.getElementById('amount').value);
//     const selectedCurrency = document.getElementById('currency').value;
//     const selectedDate = document.getElementById('date').value;
  
//     fetch('merged-csv-files.csv')
//       .then(response => response.text())
//       .then(csvData => {
//         const lines = csvData.split('\n');
//         const headers = lines[0].split(',');
  
//         const usdIndex = headers.indexOf('U.S. dollar   (USD)');
  
//         const selectedCurrencyIndex = headers.indexOf(selectedCurrency);
  
//         const dateIndex = headers.indexOf('Date');
  
//         const usdRates = [];
//         const selectedCurrencyRates = [];
//         for (let i = 1; i < lines.length; i++) {
//           const line = lines[i].split(',');
//           const currentDate = line[dateIndex].trim();  
//           if (currentDate === selectedDate) {
//             usdRates.push(parseFloat(line[usdIndex]));
//             selectedCurrencyRates.push(parseFloat(line[selectedCurrencyIndex]));
//           }
//         }
  
//         if (usdRates.length === 0 || selectedCurrencyRates.length === 0) {
//           alert(`Exchange rates not available for the selected date: ${selectedDate}`);
//           return;
//         }
  
//         const convertedAmount = (amount * selectedCurrencyRates[0]).toFixed(2);
  
//         const convertedAmountElement = document.getElementById('convertedAmount');
//         convertedAmountElement.textContent = `Converted Amount: ${convertedAmount} ${selectedCurrency}`;
//       })
//       .catch(error => console.error('Error:', error));
//   }
  // Function to convert currency
// Function to populate the currency dropdown
function populateCurrencyDropdown(headers) {
  const dropdown = document.getElementById('currency');

  headers.slice(1).forEach(currency => {
    const option = document.createElement('option');
    option.value = currency;
    option.textContent = currency;
    dropdown.appendChild(option);
  });
}

// Function to convert currency
function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const selectedCurrency = document.getElementById('currency').value;

  // Make sure selectedCurrency is valid
  if (!selectedCurrency) {
    alert("Please select a currency.");
    return;
  }

  // Get the date from the input or set a default
  const selectedDate = new Date().toISOString().split('T')[0]; // Default to today's date

  fetch('merged-csv-files.csv') // Make sure this file path is correct
    .then(response => response.text())
    .then(csvData => {
      const lines = csvData.split('\n');
      const headers = lines[0].split(',');

      // Find the index of USD column and the selected currency column
      const usdIndex = headers.indexOf('U.S. dollar   (USD)');
      const selectedCurrencyIndex = headers.indexOf(selectedCurrency);

      // Extract exchange rates for USD, selected currency, and the given date
      const usdRates = [];
      const selectedCurrencyRates = [];


      // Convert the given amount to the selected currency
      const convertedAmount = (amount * selectedCurrencyRates[0]).toFixed(2);

      // Display the result
      const convertedAmountElement = document.getElementById('convertedAmount');
      convertedAmountElement.textContent = `Converted Amount: ${convertedAmount} ${selectedCurrency}`;
    })
    .catch(error => console.error('Error:', error));
}

// Fetch the CSV file and populate the currency dropdown on page load
fetch('merged-csv-files.csv')
  .then(response => response.text())
  .then(csvData => {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');

    populateCurrencyDropdown(headers);
  })
  .catch(error => console.error('Error:', error));

// Add event listener to button
document.getElementById('convertBtn').addEventListener('click', convertCurrency);
