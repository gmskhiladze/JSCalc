const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');

function start() {

    keyDown()

    buttons.forEach(function (button) {
        button.addEventListener('click', display_input);
    });
}

function keyDown() {

    document.addEventListener('keydown', (e) => {

        let arr = ["+", "-", "*", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        if (arr.includes(e.key)) {
            display.value += e.key;
        }
        if (e.key === "Enter") {
            display.value = sequencing(get_calculate_value());
        }
        if (e.key === "Backspace") {
            display.value = display.value.slice(0, -1);
        }
    });
}

function get_calculate_value() {
    let inp_val = display.value;
    const reg = /( ?[-+*\/] ?)/gm;
    return inp_val.split(new RegExp(reg));
}

function display_input(event) {

    const clickedButtonValue = event.target.value;

    if (clickedButtonValue === '=') {
        if (display.value !== '') {
            // display.value = eval(display.value);

            display.value = sequencing(get_calculate_value());
        }
    } else if (clickedButtonValue === 'C') {
        display.value = '';
    } else if (clickedButtonValue === 'D') {
        display.value = display.value.slice(0, -1);
    } else {
        display.value += clickedButtonValue;
    }
}

function sequencing(str_arr) {

    // bagi maq anu wesit  did gamosaxuleba roiqneba
    // 4*10-2*10-4/2
    // jer 4/2 =2 mere 4*10=40 mere 2*10 = 20  40-20-2 = 18
    // anu orderings araketebs 
    for (let i = 0; i < str_arr.length; i++) {

        if (str_arr[i] == "/") {

            let prev_el = str_arr[i - 1];
            let operator = str_arr[i];
            let next_el = str_arr[i + 1];

            str_arr.splice(str_arr[i - 2], 1); //remove previous elem
            str_arr.splice(str_arr[i - 1], 1);  // remove next elem

            str_arr.splice(str_arr[i], 1, calculate(prev_el, operator, next_el)); //replace operator with calc value
        }

        else if (str_arr[i] == "*") {

            let prev_el = str_arr[i - 1];
            let operator = str_arr[i];
            let next_el = str_arr[i + 1];

            str_arr.splice(str_arr[i - 2], 1);
            str_arr.splice(str_arr[i - 1], 1);

            str_arr.splice(str_arr[i], 1, calculate(prev_el, operator, next_el));
        }

        else {

            let operator = str_arr[1];
            let prev_el = str_arr[1 - 1];
            let next_el = str_arr[1 + 1];

            str_arr.splice(str_arr[1 - 2], 1);
            str_arr.splice(str_arr[1 - 1], 1);

            str_arr.splice(str_arr[1], 1, calculate(prev_el, operator, next_el));
        }
    }

    while (str_arr.length > 1) {
        sequencing(str_arr)
    }

    return str_arr[0];
}

function calculate(num_1, operator, num_2) {
    if (operator == "/") {
        return parseFloat(num_1) / parseFloat(num_2)
    }
    if (operator == "*") {
        return parseFloat(num_1) * parseFloat(num_2)
    }
    if (operator == "+") {
        return parseFloat(num_1) + parseFloat(num_2)
    }
    if (operator == "-") {
        return parseFloat(num_1) - parseFloat(num_2)
    }
    else {
        return "ERORR"
    }
}

start()