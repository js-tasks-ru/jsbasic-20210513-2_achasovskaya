export default class StepSlider {
  constructor({
    steps,
    value = 0
  }) {
    // объявили переменные глобально для класса
    this.value = value;
    this.steps = steps;
    this.segments = steps - 1;
    // отрисовали карусель 
    this.elem = document.createElement('div');
    this.elem.classList.add("slider");
    this.render();
    //выключили встроенные браузерный Drag-andDrop
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    // прописываем  действие при движении
    thumb.onpointerdown = this.onClickDown;
    //прописываем действие на клике 
    this.elem.onclick = this.onClick;

  }
  render() {
    let list = [];
    for (let elememt = 0; elememt < this.segments; elememt++) {
      list.push('<span></span>');

    };
    list = list.join("");
    this.elem.innerHTML = `
    <!--Заполненная часть слайдера-->
    <div class="slider__thumb">
    <span class="slider__value">${this.value}</span>
  </div>
    <div class="slider__progress" style="width: 0%;"></div>
    <div class="slider__steps">
    <span class="slider__step-active"></span>
        ${list}
      </div>  
    `;
  }
  UpdateSlider(leftPercents) {
    this.elem.querySelector('.slider__thumb').style.left = `${leftPercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${leftPercents}%`;
  }
  onClickDown = event => {
    // удалили дейсвтие по умолчанию
    event.preventDefault();
    // навесили класс
    this.elem.classList.add("slider_dragging");
    // запустили событие включения и отключения
    document.addEventListener('pointermove', this.onClickMove);
    document.addEventListener('pointerup', this.onClickUp);
  }
  // движение курсора
  onClickMove = event => {
    // удалили дейсвтие по умолчанию
    event.preventDefault();

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) {
      leftRelative = 0;
    }
    if (leftRelative > 1) {
      leftRelative = 1;
    }
    let leftPercents = leftRelative * 100;
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    let approximateValue = leftRelative * this.segments;
    this.value = Math.round(approximateValue);
    let sliderSteps = this.elem.querySelector('.slider__steps');
    let sliderValue = this.elem.querySelector('.slider__value');
    sliderSteps = sliderSteps.querySelectorAll('span');
    sliderValue.innerHTML = this.value;
    for (let elem of sliderSteps) {
      elem.classList.remove("slider__step-active");
    }
    sliderSteps[this.value].classList.add("slider__step-active");


  }
  onClickUp = event => {
    // убрали действия
    document.removeEventListener('pointermove', this.onClickMove);
    document.removeEventListener('pointerup', this.onClickUp);
    // убрали класс
    this.elem.classList.remove("slider_dragging");

    // вернули  к ближнему значению

    let leftPercents = (this.value / this.segments) * 100;
    this.UpdateSlider(leftPercents);

    // сгенерировали событие
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }


  onClick = event => {
    // повторно заполняем значения при нажатии -  задаем ширину и перемещение ползунка окончательное 
    let left = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
    this.value = Math.round(this.segments * left);
    let leftPercents = (this.value / this.segments) * 100;
    this.UpdateSlider(leftPercents);

    this.elem.querySelector('.slider__value').innerHTML = this.value;
    if (this.elem.querySelector('.slider__step-active')) {
      this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    }
    this.elem.querySelector('.slider__steps').children[this.value].classList.add('slider__step-active');
    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }

}
