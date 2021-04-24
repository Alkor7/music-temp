var timeStart, timeBeat, beatsCount=-1, beatsResult;

window.addEventListener('keydown', function(keyb_control) { 
	if (keyb_control.keyCode == 32) { RhythmCalc() } // Нажали пробел 
	if (keyb_control.keyCode == 46) { RhythmReset() } // Нажали DEL
} )

function RhythmCalc() { 
	beatsCount++;		// Считаем количество нажатий beatsCount
	if (beatsCount == 0) { timeStart = Date.now(); }	// Фиксируем начало измерений
	timeBeat = (Date.now() - timeStart);	// Считаем количество миллисекунд от старта
	beatsResult = Math.floor(60/(timeBeat/1000/beatsCount)); // Целочисленно делим ВРЕМЯ на КОЛИЧЕСТВО 
	if (beatsResult%2 == 1) { beatsResult++;}	// Округляем до четного числа 
	console.log ("Нажатий= ", beatsCount, " Прошло=", timeBeat, " БПМ=", beatsResult);
	if (beatsCount >=1) { 
		document.querySelector('#yourBPM').innerText = beatsResult;
	}
}

function RhythmReset() { 
	beatsCount = -1;
	beatsResult = "";
	document.querySelector('#yourBPM').innerText = "_ _ _";
}
