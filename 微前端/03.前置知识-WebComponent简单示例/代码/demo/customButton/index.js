class MyButton extends HTMLButtonElement { 
  constructor() { 
    //必须加上super(),否则this无法指向button
    super();
    this.addEventListener('click', () => { 
      alert("hello my button");
    })
  }
}
//参数1：自定义元素的名称
//参数2：自定义元素构造器
//参数3：可选，继承的元素
window.customElements.define('my-button', MyButton, {extends:'button'});