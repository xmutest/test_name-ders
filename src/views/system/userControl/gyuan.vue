<!--已完成的项目-->
<template>
  <div>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <div class="search_ls">
          <div>
            <span class="search_ls_name">用户名：</span>
            <el-input placeholder="请输入内容" v-model="apiList.userName" size="small" @input="searchBi" clearable>
            </el-input>
          </div>
          <div>
            <div>
              <span class="search_ls_name">部门：</span>
              <el-select clearable size="small" @change="gettableData" v-model="apiList.departmentId" placeholder="请选择">
                <el-option v-for="(item, index) in gzHuList['childrenList']" :key="index" :label="item.departmentName"
                  :value="item.departmentId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <el-button icon="el-icon-search" type="primary" size="small" @click="searchBi" circle></el-button>
          </div>
        </div>
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">用户列表</div>
            <div style="text-align: right">
              <el-button size="medium" type="primary" @click="(dialogVisible = true), resetForm()">添加用户</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%">
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
              <el-table-column label="部门" width="200">
                <template slot-scope="scope">
                  {{ departmentIdOp(scope.row.departmentId) }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                  <el-button size="mini" @click="reportGeneratingEdit(scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="reportGeneratingDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
    </div>
    <div class="page_name" style="padding: 0 20px 20px 20px">
      <div class="search_ls">
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="apiList.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="apiList.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 添加弹框 -->
    <el-dialog :visible.sync="dialogVisible" title="添加用户">
      <el-row :gutter="15">
        <el-form ref="xmform" :model="xmform" :rules="rules" size="small" label-width="100px" label-position="right">
          <el-col :span="24">
            <el-form-item label="手机号" prop="loginName">
              <el-input v-model="xmform.loginName" placeholder="请输入手机号" :maxlength="11" clearable
                prefix-icon="el-icon-phone" :style="{ width: '100%' }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="xmform.userName" placeholder="请输入用户名" clearable prefix-icon="el-icon-user"
                :style="{ width: '100%' }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="密码" prop="password">
              <el-input v-model="xmform.password" show-password placeholder="请输入密码" clearable
                prefix-icon="el-icon-warning-outline" :style="{ width: '100%' }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="确认密码" prop="pawss">
              <el-input v-model="xmform.pawss" placeholder="请输入确认密码" show-password clearable
                prefix-icon="el-icon-warning-outline" :style="{ width: '100%' }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位" prop="userType">
              <el-select v-model="xmform.userType" placeholder="请选择职位" :style="{ width: '100%' }"
                @change="gzanu(xmform.userType)">
                <el-option v-for="(item, index) in userTypeOptions" :key="index" :label="item.label" :value="item.value"
                  :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门" prop="departmentId">
              <el-cascader v-model="xmform.departmentId" placeholder="请选择部门" clearable :props="{
                value: 'departmentId',
                label: 'departmentName',
                children: 'childrenList',
                checkStrictly: true,
              }" :style="{ width: '100%' }" :options="[gzHuList]"></el-cascader>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog :visible.sync="dialogVisibleupdata" title="修改用户">
      <el-row :gutter="15">
        <el-form ref="xmform" :model="xmform" :rules="rules" size="small" label-width="100px" label-position="right">
          <el-col :span="24">
            <el-form-item label="手机号" prop="loginName">
              <el-input v-model="xmform.loginName" placeholder="请输入手机号" :maxlength="11" clearable
                prefix-icon="el-icon-phone" :style="{ width: '100%' }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="xmform.userName" placeholder="请输入用户名" clearable prefix-icon="el-icon-user"
                :style="{ width: '100%' }"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="职位" prop="userType">
              <el-select v-model="xmform.userType" placeholder="请选择职位" :style="{ width: '100%' }">
                <el-option v-for="(item, index) in userTypeOptions" :key="index" :label="item.label" :value="item.value"
                  :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门" prop="departmentId">
              <el-cascader v-model="xmform.departmentId" placeholder="请选择部门" clearable :props="{
                value: 'departmentId',
                label: 'departmentName',
                children: 'childrenList',
                checkStrictly: true,
              }" :style="{ width: '100%' }" :options="[gzHuList]"></el-cascader>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="dialogVisibleupdata = false">取消</el-button>
        <el-button type="primary" @click="updatahandelConfirm" v-throttle>确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    gzHuList: {
      default: [],
    },
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.xmform.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      dialogVisibleupdata: false,
      dialogVisible: false,
      tableData: [],
      total: 0,
      xmform: {
        loginName: null,
        userName: null,
        password: null,
        pawss: null,
        userType: 4,
        departmentId: null,
      },
      rules: {
        pawss: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur" },
        ],
        loginName: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1[0-9][0-9]{9}$/,
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
          {
            pattern: /(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}/,
            message: "密码长度必须大于等于8，包含字母和数字",
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
        {
          label: "质控部",
          value: 10,
        },
        {
          label: "渗透部",
          value: 11,
        },
        {
          label: "合作一部",
          value: 12,
        },
        {
          label: "合作二部",
          value: 13,
        },
        {
          label: "合作三部",
          value: 14,
        },
        {
          label: "合作四部",
          value: 15,
        },
        {
          label: "合作五部",
          value: 17,
        },
        {
          label: "商务部",
          value: 16,
        },
      ],
      apiList: {
        departmentId: "",
        page: 1,
        pageSize: 10,
        userName: "",
        companyId: 6,
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.gettableData();
  },
  mounted() { },
  methods: {
    gzanu(val) {
      if (val === 2) {
        this.departmentIdOptions = [
          {
            label: "广州华南信息安全测评中心",
            value: 2,
          },
        ];
      } else {
        this.departmentIdOptions = [
          {
            label: "广州华南信息安全测评中心",
            value: 2,
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
          {
            label: "质控部",
            value: 10,
          },
          {
            label: "渗透部",
            value: 11,
          },
          {
            label: "合作一部",
            value: 12,
          },
          {
            label: "合作二部",
            value: 13,
          },
          {
            label: "合作三部",
            value: 14,
          },
          {
            label: "合作四部",
            value: 15,
          },
          {
            label: "合作五部",
            value: 17,
          },
          {
            label: "商务部",
            value: 16,
          },
        ];
      }
      this.xmform.departmentId = null;
    },
    // 分页
    handleSizeChange(val) {
      this.apiList.pageSize = val;
      this.gettableData();
    },

    handleCurrentChange(val) {
      this.apiList.page = val;
      this.gettableData();
    },
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
      // console.log(this.gzHuList);
      let departmentIdOptions = this.gzHuList["childrenList"];
      if (depar == 2) return '国源天顺安全服务有限公司';
      if (departmentIdOptions) {
        departmentIdOptions.forEach((item) => {
          if (item.departmentId === depar) {
            ls = item.departmentName;
          }
        });
        return ls;
      }

    },
    async gettableData() {
      let res = await this.$api.API_DepartmentFindListe(this.apiList);
      if (res.code === 20000) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      }
    },
    // 添加
    handelConfirm() {
      this.$refs["xmform"].validate(async (valid) => {
        if (!valid) return;
         this.xmform.departmentId = this.xmform.departmentId instanceof Array ? this.xmform.departmentId[this.xmform.departmentId.length - 1] : this.xmform.departmentId;
        let res = await this.$api.API_UserSave(this.xmform);
        if (res.code === 20000) {
          this.gettableData();
          this.dialogVisible = false;
        }
      });
    },
    // 修改
    async updatahandelConfirm() {
      // if (this.xmform.userType == 2) {
      //   this.xmform.departmentId = 6;
      // }
      if (typeof this.xmform.departmentId != "number") {
        this.xmform.departmentId = this.xmform.departmentId.pop();
      }

      let res = await this.$api.API_Userupdate(this.xmform);
      if (res.code === 20000) {
        this.$message({
          type: "success",
          message: "修改成功！！",
          duration: 1000,
        });
        this.dialogVisibleupdata = false;
        this.gettableData();
        //查询列表
      } else {
        this.$message.error(res.message);
      }
    },
    // 编译
    reportGeneratingEdit(row) {
      this.dialogVisibleupdata = true;
      this.xmform = row;
      this.departmentIdOptions = [
        {
          label: "广州华南信息安全测评中心",
          value: 2,
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
        {
          label: "质控部",
          value: 10,
        },
        {
          label: "渗透部",
          value: 11,
        },
        {
          label: "合作一部",
          value: 12,
        },
        {
          label: "合作二部",
          value: 13,
        },
        {
          label: "合作三部",
          value: 14,
        },
        {
          label: "合作四部",
          value: 15,
        },
        {
          label: "合作五部",
          value: 17,
        },
        {
          label: "商务部",
          value: 16,
        },
      ];
    },
    // 搜索
    searchBi() {
      if (this.apiList.userName !== "" && this.apiList.userName !== undefined) {
        this.apiList.pageNum = 1;
        this.apiList.pageSize = this.total;
      } else {
        this.apiList.pageNum = 1;
        this.apiList.pageSize = 10;
      }

      this.gettableData();
    },
    // 删除
    reportGeneratingDelete(row) {
      this.$confirm("确定删除此记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.API_Userdelete(row);
          if (res.code === 20000) {
            this.$message.success("删除成功！！");
            this.gettableData();
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
    resetForm(formName) {
      this.xmform = {
        loginName: null,
        userName: null,
        password: null,
        pawss: null,
        userType: 4,
        departmentId: null,
      };
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

.search_ls {
  display: flex;
  align-items: center;

  div {
    margin-right: 5px;
    display: flex;
    align-items: center;

    .search_ls_name {
      font-size: 14px !important;
      font-family: "Courier New", Courier, monospace;
    }
  }

  .el-input {
    max-width: 180px;
    margin-left: 5px;
  }
}

.search_ls {
  position: relative;
  margin: 15px;
}
</style>