<!-- 安全服务 -->
<template>
  <d2-container>
    
      <el-table :data="tabledatas" border>
        <el-table-column label="" width="80">
          <template slot-scope="scope">
            <div class="itsz"></div>
            <span v-show="!scope.row.show">{{scope.$index + 1}}</span>
          </template>
        </el-table-column>

        <el-table-column label="安全服务名称" width="450">
          <template slot-scope="scope">
            <div @click="is_compile(scope.row,scope.$index,'serverName')" class="itsz"></div>
            <el-input
              :ref='"serverName"+scope.$index'
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.serverName"
            ></el-input>
            <span v-show="!scope.row.show">{{scope.row.serverName}}</span>
          </template>
        </el-table-column>

        <el-table-column label="安全服务商" width="450">
          <template slot-scope="scope">
            <div @click="is_compile(scope.row,scope.$index,'serverBussiness')" class="itsz"></div>
            <el-input :ref='"serverBussiness"+scope.$index' @blur="schujiaodian(scope.row)" placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.serverBussiness"></el-input>
            <span v-show="!scope.row.show">{{scope.row.serverBussiness}}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="is_compile(scope.row)">编辑</el-button> -->
            <el-button size="mini" @click="is_preserve(scope.$index)">新增</el-button>
            <el-button size="mini" type="danger" @click="deleteRow(scope.$index, tabledatas)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </d2-container>
</template>

<script>
export default {
  data(){
    return{
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
          }, {
            date: '2016-05-04',
            name: '王小虎',
          }, {
            date: '2016-05-01',
            name: '王小虎',
          }, {
            date: '2016-05-03',
            name: '王小虎',
        }]
    }
    tabledatas:[]
  },
  created() {
    // 设备名称	虚拟设备	系统及版本	品牌及型号	用途	备注	数量	重要程度	测评指导书	测评对象
    let list = [
      {
        serverName: "网站系统维护",
        serverBussiness: "易宝系统(中国)有限公司",
      },
      {
        serverName: "安全维护",
        serverBussiness: "北京天融信网络安全技术有限公司",
      },
    ];
    list.forEach((element) => {
      element["show"] = false;
    });
    this.tabledatas = list;
    // })
  },
  methods: {
    is_compile(item,index,itname) {
      // console.log(item,index,itname)
      item.show = true;
      console.log(itname);
      setTimeout(() => {
        this.$refs[itname + index].focus();
      }, 1);
      console.log(item);
    },
    schujiaodian(item) {
      item.show = false;
      console.log(item);
    },
    is_preserve(item) {
      var itss=this.tabledatas;
      var list =  {
        serverName: "",
        serverBussiness: "",
        show:false
      };
      itss.splice(item+1, 0, list);
     this.tabledatas = itss;
      // console.log();
    },
    deleteRow(index, rows) {
      console.log(index, rows);
      rows.splice(index, 1);
    },
  },
}
</script>

<style lang="scss">
  .form{
    .el-table th>.cell{
      text-align:center;
    }
    .el-table--enable-row-transition .el-table__body td{
      text-align:center;
    }
  }
  .itsz {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .el-table td, .el-table th.is-leaf{
    text-align:center;
  }
</style>