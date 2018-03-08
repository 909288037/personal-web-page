<template>
  <div class="addItem">
    <div class="container-fluid">
      <div class="row amend">
        <div>
          <label for="itemName">项目名称:</label>
          <input type="text" v-model="itemName" id="itemName" value="itemName">
        </div>
        <div>
          <label for="itemInfo">项目简介:</label>
          <input type="text" v-model="itemInfo" id="itemInfo" value="itemInfo">
        </div>
        <div>
          <label for="itemUrl">项目地址:</label>
          <input type="text" v-model="itemUrl" id="itemUrl" value="itemUrl">
        </div>
        <div>
          <label for="itemImg">项目图片:</label>
          <input type="text" v-model="itemImg" id="itemImg" value="itemImg">
        </div>
        <div>
          <label for="itemPosition">项目样式:</label>
          <input type="text" v-model="itemPosition" id="itemPosition" value="itemPosition">
        </div>
        <button type="button" @click="addItem">添加</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "add-item",
    data() {
      return {
        itemName: '',
        itemInfo: '',
        itemUrl: '',
        itemImg: '',
        itemPosition: '',
      }
    },
    methods: {
      //  添加项目
      addItem() {
        let item = {
          itemName: this.itemName,
          itemInfo: this.itemInfo,
          itemUrl: this.itemUrl,
          itemPosition: this.itemPosition,
          itemImg: this.itemImg,
        }
        if (confirm("确定增加吗?")) {
          axios.post('/items/addItem', item).then((response) => {
            let res = response.data;
            if (res.status == 0) {
              alert(res.msg);
              this.$router.push('/cms/amendItems')
            }
          })
        }
      }
    },
    components: {
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/css/index";

</style>
