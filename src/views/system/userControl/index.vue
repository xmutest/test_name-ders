<!--已完成的项目-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">用户列表</div>
            <div style="text-align: right">
              <el-button
                size="medium"
                type="primary"
                @click="dialogVisible = true"
                >添加用户</el-button
              >
            </div>
            <el-table
              :header-cell-style="{ 'text-align': 'center' }"
              :data="tableData"
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
              <el-table-column label="用户手机号">
                <template slot-scope="scope">
                  {{ scope.row.loginName }}
                </template>
              </el-table-column>
              <el-table-column label="用户名" width="150">
                <template slot-scope="scope">
                  {{ scope.row.userName }}
                </template>
              </el-table-column>
              <el-table-column label="职位" width="150">
                <template slot-scope="scope">
                  {{ userTypeOptio(scope.row.userType) }}
                </template>
              </el-table-column>
              <el-table-column label="部门" width="150">
                <template slot-scope="scope">
                  {{ departmentIdOp(scope.row.departmentId) }}
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="reportGeneratingEdit(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="reportGeneratingDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column> -->
            </el-table>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 添加弹框 -->
    <el-dialog :visible.sync="dialogVisible" title="添加用户">
      <el-row :gutter="15">
        <el-form
          ref="xmform"
          :model="xmform"
          :rules="rules"
          size="small"
          label-width="100px"
          label-position="right"
        >
          <el-col :span="24">
            <el-form-item label="手机号" prop="loginName">
              <el-input
                v-model="xmform.loginName"
                placeholder="请输入手机号"
                :maxlength="11"
                clearable
                prefix-icon="el-icon-phone"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用户名" prop="userName">
              <el-input
                v-model="xmform.userName"
                placeholder="请输入用户名"
                clearable
                prefix-icon="el-icon-user"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="xmform.password"
                placeholder="请输入密码"
                clearable
                prefix-icon="el-icon-warning-outline"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位" prop="userType">
              <el-select
                v-model="xmform.userType"
                placeholder="请选择职位"
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in userTypeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门" prop="departmentId">
              <el-select
                v-model="xmform.departmentId"
                placeholder="请选择部门"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in departmentIdOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      total: 0,
      xmform: {
        loginName: null,
        userName: null,
        password: null,
        userType: 4,
        departmentId: null,
      },
      rules: {
        loginName: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1[3|4|5|7|8][0-9]{9}$/,
            message: "手机号码有误，请重填",
            trigger: "blur",
          },
        ],
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        userType: [
          {
            required: true,
            message: "请选择职位",
            trigger: "change",
          },
        ],
      },
      userTypeOptions: [
        {
          label: "总监",
          value: 2,
        },
        {
          label: "部长",
          value: 3,
        },
        {
          label: "技术人员",
          value: 4,
        },
      ],
      departmentIdOptions: [
        {
          label: "无",
          value: 0,
        },
        {
          label: "技术一部",
          value: 3,
        },
        {
          label: "技术二部",
          value: 4,
        },
        {
          label: "技术三部",
          value: 5,
        },
        {
          label: "技术四部",
          value: 8,
        },
        {
          label: "技术五部",
          value: 9,
        },
      ],
      apiList: {
        departmentId: 1,
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.gettableData();
  },
  mounted() {},
  methods: {
    userTypeOptio(userType) {
      let ls = "";
      let userTypelsit = [
        {
          label: "管理员",
          value: 1,
        },
        {
          label: "总监",
          value: 2,
        },
        {
          label: "部长",
          value: 3,
        },
        {
          label: "技术人员",
          value: 4,
        },
      ];
      userTypelsit.forEach((item) => {
        if (item.value === userType) {
          ls = item.label;
        }
      });
      return ls;
    },
    departmentIdOp(depar) {
      let ls = "";
      this.departmentIdOptions.forEach((item) => {
        if (item.value === depar) {
          ls = item.label;
        }
      });
      return ls;
    },
    async gettableData() {
      let res = await this.$api.API_DepartmentFindListe(this.apiList);
      console.log(res);
      if (res.code === 20000) {
        this.tableData = res.data;
      }
    },
    handelConfirm() {
      this.$refs["xmform"].validate(async (valid) => {
        if (!valid) return;
        let res = await this.$api.API_UserSave(this.xmform);
        if (res.code === 20000) {
          this.gettableData();
          this.dialogVisible = false;
        }
      });
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
</style>