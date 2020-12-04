<!--安全控制间安全测评cmjaqcp-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">漏洞扫描报告</div>
            <div class="ScTlist">
              <div class="scanningTool">
                <div class="scanningToolListo">
                  <div>
                    <span class="scanningToolName">(1)主机扫描工具</span>
                    <el-select
                      size="mini"
                      v-model="toolName"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in scanningTool"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div>
                    <span class="scanningToolName">(2)主机接入点：</span>
                    <el-select
                      size="mini"
                      v-model="pointtoolName"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in pointtoolNameList"
                        :key="item.id"
                        :label="item.value"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div class="scanningupload">
                  <DaoruLou
                    :sonValue="{ toolName, api: pointtoolName }"
                    @toFatherData="toFatherData"
                  ></DaoruLou>
                </div>
              </div>
              <div class="scanningTool">
                <div class="scanningToolListo">
                  <div>
                    <span class="scanningToolName">(1)应用系统扫描工具</span>
                    <el-select
                      size="mini"
                      v-model="ScantoolName"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in systemScanTool"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div>
                    <span class="scanningToolName">(2)应用系统接入点：</span>
                    <el-select
                      size="mini"
                      v-model="pointScantoolName"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in pointtoolNameList"
                        :key="item.id"
                        :label="item.value"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="scanningupload">
                  <DaoruLou
                    :sonValue="{
                      toolName: ScantoolName,
                      api: pointScantoolName,
                    }"
                    @toFatherData="toFatherData"
                  ></DaoruLou>
                </div>
              </div>
            </div>
          </div>
          <!-- 数据表格 -->
          <div class="mude_text_item">
            <div class="descTItle">汇总分析</div>
            <div class="addList">
              <el-button type="primary" @click="handleAddList" size="medium"
                >添加</el-button
              >
            </div>
            <div>
              <el-table :data="dataList" style="width: 100%">
                <el-table-column label="漏洞类型" width="100">
                  <template slot-scope="scope">
                    <span
                      v-show="scope.row.vulnerabilityType == 1"
                      style="margin-left: 10px"
                      >主机</span
                    >
                    <span
                      v-show="scope.row.vulnerabilityType == 2"
                      style="margin-left: 10px"
                      >应用系统</span
                    >
                  </template>
                </el-table-column>
                <el-table-column label="漏洞名称" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.vulnerabilityName
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="漏洞数量" width="80">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.vulnerabilityNum
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="主机IP/URL" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.hostOrUrl
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="漏洞危险等级" width="100">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.riskLevel
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="接入点" width="80">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.point }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="漏洞修复建议">
                  <template slot-scope="scope">
                    <el-popover trigger="click" placement="top">
                      <p>{{ scope.row.repairSuggestions }}</p>
                      <div
                        slot="reference"
                        v-show="scope.row.repairSuggestions"
                        class="name-wrapper"
                      >
                        {{ scope.row.repairSuggestions.substr(0, 135) }}
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>

                <el-table-column label="操作" width="180">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)"
                      >编辑</el-button
                    >
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div
            class="page_name"
            style="padding: 0 20px 20px 20px; margin: 15px 0"
          >
            <div class="search_ls">
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageList.pageNum"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="pageList.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                >
                </el-pagination>
              </div>
            </div>
          </div>
          <!-- <div class="tijiaobaoc">
            <el-button type="primary" @click="submitReport">保存</el-button>
          </div> -->
        </el-card>
      </div>
    </div>
    <!-- //弹框 -->
    <el-dialog :visible.sync="dialogVisible" :title="toListts">
      <el-row :gutter="10">
        <el-form
          ref="vulnerability"
          :model="vulnerability"
          :rules="rules"
          size="medium"
          label-width="100px"
          label-position="left"
        >
          <el-col :span="24">
            <el-form-item label-width="120px" label="主机IP" prop="hostOrUrl">
              <el-input
                v-model="vulnerability.hostOrUrl"
                placeholder="请输入主机IP"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label-width="120px"
              label="漏洞名称"
              prop="vulnerabilityName"
            >
              <el-input
                v-model="vulnerability.vulnerabilityName"
                placeholder="请输入漏洞名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label-width="120px"
              label="漏洞描述"
              prop="vulnerabilityDescription"
            >
              <el-input
                v-model="vulnerability.vulnerabilityDescription"
                type="textarea"
                placeholder="请输入漏洞描述"
                :autosize="{ minRows: 4, maxRows: 4 }"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label-width="120px"
              label="漏洞危险等级"
              prop="riskLevel"
            >
              <el-select
                v-model="vulnerability.riskLevel"
                placeholder="请选择漏洞危险等级"
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in riskLevelOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="100px" label="接入点" prop="point">
              <el-select
                v-model="vulnerability.point"
                placeholder="请选择漏洞危险等级"
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in pointtoolNameList"
                  :key="index"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label-width="120px"
              label="漏洞修复建议"
              prop="repairSuggestions"
            >
              <el-input
                v-model="vulnerability.repairSuggestions"
                type="textarea"
                placeholder="请输入漏洞修复建议"
                :autosize="{ minRows: 4, maxRows: 4 }"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label-width="120px"
              label="漏洞数量"
              prop="vulnerabilityNum"
            >
              <el-input-number
                v-model="vulnerability.vulnerabilityNum"
                placeholder="漏洞数量"
                :step="1"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="漏洞类型" prop="vulnerabilityType">
              <el-select
                v-model="vulnerability.vulnerabilityType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in vulnerabilityTypeList"
                  :key="item.value"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
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
import DaoruLou from "./daorudou/daoruloudou.vue";
export default {
  data() {
    return {
      toListts: "添加",
      dataList: [],
      // 主机扫描工具
      scanningTool: [
        { id: 1, value: "绿盟" },
        { id: 2, value: "天镜" },
        { id: 3, value: "Nessus" },
      ],
      pointtoolNameList: [
        { id: 1, value: "JA" },
        { id: 2, value: "JB" },
        { id: 3, value: "JC" },
        { id: 4, value: "JD" },
        { id: 5, value: "JE" },
        { id: 6, value: "JF" },
      ],
      // 接入点
      pointtoolName: "JA",
      toolName: 1,
      //   应用系统扫描工具
      systemScanTool: [
        { id: 1, value: "绿盟" },
        { id: 2, value: "天镜" },
        { id: 3, value: "Nessus" },
        { id: 4, value: "AppScan" },
      ],
      vulnerabilityTypeList: [
        { id: 1, value: "主机" },
        { id: 2, value: "应用系统" },
      ],
      // 接入点
      pointScantoolName: "JA",
      ScantoolName: 2,
      dialogVisible: false,
      vulnerability: {
        hostOrUrl: undefined,
        vulnerabilityName: undefined,
        vulnerabilityDescription: undefined,
        riskLevel: undefined,
        repairSuggestions: undefined,
        vulnerabilityNum: 0,
        vulnerabilityType: undefined,
        point: "JA",
      },
      rules: {
        hostOrUrl: [
          {
            required: true,
            message: "请输入主机IP",
            trigger: "blur",
          },
          {
            pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
            message: "请输入正确的ip地址",
            trigger: "blur",
          },
        ],
        vulnerabilityName: [
          {
            required: true,
            message: "请输入漏洞名称",
            trigger: "blur",
          },
        ],
        vulnerabilityDescription: [
          {
            required: true,
            message: "请输入漏洞描述",
            trigger: "blur",
          },
        ],
        riskLevel: [
          {
            required: true,
            message: "请选择漏洞危险等级",
            trigger: "change",
          },
        ],
        repairSuggestions: [
          {
            required: true,
            message: "请输入漏洞修复建议",
            trigger: "blur",
          },
        ],
        vulnerabilityNum: [
          {
            required: true,
            message: "漏洞数量",
            trigger: "blur",
          },
        ],
        vulnerabilityType: [
          {
            required: true,
            message: "请输入漏洞类型",
            trigger: "blur",
          },
        ],
      },
      riskLevelOptions: [
        {
          label: "高",
          value: 2,
        },
        {
          label: "中",
          value: 1,
        },
        {
          label: "低",
          value: 0,
        },
      ],
      pageList: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      usr_updata: 0,
    };
  },
  created() {
    this.getListts();
  },
  components: {
    DaoruLou,
  },
  methods: {
    toFatherData(ifsTo) {
      if (ifsTo === true) {
        this.getListts();
      }
    },
    async getListts() {
      let res = await this.$api.SYS_findDetails_InputDoc(this.pageList);
      if (res.code === 20000) {
        this.dataList = res.data.list;
        this.total = res.data.total;
      }
      console.log(res);
    },
    handelConfirm() {
      this.$refs["vulnerability"].validate(async (valid) => {
        if (!valid) return;
        if (usr_updata === 0) {
          // 添加
          let res = await this.$api.SYS_saveDetails_InputDoc(
            this.vulnerability
          );
          if (res.code === 20000) {
            this.dialogVisible = false;
            this.getListts();
            this.$message.success("添加成功！！");
          } else {
            this.$message.error('添加失败：'+res.message);
          }
        } else if (usr_updata === 1) {
          // 修改
        } else {
          this.$message.error("出错，请联系管理员");
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.pageList.pageSize = val;
      this.getListts();
    },
    handleCurrentChange(val) {
      this.pageList.pageNum = val;
      this.getListts();
    },
    // 修改
    handleEdit(row) {
      this.usr_updata = 1;
      this.toListts = "修改";
      this.dialogVisible = true;
      this.vulnerability = row;
      console.log(row);
    },
    // 添加
    handleAddList() {
      this.usr_updata = 0;
      this.vulnerability = {
        hostOrUrl: undefined,
        vulnerabilityName: undefined,
        vulnerabilityDescription: undefined,
        riskLevel: undefined,
        repairSuggestions: undefined,
        vulnerabilityNum: 0,
        vulnerabilityType: undefined,
        point: "JA",
      };
      this.dialogVisible = true;
      this.toListts = "添加";
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
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
.ScTlist {
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .scanningTool {
    .scanningToolName {
      font-size: 14px;
      margin: 10px 10px 10px 0;
      font-family: "Courier New", Courier, monospace;
    }
    .scanningupload {
      margin: 20px 0;
    }
  }
}
.addList {
  margin-bottom: 15px;
  text-align: right;
}
.scanningToolListo {
  div {
    margin: 5px 0;
  }
}
</style>
