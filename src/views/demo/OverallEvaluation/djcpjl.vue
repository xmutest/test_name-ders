<!--等级测评结论-->
<template>
  <d2-container>
    <div class="mude_is">
      <el-card class="box-card">
        <div class="gradeUpside">
          <div class="leftSide">
            <!-- <img src="@/views/demo/ControllerLink/img/structure01.jpg" class="gradeLogo" alt=""> -->
            <div class="gradeInfo">
              <div class="accord">指标符合率:{{ markData.accord }}</div>
              <div class="sectionAccord">
                指标部分符合率:{{ markData.sectionAccord }}
              </div>
              <div class="notAccord">指标不符合率:{{ markData.notAccord }}</div>
              <div class="notBeApplicable">
                指标不适用数:{{ markData.notBeApplicable }}
              </div>
              <div class="fractionResult">
                测评结论:{{ markData.fractionResult }}
              </div>
              <div class="totalFraction">
                综合得分:{{ markData.totalFraction }}分
              </div>
            </div>
          </div>
          <div class="rightSide">
            <!-- <ve-histogram ref="echartsArea" :data="chartData" :settings="chartSettings" id="main" ></ve-histogram> -->
            <div id="main" ref="echartsArea"></div>
          </div>
        </div>
        <div class="gradeDownside">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :cell-class-name="headerStyle"
          >
            <el-table-column prop="name" label="风险/结论/得分" width="180">
            </el-table-column>
            <el-table-column prop="section1" label="[0,70)" width="180">
            </el-table-column>
            <el-table-column prop="section2" label="[70,80)" width="180">
            </el-table-column>
            <el-table-column prop="section3" label="[80,90)" width="180">
            </el-table-column>
            <el-table-column prop="section4" label="[90,100)" width="180">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </d2-container>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {
      tableData: [
        {
          name: "低",
          section1: "差",
          section2: "中",
          section3: "良",
          section4: "优",
        },
        {
          name: "中",
          section1: "差",
          section2: "中",
          section3: "良",
          section4: "良",
        },
        {
          name: "高",
          section1: "差",
          section2: "差",
          section3: "差",
          section4: "差",
        },
      ],
      markData: {
        accord: "",
        notAccord: "",
        notBeApplicable: "",
        sectionAccord: "",
        totalFraction: "",
        fractionResult: "",
      },
    };
  },
  created() {
    this.func_getMark();
    this.func_getChartsData();
  },
  mounted() {
    setTimeout(() => {
      const el = document.getElementsByClassName(
        "el-table--enable-row-hover"
      )[0];
      // console.log(el)
      let newName = el.getAttribute("class");
      // console.log( newName)
      newName = newName.replace("el-table--enable-row-hover", "");
      // console.log( newName)
      el.setAttribute("class", newName);
      // console.log(el)
    }, 800);
  },
  methods: {
    headerStyle({ row, column, rowIndex, columnIndex }) {
      return `r${rowIndex}c${columnIndex}`;
    },
    async func_getChartsData() {
      let that = this;
      let paramsData = {
        key: [],
        value: [],
      };
      let res = await this.$api.API_CalculateFractionSummaryGraph();
      let { data } = res;
      let mycharts = this.$refs.echartsArea;
      data.map((result) => {
        paramsData.value.push(result.sceneCheckFraction);
        paramsData.key.push(result.sceneCheckName);
      });

      // echarts
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: "{b} : {c} ",
        },
        label: {
          fontWeight: "bold",
          show: true,
          position: "top",
          formatter: "{c}",
        },
        xAxis: {
          type: "category",
          data: paramsData.key,
          axisLabel: {
            rotate: 30,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: paramsData.value,
            type: "bar",
            itemStyle: {
              normal: {
                color: function (params) {
                  if (params.value <= 70) {
                    return "#DF7862";
                  } else if (params.value > 70 && params.value < 90) {
                    return "#447A8F";
                  }
                  return "#47A269";
                },
              },
            },
          },
        ],
      };

      setTimeout(function () {
        echarts.init(that.$refs.echartsArea).setOption(option);
      }, 500);
    },
    async func_getMark() {
      let res = await this.$api.API_CalculateFractionInConclusionFraction();
      let { data } = res;

      this.markData = data;
    },
  },
};
</script>

<style lang="scss" >
.mude_is {
  margin: 20px 0;
  .gradeUpside {
    display: -webkit-flex;
    display: flex;
    margin-bottom: 20px;
  }
  .leftSide {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 300px;
    .gradeInfo {
      display: -webkit-flex;
      display: flex;
      -webkit-flex-direction: column;
      flex-direction: column;
      -webkit-justify-content: space-around;
      justify-content: space-around;
    }
    //  <div class="accord">指标符合率:{{markData.accord}}</div>
    // <div class="sectionAccord">指标部分符合率:{{markData.sectionAccord}}</div>
    // <div class="notAccord">指标不符合率:{{markData.notAccord}}</div>
    // <div class="notBeApplicable">指标不适用数:{{markData.notBeApplicable}}</div>
    // <div class="fractionResult">测评结论:{{markData.fractionResult}}</div>
    // <div class="totalFraction">综合得分:{{markData.totalFraction}}分</div>
    .accord {
      color: #47a269;
    }
    .sectionAccord {
      color: #dfa962;
    }
    .notAccord {
      color: #df7862;
    }
    .notBeApplicable {
      color: gray;
      text-decoration: line-through;
    }
  }
  .gradeLogo {
    width: 90px;
    height: 120px;
    border: 1px solid black;
  }
  .gradeDesc {
    width: 100%;
    p {
      margin: 10px auto;
    }
  }
  .gradeDownside {
    .el-table__header th {
      color: #fff;
      background: black;
    }

    // .el-table_4_column_16{
    //   color:#fff;
    //   background:black;
    // }
  }

  .r0c0 {
    color: #00b931;
    background: black;
  }

  .r1c0 {
    color: #ff9000;
    background: black;
    font-weight: bold;
  }

  .r2c0 {
    color: #ff2c00;
    background: black;
    font-weight: bold;
  }

  .r0c1,
  .r1c1,
  .r2c1,
  .r2c2,
  .r2c3,
  .r2c4 {
    background: #df7862;
    color: #fff;
  }

  .r0c2,
  .r1c2 {
    background: #dfa962;
    color: #fff;
  }

  .r0c3,
  .r1c3,
  .r1c4 {
    background: #447a8f;
    color: #fff;
  }

  .r0c4 {
    background: #47a269;
    color: #fff;
  }

  .rightSide {
    width: calc(100%);
    height: 400px;
    padding: 0 20px;
    box-sizing: border-box;
    #main {
      width: 100%;
      height: 100%;
      border: 1px solid black;
    }
  }
}
</style>
