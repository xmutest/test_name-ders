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
              v-model="jrdPoint"
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
              <el-table :data="tabledatas" border :header-cell-style="{'background-color': 'rgba(238, 238, 238,1.0)'}">
                <el-table-column label="" width="80">
                  <template slot-scope="scope">
                    <div class="itsz"></div>
                    <span v-show="!scope.row.show">{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="边界名称">
                  <template slot-scope="scope">
                    <div
                      @click="is_compile(scope.row, scope.$index, 'serverName')"
                      class="itsz"
                    ></div>
                    <el-input
                      :ref="'serverName' + scope.$index"
                      @blur="schujiaodian(scope.row)"
                      v-show="scope.row.show"
                      v-model="scope.row.serverName"
                    ></el-input>
                    <span v-show="!scope.row.show">{{
                      scope.row.serverName
                    }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="接入方式">
                  <template slot-scope="scope">
                    <div
                      @click="
                        is_compile(scope.row, scope.$index, 'serverBussiness')
                      "
                      class="itsz"
                    ></div>
                    <el-input
                      :ref="'serverBussiness' + scope.$index"
                      @blur="schujiaodian(scope.row)"
                      placeholder="请输入内容"
                      v-show="scope.row.show"
                      v-model="scope.row.serverBussiness"
                    ></el-input>
                    <span v-show="!scope.row.show">{{
                      scope.row.serverBussiness
                    }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="承载主要业务应用">
                  <template slot-scope="scope">
                    <div
                      @click="is_compile(scope.row, scope.$index, 'wangluyiny')"
                      class="itsz"
                    ></div>
                    <el-input
                      :ref="'wangluyiny' + scope.$index"
                      @blur="schujiaodian(scope.row)"
                      placeholder="请输入内容"
                      v-show="scope.row.show"
                      v-model="scope.row.wangluyiny"
                    ></el-input>
                    <span v-show="!scope.row.show">{{
                      scope.row.wangluyiny
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
                      @click="deleteRow(scope.$index, tabledatas)"
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
      jrdPoint: "",
      qianc_ko: "",
      tabledatas: [],
    };
  },
  created() {
    this.getlistdata();
  },
  methods: {
    getlistdata() {
      let list = [
        {
          serverName: "网站系统维护",
          serverBussiness: "易宝系统(中国)有限公司",
          wangluyiny: "",
        },
        {
          serverName: "安全维护",
          serverBussiness: "北京天融信网络安全技术有限公司",
          wangluyiny: "",
        },
      ];
      list.forEach((element) => {
        element["show"] = false;
      });
      this.tabledatas = list;
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
      var itss = this.tabledatas;
      var list = {
        serverName: "",
        serverBussiness: "",
        wangluyiny: "",
        show: false,
      };
      itss.splice(item + 1, 0, list);
      this.tabledatas = itss;
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