import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = document.createElement('div');
    this.elem.classList.add("modal");
    this.render();
    let buttonDelete = this.elem.querySelectorAll('.modal__close')[0];
    buttonDelete.addEventListener('click', (event) => this.onClick(event));
    document.body.onkeyup = function (event) {
      if (event.code === 'Escape') {
        document.body.classList.remove("is-modal-open");
        let container = document.body.querySelector('.modal');
        container.remove();
      }
    };
  }
  render() {
    this.elem.innerHTML = `
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
      </div>
      <div class="modal__body"></div>
    </div>`;
  }
  open() {
    document.body.classList.add("is-modal-open");
    document.body.append(this.elem);
  }
  setTitle(heading) {
    let title = this.elem.querySelector('.modal__title');
    title.innerText = heading;
  }
  setBody(node) {
    let body = this.elem.querySelector('.modal__body');
    body.innerHTML = "";
    body.append(node);
  }
  close() {
    document.body.classList.remove("is-modal-open");
    let container = document.body.querySelector('.modal');
    container.remove();
  }
  onClick(event) {
    document.body.classList.remove("is-modal-open");
    let container = document.body.querySelector('.modal');
    container.remove();
  }
}
