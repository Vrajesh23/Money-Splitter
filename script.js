// Function to split the amount and display the result
function splitAmount() {
    // Retrieve the user input values
    const amount = parseFloat(document.getElementById('amount').value);
    const numberOfPeople = parseInt(document.getElementById('numberOfPeople').value);
  
    // Calculate the split amount per person
    const splitAmount = amount / numberOfPeople;
  
    // Prompt the user for a heading
    const heading = prompt('Enter a heading for this result (optional):');
  
    // Create an object to store the result
    const result = {
      amount,
      numberOfPeople,
      splitAmount,
      heading: heading || 'No Heading'
    };
  
    // Retrieve the existing history from local storage
    let history = JSON.parse(localStorage.getItem('moneySplitterHistory')) || [];
  
    // Add the result to the history
    history.push(result);
  
    // Store the updated history in local storage
    localStorage.setItem('moneySplitterHistory', JSON.stringify(history));
  
    // Display the result
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = `
      <h2>Result</h2>
      <p>Heading: ${result.heading}</p>
      <p>Amount: $${result.amount}</p>
      <p>Number of People: ${result.numberOfPeople}</p>
      <p>Split Amount per Person: $${result.splitAmount}</p>
    `;
  
    // Clear the input fields
    document.getElementById('amount').value = '';
    document.getElementById('numberOfPeople').value = '';
  
    // Update the history
    updateHistory();
  }
  
  // Function to update the history
  function updateHistory() {
    const historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = '';
  
    // Retrieve the existing history from local storage
    let history = JSON.parse(localStorage.getItem('moneySplitterHistory')) || [];
  
    if (history.length === 0) {
      historyContainer.innerHTML = '<p>No history of distribution yet.</p>';
      return;
    }
  
    const historyHeading = document.createElement('h2');
    historyHeading.textContent = 'History of Distribution';
    historyContainer.appendChild(historyHeading);
  
    for (let i = 0; i < history.length; i++) {
      const result = history[i];
  
      const historyItem = document.createElement('div');
      historyItem.classList.add('history-item');
      historyItem.innerHTML = `
        <h3>${result.heading}</h3>
        <p>Amount: $${result.amount}</p>
        <p>Number of People: ${result.numberOfPeople}</p>
        <p>Split Amount per Person: $${result.splitAmount}</p>
      `;
  
      historyContainer.appendChild(historyItem);
    }
  }
  
  // Event listener for the Split It button
  document.getElementById('splitItBtn').addEventListener('click', splitAmount);
  
  // Event listener for the Reset button
  document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('amount').value = '';
    document.getElementById('numberOfPeople').value = '';
    document.getElementById('resultContainer').innerHTML = '';
  });
  
  // Clear the history when the page is reloaded
  window.addEventListener('beforeunload', function() {
    localStorage.removeItem('moneySplitterHistory');
  });
  
  // Update the history when the page is loaded
  window.addEventListener('load', updateHistory);
  