<!--渗透-->
<template>
  <d2-container>
    <div class="mude_is">
      <div class="mude_text_item" v-if="info.user_info.departmentId===1">
        <div class="descTItle">渗透报告上传</div>
        <div class="PenetrationPersonnel">
          <permeateDao
            :sonValue="{
              type: 2,
              technology,
            }"
            @toFatherData="toFatherData"
          ></permeateDao>
        </div>
      </div>
      <div class="mude_text_item" v-else>
        <div class="descTItle">渗透授权书上传</div>
        <div class="technology">
          <el-row :gutter="10">
            <el-form
              ref="technology"
              :model="technology"
              :rules="rules"
              size="medium"
              label-width="100px"
              label-position="left"
            >
              <el-col :span="10">
                <el-form-item
                  label-width="110px"
                  label="指定渗透人员"
                  prop="userId"
                >
                  <el-select
                    v-model="technology.userId"
                    placeholder="请选择下拉选择指定渗透人员"
                    clearable
                    :style="{ width: '100%' }"
                  >
                    <el-option
                      v-for="(item, index) in userIdOptions"
                      :key="index"
                      :label="item.userName"
                      :value="item.userId"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item
                  label-width="110px"
                  label="是否自愿放弃"
                  prop="isGiveUp"
                >
                  <el-switch v-model="technology.isGiveUp"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <permeateDao
                  :sonValue="{
                    type: 1,
                    technology,
                  }"
                  @toFatherData="toFatherData"
                ></permeateDao>
              </el-col>
            </el-form>
          </el-row>
        </div>
      </div>
      <div class="mude_text_item">
        <div class="descTItle">渗透授权书列表</div>
        <div class="loadBookList">
          <template>
            <el-table :data="loadBookList" style="width: 100%">
              <!-- <el-table-column label="日期" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column> -->
              <el-table-column label="名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.fileName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button size="mini" @click="bookEdit(scope.row)"
                    >下载</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="bookDelete(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
      <div class="mude_text_item">
        <div class="descTItle">渗透测试统计表</div>
        <div class=""></div>
      </div></div
  ></d2-container>
</template>
      

<script>
import permeateDao from "./daorudou/permeateDao";
import { mapState } from "vuex";
export default {
  components: {},
  props: [],
  data() {
    return {
      technology: {
        userId: "",
        isGiveUp: false,
      },
      rules: {
        userId: [],
      },
      userIdOptions: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      loadBookList: [],
    };
  },
  components: {
    permeateDao,
  },
  computed: {
    ...mapState("d2admin", {
      info: (state) => state.user.info,
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  watch: {},
  created() {
    this.getdataList();
  },
  mounted() {
    this.getrenList();
  },
  methods: {
    // 获取授权书数据
    async getdataList() {
      let res = await this.$api.SYSParsingHfindBook();
      if (res.code === 20000) {
        console.log(res);
        this.loadBookList = res.data;
      }
    },
    // 获取评测人员
    async getrenList() {
      let res = await this.$api.SYSParsifindPenetrationUserk({
        companyName: this.info.user_info.companyName,
      });
      if (res.code === 20000) {
        this.userIdOptions = res.data;
      }
    },
    toFatherData(ifsTo) {
      if (ifsTo === true) {
        this.getdataList();
      }
    },
    // 下载
    bookEdit(row) {
      console.log(row);
      let url = `${window.location.protocol}${process.env.VUE_APP_API}${row.fileUrl}`;
      window.open(url);
    },
    // 删除
    async bookDelete(row) {
      this.$confirm("确定删除此记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          row.vulnerabilityType = this.bilityType;
          let res = await this.$api.SYSParsinationDelBook(row);
          if (res.code === 20000) {
            this.$message.success("删除成功！！");
            this.getdataList();
            //查询列表
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.mude_is {
  margin: 20px 0;
  .mude_text_item {
    margin: 20px 0;
  }

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
}
.addList {
  margin-bottom: 15px;
  text-align: right;
}
.technology {
  font-size: 16px;
  font-family: cursive;
  margin: 0 20px;
}
</style>
