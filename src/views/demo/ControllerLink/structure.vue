<!-- 承载的业务情况 -->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">网络结构描述</div>
            <d2-quill
              style="min-height: 200px; margin-bottom: 20px"
              v-model="fromdata.network_structure_describe"
              @text-change="textChangeHandler"
            />
          </div>
          <div class="mude_text_item">
            <div class="descTItle">网络结构图</div>
            <div class="wangruo_ken">
              <div class="wangruo_img">
                <img src="./img/structure01.jpg" alt="" />
              </div>
              <div class="wangruo_updata">
                <el-button type="primary" icon="el-icon-upload"
                  >图片更新</el-button
                >
              </div>
            </div>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">系统边界表(仅方案)</div>
            <div class="wangruo_table">
              <el-table
                :data="t_sys_boundary"
                border
                :header-cell-style="{
                  'background-color': 'rgba(238, 238, 238,1.0)',
                }"
              >
                <el-table-column label="" width="80">
                  <template slot-scope="scope">
                    <div class="itsz"></div>
                    <span v-show="!scope.row.show">{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="边界名称">
                  <template slot-scope="scope">
                    <div
                      @click="is_compile(scope.row, scope.$index, 'boundary_name')"
                      class="itsz"
                    ></div>
                    <el-input
                      :ref="'boundary_name' + scope.$index"
                      @blur="schujiaodian(scope.row)"
                      v-show="scope.row.show"
                      v-model="scope.row.boundary_name"
                    ></el-input>
                    <span v-show="!scope.row.show">{{
                      scope.row.boundary_name
                    }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="接入方式">
                  <template slot-scope="scope">
                    <div
                      @click="
                        is_compile(scope.row, scope.$index, 'access_method')
                      "
                      class="itsz"
                    ></div>
                    <el-input
                      :ref="'access_method' + scope.$index"
                      @blur="schujiaodian(scope.row)"
                      placeholder="请输入内容"
                      v-show="scope.row.show"
                      v-model="scope.row.access_method"
                    ></el-input>
                    <span v-show="!scope.row.show">{{
                      scope.row.access_method
                    }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="承载主要业务应用">
                  <template slot-scope="scope">
                    <div
                      @click="is_compile(scope.row, scope.$index, 'main_business')"
                      class="itsz"
                    ></div>
                    <el-input
                      :ref="'main_business' + scope.$index"
                      @blur="schujiaodian(scope.row)"
                      placeholder="请输入内容"
                      v-show="scope.row.show"
                      v-model="scope.row.main_business"
                    ></el-input>
                    <span v-show="!scope.row.show">{{
                      scope.row.main_business
                    }}</span>
                  </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="200">
                  <template slot-scope="scope">
                    <!-- <el-button size="mini" @click="is_compile(scope.row)">编辑</el-button> -->
                    <el-button size="mini" @click="is_preserve(scope.$index)"
                      >新增</el-button
                    >
                    <el-button
                      size="mini"
                      type="danger"
                      @click="deleteRow(scope.$index, t_sys_boundary)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="tijiaobaoc">
            <el-button style="float: right" type="text">保存</el-button>
          </div>
        </el-card>
      </div>
      <!-- 图片 -->
    </div>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      fromdata: {
        network_structure_describe: "",
      },
      t_sys_boundary: [],
    };
  },
  created() {
    this.getlistdata();
  },
  methods: {
    getlistdata() {
      let list = [
        {
          boundary_name: "网站系统维护",
          access_method: "易宝系统(中国)有限公司",
          main_business: "",
        },
        {
          boundary_name: "安全维护",
          access_method: "北京天融信网络安全技术有限公司",
          main_business: "",
        },
      ];
      list.forEach((element) => {
        element["show"] = false;
      });
      this.t_sys_boundary = list;
    },
    textChangeHandler(delta, oldDelta, source) {
      // console.log(delta,oldDelta,source)
    },
    is_compile(item, index, itname) {
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
      var itss = this.t_sys_boundary;
      var list = {
        boundary_name: "",
        access_method: "",
        main_business: "",
        show: false,
      };
      itss.splice(item + 1, 0, list);
      this.t_sys_boundary = itss;
      // console.log();
    },
    deleteRow(index, rows) {
      console.log(index, rows);
      rows.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
.mude_is {
  margin: 20px 0;
  .mude_is_left {
    margin: 20px 0;
  }
  .to_tim {
    margin-top: 5px;
    .el-tag {
      margin-right: 5px;
    }
  }
  .descTItle {
    @extend %unable-border-left;
  }
  .wangruo_ken {
    display: flex;
    align-items: center;
    .wangruo_img {
      width: 800px;
      img {
        width: 100%;
      }
    }
  }
}
.el-card__header {
  border-bottom: 0px solid #ebeef5;
}
</style>