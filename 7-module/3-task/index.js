export default class StepSlider {
  constructor({
    steps,
    value = 0
  }) {
    this.elem = document.createElement('div');
    this.elem.classList.add("slider");
    this.render(this.elem, steps, value);
    this.elem.addEventListener('click', (event) => this.onClick(event, steps));
  }
  render(elem, steps, value) {
    let list = [];
    for (let elememt = 0; elememt < steps - 1; elememt++) {
      list.push('<span></span>');

    };
    list = list.join("");
    elem.innerHTML = `
    <!--Заполненная часть слайдера-->
    <div class="slider__thumb">
    <span class="slider__value">${value}</span>
  </div>
    <div class="slider__progress" style="width: 0%;"></div>
    <div class="slider__steps">
    <span class="slider__step-active"></span>
        ${list}
      </div>  
    `;
  }
  onClick(event, steps) {
    let positionMuse = event.clientX,
      sliderWidth = this.elem.offsetWidth,
      left = positionMuse - this.elem.getBoundingClientRect().left,
      leftRelative = left / sliderWidth,
      segments = steps - 1,
      approximateValue = leftRelative * segments,
      value = Math.round(approximateValue),
      valuePercents = value / segments * 100,
      sliderSteps = this.elem.querySelector('.slider__steps'),
      thumb = this.elem.querySelector('.slider__thumb'),
      progress = this.elem.querySelector('.slider__progress'),
      sliderValue = this.elem.querySelector('.slider__value');
    sliderSteps = sliderSteps.querySelectorAll('span');
    sliderValue.textContent = value;
    for (let elem of sliderSteps) {
      elem.classList.remove("slider__step-active");
    }
    sliderSteps[value].classList.add("slider__step-active");
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    }));

  }
}
