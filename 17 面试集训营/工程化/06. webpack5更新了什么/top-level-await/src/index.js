const resp = await fetch("http://www.baidu.com");
const jsonBody = await resp.json();
export default jsonBody;
