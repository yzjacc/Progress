const template = `
<div class="data" style="border:1px dotted; padding: 20px;">
<div class="poster">
    <img :src="data.poster" alt="">
</div>
<div class="words">
    <h2 class="title">{{data.name}}</h2>
    <div class="attach">
        <span>英文名：{{data.ename}}</span>
        <span>类型：{{data.type}}</span>
        <br>
        <span>上映地区：{{data.area}}</span>
        <span>上映时间：{{data.upDate}}</span>
        <span>时长：{{data.time}}</span>
    </div>
    <div class="desc">
        {{data.intro}}
    </div>
</div>
</div>
`;

export default {
    props: ["data"],
    template
}