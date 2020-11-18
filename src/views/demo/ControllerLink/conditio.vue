<!--被测单位信息-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">被测评单位(委托单位)</div>
            <div>
              <el-row :gutter="15">
                <el-form
                  ref="BeingMeasured"
                  :model="BeingMeasured"
                  :rules="rules"
                  size="medium"
                  label-width="100px"
                >
                  <el-col :span="22">
                    <el-form-item
                      label-width="110px"
                      label="单位名称："
                      prop="companyName"
                    >
                      <el-input
                        v-model="BeingMeasured.companyName"
                        placeholder="单位名称："
                        :disabled="true"
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="13">
                    <el-form-item
                      label-width="110px"
                      label="单位地址："
                      prop="companyAddress"
                    >
                      <el-input
                        v-model="BeingMeasured.companyAddress"
                        placeholder="请输入单位地址："
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item
                      label-width="110px"
                      label="邮政编码："
                      prop="postalCode"
                    >
                      <el-input
                        v-model="BeingMeasured.postalCode"
                        placeholder="请输入邮政编码："
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item
                      label-width="110px"
                      label="联系人姓名："
                      prop="contacts"
                    >
                      <el-input
                        v-model="BeingMeasured.contacts"
                        placeholder="请输入联系人姓名："
                        clearable
                        :style="{ width: '100%' }"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item
                      label-width="110px"
                      label="职务/职称："
                      prop="companyPosition"
                    >
                      <el-input
                        v-model="BeingMeasured.companyPosition"
                        placeholder="请输入职务/职称："
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item
                      label-width="110px"
                      label="所属部门："
                      prop="department"
                    >
                      <el-input
                        v-model="BeingMeasured.department"
                        placeholder="请输入所属部门："
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item
                      label-width="110px"
                      label="办公电话："
                      prop="officesPhone"
                    >
                      <el-input
                        v-model="BeingMeasured.officesPhone"
                        placeholder="请输入办公电话："
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item
                      label-width="110px"
                      label="移动电话："
                      prop="mobilePhone"
                    >
                      <el-input
                        v-model="BeingMeasured.mobilePhone"
                        placeholder="请输入移动电话："
                        :maxlength="11"
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item
                      label-width="110px"
                      label="电子邮箱："
                      prop="email"
                    >
                      <el-input
                        v-model="BeingMeasured.email"
                        placeholder="请输入电子邮箱："
                        clearable
                        :style="{ width: '100%' }"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <div class="tijiaobaoc">
                    <el-button
                      type="primary"
                      size="small"
                      icon="el-icon-folder-opened"
                      @click="PassiveCompanyUpdate"
                      >保存委托单位</el-button
                    >
                    <!-- <el-button
                type="primary"
                @click="BeingMeasuredble = true"
                size="small"
                icon="el-icon-s-order"
                >现有委托单位库</el-button
              > -->
                  </div>
                </el-form>
              </el-row>
            </div>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">被测信息系统情况</div>
            <d2-quill
              style="min-height: 200px; margin-bottom: 20px"
              v-model="fromdata.systemSituation"
              @text-change="textChangeHandler"
            />
          </div>

          <div class="mude_text_item">
            <div class="descTItle">前次测评情况</div>
            <div class="to_tim">
              <el-input
                type="textarea"
                style="min-height: 200px; margin-bottom: 20px"
                :autosize="{ minRows: 10, maxRows: 15 }"
                placeholder="请输入内容"
                v-model="fromdata.lastEvaluationSituation"
              >
              </el-input>
            </div>
          </div>
          <div class="tijiaobaoc">
            <el-button type="primary" @click="submitReport">保存</el-button>
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
      fromdata: {
        systemSituation: "",
        lastEvaluationSituation: "",
        id: "",
      },
      // 被测评单位
      BeingMeasured: {
        // 单位名称
        companyName: "",
        // 联系人
        contacts: "",
        // 移动电话
        mobilePhone: "",
        // 所在部门(
        department: "",
        // 职务/职称()
        companyPosition: "",
        // 邮政编码()
        postalCode: "",
        // 办公电话
        officesPhone: "",
        // 通讯地址()
        companyAddress: "",
        // 电子邮箱()
        email: "",
        // 所在省/市()
        provincesCities: "",
        // 所在区/县()
        districtCounty: "",
        // 行业类型()
        industryType: "",
        // 业务类型()
        businessType: "",
      },
      industryTypes: [
        { id: 1, value: "电信" },
        { id: 2, value: "广电" },
        { id: 3, value: "经营性公众互联网" },
        { id: 4, value: "银行" },
        { id: 5, value: "海关" },
        { id: 6, value: "税务" },
        { id: 7, value: "民航" },
        { id: 8, value: "电力" },
        { id: 9, value: "证券" },
        { id: 10, value: "保险" },
        { id: 11, value: "国防科技工业" },
        { id: 12, value: "公安" },
        { id: 13, value: "人事劳动和社会保障" },
        { id: 14, value: "财政" },

        { id: 15, value: "审计" },
        { id: 16, value: "商业贸易" },
        { id: 17, value: "国土资源" },
        { id: 18, value: "能源" },
        { id: 19, value: "交通" },
        { id: 20, value: "统计" },
        { id: 21, value: "工商行政管理" },
        { id: 22, value: "邮政" },
        { id: 23, value: "教育" },
        { id: 24, value: "文化" },
        { id: 25, value: "卫生" },
        { id: 26, value: "农业" },
        { id: 27, value: "外交" },

        { id: 28, value: "发展改革" },
        { id: 29, value: "科技" },
        { id: 30, value: "宣传" },
        { id: 31, value: "质量监督检验检" },
        { id: 32, value: "其他" },
      ],
      businessTypes: [
        { id: 1, value: "生产作业" },
        { id: 2, value: "指挥调度" },
        { id: 3, value: "管理控制" },
        { id: 4, value: "内部办公" },
        { id: 5, value: "公众服务" },
        { id: 6, value: "其他" },
      ],
      rules: {
        companyAddress: [
          {
            required: true,
            message: "请输入单位地址：",
            trigger: "blur",
          },
        ],
        postalCode: [
          {
            required: true,
            message: "请输入邮政编码：",
            trigger: "blur",
          },
          {
            pattern: /^[1-9][0-9]{5}$/,
            message: "请输入正确的邮政编码",
            trigger: "blur",
          },
        ],
        contacts: [
          {
            required: true,
            message: "请输入联系人姓名：",
            trigger: "blur",
          },
        ],
        companyPosition: [
          {
            required: true,
            message: "请输入职务/职称：",
            trigger: "blur",
          },
        ],
        department: [
          {
            required: true,
            message: "请输入所属部门：",
            trigger: "blur",
          },
        ],
        officesPhone: [
          {
            required: true,
            message: "请输入办公电话：",
            trigger: "blur",
          },
        ],
        mobilePhone: [
          {
            required: true,
            message: "请输入移动电话：",
            trigger: "blur",
          },
          {
            pattern: /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/,
            message: "请输入正确的移动电话",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入电子邮箱：",
            trigger: "blur",
          },
          {
            pattern: /^[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*.[a-z]{2,}$/,
            message: "请输入正确的电子邮箱",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getEtlist();
    this.PassiveCompany();
  },
  methods: {
    // 获取测评单位
    async PassiveCompany() {
      let List = await this.$api.PassiveCompanyFindModel();
      if (List.code === 20000) {
        this.BeingMeasured = List.data;
        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
    // 修改测评单位
    async PassiveCompanyUpdate() {
      this.$refs["BeingMeasured"].validate(async (valid) => {
        if (!valid) return;
        let res = await this.$api.API_PassiveCompanyUpdate(this.BeingMeasured);
        if (res.code === 20000) {
          this.$message.success("保存成功！！");
          this.PassiveCompany();
          //查询列表
        } else {
          this.$message.error("错误，请联系管理员" + res.message);
        }
      });
    },
    selectChange(provinceName, cityNmae) {
      this.BeingMeasured.provincesCities = provinceName;
      this.BeingMeasured.districtCounty = cityNmae;
    },
    async getEtlist() {
      let List = await this.$api.API_projectOverviewdObjfindSystemSituation();
      if (List.code === 20000) {
        this.fromdata = List.data;
        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
    textChangeHandler(delta, oldDelta, source) {
      // console.log(delta,oldDelta,source)
    },
    async submitReport() {
      let res = await this.$api.API_evaluationBasis_updata(this.fromdata);
      this.PassiveCompanyUpdate();
      if (res.code === 20000) {
        this.getEtlist();
        //查询列表
      } else {
        this.$message.error("错误，请联系管理员" + res.message);
      }
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
}
.el-card__header {
  border-bottom: 0px solid #ebeef5;
}
.demo-input-suffix {
  .companyName {
    width: 80%;
    .el-input {
      width: 80%;
    }
  }
  .unitAddress {
    width: 60%;
    .el-input {
      width: 85%;
    }
  }
  .incorporation {
    display: flex;
    align-items: center;
    justify-content: instead;
    flex-flow: wrap;
  }
}
</style>