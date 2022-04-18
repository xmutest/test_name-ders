<!--整体测评结果汇总-->
<template>
  <d2-container>
    <div class="ts_table">
      <table v-loading="loading">
        <thead v-if="dataList.length === 0">
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
        <thead v-else>
          <tr>
            <th style="width: 100px">安全层面</th>
            <th style="width: 100px">控制点</th>
            <th style="width: 200px">关联资产</th>
            <th>控制项</th>
            <th>结果记录</th>
            <th style="width: 50px">测评项权重</th>
            <th style="width: 50px">修正前</th>
          </tr>
        </thead>
        <template tbody v-for="(item, ins) in dataList">
          <tr class="List_b" :key="ins">
            <td colspan="10">{{ item.extendedStandard }}</td>
          </tr>
          <tbody v-for="(item1, index1) in item.resultData" :key="index1">
            <tr>
              <td :rowspan="item1.sceneCheckData.length * ToListm">
                {{ item1.sceneCheckName }}
              </td>
            </tr>
            <template v-for="(item2, index2) in item1.sceneCheckData">
              <tr
                v-for="(item3, index3) in item2.controlEntriesData"
                :key="Math.random() + index3"
              >
                <td v-if="!index3" :rowspan="item2.controlEntriesData.length">
                  {{ item2.safetyControlSpot }}
                </td>
                <td v-if="item3.assets">
                  <el-popover trigger="click" placement="top">
                    <div>
                      <p>
                        {{ item3.assets }}
                      </p>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      {{
                        item3.assets == ""
                          ? item3.assets
                          : item3.assets.substr(0, 60)
                      }}
                    </div>
                  </el-popover>
                </td>
                <td
                  v-else-if="!index2 && !index3"
                  :rowspan="item1.sceneCheckData.length * ToListm"
                >
                  {{ item1.assets }}
                </td>

                <td>
                  <el-popover trigger="click" placement="top">
                    <div>
                      <p>
                        {{ item3.controlEntries }}
                      </p>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      {{
                        item3.controlEntries == ""
                          ? item3.controlEntries
                          : item3.controlEntries.substr(0, 60)
                      }}
                    </div>
                  </el-popover>
                </td>
                <td>
                  <el-popover trigger="click" placement="top">
                    <div>
                      <p>
                        {{ item3.results }}
                      </p>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      {{
                        item3.results == ""
                          ? item3.results
                          : item3.results.substr(0, 50)
                      }}
                    </div>
                  </el-popover>
                </td>
                <td>{{ qvList(item3.weight) }}</td>
                <td>{{ item3.beforeModificationSeverity }}</td>
              </tr>
            </template>
          </tbody>
        </template>
      </table>
    </div>
  </d2-container>
</template>

<script>
import { cloneDeep } from "lodash";
import dataLists from "./responseResult1";
export default {
  data() {
    return {
      loading: true,
      itemsCoacr: [
        { color: "#fff" },
        { color: "#fff" },
        { color: "#FFEB3B" },
        { color: "#F44336" },
        { color: "#fff" },
      ],
      dataList: [],
      ToListm: 20,
      accordSituationlist: [
        { value: 4, label: "不适用" },
        { value: 3, label: "不符合(0分)" },
        { value: 2, label: "部分符合(0.5分)" },
        { value: 1, label: "符合(1分)" },
      ],
      // 请求数据
      api_data: {
        pageNo: 1,
        pageSize: 1,
      },
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    Totisadd() {
      console.log(5);
    },
    async getDataList() {
      this.loading = true;
      let res = await this.$api.APIwholeEvaluationFindResults(this.api_data);
      console.log(res);
      if (res.code === 20000) {
        if (res.data.totalSize > 1) {
          this.ToListm = res.data.totalSize * 2;
        }

        if (res.data.pageData.length > 0) {
          this.dataList = res.data.pageData;
        } else {
          this.$message("数据为空");
        }
        this.loading = false;
      } else {
        this.$message.error("加载信息出错，请联系管理员");
      }

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
.List_b {
  height: 40px;
  background-color: darkseagreen;
  td {
    color: #fff !important;
  }
}
</style>

