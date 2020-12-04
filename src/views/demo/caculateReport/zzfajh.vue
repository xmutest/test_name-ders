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
            <div class="descTItle">测评组(多姓名以顿号;分割)</div>
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
                        placeholder="请输入单行文本项目组长"
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
                  <el-col :span="12">
                    <el-form-item label="方案时间" prop="timedata">
                      <el-date-picker
                        v-model="assessmentGroup.timedata"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :style="{ width: '100%' }"
                        placeholder="请选择方案时间"
                        clearable
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <div class="tijiaobaoc">
                      <el-button type="primary" @click="submitForm"
                        >制作方案</el-button
                      >
                      <el-button @click="resetForm">重置</el-button>
                    </div>
                  </el-col>
                </el-form>
              </el-row>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </d2-container>
</template>

<script>
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
        timedata: null,
      },
      rules: {
        ahshg: [
          {
            required: true,
            message: "请输入单行文本项目组长",
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
        timedata: [
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
  methods: {
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
        this.$message.success("保存成功！！");
        this.getEtlist();
        //查询列表
      } else {
        this.$message.error("错误，请联系管理员" + res.message);
      }
    },
    // 获取评测工具
    async getFindAll() {
      let List = await this.$api.API_projectOverviewEvaluationToolFindAll();
      if (List.code === 20000) {
        this.setFindAll = List.data;
        // this.fromdata.id = List.data.id;
        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
    async getEtlist() {
      let List = await this.$api.API_projectOverviewdObjSelectionMethod();
      if (List.code === 20000) {
        this.getFindAll();
        let tools = [];
        List.data.tools.forEach((item) => {
          tools.push(item.evaluationToolId);
        });
        this.listtools = tools;
        // this.fromdata.id = List.data.id;
        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
    async submitForm() {
      this.$refs["assessmentGroup"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
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
