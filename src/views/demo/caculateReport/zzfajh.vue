<!--制作评论方案和计划-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">测评工具选择</div>
            <div class="pc_gonjv">
              <el-tree
                :data="setFindAll"
                show-checkbox
                default-expand-all
                :default-checked-keys="listtools"
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps"
              >
              </el-tree>
            </div>
            <div class="tijiaobaoc">
              <el-button type="primary" @click="submitReport">保存</el-button>
            </div>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">测评组（多个姓名请以分号分割）</div>
            <div>
              <el-row :gutter="10">
                <el-form
                  ref="assessmentGroup"
                  :model="assessmentGroup"
                  :rules="rules"
                  size="medium"
                  label-width="120px"
                  label-position="left"
                >
                  <el-col :span="12">
                    <el-form-item label="项目组长" prop="ahshg">
                      <el-input
                        v-model="assessmentGroup.ahshg"
                        placeholder="请输入项目组长"
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="质量监督人" prop="qualitySupervisor">
                      <el-input
                        v-model="assessmentGroup.qualitySupervisor"
                        placeholder="请输入质量监督人"
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item
                      label="技术测试组人员"
                      prop="technologyEvaluationTeam"
                    >
                      <el-input
                        v-model="assessmentGroup.technologyEvaluationTeam"
                        placeholder="请输入技术测试组人员"
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item
                      label="管理评估组人员"
                      prop="manageEvaluationTeam"
                    >
                      <el-input
                        v-model="assessmentGroup.manageEvaluationTeam"
                        placeholder="请输入管理评估组人员"
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item
                      label="渗透测试组人员"
                      prop="penetrationTestTeam"
                    >
                      <el-input
                        v-model="assessmentGroup.penetrationTestTeam"
                        placeholder="请输入渗透测试组人员"
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <div class="mude_text_item">
                      <div class="descTItle">测评方案</div>
                      <div>
                        <el-col :span="24">
                          <el-form-item label="方案名称" prop="reportName">
                            <el-input
                              v-model="assessmentGroup.reportName"
                              placeholder="请输入方案名称"
                              clearable
                              :style="{ width: '100%' }"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="方案时间" prop="reportTime">
                            <el-date-picker
                              v-model="assessmentGroup.reportTime"
                              type="date"
                              format="yyyy - MM - dd"
                              value-format="timestamp"
                              :style="{ width: '100%' }"
                              placeholder="请选择方案时间"
                              clearable
                            ></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="tijiaobaoc">
                      <el-button type="primary" @click="submitForm"
                        >制作方案</el-button
                      >
                    </div>
                  </el-col>
                </el-form>
              </el-row>
            </div>
          </div>

          <div class="mude_text_item">
            <div class="descTItle">方案列表</div>
            <el-table
              :header-cell-style="{ 'text-align': 'center' }"
              :data="reportGeneratingRecords"
              style="width: 100%"
            >
              <!-- <el-table-column label="报告编号" width="200">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.reportNum
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="备案证明编号" width="200">
                <template slot-scope="scope">
                  {{ scope.row.recordSn }}
                </template>
              </el-table-column> -->
              <el-table-column label="报告名称">
                <template slot-scope="scope">
                  {{ scope.row.reportName }}.docx
                </template>
              </el-table-column>
              <el-table-column label="报告生成状态" width="120">
                <template slot-scope="scope">
                  <div v-if="scope.row.status == 0">生成中</div>
                  <div v-else-if="scope.row.status == 1">已生成</div>
                  <div v-else>生成失败</div>
                </template>
              </el-table-column>
              <el-table-column label="日期" width="220">
                <template slot-scope="scope">
                  {{ formattime(scope.row.createdTime) }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="reportGeneratingEdit(scope.row)"
                    >下载</el-button
                  >
                  <el-button
                    size="mini"
                    type="info"
                    v-show="scope.row.status == 2"
                    @click="reportGeneratingsbai(scope.row)"
                    >失败原因</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="reportGeneratingDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
    </div>
  </d2-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // 测评工具
      setFindAll: [],
      listtools: [],
      fromdata: {
        tools: [],
      },
      defaultProps: {
        children: "toolsData",
        label: "menuName",
      },
      assessmentGroup: {
        ahshg: undefined,
        qualitySupervisor: undefined,
        technologyEvaluationTeam: undefined,
        manageEvaluationTeam: undefined,
        penetrationTestTeam: undefined,
        reportName: undefined,
        reportTime: null,
        reportType: 2,
      },
      // 现有报告
      reportGeneratingRecords: [
      ],
      rules: {
        ahshg: [
          {
            required: true,
            message: "请输入单行文本项目组长",
            trigger: "blur",
          },
        ],
        reportName: [
          {
            required: true,
            message: "请输入报告文件名",
            trigger: "blur",
          },
        ],
        qualitySupervisor: [
          {
            required: true,
            message: "请输入质量监督人",
            trigger: "blur",
          },
        ],
        technologyEvaluationTeam: [
          {
            required: true,
            message: "请输入技术测试组人员",
            trigger: "blur",
          },
        ],
        manageEvaluationTeam: [
          {
            required: true,
            message: "请输入管理评估组人员",
            trigger: "blur",
          },
        ],
        penetrationTestTeam: [
          {
            required: true,
            message: "请输入渗透测试组人员",
            trigger: "blur",
          },
        ],
        reportTime: [
          {
            required: true,
            message: "请选择方案时间",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.getEtlist();
  },
  mounted() {},
  computed: {
    ...mapState("d2admin", {
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  methods: {
    async getEtlistds() {
      // 获取列表
      let res = await this.$api.API_wordFindList({ reportType: 2 });
      // console.log(res);
      let timeout = "";
      clearTimeout(timeout);
      if (res.code === 20000) {
        // this.textChangeHandler();
        this.reportGeneratingRecords = res.data;
        res.data.forEach((item) => {
          if (item.status !== 1 && item.status !== 2) {
            if (!timeout) {
              timeout = setTimeout(() => {
                // console.log(item.computerRoomName);
                this.getEtlist();
              }, 2000);
            }
          }
        });
        // setInterval(() => {
        //   this.getEtlist();
        // }, 2000);
      }
    },
    formattime(item) {
      let date = new Date(parseInt(item));
      let Y = date.getFullYear() + "-";
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      let D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      let h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      let m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    //生成报告
    async reportGeneratingEdit(val) {
      if (val.status == 1) {
        let url = `/reportWord/${val.fileName}`;
        let res = await this.$api.SYS_reportWord_DownLoadDoc({ url });
        if (res.code == 500) {
          alert(res.message);
        } else {
          let blob = new Blob([res], {
            type: "application/msword;charset=utf-8",
          });

          //浏览器兼容，Google和火狐支持a标签的download，IE不支持
          if (window.navigator && window.navigator.msSaveBlob) {
            //IE浏览器、微软浏览器
            /* 经过测试，微软浏览器Microsoft Edge下载文件时必须要重命名文件才可以打开，
              IE可不重命名，以防万一，所以都写上比较好 */
            window.navigator.msSaveBlob(blob, val.fileName);
          } else {
            //其他浏览器
            let link = document.createElement("a"); // 创建a标签
            link.style.display = "none";
            let objectUrl = URL.createObjectURL(blob);
            link.download = `${val.reportName}.docx`;
            link.href = objectUrl;
            link.click();
            URL.revokeObjectURL(objectUrl);
          }
        }
      } else {
        this.$message.error("当前状态不支持下载");
      }
    },
    // 失败原因
    reportGeneratingsbai(item) {
      this.$alert(item.failedReason, "失败原因", {
        confirmButtonText: "确定",
        type: "warning",
        callback: (action) => {},
      });
    },
    //删除报告
    reportGeneratingDelete(val, row) {
      this.$confirm("确定删除此记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.API_wordDelete({ id: row.id });
          if (res.code === 20000) {
            this.$message.success("删除成功！！");
            this.getEtlistds();
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
    // 保存测评工具
    async submitReport() {
      let tolist = this.$refs.tree.getCheckedKeys().filter((item) => {
        if (item != "undefined") {
          return item;
        }
      });
      let isT = [];
      tolist.forEach((element) => {
        let em = {};
        em.evaluationToolId = element;
        isT.push(em);
      });
      this.fromdata.tools = isT;
      let res = await this.$api.API_evaluationBasis_updata(this.fromdata);
      if (res.code === 20000) {
         this.$message({
            type: "success",
            message: "保存成功！！",
            duration: 1000
          });
        this.getEtlist();
        //查询列表
      } else {
        this.$message.error("错误，请联系管理员" + res.message);
      }
    },
    // 获取测评工具
    async getFindAll() {
      let List = await this.$api.API_projectOverviewEvaluationToolFindAll();
      if (List.code === 20000) {
        this.setFindAll = List.data;
        // this.fromdata.id = List.data.id;
        //查询列表
      } else {
        this.$message.error(List.message + "测评依据选项出差，请联系管理员");
      }
    },
    // 查询测评组
    async findEvaluationTeam() {
      let res = await this.$api.API_findEvaluationTeam();
      if (res.code === 20000) {
        this.assessmentGroup = res.data;
        this.assessmentGroup.reportName = `${this.xmu_info.data.systemName}网络安全等级测评方案`;
        var date = new Date();
        this.assessmentGroup.reportTime = date.getTime();
        // this.getEtlistds();
      } else {
        this.$message.error("制作失败");
      }
    },
    async getEtlist() {
      let List = await this.$api.API_projectOverviewdObjSelectionMethod();
      if (List.code === 20000) {
        this.getFindAll();
        this.findEvaluationTeam();
        this.getEtlistds();
        let tools = [];
        List.data.tools.forEach((item) => {
          tools.push(item.evaluationToolId);
        });
        this.listtools = tools;
        // this.fromdata.id = List.data.id;
        //查询列表
      } else {
        this.$message.error(List.message + "测评依据选项出差，请联系管理员");
      }
    },
    async submitForm() {
      this.$refs["assessmentGroup"].validate(async (valid) => {
        if (!valid) return;
        // TODO 提交表单
        let res = await this.$api.API_reportType2GenerGate(
          this.assessmentGroup
        );
        if (res.code === 20000) {
          this.getEtlistds();
          this.findEvaluationTeam();
        } else {
          this.$message.error("制作失败");
        }
      });
    },
    resetForm() {
      this.$refs["assessmentGroup"].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
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
}
.el-card__header {
  border-bottom: 0px solid #ebeef5;
}
.demo-input-suffix {
  display: flex;
  align-items: center;
  flex-flow: wrap;
  div {
    margin: 5px;
    span {
      font-size: 12px;
      min-width: 80px;
    }
    .el-input {
      width: 220px;
    }
  }
}
.baseofUnits {
  width: 1200px;
  .el-dialog {
    width: 996px;
  }
  .descTItle {
    @extend %unable-border-left;
  }
}
.pc_gonjv {
  max-height: 400px;
  overflow: auto;
}
</style>
