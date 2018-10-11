<template>
  <div class="filter-container">
    <div>
      <div v-if="search_term['consumeTime']" class="filter_inline mr-1">
        <el-date-picker
          v-model="form.consumeTime"
          class="timePicker"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" />
      </div>
      <el-button class="filter-item ml" type="primary" @click="confirm">查询</el-button>
      <slot name="excel" />
    </div>
    <div>
      <!-- <div v-if="search_term['selectType']" class="filter_inline">
        <el-select v-model="form.selectType" placeholder="请选择" class="selerWidth" @change="clear">
          <el-option v-for="item in selectTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="form.selectString" placeholder="请输入内容" class="inputWidth" />
      </div> -->
      <div class="fr mb">
        <slot name="btn" />
      </div>
    </div>
  </div>
</template>

<script>
import { datePicker } from '@/utils/index'
export default {
  props: {
    search_term: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        // selectType: '',
        appSecret: '',
        consumeTime: []
      },
      loading: false
    }
  },
  methods: {
    confirm() {
      const item = this.form
      const dateTime = datePicker(item.search_time)
      const searchData = {
        search_begin_time: dateTime[0] || null,
        search_end_time: dateTime[1] || null
      }
      const objData = {}
      for (const i in this.search_term) {
        if (i === 'search_time') {
          objData.search_begin_time = searchData.search_begin_time
          objData.search_end_time = searchData.search_end_time
        }
      }
      this.$emit('save', objData)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .filter_inline {
    display: inline-block;
  }
  .timePicker {
    width: 400px;
  }
  .inputWidth {
    width: 150px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .le-width {
    width: 300px;
  }
  .margin3B {
    margin-bottom: 30px;
  }
  .selerWidth {
    width: 150px;
  }
</style>
