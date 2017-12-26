<template>
  <div class="menu">
	<x-header title="保洁/维修" :left-options="{showBack:true}" slot="header" class="header"></x-header>
	<group title="请选择项目"> 
		<cell title="保洁" link="/cleaning"></cell>
		<cell title="维修" link="/repair"></cell>
	</group>
  </div>
</template>

<script>
import {XHeader, Cell, Group} from 'vux'
export default {
  name: 'menu',
  components: {
  	XHeader,
    Cell,
    Group
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
