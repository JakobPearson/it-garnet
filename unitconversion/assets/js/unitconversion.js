document.addEventListener('DOMContentLoaded', function () {
    const valueInput = document.getElementById('valueInput');
    const fromUnitSelect = document.getElementById('fromUnitSelect');
    const toUnitSelect = document.getElementById('toUnitSelect');
    const calculateBtn = document.getElementById('calculateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const errorDiv = document.getElementById('error');
    const resultDiv = document.getElementById('result');
  
   
    function clearAll() {
      valueInput.value = '';
      fromUnitSelect.selectedIndex = 0;
      toUnitSelect.selectedIndex = 0;
      errorDiv.textContent = '';
      resultDiv.textContent = '';
    }
  
   
    calculateBtn.addEventListener('click', function () {

      errorDiv.textContent = '';
      resultDiv.textContent = '';
  
  
      if (!valueInput.value || isNaN(valueInput.value)) {
        errorDiv.textContent = 'Please enter a valid numeric value.';
        return;
      }
      if (fromUnitSelect.selectedIndex === 0 || toUnitSelect.selectedIndex === 0) {
        errorDiv.textContent = 'Please select units for conversion.';
        return;
      }
  
   
      const conversionURL = 'https://brucebauer.info/assets/ITEC3650/unitsconversion.php' + valueInput.value + '&fromUnit=' + fromUnitSelect.value + '&toUnit=' + toUnitSelect.value;
 
      fetch(conversionURL)
        .then(response => response.json())
        .then(data => {
          resultDiv.textContent = 'Result: ' + data.result;
        })
        .catch(error => {
          errorDiv.textContent = 'An error occurred while performing the conversion.';
        });
    });
  

    clearBtn.addEventListener('click', clearAll);