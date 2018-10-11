<template>
  <el-button class="filter-item ml" type="primary" icon="el-icon-download" @click="handleDownload">导出excel</el-button>
</template>

<script>
import { downloadExcel } from '@/utils/index'

export default {
  props: {
    execl_name: {
      type: String,
      required: true,
      default: ''
    },
    tabledata: {
      type: Array,
      default: () => []
    },
    tablelist: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    downloadData() {
      return this.tabledata.slice()
    }
  },
  methods: {
    handleDownload() { // 调用excle导出的功能
      if (!this.downloadData.length) {
        this.$message({ message: '暂无数据可以导出', type: 'error' })
        return
      }
      const objData = {
        eName: this.execl_name,
        edata: this.tablelist,
        tableData: this.downloadData
      }
      // 调用表格下载
      downloadExcel(objData)
    }
  }
}
</script>
