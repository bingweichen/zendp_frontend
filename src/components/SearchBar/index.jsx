import React from 'react'
import { Input } from 'antd'
import { history } from 'umi'

// import './style.less'

const { Search } = Input

export const SearchBar = (props) => {
  const {category_name = '全部'} = props
  return <Search placeholder="输入你要搜索的条目"
                 style={{ width: '800px' }}
                 onSearch={(value) => {
                   history.push({
                     pathname: 'searchObject',
                     query: { q: value, category_name },
                   })
                 }}
                 enterButton/>
}

