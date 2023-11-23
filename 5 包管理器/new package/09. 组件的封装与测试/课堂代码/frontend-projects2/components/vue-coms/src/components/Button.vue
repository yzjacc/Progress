<template>
    <button class="duyi-button" :class="[
        `duyi-button-${type}`,
        {
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle,
            'is-disabled': disabled,
        }
    ]" :disabled="disabled" @click="btnClick">
        <i v-if="icon" :class="`duyi-icon-${icon}`"></i>
        <span v-if="$slots.default">
            <slot></slot>
        </span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "duyi-button",
    props: {
        type: {
            type: String,
            default: "default"
        },
        plain: {
            type: Boolean,
            default: false
        },
        round: {
            type: Boolean,
            default: false,
        },
        circle: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
            default: ""
        }
    },
    emits: ["click"],
    methods : {
        btnClick(){
            // 触发父组件传递过来的 click 事件
            this.$emit("click");
        }
    }
});
</script>

<style scoped lang="scss">
.duyi-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #ffffff;
    border: 1px solid #dcdfe6;
    color: #606266;
    appearance: none;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    //禁止元素的文字被选中
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;

    &:hover,
    &:hover {
        color: #409eff;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
    }
}

.duyi-button-primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;

    &:hover,
    &:focus {
        background: #66b1ff;
        background-color: #66b1ff;
        color: #fff;
    }
}

.duyi-button-success {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;

    &:hover,
    &:focus {
        background: #85ce61;
        background-color: #85ce61;
        color: #fff;
    }
}

.duyi-button-info {
    color: #fff;
    background-color: #909399;
    border-color: #909399;

    &:hover,
    &:focus {
        background: #a6a9ad;
        background-color: #a6a9ad;
        color: #fff;
    }
}

.duyi-button-warning {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;

    &:hover,
    &:focus {
        background: #ebb563;
        background-color: #ebb563;
        color: #fff;
    }
}

.duyi-button-danger {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;

    &:hover,
    &:focus {
        background: #f78989;
        background-color: #f78989;
        color: #fff;
    }
}

// 朴素按钮样式
.duyi-button.is-plain {

    &:hover,
    &:focus {
        background: #fff;
        border-color: #489eff;
        color: #409eff;
    }
}

.duyi-button-primary.is-plain {
    color: #409eff;
    background: #ecf5ff;

    &:hover,
    &:focus {
        background: #409eff;
        border-color: #409eff;
        color: #fff;
    }
}

.duyi-button-success.is-plain {
    color: #67c23a;
    background: #c2e7b0;

    &:hover,
    &:focus {
        background: #67c23a;
        border-color: #67c23a;
        color: #fff;
    }
}

.duyi-button-info.is-plain {
    color: #909399;
    background: #d3d4d6;

    &:hover,
    &:focus {
        background: #909399;
        border-color: #909399;
        color: #fff;
    }
}

.duyi-button-warning.is-plain {
    color: #e6a23c;
    background: #f5dab1;

    &:hover,
    &:focus {
        background: #e6a23c;
        border-color: #e6a23c;
        color: #fff;
    }
}

.duyi-button-danger.is-plain {
    color: #f56c6c;
    background: #fbc4c4;

    &:hover,
    &:focus {
        background: #f56c6c;
        border-color: #f56c6c;
        color: #fff;
    }
}


.duyi-button.is-round {
    border-radius: 20px;
    padding: 12px 23px;
}

.duyi-button.is-circle {
    border-radius: 50%;
    padding: 12px;
}

// 禁用
.duyi-button.is-disabled,
.duyi-button.is-disabled:focus,
.duyi-button.is-disabled:hover {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
}

.duyi-button.is-disabled,
.duyi-button.is-disabled:focus,
.duyi-button.is-disabled:hover {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
}

.duyi-button--primary.is-disabled,
.duyi-button--primary.is-disabled:active,
.duyi-button--primary.is-disabled:focus,
.duyi-button--primary.is-disabled:hover {
    color: #fff;
    background-color: #a0cfff;
    border-color: #a0cfff;
}

.duyi-button--success.is-disabled,
.duyi-button--success.is-disabled:active,
.duyi-button--success.is-disabled:focus,
.duyi-button--success.is-disabled:hover {
    color: #fff;
    background-color: #b3e19d;
    border-color: #b3e19d;
}

.duyi-button--info.is-disabled,
.duyi-button--info.is-disabled:active,
.duyi-button--info.is-disabled:focus,
.duyi-button--info.is-disabled:hover {
    color: #fff;
    background-color: #c8c9cc;
    border-color: #c8c9cc;
}

.duyi-button--warning.is-disabled,
.duyi-button--warning.is-disabled:active,
.duyi-button--warning.is-disabled:focus,
.duyi-button--warning.is-disabled:hover {
    color: #fff;
    background-color: #f3d19e;
    border-color: #f3d19e;
}

.duyi-button--danger.is-disabled,
.duyi-button--danger.is-disabled:active,
.duyi-button--danger.is-disabled:focus,
.duyi-button--danger.is-disabled:hover {
    color: #fff;
    background-color: #fab6b6;
    border-color: #fab6b6;
}
</style>