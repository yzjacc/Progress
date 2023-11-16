class ImageBox extends HTMLElement { 
  constructor() {
    super();
    this.render();
  }
  render() { 
    const url = this.getAttribute("url");
    const title = this.getAttribute("title");
    const price = this.getAttribute("price");

    this.attachShadow({ mode: "open" });
    const imageBoxTemplate = document.getElementById("image-box-template");
    const imageBoxContent = imageBoxTemplate.content.cloneNode(true);

    //填入属性获取到的内容
    imageBoxContent.querySelector("img").setAttribute("src", url);
    imageBoxContent.querySelector("div.title").innerText = title;
    imageBoxContent.querySelector("div.price").innerText = `￥${price}`;

    //按钮事件
    imageBoxContent.querySelector("div.action").addEventListener("click", e => { 
      e.preventDefault();
      if (e.target.classList.contains('primary')) {
        alert("加入购物车成功");
      }
      else { 
        alert("直接购买成功");
      }
    })

    this.shadowRoot.appendChild(imageBoxContent);
  }
}
window.customElements.define('image-box', ImageBox);