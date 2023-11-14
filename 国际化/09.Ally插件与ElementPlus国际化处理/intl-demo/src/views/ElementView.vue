<template>
  <el-radio-group v-model="size" label="size control" size="small">
    <el-radio-button label="large">{{ $t('element.large') }}</el-radio-button>
    <el-radio-button label="default">{{ $t('element.default') }}</el-radio-button>
    <el-radio-button label="small">{{ $t('element.small') }}</el-radio-button>
  </el-radio-group>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">{{ $t('element.default') }}</span>
      <el-date-picker
        v-model="value1"
        type="date"
        :placeholder="$t('element.pick_a_day')"
        :size="size"
      />
    </div>
    <div class="block">
      <span class="demonstration">{{ $t("element.quick_select") }}</span>
      <el-date-picker
        v-model="value2"
        type="date"
        :placeholder="$t('element.pick_a_day')"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
        :size="size"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const size = ref<'default' | 'large' | 'small'>('default')

const value1 = ref('')
const value2 = ref('')

const shortcuts = [
  {
    text: t('element.today'),
    value: new Date(),
  },
  {
    text: t('element.yesterday'),
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: t('element.last_week'),
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}
</script>

<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
