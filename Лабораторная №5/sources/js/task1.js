var submit = document.getElementsByClassName("submit");
class User {
    constructor(newName, newSurname, newGender, newBirthdate) {
        this.name = newName;
        this.surname = newSurname;
        this.gender = newGender;
        this.birthdate = newBirthdate;
      }
//TODO problem with name and surname setters
    set name (newName) {
        if (newName ==="") {
            alert('Input at list 1 symbol in name field');
         }
         this._name = newName;
    }
    set surname (newSurname) {
        if (newSurname==="") {
            alert('Input at list 1 symbol in surname field');
         }
         this._surname = newSurname;
    } 

    set birthdate (newBirthdate)
    {
      if (this._validate_date(newBirthdate)) {
        this._birthdate = newBirthdate;
      }
      else {
        alert("Введена некорректная дата!");
      }
    }

    /* Функция разбивает дату на составляющие (метод split()), 
    а затем выполняет проверку составляющих при помощи объекта Date и методов getFullYear(), getMonth() и getDate(). */
    // arrD[1] -= 1 Потому что у объекта Date отсчет месяцев начинается с 0.
    _validate_date(value){
        var arrD = value.split("/");
        arrD[1] -= 1;
        var d = new Date(arrD[2], arrD[1], arrD[0]);
        if ((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
          return true;
        } 
        else {
          return false;
        }
    } 
    surnameCode() {
      let letters = this._separateLetters(this._surname);
      let vowels = letters.get("vowels");
      let consonants =letters.get("consonants");
      return this._codeFromSurname(vowels,consonants);
    }

    nameCode() {
    let letters = this._separateLetters(this._name);
    let vowels = letters.get("vowels"), consonants = letters.get("consonants");
    return this._codeFromName(vowels,consonants);
    }

    _codeFromSurname(vowels,consonants)
    {
        let code = '';
        for (let i = 0, j = 0; code.length < 3;) {
            if (typeof consonants[i] !== 'undefined') {
              code += consonants[i++];
            }
            else if (typeof vowels[j] !== 'undefined') {
              code += vowels[j++];
            }
            else {
              code += "X";
            }
        }
        return code;
    }
    _codeFromName(vowels, consonants)
    {
        let code = '';
        if (consonants.length == 3)
        {
            code = consonants.slice(0,2).join('');
        }
        else if (consonants.length > 3)
        {
            code += consonants[0];
            code += consonants[2]; 
            code += consonants[3];
        }
        else if (consonants.length < 3)
        {
            for (let i = 0, j = 0; code.length < 3;) {
                if (typeof consonants[i] !== 'undefined') {
                  code += consonants[i++];
                }
                else if (typeof vowels[j] !== 'undefined') {
                  code += vowels[j++];
                }
                else {
                  code += "X";
                }
            }
        }
        return code;
    }
    // Наличие символа в массиве гласных можно проверить с помощью indexOf
    _isVowel(char) {
        return ['a', 'e', 'i', 'o', 'u'].indexOf(char.toLowerCase()) !== -1;
    }

    _separateLetters(someData){
        let vowels = [];
        let consonants = [];
    
        for (let i = 0; i < someData.length; i++) {
            // метод charAt() возвращает символ по заданному индексу внутри строки
          let char = someData.charAt(i);
          if (this._isVowel(char)) {
            vowels.push(char);
          } else {
            consonants.push(char);
          }
        }
        // Используется Map(), чтобы вернуть два массива.
        let letters = new Map();
        letters.set("vowels", vowels);
        letters.set("consonants", consonants);
        return letters;
    }
   /*  Функция parseInt(строка, основание) выполняет синтаксический разбор строки начиная с первого символа, 
    если первый символ является цифрой или знаком (- или +),
    то она переходит к обработке второго символа и так далее,
    пока не будет обнаружен символ, который не может быть преобразован в числовое значение, 
    после этого она возвращает полученное целое число */

    _parseDate(Date) {
        const parsedDate = Date.split("/").map(function (value) {
          return parseInt(value, 10);
        })
        return parsedDate;
      }

    _codeFromBirthDate() {
        const months = {
          1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "F",
          7: "G", 8: "H", 9: "I", 10: "G", 11: "K", 12: "T"
        };
        let date = this._parseDate(this._birthdate);
    
        // adding '0' to yearCode/dayCode if there is only 1 number
        let yearCode = date[2] % 100;
        yearCode = yearCode < 10 ? '0' + yearCode : yearCode;
        let dayCode = this.gender === "Female" ? date[0] + 40 : date[0];
        dayCode = dayCode < 10 ? '0' + dayCode : dayCode;
        return yearCode + months[date[1]] + dayCode;
      }
      getCode() {
        return (this.surnameCode().toUpperCase() + this.nameCode().toUpperCase()
          + this._codeFromBirthDate()).toUpperCase();
      }
}

function makeCode() {
    let user = new User(document.getElementById('field1').value, 
    document.getElementById('field2').value, 
    document.getElementById('field4').value,
    document.getElementById('bday').value);
    document.getElementById('fiscal-code').innerHTML = user.getCode(); 
}

//@@@@@@@@@@@@@@@@@@@@TASK2

function vowelLen() {
  const vowels = 'eyuioa';
  const vowelsIndex = [];
  const result = [];
  const input = document.getElementById('harsh').value;
  // const input = 'abcdefgaaaghjn';

  for (let i in input) {
    if (vowels.includes(input[i])) {
      vowelsIndex.push(i);
    }
  }

  for (let i in input) {
    if (vowelsIndex.includes(i)) {
      result.push(0);
    } else {
      let min = input.length;
      for (let vi of vowelsIndex) {
        min = Math.min(min, Math.abs(i - vi));
      }
      result.push(min);
    }
  }

 console.log(result);
 document.getElementById('length').innerHTML ="[ " + result + " ]";
}

//@@@@@@@@@@@@@@@@@@@@@@TASK3

function classifyRug()
{
  //input like aaaa,bbbb,cccc
  var  str= document.getElementById('rugInput').value;  
  var Rug=str.split(',');
    //Rug.length = 4
    //Rug[0].length = 3
  function symmetryHorizontal()
  {
    for (let i=0; i<Math.floor(Rug.length/2); i++)
    {
      if (Rug.length%2 != 0)
      {
        if(i == Math.floor(Rug.length/2))
          continue;
      }
      for (let j=0; j<Rug[0].length; j++)
      {
        if (Rug[i][j] !== Rug[Rug.length - 1 - i][j])
        {
          return false;
        }
      }
    }
    return true;
  }

  function symmetryVertical()
  {
    for (let j=0; j<Math.floor(Rug[0].length/2) ;j++)
    {
      if (Rug[0].length%2 != 0)
      {
        if(j == Math.floor(Rug[0].length/2))
          continue;
      }
      for (let i=0; i<Rug.length;i++)
      {
        if (Rug[i][j] !== Rug[i][Rug[0].length- 1 - j])
          return false;
      }
    }
    return true;
  }

  if (symmetryHorizontal() && symmetryVertical())
    document.getElementById('rugRes').innerHTML = "perfect rug";
  else if(symmetryHorizontal())
    document.getElementById('rugRes').innerHTML ="horizontally symmetric";
  else if(symmetryVertical())
    document.getElementById('rugRes').innerHTML ="vertically symmetric";
  else  document.getElementById('rugRes').innerHTML ="imperfect";
}


