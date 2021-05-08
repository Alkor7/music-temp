'use strict'
var timeStart, timeBeat, beatsCount=-1, beatsResult, oldBeat, progressCount = 0;

window.addEventListener('keydown', function(keyb_control) { 
	if (keyb_control.keyCode == 32) { RhythmCalc() } // Нажали пробел 
	if (keyb_control.keyCode == 46) { RhythmReset() } // Нажали DEL
} )

function RhythmCalc() { 
	beatsCount++;		// Считаем количество нажатий
	if (beatsCount == 0) { timeStart = Date.now(); }	// Фиксируем начало измерений
	timeBeat = (Date.now() - timeStart);	// Считаем количество миллисекунд от старта
	
	beatsResult = Math.floor(60/(timeBeat/1000/beatsCount)); // делим ВРЕМЯ на КОЛИЧЕСТВО 
	if (beatsResult%2 == 1) { beatsResult++;}	// Округляем до целого четного числа 
	console.log ("Нажатий= ", beatsCount, " Прошло ms=", timeBeat, " BPM=", beatsResult);

	if (beatsResult == oldBeat) { 
		progressCount+=10;
		if (progressCount >= 99) { 
			progressCount = 100;
			document.getElementById('yourBPM').style.fontSize ='2em';
			document.getElementById('yourBPM').classList.add("animate__flip");
			document.getElementById('buttonTemp').onclick = "none";
		}
		document.getElementById('progressBar').value = progressCount;
	}

	if (beatsCount >=1) { 
		document.querySelector('#yourBPM').innerText = beatsResult;
	}
	oldBeat = beatsResult;
}

function RhythmReset() { 
	beatsCount = -1;
	beatsResult = "";
	progressCount = 0;
	document.querySelector('#yourBPM').innerText = "_ _ _";
	document.getElementById('progressBar').value = progressCount;
}