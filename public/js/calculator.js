let display = document.getElementById("display");

let displayStatus = {
	isFinalResult: false,
	stillCalculating: true,
	isOn: true,
};

display.value = 0;

function numericButton(button) {
	if(displayStatus.isOn) {
		if(displayStatus.isFinalResult && !displayStatus.stillCalculating) {
			display.value = 0;
		}
		if(display.value == 0 && display.value.length == 1) {
			display.value = display.value.slice(0, -1);
			display.value += button.innerHTML;
			displayStatus.isFinalResult = false;
		} else {
			display.value += button.innerHTML;
		}
	}
}

function operatorButton(button) {
	if(displayStatus.isOn) {
		displayStatus.stillCalculating = true;
		let lastNonEmptyIndex = display.value.length - 2;
		let lastIndex = display.value.length - 1;
		if(isAnOperator(display.value[lastNonEmptyIndex])) {
			display.value = display.value.slice(0, - 3);
			display.value += " " + button.innerHTML + " ";
		} else if(display.value[lastIndex] == ".") {
			display.value = display.value.slice(0, -1)
			display.value += "0" + " " + button.innerHTML + " ";
		} else {
			display.value += " " + button.innerHTML + " ";
		}
	}
}

function dotButton(button) {
	if(!dotHasAlreadyBeenUsed(display.value)) {
		display.value += button.innerHTML;
	}
}

function backButton() {
	let lastIndex = display.value.length - 1;
	if(display.value[lastIndex] == " ") {
		display.value = display.value.slice(0, -2);
	} else {
		display.value = display.value.slice(0, -1);
	}
}

function clearButton() {
	if(display.value != "") {
		display.value = 0;
	}
}

function onOffButton() {
	if(display.value == "") {
		display.value = 0;
		displayStatus.isOn = true;
	} else {
		display.value = "";
		displayStatus.isOn = false;
	}
}

function equalsButton() {
	if(display.value != "") {
		let lastNonEmptyIndex = display.value.length - 2;
		if(isAnOperator(display.value[lastNonEmptyIndex])) {
			display.value = display.value.slice(0, -2);
		}
		let result = eval(display.value.replace(/[x]/g, "*"));
		display.value = result;
		displayStatus.isFinalResult = true;
		displayStatus.stillCalculating = false;
	} 
}

function isAnOperator(lastCharacter) {
	if(lastCharacter == "x" || lastCharacter == "/" || lastCharacter == "+" || lastCharacter == "-") {
		return true;
	} else {
		return false;
	}
}

function dotHasAlreadyBeenUsed(expression) {
	let found = false;
	let i = expression.length - 1;
	while(!found && i >= 0 && expression[i] != " ") {
		if(expression[i] == ".") {
			found = true;
		}
		i--;
	}
	if(found) {
		return true;
	} else {
		return false;
	}
}


