document.addEventListener('DOMContentLoaded', function() {
            const input = document.getElementById('temperature-input');
            const convertBtn = document.getElementById('convert-btn');
            const resultContainer = document.getElementById('result-container');
            const resultValue = document.getElementById('result-value');
            const resultUnit = document.getElementById('result-unit');
            const errorMessage = document.getElementById('error-message');
            const temperatureIndicator = document.getElementById('temperature-indicator');
            const temperatureComparison = document.getElementById('temperature-comparison');
            const unitSelect = document.getElementById('unit-select');
            
            convertBtn.addEventListener('click', convertTemperature);
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    convertTemperature();
                }
            });
            
            function convertTemperature() {
                const inputValue = parseFloat(input.value);
                
                if (isNaN(inputValue)) {
                    errorMessage.style.display = 'block';
                    resultContainer.style.display = 'none';
                    return;
                }
                
                errorMessage.style.display = 'none';
                
                let convertedTemp, unit, celsiusTemp;
                const currentUnit = unitSelect.value;
                
                switch(currentUnit) {
                    case 'celsius':
                        celsiusTemp = inputValue;
                        convertedTemp = [(inputValue * 9/5) + 32, inputValue + 273.15];
                        unit = ['°F', 'K'];
                        break;
                    case 'fahrenheit':
                        celsiusTemp = (inputValue - 32) * 5/9;
                        convertedTemp = [celsiusTemp, celsiusTemp + 273.15];
                        unit = ['°C', 'K'];
                        break;
                    case 'kelvin':
                        celsiusTemp = inputValue - 273.15;
                        convertedTemp = [celsiusTemp, (celsiusTemp * 9/5) + 32];
                        unit = ['°C', '°F'];
                        break;
                }
                
                resultValue.textContent = convertedTemp.map((temp, i) => 
                    `${temp.toFixed(1)}${unit[i]}`).join(' / ');
                
                resultContainer.style.display = 'block';
                
                updateTemperatureIndicator(celsiusTemp);
                
                updateComparisonText(celsiusTemp);
            }
            
            function updateTemperatureIndicator(celsiusTemp) {
                const normalizedTemp = Math.max(-50, Math.min(celsiusTemp, 150));
                const percentage = ((normalizedTemp + 50) / 200) * 100;
                
                temperatureIndicator.style.left = `${percentage}%`;
            }
            
            function updateComparisonText(celsiusTemp) {
                let comparisonText = '';
                
                if (celsiusTemp < -20) {
                    comparisonText = " Extremely cold temperature ";
                } else if (celsiusTemp < 0) {
                    comparisonText = "Below-freezing temperature";
                } else if (celsiusTemp < 10) {
                    comparisonText = "Chilly winter temperature";
                } else if (celsiusTemp < 20) {
                    comparisonText = "Cool spring-like temperature";
                } else if (celsiusTemp < 30) {
                    comparisonText = "Comfortable room temperature";
                } else if (celsiusTemp < 37) {
                    comparisonText = "Warm summer temperature";
                } else if (celsiusTemp < 100) {
                    comparisonText = "Boiling water temperature ";
                } else {
                    comparisonText = "Extreme high temperature";
                }
                
                temperatureComparison.textContent = comparisonText;
            }
        });