let calculator = {
  NumberOne: 0,
  NumberTwo: 0,
  read(a, b) { // то же самое, что и "sayHi: function()"
    this.NumberOne = a;
    this.NumberTwo = b;
  },
  sum() {
    return this.NumberOne + this.NumberTwo;
  },
  mul() {
    return this.NumberOne * this.NumberTwo;
  }

};
// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально


