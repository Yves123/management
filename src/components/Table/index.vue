<template>
  <div>
    <el-table
      v-loading="vloading"
      :data="tabledata"
      element-loading-text="Loading..."
      border
      @select="handleSelect"
      @select-all="handleSelect">
      <slot name="header" />
      <el-table-column
        v-for="item in tablelist"
        :key="item.id"
        :label="item.lable"
        :prop="item.name"
        :width="item.width"
        align="center">
        <template slot-scope="scope">{{ scope.row[item.name] }}</template>
      </el-table-column>
      <slot name="footer" />
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tablelist: {
      type: Array,
      required: true,
      default: () => []
    },
    tabledata: {
      type: Array,
      default: () => []
    },
    vloading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loadings: ''
    }
  },
  watch: {
    vloading() {
      this.loadings = this.vloading
    }
  },
  methods: {
    handleSelect(val) {
      this.$emit('handleSelect', val)
    }
  }
}
</script>
