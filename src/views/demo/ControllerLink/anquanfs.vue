<!-- 安全服务 -->
<template>
  <d2-container>
      <el-table :data="t_security_services" border>
        <el-table-column label="" width="80">
          <template slot-scope="scope">
            <div class="itsz"></div>
            <span v-show="!scope.row.show">{{scope.$index + 1}}</span>
          </template>
        </el-table-column>

        <el-table-column label="安全服务名称" width="450">
          <template slot-scope="scope">
            <div @click="is_compile(scope.row,scope.$index,'services_name')" class="itsz"></div>
            <el-input
              :ref='"services_name"+scope.$index'
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.services_name"
            ></el-input>
            <span v-show="!scope.row.show">{{scope.row.services_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="安全服务商" width="450">
          <template slot-scope="scope">
            <div @click="is_compile(scope.row,scope.$index,'service_provider')" class="itsz"></div>
            <el-input :ref='"service_provider"+scope.$index' @blur="schujiaodian(scope.row)" placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.service_provider"></el-input>
            <span v-show="!scope.row.show">{{scope.row.service_provider}}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="is_compile(scope.row)">编辑</el-button> -->
            <el-button size="mini" @click="is_preserve(scope.$index)">新增</el-button>
            <el-button size="mini" type="danger" @click="deleteRow(scope.$index, t_security_services)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </d2-container>
</template>

<script>
export default {
  data(){
    return{  
    t_security_services:[]
    }
  },
  created() {
    let list = [
      {
        services_name: "网站系统维护",
        service_provider: "易宝系统(中国)有限公司",
      },
      {
        services_name: "安全维护",
        service_provider: "北京天融信网络安全技术有限公司",
      },
    ];
    list.forEach((element) => {
      element["show"] = false;
    });
    this.t_security_services = list;
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
      var itss=this.t_security_services;
      var list =  {
        services_name: "",
        service_provider: "",
        show:false
      };
      itss.splice(item+1, 0, list);
     this.t_security_services = itss;
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