<!--基本指标-->
<template>
  <d2-container>
    <div class="mude_is">
      <el-card class="box-card">
        <el-table
          :data="tableImitateDate"
          :span-method="objectSpanMethod"
          border
          show-summary
          sum-text="安全通用要求"
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column
            prop="groName"
            label="安全类"
            width="180"
            max-height="100"
          >
            <template slot-scope="scope">
              <div :style="scope.row.objNum==438?'background:red':''">
                {{ scope.row.groName }}
              </div>
            
            </template>
          </el-table-column>
          <el-table-column prop="name" label="安全控制点"> </el-table-column>
          <el-table-column prop="cpxs" label="测评项数"> </el-table-column>
          <el-table-column prop="objNum" label="测评对象数"> </el-table-column>
          <el-table-column prop="totalNum" label="测评项总数">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },
      ],
      imitateData: [
        {
          groupName: "安全物理环境",
          group: [
            {
              name: "物理位置选择",
              cpxs: 211,
              objNum: 431,
              totalNum: 1411,
            },
            {
              name: "物理访问控制",
              cpxs: 211,
              objNum: 431,
              totalNum: 1411,
            },
            {
              name: "防盗窃和防破坏",
              cpxs: 211,
              objNum: 431,
              totalNum: 1411,
            },
            {
              name: "防雷击",
              cpxs: 211,
              objNum: 431,
              totalNum: 1411,
            },
          ],
        },
        {
          groupName: "安全通信网络",
          group: [
            {
              name: "网络架构",
              cpxs: 211,
              objNum: 431,
              totalNum: 1411,
            },
            {
              name: "通信传输",
              cpxs: 211,
              objNum: 431,
              totalNum: 1411,
            },
            {
              name: "可信验证",
              cpxs: 211,
              objNum: 431,
              totalNum: 1411,
            },
          ],
        },
        {
          groupName: "安全区域边界",
          group: [
            {
              name: "边界防护",
              cpxs: 211,
              objNum: 431,
              totalNum: 1411,
            },
            {
              name: "访问控制",
              cpxs: 211,
              objNum: 431,
              totalNum: 1411,
            },
            {
              name: "入侵防范",
              cpxs: 211,
              objNum: 431,
              totalNum: 1411,
            },
            {
              name: "恶意代码和垃圾邮件防范",
              cpxs: 211,
              objNum: 431,
              totalNum: 1411,
            },
          ],
        },
        {
          groupName: "安全计算环境",
          group: [
            {
              name: "身份鉴别",
              cpxs: 211,
              objNum: 431,
              totalNum: 1411,
            },
            {
              name: "数据完整性",
              cpxs: 211,
              objNum: 431,
              totalNum: 1411,
            },
            {
              name: "数据保密性",
              cpxs: 211,
              objNum: 431,
              totalNum: 1411,
            },
          ],
        },
      ], //模拟数据
      tableImitateDate: [],
      tableImitateIndex: [],
    };
  },
  created() {
    // this.func_get_config()
  },
  mounted() {
    this.arrengeData();
  },
  methods: {
    arrengeData() {
      let imitateData = this.imitateData;
      let groupIndex = 0;
      for (let i = 0; i < imitateData.length; i++) {
        let groupName = imitateData[i].groupName;
        this.tableImitateIndex.push(groupIndex);
        groupIndex += imitateData[i].group.length;
        for (let j = 0; j < imitateData[i].group.length; j++) {
          let paramsJson = {
            groName: groupName,
            name: imitateData[i]["group"][j].name,
            cpxs: imitateData[i]["group"][j].cpxs,
            objNum: imitateData[i]["group"][j].objNum,
            totalNum: imitateData[i]["group"][j].totalNum,
          };

          // 处理插入的数据
          this.tableImitateDate.push(paramsJson);
          // tableImitateIndex
        }
      }
      this.tableImitateIndex.push(this.tableImitateDate.length);

      //将合并数量插入到对应合并首行的数据中
      for (let i = 0; i < this.tableImitateIndex.length - 1; i++) {
        this.tableImitateDate[this.tableImitateIndex[i]].rowspan =
          this.tableImitateIndex[i + 1] - this.tableImitateIndex[i];
      }

      console.log(this.tableImitateDate);
      console.log(this.tableImitateIndex);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      for (let i = 0; i < this.tableImitateIndex.length - 1; i++) {
        // 仅限第一行
        if (columnIndex === 0) {
          if (row.rowspan >= 1) {
            return {
              rowspan: row.rowspan,
              colspan: 1,
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0,
            }
          }
        }
      }
    },
    async func_get_config() {
      let res = await this.$api.API_ProjectfindOverallEvaluation();
      console.log(res);
    },
  },
};
</script>

<style lang="scss">
.mude_is {
  margin: 20px 0;
}
</style>
