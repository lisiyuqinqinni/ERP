<template>
  <div>
    <search
    :results="results"
    v-model="value"
    position="absolute"
    auto-scroll-to-top 
    @on-focus="onFocus"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    ref="search">
  </search>
  </div>
</template>
<script>
import { Search, Group, Cell, XButton } from 'vux'

export default {
  components: {
    Search,
    Group,
    Cell,
    XButton
  },
  methods: {
    // resultClick (item) {
    //   window.alert('you click the result item: ' + JSON.stringify(item))
    // },
    // getResult (val) {
    //   this.results = val ? getResult(this.value) : []
    // },
    onSubmit () {
      this.$emit('search',this.value)
      this.$refs.search.setBlur()
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    }
  },
  data () {
    return {
      results: [],
      value: ''
    }
  }
}

// function getResult (val) {
//   let rs = []
//   for (let i = 0; i < 20; i++) {
//     rs.push({
//       title: `${val} result: ${i + 1} `,
//       other: i
//     })
//   }
//   return rs
// }
</script>
