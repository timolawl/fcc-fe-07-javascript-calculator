// FCC - Build a Javascript Calculator
// User Story: I can add, subtract, multiply and divide two numbers.
// User Story: I can clear the input field with a clear button.
// User Story: I can keep chaining mathematical operations together until I hit the equal button, and the calculator will tell me the correct output.

// Wrap everything in an IIFE

!function() {

  function add(a, b) {
    return Number(a) + Number(b);
  }

  function subtract(a, b) {
    return a - b;
  }

  function multiply(a, b) {
    return a * b;
  }

  function divide(a, b) {
    return a / b;
  }

  function modulo(a, b) {
    return Number(a) % Number(b);
  }

  // Number pair and operator evaluation function
  function evaluate(numbers, op) {
    if(op === '+')
      return numbers.reduce(add);
    else if(op === '-')
      return numbers.reduce (subtract);
    else if(op === '*')
      return numbers.reduce(multiply);
    else if(op === '/')
      return numbers.reduce(divide);
    else if(op === '%')
      return numbers.reduce(modulo);
  }

  function calculator() {
    var expressionStr = '';
    var storedAns = '';
    var display = document.getElementById('display');

    document.body.addEventListener('keypress', function(e) {
      if(e.charCode) {
        switch(e.charCode) {
      //    case 46: expressionStr = ''; break; // Delete key
       //   case 8: expressionStr = expressionStr.substr(0, expressionStr.length - 1); break; // Backspace key
          // no module % key...
          case 47:  expressionStr += '/';
                    e.preventDefault(); // Need this to prevent the browser find shortcut.
                    break;
          case 55: expressionStr += '7'; break;
          case 56: expressionStr += '8'; break;
          case 57: expressionStr += '9'; break;
          case 42: expressionStr += '*'; break;
          case 52: expressionStr += '4'; break;
          case 53: expressionStr += '5'; break;
          case 54: expressionStr += '6'; break;
          case 45: expressionStr += '-'; break;
          case 49: expressionStr += '1'; break;
          case 50: expressionStr += '2'; break;
          case 51: expressionStr += '3'; break;
          case 43: expressionStr += '+'; break;
          case 48: expressionStr += '0'; break;
          case 46: expressionStr += '.'; break;
          // no previous answer key...
          case 61: // '=' key
              expressionStr = calculate(expressionStr, storedAns);
              storedAns = expressionStr;
              break;
        }     
      }
     display.innerHTML = expressionStr; 
    });
      
      
    document.body.addEventListener('keydown', function(e) { // Keydown instead of keyup to capture the event faster, so that the default backspace browser behavior does not trigger; instead backspace is used as it should to delete the last character.
    //    console.log(e.keyCode);
        if(e.keyCode) {
          switch(e.keyCode) {
            case 13: 
              expressionStr = calculate(expressionStr, storedAns);
              storedAns = expressionStr;
              break;
            case 8:
              e.preventDefault(); // Need this to prevent automatically returning to previous page.
              expressionStr = expressionStr.substr(0, expressionStr.length - 1);
              break;
            case 46:
              expressionStr = '';
              break;
          }
        }
      display.innerHTML = expressionStr; 
    });
      /*
      else if(e.keyCode == 13) { // Enter key
        expressionStr = calculate(expressionStr, storedAns);
        storedAns = expressionStr;
      }
      else if(e.keyCode == 8) { // Backspace key
        e.preventDefault(); // Need this to prevent automatically returning to previous page.
        expressionStr = expressionStr.substr(0, expressionStr.length - 1);
      }
      else if(e.keyCode == 46) {
        expressionStr = '';
      }
*/
     
    
    document.getElementById('inputs').addEventListener('click', function(e) {
      if(e.target) {
        
     //   document.getElementById(e.target.id).classList.remove('pressed');
    //    document.getElementById(e.target.id).classList.add('pressed');
        
        switch(e.target.id) {
          case 'AC': expressionStr = ''; break;
          case 'CE': expressionStr = expressionStr.substr(0, expressionStr.length - 1); break;
          case '%': expressionStr += '%'; break;
          case '/': expressionStr += '/'; break;
          case '7': expressionStr += '7'; break;
          case '8': expressionStr += '8'; break;
          case '9': expressionStr += '9'; break;
          case '*': expressionStr += '*'; break;  
          case '4': expressionStr += '4'; break;
          case '5': expressionStr += '5'; break;
          case '6': expressionStr += '6'; break;
          case '-': expressionStr += '-'; break;
          case '1': expressionStr += '1'; break;  
          case '2': expressionStr += '2'; break;
          case '3': expressionStr += '3'; break;
          case '+': expressionStr += '+'; break;
          case '.': expressionStr += '.'; break;
          case '0': expressionStr += '0'; break;
          case 'Ans': expressionStr += 'Ans'; break;
          case '=': expressionStr = calculate(expressionStr, storedAns);
            storedAns = expressionStr;
            break;  
        }
      display.innerHTML = expressionStr;
      }
    });
  }

  function calculate(expression, previousAnswer) {
    var numericExpression = '';
    var addSubArray = [];
    var addSubOp = [];
    var filteredOperatorArray = [];
    var multDivEvaledArray = [];

    // First replace all Ans with the previous answer in the string.
    numericExpression = expression.replace(/Ans/g, previousAnswer);

    // Then separate out the values from the operators.
    // Split the string between numbers and operators.

    // Keep in mind the unary operators.
    addSubArray = numericExpression.split(/[+-](?!\d)|\b[+-]\b/g);
    addSubOp = numericExpression.match(/[+-](?!\d)|\b[+-]\b/g);

    multDivEvaledArray = addSubArray.map(function(expStr, index, array) {
      var multDivArray = [];
      var multDivOp = [];
      multDivArray = expStr.split(/[*/%]/g);
      multDivOp = expStr.match(/[*/%]/g);

      // Speed up process if the expression doesn't have * / or %
      if(!multDivOp) {
        return expStr;
      }

      return multDivArray.reduce(function(previousVal, currentVal, currentIndex, array) {
        return evaluate([previousVal, currentVal], multDivOp[currentIndex - 1]);
      }); 
    }); 

    expression = multDivEvaledArray.reduce(function(previousVal, currentVal, currentIndex, array) {
        return evaluate([previousVal, currentVal], addSubOp[currentIndex - 1]);
    }); 

    return String(expression); // Coerce to string for backspace and CE to remove the last character.
  }

  calculator();
  
}();
