<template>
  <div class="app-container">
    <!-- 查询条件 -->
    <search :search_term="search_term" class="mb-2" @save="save">
      <template slot="excel">
        <downloadExecl :tabledata="list" :tablelist="tablelist" :execl_name="execl_name" />
      </template>
    </search>
    <!-- 表格数据列表查看 -->
    <vtable :vloading="listLoading" :tabledata="list" :tablelist="tablelist">
      <template slot="header">
        <template slot="header">
          <el-table-column type="index" label="序号" width="50" align="center" />
        </template>
      </template>
    </vtable>
    <!-- 分页导航栏 -->
    <el-pagination
      :page-sizes="pageSizes"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="totals"
      layout="total, sizes, prev, pager, next, jumper"
      class="pagination"
      @size-change="sizeChange"
      @current-change="currentChange"/>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import downloadExecl from '@/components/Download'
import search from '@/components/Search'
import vtable from '@/components/Table/index'
import globle_ from '@/utils/globle.js'

export default {
  components: { vtable, search, downloadExecl },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 搜索查询条件控制
      search_term: {
        consumeTime: true
      },
      execl_name: '财务详情列表',
      list: null,
      listLoading: true,
      tablelist: globle_.table_list,
      pagination: { page: 1, size: 10 },
      // 分页使用的参数
      pageSizes: globle_.pageSizes,
      pageSize: globle_.pageSize,
      totals: 100,
      currentPage: 1
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    save(item) {
      this.form = Object.assign({}, item)
      if (item) {
        this.pagination = { page: 1, size: 10 }
        this.currentPage = 1
      }
    },
    // 分页操作
    sizeChange(size) {
      this.pagination.size = size
    },
    currentChange(page) {
      this.pagination.page = page
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scopexd>

</style>
