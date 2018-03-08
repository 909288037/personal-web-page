<template>
  <div class="amendItems">
    <div class="container-fluid amend" v-if="isAmend">
      <div class="row">
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
        <button type="button" @click="goAmend">修改</button>
        <button type="button" @click="isAmend = false">取消</button>
      </div>
    </div>
    <div class="container-fluid" v-else>
      <div class="row">
        <table class="table table-hover table-bordered table-striped">
          <thead>
          <tr>
            <th class="col-lg-1">编号</th>
            <th class="col-lg-2">图片</th>
            <th class="col-lg-2">图片地址</th>
            <th class="col-lg-2">项目名称</th>
            <th class="col-lg-2">项目简介</th>
            <th class="col-lg-2">项目地址</th>
            <th class="col-lg-1">项目位置</th>
            <th class="col-lg-1">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in itemList">
            <td>{{index+1}}</td>
            <td><img :src="'../../static/'+item.itemImg" alt=""></td>
            <td>{{item.itemImg}}</td>
            <td>{{item.itemName}}</td>
            <td>{{item.itemInfo}}</td>
            <td style="max-width: 200px; word-wrap:break-word"><a :href="item.itemUrl">{{item.itemUrl}}</a></td>
            <td>{{item.itemPosition}}</td>
            <td>
              <button class="btn btn-info" href="javascript:;" @click="amendItem(item.itemName)">修改</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <nav aria-label="Page navigation" class="text-right" v-show="isAmend == false">
    <ul class="pagination">
    <li>
    <a href="javascript:;" aria-label="Previous" @click="getPage(1)">
    <span aria-hidden="true">&laquo;</span>
    </a>
    </li>
    <li v-for="(item,index) in count" @click="getPage(index+1)"><a href="javascript:;">{{index+1}}</a></li>
    <li>
    <a href="javascript:;" aria-label="Next" @click="getPage(count)">
    <span aria-hidden="true">&raquo;</span>
    </a>
    </li>
    </ul>
    </nav>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "add-items",
    data() {
      return {
        isAmend: false,
        page: 1,
        pageSize: 6,
        itemList: '',
        itemName: '',
        itemInfo: '',
        itemUrl: '',
        itemImg: '',
        itemPosition: '',
        oldName: '',
        count: 0
      }
    },
    created() {
      this.getItems();
    },
    methods: {
      //  点击索引跳转
      getPage (index) {
        this.page = index;
        this.getItems();
      },
      goAmend() {
        let param = {
          oldName:this.oldName,
          itemName:this.itemName,
          itemInfo:this.itemInfo,
          itemImg:this.itemImg,
          itemPosition:this.itemPosition,
          itemUrl:this.itemUrl
        }
        if(confirm("确定修改吗?")) {
          axios.post('/items/amend',param).then((response) => {
            let res = response.data;
            if (res.status == 0) {
              alert(res.msg);
              this.isAmend = false;
            }
          })
        }

      },
      //  修改项目
      amendItem (itemName) {
        this.oldName = itemName;
        axios.get('/items',{params:{itemName:itemName}}).then((response) => {
          let res = response.data;
          if (res.status == 0) {
            this.isAmend = true;
            this.itemName = res.result.itemName;
            this.itemInfo = res.result.itemInfo;
            this.itemUrl = res.result.itemUrl;
            this.itemPosition = res.result.itemPosition;
            this.itemImg = res.result.itemImg;
          }
        })
      },
      //  获取项目
      getItems() {
        let param = {
          page: this.page,
          pageSize: this.pageSize
        }
        axios.get("/items", {params: param}).then((response) => {
          let res = response.data;
          if (res.status == 0) {
            this.itemList = res.result.list
            this.count = res.result.count
          }
        });
      }
    },
    watch: {
      isAmend() {
        this.getItems()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/css/index";
  table {
    th,td {
      text-align: center !important;
    }
    tbody {
      td {
        vertical-align: middle;
        img {
          width: 100px;
          height: 100px;
          vertical-align: middle;
        }
      }
    }
  }
</style>
