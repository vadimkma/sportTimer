
var startDate,
	lapDate,
	activeTimer=false,
	timerTimeOut,
	timerDisplay='timeTimer',
	timerLapsDisplay='timeLaps';

/*
*start the timer function
*/
function run(){
	activeTimer=true;
	clearTimer();
	startDate = new Date();
	lapDate = startDate;
	recursiveTimer();
}

/*
*stop the timer function
*/
function stopTimer(){
	activeTimer=false;
	clearTimeout(timerTimeOut);
}

/*
*new lap timer
*/
function lapTimer(){
	if(!activeTimer)
		return;
	var nowDate = new Date();
	var timeStampTimer = nowDate.getTime() - lapDate.getTime();
	var lapsDisplay = document.getElementById(timerLapsDisplay);
	lapsDisplay.insertAdjacentHTML('beforeend', '<li>' + getTimeString(timeStampTimer) + '</li>');
	lapDate = nowDate;
}

/*
*clear the timer function
*/
function clearTimer(){
	document.getElementById(timerDisplay).innerHTML = '00:00:00.0';
	document.getElementById(timerLapsDisplay).innerHTML = '';
}

/*
*recursive function timer
*/
function recursiveTimer(){
	var nowDate = new Date();
	var timeStampTimer = nowDate.getTime() - startDate.getTime();
	document.getElementById(timerDisplay).innerHTML = getTimeString(timeStampTimer);
	if(activeTimer)
		timerTimeOut = setTimeout("recursiveTimer()" ,100);
	else
		return;
}

/*
*function return string from timestamp
*param number timeStampTimer
*return string
*/
function getTimeString(timeStampTimer){
	var hours,
		minutes,
		seconds,
		milliseconds;

	milliseconds = timeStampTimer%1000;
	timeStampTimer -= milliseconds;
	milliseconds = Math.floor(milliseconds/100);
	timeStampTimer = timeStampTimer/1000;

	seconds = timeStampTimer%60;
	timeStampTimer -= seconds
	timeStampTimer = timeStampTimer/60;

	minutes = timeStampTimer%60;
	timeStampTimer -= minutes
	timeStampTimer = timeStampTimer/60;

	hours = timeStampTimer%60;

	if (seconds<10) 
		seconds = '0' + seconds;
 	if (minutes<10) 
 		minutes = '0' + minutes;
  	if (hours<10) 
  		hours = '0' + hours;

	return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}