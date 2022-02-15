(() => {
  const init = () => {
    initEvent();
  }

  const initEvent = () => {
    document.querySelectorAll('.money-list-item').forEach(node => {
      node.addEventListener('click', onMoneyListClick)
    })
    payBtn.addEventListener('click', onPayBtnClick)
  }

  const onPayBtnClick = () => {
    /* TODOS 表单验证 */
    window.open(`/alipay/${inputNode.value}`);
  }

  const onMoneyListClick = function () {
    const money = this.innerHTML;
    inputNode.value = money;
  }

  init();
})()