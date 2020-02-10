const template = `
<div>
    {{html}}
</div>
`;

const config = {
    template,
    data: {
        html:"<p>带标签的内容</p>"
    },
    el: "#app"
}

var app = new Vue(config)