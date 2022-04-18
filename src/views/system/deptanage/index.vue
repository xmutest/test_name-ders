<template>
  <d2-container>
    <div class="mude_is">
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item" style="height: 57px">
            <span>部门管理</span>
            <div style="text-align: right" v-if="currDept !== undefined">
              <el-button size="medium" type="primary" @click="handleSave">
                添加子节点
              </el-button>
              <template v-if="currDept.id !== 1">
                <el-button size="medium" type="info" @click="handleUpdate">
                  编辑
                </el-button>
                <el-button size="medium" type="danger" @click="handleDelete">
                  删除
                </el-button>
              </template>
            </div>
          </div>
          <div style="padding: 0 20px 10px 20px">
            <el-tree
              :data="deptList"
              ref="tree"
              highlight-current
              :props="{ children: 'childrenList', label: 'departmentName' }"
              default-expand-all
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
              node-key="id"
            ></el-tree>
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :title="config.title"
    >
      <el-row :gutter="10">
        <el-form
          ref="department"
          :model="department"
          :rules="rules"
          size="medium"
          label-width="120px"
          label-position="left"
        >
          <el-col :span="24">
            <el-form-item label="部门名称" prop="departmentName">
              <el-input
                clearable
                v-model="department.departmentName"
                placeholder="请输入部门名称"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="部门类型" prop="deptType">
              <el-radio-group v-model="department.type" size="medium">
                <el-radio
                  v-for="item in deptTypeList"
                  :key="item.id"
                  :label="item.id"
                >
                  {{ item.departmentName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24">
            <el-form-item label="团队类型" prop="teamType">
              <el-radio-group v-model="department.teamType" size="medium">
                <el-radio
                  v-for="item in teamTypeList"
                  :key="item.id"
                  :label="item.id"
                >
                  {{ item.departmentName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
          :loading="confirmBtnLoading"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { cloneDeep } from "lodash";
export default {
  data() {
    return {
      configIndex: 0,
      configList: [{ title: "添加部门" }, { title: "修改部门" }],
      confirmBtnLoading: false,
      deptList: [],
      deptTypeList: [
        { id: 1, departmentName: "公司" },
        { id: 2, departmentName: "部门" },
      ],
      teamTypeList: [
        { id: 1, departmentName: "内部" },
        { id: 2, departmentName: "外部" },
      ],
      currDept: undefined,
      department: {},
      dialogVisible: false,
      rules: {
        departmentName: [
          {
            required: true,
            message: "请输入部门名称",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择部门类型",
            trigger: "blur",
          },
        ],
        teamType: [
          {
            required: true,
            message: "请选择团队类型",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("d2admin", {
      info: (state) => state.user.info,
      user_info: (state) => state.user.info.user_info,
    }),
  },
  created() {
    // if()
    let uop = this.$store.state.d2admin.user.info.user_info.userType;
    // console.log(uop)
   if (uop != 1) {
      this.$message.error("无权限访问");
      setTimeout(() => {
        this.$router.push({ path: "/" });
      }, 1000);
    }
  },

  mounted() {
    this.deptTree();
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      this.currDept = cloneDeep(data);
    },
    handleSave() {
      this.configIndex = 0;
      this.dialogVisible = true;
      this.department = { parentId: this.currDept.id };
    },
    handleUpdate() {
      this.configIndex = 1;
      this.dialogVisible = true;
      this.department = cloneDeep(this.currDept);
    },
    async deptTree() {
      let res = await this.$api.departmentewdate();
      if (res.code === 20000) {
        this.deptList = [res.data];
      }
      this.confirmBtnLoading = false;
    },
    handleConfirm() {
      this.$refs["department"].validate(async (valid) => {
        if (!valid) return;
        this.confirmBtnLoading = true;
        let res = await this.$api.API_deptSave(this.department);
        if (res.code === 20000) {
          this.currDept = undefined;
          this.dialogVisible = false;
          this.$message.success("保存成功");
          this.deptTree();
        }
      });
    },
    handleDelete() {
      this.$confirm(`确定删除部门[${this.currDept.departmentName}]`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await this.$api.API_deptDelete({ id: this.currDept.id });
        if (res.code === 20000) {
          this.$message.success("删除成功！！");
          this.currDept = undefined;
          this.deptTree();
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
  computed: {
    config() {
      return this.configList[this.configIndex];
    },
  },
};
</script>
<style>
el-input {
  width: 100%;
}
</style>
