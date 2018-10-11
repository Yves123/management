const table_list = [
  // { lable: 'ID', name: 'id' },
  { lable: 'Title', name: 'title', width: 500 },
  { lable: 'Author', name: 'author' },
  { lable: 'Pageviews', name: 'pageviews' },
  { lable: 'Status', name: 'status' },
  { lable: 'Display_time', name: 'display_time', width: 180 }
]

// 分页的公用参数设置
const pageSizes = [10, 15, 20, 25]
const pageSize = 50

export default {
  table_list,
  pageSizes,
  pageSize
}
