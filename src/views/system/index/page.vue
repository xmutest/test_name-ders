<template>
  <d2-container class="page">
    <div class="page_name" style="padding: 0 20px 20px 20px">
      <div class="search_ls">
        <div>
          <span class="search_ls_name">项目名称</span>
          <el-input
            placeholder="请输入内容"
            v-model="search_list.projectName"
            clearable
          ></el-input>
        </div>
        <div>
          <el-button icon="el-icon-search" circle></el-button>
        </div>
        <div class="die_roift">
          <el-button @click="dialogFormVisible = true" type="primary"
            ><i class="el-icon--left el-icon-circle-plus-outline"></i
            >新增</el-button
          >
        </div>
      </div>
    </div>
    <div class="page_ts">
      <el-container>
        <el-main style="padding: 0 20px 20px 20px">
          <el-col class="box-card">
            <el-card shadow="hover">
              <div>
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  :header-cell-style="{
                    'background-color': 'rgba(238, 238, 238,1.0)',
                  }"
                >
                  <el-table-column label="项目名称">
                    <template slot-scope="scope">
                      <p>
                        <span
                          class="optionTo_name"
                          @click="optionTo(scope.$index, scope.row)"
                          >{{ scope.row.projectName }}</span
                        >
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="系统名称">
                    <template slot-scope="scope">
                      <p>
                        <span>{{ scope.row.systemName }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="等保等级"  width="80">
                    <template slot-scope="scope">
                      <p>
                        <span>{{ scope.row.lever }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="创建人"  width="150">
                    <template slot-scope="scope">
                      <p>
                        <span>{{ scope.row.creater }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="创建时间"  width="150">
                    <template slot-scope="scope">
                      <p>
                        <span>{{ scope.row.createrTime }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="xmuDelete(scope.$index, scope.row)"
                        >删除</el-button
                      >
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
      <el-dialog
        style="min-width: 960px"
        title="新建项目"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="xmform" :rules="rules" ref="xmform">
          <el-form-item
            label="项目名称"
            :label-width="formLabelWidth"
            prop="projectName"
          >
            <el-input
              v-model="xmform.projectName"
              clearable
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="系统名称"
            :label-width="formLabelWidth"
            prop="systemName"
          >
            <el-input
              v-model="xmform.systemName"
              clearable
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="被测单位名称"
            :label-width="formLabelWidth"
            prop="evaluatedUnit"
          >
            <el-input
              v-model="xmform.evaluatedUnit"
              clearable
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="备案证明编号"
            :label-width="formLabelWidth"
            prop="recordSn"
          >
            <el-input
              v-model="xmform.recordSn"
              clearable
              maxlength="17"
              placeholder="请输入格式为xxxxxxxxxxx-xxxxx"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <div class="ist_lis">
            <div>
              <el-form-item label="标准体系" :label-width="formLabelWidth">
                <el-select
                  v-model="xmform.standard"
                  @change="selectTrigger(xmform.standard)"
                >
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
                <el-select v-model="xmform.standardVersion">
                  <el-option
                    v-for="item in standardVersionlist[its_id_to - 1].value"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="拓展标准" :label-width="formLabelWidth">
            <el-input
              v-model="xmform.standardExtends"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <div class="ist_lis">
            <div>
              <el-form-item label="等保等级" :label-width="formLabelWidth">
                <el-select
                  v-model="xmform.lever"
                  @change="selectGoodsByGroupId($event)"
                >
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
          <el-form-item
            label="创建人"
            :label-width="formLabelWidth"
            prop="creater"
          >
            <el-input
              v-model="xmform.creater"
              clearable
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <div class="dia-footer">
            <el-form-item>
              <el-button type="primary" @click="submitForm('xmform')"
                >立即创建</el-button
              >
              <el-button type="danger" @click="resetForm('xmform')"
                >重置</el-button
              >
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
    return {
      getTimeDate: "",
      its_id_to: 2,
      tableData: [
        {
          projectName: "佛山市三水区人民检察院网络安全等级保护测评项目",
          systemName: "佛山市三水区人民检察院门户网站",
          lever: "三级",
          creater: "卢晓杰",
          createrTime: "2020/9/17",
        },
        {
          projectName: "佛山市高明区司法局网络安全等级保护测评项目",
          systemName: "高明区一门式综合执法应用系统",
          lever: "三级",
          creater: "卢晓杰",
          createrTime: "2020/9/8",
        },
        {
          projectName: "广州市残疾人安养院网络安全等级保护测评项目",
          systemName: "广州市残疾人安养院院务管理系统",
          lever: "二级",
          creater: "卢晓杰",
          createrTime: "2020/8/15",
        },
        {
          projectName: "佛山市顺德公安局网络安全等级保护测评项目",
          systemName: "顺德智慧社区管理系统",
          lever: "二级",
          creater: "吴源超",
          createrTime: "2020/8/11",
        },
        {
          projectName: "广州市公安局特行场所图像智能应用平台等级保护项目",
          systemName: "广州市公安局特行场所图像智能应用平台",
          lever: "二级",
          creater: "吴源超",
          createrTime: "2020/8/6",
        },
        {
          projectName: "广州市公安局刑事案件物证档案管理系统网络安全等级保护测评服务项目",
          systemName: "刑事案件物证档案管理系统",
          lever: "三级",
          creater: "吴源超",
          createrTime: "2020/7/22",
        },
      ],
      // 标准体系列表
      standardlist: [
        { label: "老国标", value: 1 },
        { label: "新国标", value: 2 },
        { label: "新国标（2017试行版）", value: 3 },
      ],
      //行业列表
      standardVersionlist: [
        {
          id: 1,
          value: [
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
        },
        {
          id: 2,
          value: [{ label: "GBT22239-2019", value: 1 }],
        },
        {
          id: 3,
          value: [{ label: "试行搞(2017-10-26)", value: 1 }],
        },
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
      search_list: {
        projectName: "",
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      xmform: {
        projectName: "", //COMMENT '项目名称
        systemName: "", //系统名称
        evaluatedUnit: "", //被测单位名称
        recordSn: "", //备案证明编号
        standard: 2, //标准体系.1：老国标，2：新国标（2017试行版），3：新国标
        standardVersion: 1, // '拓展版本.1：默认，2：电力(生产控制信息系统类)，3：电力(管理信息系统)，4：证券期货行业，5：金融行业，6：云计算，7：税务(试行)(平行权重)，8：烟草，9：征信(上海),10：试行稿(2017-10-26)，11：GBT22239-2019',
        standardExtends: "", //拓展标准
        lever: 1, //等保等级.1：第一级，2：第二级，3：第三级，4：第四级
        sag: 1, //SAG等级.1：S1A3G3，2：S2A3G3，3：S3A3G3，4：S3A2G3，5：S3A1G3
        creater: "", //创建人
        manager: "aaa", //组长
      },
      formLabelWidth: "120px",
      rules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
        systemName: [
          { required: true, message: "请输入系统名称", trigger: "blur" },
        ],
      },
    };
  },
  components: {},
  created() {
    this.getNowDate();
  },
  methods: {
    // 选择绑定
    selectTrigger(id) {
      this.its_id_to = id;
    },
    // 选择项目跳转
    optionTo(index, row) {
      alert(`进入${row.projectName}`);
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
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.API_Project_Creation(this.xmform);
          console.log(res);
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
    ::v-deep .el-card__body {
      padding: 0;
    }
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
.search_ls {
  display: flex;
  align-items: center;
  div {
    margin-right: 5px;
    display: flex;
    align-items: center;
    .search_ls_name {
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
}
.die_roift {
  position: absolute;
  right: 0;
}
</style>
