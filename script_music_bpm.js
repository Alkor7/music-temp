var timeStart, timeBeat, beatsCount=-1, beatsResult, oldBeat, progressCount = 0, isFound = false;
// beatsCount=-1 чтобы корректно считать со 2 нажатия 
var progressBarDOM = document.getElementById('progressBar'); // нашли на странице прогресс бар
var yourBPM_DOM = document.getElementById('yourBPM'); // нашли блок для вывода результата 
var calcBPM_DOM = document.getElementById('buttonTemp'); // нашли кнопку, на которую повешена функция
var buttonReset_DOM = document.getElementById('buttonReset'); // нашли кнопку с функциями сброса

calcBPM_DOM.addEventListener('click', RhythmCalc); // вызов RhythmCalc при нажатии buttonTemp
buttonReset_DOM.addEventListener('click', RhythmReset); //вызов RhythmReset при нажатии buttonReset

function RhythmCalc() {
	if (!isFound) { // Логика isFound нашли - true, еще ищем = false
		yourBPM_DOM.classList.remove('animate__fadeOutUp'); 
		beatsCount++;		// Считаем количество нажатий
		if (beatsCount == 0) { timeStart = Date.now(); }	// Фиксируем начало измерений
		timeBeat = (Date.now() - timeStart);	// Считаем количество миллисекунд от старта
		beatsResult = Math.floor(60/(timeBeat/1000/beatsCount)); // делим ВРЕМЯ на КОЛИЧЕСТВО 
		if (beatsResult%2 == 1) { beatsResult--;}	// Округляем до целого четного числа 
		
		if (beatsResult == oldBeat) { progressCount+=8; } // Индикация степени угадывания 
		if (progressCount >= 100) { BPMisFound(); } // Определили BPM, вывели и зафиксир результат 
		progressBarDOM.value = progressCount; // Заполняем прогресс-бар
		if (beatsCount >=1) { yourBPM_DOM.innerText = beatsResult;} // Вывод текущего BPM
		oldBeat = beatsResult;
		console.log ("Нажатий= ", beatsCount, " Прошло ms=", timeBeat, " BPM=", beatsResult);
	}
}

function RhythmReset() { // Сброс всех параметров и счетчиков, Вкл кнопку
	beatsCount = -1; // сбросили счетчик нажатий
	beatsResult = ""; // обнулили результат
	progressCount = 0; // прогресс-бар на ноль 
	progressBarDOM.value = progressCount; // сбросили прогресс-бар на ноль
	yourBPM_DOM.classList.remove('animate__flip'); // удалили анимацию 
	yourBPM_DOM.classList.add('animate__fadeOutUp');
	yourBPM_DOM.style.color = "#777";
	isFound = false; // "Найдено?" = Ложь
	calcBPM_DOM.disabled = false; // Сделали кнопку доступной 
}

function BPMisFound() { // Анимировали результат, Отключили кнопку
	yourBPM_DOM.classList.add('animate__flip');
	yourBPM_DOM.style.color = "#006400";
	isFound = true; 
	calcBPM_DOM.disabled = true;
}
