const template = `
<div class="data">
<div class="poster">
<img :src="data.poster" alt=""></div> 
<div class="words">
<h2 class="title">
<router-link :to="'/movie/'+data._id">{{data.name}}</router-link>
</h2> 
<div class="attach">
<span>英文名：{{data.ename}}</span> 
<span>类型：{{data.type}}</span> <br> 
<span>上映地区：{{data.area}}</span> 
<span>上映时间：{{data.upDate}}</span> 
<span>时长：{{data.time}}</span>
</div> 
<div class="desc">
{{data.intro}}
</div></div>
</div>
`;

export default {
    template,
    props: ["data"]
}