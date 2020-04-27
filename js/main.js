let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelVlue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');


let money, time;
   
    startBtn.addEventListener('click', function() {
        time = prompt("Введите дату в формате YYYY-MM-DD",'');
        money = +prompt("Ваш бюджет на месяц?",'');
        
        while(isNaN(money) || (money == "") || (money == null)) {
            money = +prompt("Ваш бюджет на месяц?",'');
        }
        
        appData.budget = money;
        appData.timeData = time;
        budgetValue.textContent = money.toFixed() + " грн";
        yearValue.value = new Date(Date.parse(time)).getFullYear();
        monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
        dayValue.value = new Date(Date.parse(time)).getDate();
    });

    // Функция выявления обязательных расходов у пользователя
    expensesBtn.addEventListener('click', function() {
        let sum = 0;

        for (let i = 0; i < expensesItem.length; i++) {
            let exp = expensesItem[i].value, 
                cos = expensesItem[++i].value;
            
            if ( typeof(exp) === 'string' && typeof(exp) != null && typeof(cos) != null &&
            exp != '' && cos != '' && exp.length < 50 ) {
                console.log('Done!');
                appData.expenses[exp] = cos;
                sum += +cos;
            } else {
                console.log('Inserted incorrect value');
                alert('Не верно ввели значение. Будьте внимательней!');
                i--; // i = i-1;
            }
        }
        expensesValue.textContent = sum;
    });
    
    // Функция для определения не объязательных расходов
    optionalExpensesBtn.addEventListener('click', function() {
        for (let i = 0; i < optionalExpensesItem.length; i++) {
            let opt = optionalExpensesItem[i].value;
            appData.optionalExpenses[i] = opt;
            console.log('Done!');
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
        }
    });

    //  Функция расчета ежедневного бюджета. Использовал метод Math.round для округления вместо toFixed()
    countBtn.addEventListener('click', function(){
        if(appData.budget != undefined) {
            appData.moneyPerDay = Math.round(appData.budget / 30);
            dayBudgetValue.textContent = appData.moneyPerDay + " грн";
            // Функция достатка
            if (appData.moneyPerDay < 100 ) {
                levelVlue.textContent = 'У Вас минимальный уровень достатка';
                } else if (appData.moneyPerDay < 500) {
                levelVlue.textContent = 'Средний уровень достатка';
                } else if (appData.moneyPerDay > 500) {
                levelVlue.textContent = 'У Вас высокий уровень достатка';
                } else {
                levelVlue.textContent = 'Что-то пошло не так, произошла ошибка';
                }
        } else {
            dayBudgetValue.textContent = 'Произошла ошибка';
            alert('Начните c зеленой кнопки "Начать расчет"!');
        }
    });

	incomeItem.addEventListener('change', function(){
        let items = incomeItem.value;
            appData.income = items.split(',');
            incomeValue.textContent = appData.income;
    });

    checkSavings.addEventListener('click', function(){
        if (appData.savings == true){
            appData.savings = false;
        } else {
            appData.savings = true;
        }
    });

    sumValue.addEventListener('input', function() {
        if(appData.savings == true) {
            let sum = +sumValue.value,
                percent = +percentValue.value;
            
            appData.monthIncome = Math.round(sum/100/12*percent);
            appData.yearIncome = Math.round(sum/100*percent);
            
            monthSavingsValue.textContent = appData.monthIncome + " грн";
            yearSavingsValue.textContent = appData.yearIncome + " грн";
            
        }
    });

    percentValue.addEventListener('input', function() {
        if(appData.savings == true) {
            let sum = +sumValue.value,
                percent = +percentValue.value;
           
            appData.monthIncome = Math.round(sum/100/12*percent);
            appData.yearIncome = Math.round(sum/100*percent);
            
            monthSavingsValue.textContent = appData.monthIncome + " грн";
            yearSavingsValue.textContent = appData.yearIncome + " грн";

        }
    });


    let appData = {
        budget : money,
        timeData : time,
        expenses : {},
        optionalExpenses : {},
        income : [],
        savings : false,
    
               
        // chooseIncome: function() {
            
        //         let items = prompt('Что приносит допонительный доход? ( Печерислите через запятую )', '');
                
        //         if ( typeof(items) != 'string' || typeof(items) == null || typeof(items) == '') {
        //             console.log('Вы ввели некорректные данные или не ввели их вовсе');
        //         } else {
        //             appData.income = items.split(',');
        //             appData.income.push(prompt('Может что-то еще?'));
        //             appData.income.sort();
        //         }
        //         appData.income.forEach (function (itemmassive, i) {
        //             alert("Способы доп. заработка: " + (i+1) + " - " + itemmassive);
        //         });
        // }
    };
    
    // for (let key in appData) {
    //     console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
    // }
    