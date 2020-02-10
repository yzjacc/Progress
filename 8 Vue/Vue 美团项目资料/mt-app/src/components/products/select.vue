<template>
    <div class="m-product-select">
        <dl class="tab">
            <dt>
                {{name}}
                <i class="el-icon-caret-bottom"></i>
            </dt>
            <dd>
                <dt class="select-title">{{name}}</dt>
                <span v-for="(item, index) in list" :key="index">{{item.name}}</span>
            </dd>
        </dl>
    </div>
</template>
<script>
export default {
    props: [
        "name",
        "list"
    ]
}
</script>

