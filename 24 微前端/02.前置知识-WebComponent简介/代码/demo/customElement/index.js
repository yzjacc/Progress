class CustomButton extends HTMLElement {
  constructor() {
    super();
    // this.innerHTML = `<button>hello custom button</button>`;
    //获取属性
    const name = this.getAttribute("name");
    const url = this.getAttribute("url");
    const value = this.getAttribute("value");

    //原生DOM创建节点
    const btn = document.createElement("button");
    btn.innerText = "hello custom button!!" + value;
    btn.addEventListener("click", () => {
      alert("hello custom button");
      console.log(name, url, value);
      this.setAttribute("name", "hello");
      this.setAttribute("url", "https://www.163.com");
      this.setAttribute("value", 100);
    });
    //this.appendChild(btn);

    //获取template
    const templateEle = document.getElementById("app-template");
    //克隆template节点
    const cloneEle = templateEle.content.cloneNode(true);
    cloneEle.querySelector("input[type='text']").value = `￥${value}`;

    //创建shadowDOM
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        button{
          color:red;
        }
      </style>
    `;

    this.shadowRoot.appendChild(btn);
    this.shadowRoot.appendChild(cloneEle);
  }

  connectedCallback() {
    console.log("connectedCallback");
  }
  disconnectedCallback() {
    console.log("disconnectedCallback");
  }
  adoptedCallback() {
    console.log("adoptedCallback");
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attribute", name, oldValue, newValue);
  }

  static get observedAttributes() {
    return ["name", "url", "value"];
  }
}

window.customElements.define("custom-button", CustomButton);
