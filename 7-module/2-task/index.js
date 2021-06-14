import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    let modal = new Modal();
    modal.setTitle('Заголовок модального окна');
    modal.open();
    let modalBody = document.createElement('div');
    modalBody.innerHTML = `<b>тут содержится тело модального окна<b/>`

    modal.setBody(modalBody);
  }

}
