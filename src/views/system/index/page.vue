<template>
  <d2-container class="page">
    <div class="page_name">
      <span>网络安全等级保护评测工具</span>
      <span>{{getTimeDate}}</span>
    </div>
    <div class="page_ts">
      <el-container>
        <el-aside width="400px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="header_ggao">在线公告</span>
            </div>
            <div v-for="o in 4" :key="o" class="text_item">
              <i class="fa fa-bookmark" aria-hidden="true"></i>
              {{'公告内容 ' + o }}
            </div>
          </el-card>
          <el-card class="box-card-sit">
            <div>
              <span>
                <i class="fa fa-hard-of-hearing" aria-hidden="true"></i>
              </span>
              <span>
                <a href>基本指标</a>
              </span>
            </div>
            <div>
              <span>
                <i class="fa fa-hard-of-hearing" aria-hidden="true"></i>
              </span>
              <span>
                <a href>单项符合情况统计</a>
              </span>
            </div>
            <div>
              <span>
                <i class="fa fa-hard-of-hearing" aria-hidden="true"></i>
              </span>
              <span>
                <a href>控制点符合情况汇总</a>
              </span>
            </div>
            <div>
              <span>
                <i class="fa fa-hard-of-hearing" aria-hidden="true"></i>
              </span>
              <span>
                <a href>系统安全防护评估</a>
              </span>
            </div>
          </el-card>
        </el-aside>
        <el-main style="padding: 0 20px 20px 20px;">
          <el-col class="box-card">
            <el-card shadow="hover">
              <div slot="header" class="clearfix">
                <div>
                  <span class="header_ggao">项目管理</span>
                </div>
                <div>
                  <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
                </div>
              </div>
              <div>
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column label="项目名称">
                    <template slot-scope="scope">
                      <p>
                        <span
                          class="optionTo_name"
                          @click="optionTo(scope.$index, scope.row)"
                        >{{ scope.row.name }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="xmuDelete(scope.$index, scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
        </el-main>
      </el-container>
    </div>
    <!-- 新增表单 -->
    <div class="add_from_xmu">
      <el-dialog style="min-width: 960px;" title="新建项目" :visible.sync="dialogFormVisible">
        <el-form :model="xmform" :rules="rules" ref="xmform">
          <el-form-item label="项目编号" :label-width="formLabelWidth" prop="project_sn">
            <el-input v-model="xmform.project_sn" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" :label-width="formLabelWidth" prop="project_name">
            <el-input v-model="xmform.project_name" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="系统名称" :label-width="formLabelWidth" prop="system_name">
            <el-input v-model="xmform.system_name" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="被测单位名称" :label-width="formLabelWidth" prop="evaluated_unit">
            <el-input v-model="xmform.evaluated_unit" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="xmform.password" show-password autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
            <el-input v-model="xmform.checkPass" show-password autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备案证明编号" :label-width="formLabelWidth" prop="record_sn">
            <el-input
              v-model="xmform.record_sn"
              clearable
              maxlength="17"
              placeholder="请输入格式为xxxxxxxxxxx-xxxxx"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <div class="ist_lis">
            <div>
              <el-form-item label="标准体系" :label-width="formLabelWidth">
                <el-select v-model="xmform.standard">
                  <el-option
                    v-for="item in standardlist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="行业" :label-width="formLabelWidth">
                <el-select v-model="xmform.standard_version">
                  <el-option
                    v-for="item in standard_versionlist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="拓展标准" :label-width="formLabelWidth">
            <el-input v-model="xmform.standard_extends" autocomplete="off"></el-input>
          </el-form-item>
          <div class="ist_lis">
            <div>
              <el-form-item label="部门" :label-width="formLabelWidth">
                <el-select v-model="xmform.department">
                  <el-option
                    v-for="item in departmentlist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="组长" :label-width="formLabelWidth">
                <el-input v-model="xmform.manager" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="ist_lis">
            <div>
              <el-form-item label="等保等级" :label-width="formLabelWidth">
                <el-select v-model="xmform.lever" @change="selectGoodsByGroupId($event)">
                  <el-option
                    v-for="item in leverlist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="SAG等级" :label-width="formLabelWidth">
                <el-select v-model="xmform.sag">
                  <el-option
                    v-for="item in saglist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="ist_lis">
            <div>
              <el-form-item label="作业指导书" :label-width="formLabelWidth">
                <el-select v-model="xmform.instructor">
                  <el-option
                    v-for="item in instructorlist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="项目类型" :label-width="formLabelWidth">
                <el-select v-model="xmform.project_type">
                  <el-option
                    v-for="item in project_typelist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="dia-footer">
            <el-form-item>
              <el-button type="primary" @click="submitForm('xmform')">立即创建</el-button>
              <el-button type="danger" @click="resetForm('xmform')">重置</el-button>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.xmform.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      getTimeDate: "",
      tableData: [
        {
          name: "xxx项目",
        },
        {
          name: "xxx项目2",
        },
      ],
      // 标准体系列表
      standardlist: [
        { label: "老国标", value: 1 },
        { label: "新国标（2017试行版）", value: 2 },
        { label: "新国标", value: 3 },
      ],
      //行业列表
      standard_versionlist: [
        { label: "默认", value: 1 },
        { label: "电力(生产控制信息系统类)", value: 2 },
        { label: "电力(管理信息系统)", value: 3 },
        { label: "证券期货行业", value: 4 },
        { label: "金融行业", value: 5 },
        { label: "云计算", value: 6 },
        { label: "税务(试行)(平行权重)", value: 7 },
        { label: "烟草", value: 8 },
        { label: "征信(上海)", value: 9 },
      ],
      // 部门
      departmentlist: [
        { label: "评测一部", value: 1 },
        { label: "评测二部", value: 2 },
        { label: "技术部", value: 3 },
      ],
      //等级保护
      leverlist: [
        { label: "第一级", value: 1 },
        { label: "第二级", value: 2 },
        { label: "第三级", value: 3 },
        { label: "第四级", value: 4 },
        { label: "第五级", value: 5 },
      ],
      //sag  1：S1A3G3，2：S2A3G3，3：S3A3G3，4：S3A2G3，5：S3A1G3
      saglist: [
        { label: "S1A3G3", value: 1 },
        { label: "S2A3G3", value: 2 },
        { label: "S3A3G3", value: 3 },
        { label: "S3A2G3", value: 4 },
        { label: "S3A1G3", value: 5 },
      ],
      // 作业
      instructorlist: [
        { label: "3.4", value: 1 },
        { label: "5.0", value: 2 },
      ],
      //1：等保测评，2：安全专项测评(上海)
      project_typelist: [
        { label: "等保测评", value: 1 },
        { label: "安全专项测评(上海)", value: 2 },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      xmform: {
        project_sn: "", //项目编号
        project_name: "", //COMMENT '项目名称
        system_name: "", //系统名称
        evaluated_unit: "", //被测单位名称
        password: "", //项目密码
        checkPass: "", //确认密码
        record_sn: "", //备案证明编号
        standard: 1, //标准体系.1：老国标，2：新国标（2017试行版），3：新国标
        standard_version: 1, // '拓展版本.1：默认，2：电力(生产控制信息系统类)，3：电力(管理信息系统)，4：证券期货行业，5：金融行业，6：云计算，7：税务(试行)(平行权重)，8：烟草，9：征信(上海),10：试行稿(2017-10-26)，11：GBT22239-2019',
        standard_extends: "", //拓展标准
        department: "", //部门
        manager: "", //组长
        lever: 1, //等保等级.1：第一级，2：第二级，3：第三级，4：第四级
        sag: 1, //SAG等级.1：S1A3G3，2：S2A3G3，3：S3A3G3，4：S3A2G3，5：S3A1G3
        instructor: 1, //'作业指导书.1：3.4，2：5.0
        project_type: 1, //项目类型.1：等保测评，2：安全专项测评(上海)
        creater: "", //创建人
      },
      formLabelWidth: "120px",
      rules: {
        project_sn: [
          { required: true, message: "请输入项目编号", trigger: "blur" },
        ],
        project_name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
        system_name: [
          { required: true, message: "请输入系统名称", trigger: "blur" },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  components: {},
  created() {
    this.getNowDate();
  },
  methods: {
    // 选择项目跳转
    optionTo(index, row) {
      alert(`进入${row.name}`);
    },
    // 删除项目
    xmuDelete(index, row) {
      console.log(index, row);
    },
    // 等级联动
    selectGoodsByGroupId(enent) {
      this.xmform.sag = enent;
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getNowDate() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let H = date.getHours();
      let mm = date.getMinutes();
      let s = date.getSeconds();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      H = H < 10 ? "0" + H : H;
      this.getTimeDate = y + "年" + m + "月" + d;
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  .page_name {
    span {
      &:nth-child(1) {
        font-size: 18px;
      }
      &:nth-child(2) {
        margin-left: 36px;
        color: #9e9e9e;
      }
    }
  }
  .page_ts {
    margin-top: 20px;
    .box-card {
      ::v-deep .el-card__header {
        background-color: #dddddd;
      }
      .text_item {
        cursor: pointer;
        margin: 15px 0;
        .fa-bookmark {
          margin-right: 5px;
        }
      }
      .clearfix {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .header_ggao {
          color: rgba(3, 169, 244, 1);
          font-size: 18px;
        }
      }
    }
    .box-card-sit {
      margin-top: 20px;
      ::v-deep .el-card__body {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
      }

      div {
        margin: 10px 0;
        background-color: rgba(0, 188, 212, 0.5);
        width: 150px;
        height: 150px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        span {
          i {
            font-size: 26px;
          }
          display: inline-block;
        }
      }
    }
  }
}
.add_from_xmu {
  ::v-deep .el-dialog__header {
    background-color: rgba(3, 169, 244, 0.5);
    .el-dialog__title {
      color: #ffffff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #ffffff;
    }
  }
  .ist_lis {
    display: flex;
  }
  .dia-footer {
    text-align: right;
  }
}
.optionTo_name {
  cursor: pointer;
}
</style>
