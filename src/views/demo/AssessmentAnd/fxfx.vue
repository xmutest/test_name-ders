<!--风险分析和评价-->
<template>
  <d2-container>
    <div class="ts_table">
      <table>
        <thead>
          <tr>
            <th>安全层面</th>
            <th>控制点</th>
            <th>关联资产</th>
            <th>控制项</th>
            <th>结果记录</th>
            <th>测评项权重</th>
            <th>修正前</th>
          </tr>
        </thead>
        <template tbody v-for="item in dataList">
          <tbody v-for="(item1, index1) in item.resultData" :key="index1">
            <tr>
              <td :rowspan="item1.sceneCheckData.length * 20">
                {{ item1.sceneCheckName }}
              </td>
            </tr>
            <template v-for="item2 in item1.sceneCheckData">
              <tr
                v-for="(item3, index3) in item2.controlEntriesData"
                :key="Math.random() + index3"
              >
                <td v-if="!index3" :rowspan="item2.controlEntriesData.length">
                  {{ item2.safetyControlSpot }}
                </td>

                <td @dblclick="shishiClick(item2, item3)">
                  <div slot="reference" class="name-wrapper">
                    {{ item3.assets.substr(0, 35) }}
                  </div>
                </td>
                <td>
                  <div slot="reference" class="name-wrapper">
                    {{ item3.controlEntries.substr(0, 35) }}
                  </div>
                </td>
                <td>
                  <div slot="reference" class="name-wrapper">
                    {{ item3.results.substr(0, 35) }}
                  </div>
                </td>
                <td>{{ item3.weight }}</td>
              </tr>
            </template>
          </tbody>
        </template>
      </table>
    </div>
    <div class="updata_dialog">
      <el-dialog
        title="评测助手网页版"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
        <div class="name_ts">
          <div>系统安全问题风险分析和评价</div>
          <div class="name_ro">
            <div>修改后测评符合程度：0</div>
            <div>严重程度值：4</div>
          </div>
        </div>
        <div class="relevance">1</div>
        <div class="relevance">1</div>
        <div class="up_wt">
          <div>
            <p>问题描述：</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
            >
            </el-input>
          </div>
          <div>
            <p>危害分析：</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
            >
            </el-input>
          </div>
          <div>
            <p>问题分析：</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
            >
            </el-input>
          </div>
          <div>
            <p>整改建议：</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
            >
            </el-input>
          </div>
        </div>
        <div class="">1</div>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
import { cloneDeep } from "lodash";
import dataLists from "./responseResult1";
export default {
  data() {
    return {
      dialogVisible: true,
      itemsCoacr: [
        { color: "#fff" },
        { color: "#fff" },
        { color: "#FFEB3B" },
        { color: "#F44336" },
        { color: "#fff" },
      ],
      dataList: [],
      accordSituationlist: [
        { value: 4, label: "不适用" },
        { value: 3, label: "不符合(0分)" },
        { value: 2, label: "部分符合(0.5分)" },
        { value: 1, label: "符合(1分)" },
      ],
      // 请求数据
      api_data: {},
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    Totisadd() {
      console.log(5);
    },
    shishiClick(item2, item3) {
      console.log(item2, item3);
      this.dialogVisible = true;
    },
    async getDataList() {
      let its = dataLists;

      this.dataList = its.data.pageData;
      // const res = await this.$api.SYS_USER_ANQUAN_WU(this.api_data);
      // if (res.code === 20000) {
      //   var listTs = cloneDeep(res.data);
      //   listTs.forEach((element) => {
      //     element.contentList.forEach((item) => {
      //       if (!item.hasOwnProperty("accordSituation")) {
      //         item.remark = "";
      //         item.accordSituation = 1;
      //         item.recordResults = "";
      //       }
      //     });
      //   });
      //   this.dataList = listTs;
      // }
      //  const res= await this.$http.get('/api/safetyControl/findSpotByBookId',{params:this.api_data});
      //  this.dataList=res.data.data;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.ts_table {
  table {
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
    .el-select {
      margin: 0px 2px;

      ::v-deep .el-input--medium {
        font-size: 12px;
      }
    }
  }
  table th {
    color: #909399;
    height: 40px;
    border: 1px solid #cad9ea;
  }
  table thead th {
    background-color: rgba(238, 238, 238, 1);
    width: 200px;
  }
  table td {
    border: 1px solid #cad9ea;
    color: #666;
    font-size: 13px;
  }
}

.schuan_s {
  margin: 15px 0;
  text-align: right;
}
.el-dialog {
  width: 900px;
}
.updata_dialog {
  .name_ts {
    display: flex;
    margin-bottom: 5px;
    position: relative;
    color: blue;
    .name_ro {
      position: absolute;
      right: 0;
      display: flex;
      color: black;
      div {
        margin: 0 15px;
      }
    }
  }
  .relevance {
    height: 150px;
    overflow: auto;
  }
  .up_wt {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    div {
      width: 300px;
      padding:0 10px;
    }
  }
}
</style>


