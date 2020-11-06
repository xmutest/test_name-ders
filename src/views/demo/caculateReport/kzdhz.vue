<!--基本指标-->
<template>
  <d2-container>
    <div class="mude_is">
      <el-card class="box-card">
        <el-table
          :data="tableImitateDate"
          :span-method="objectSpanMethod"
          border
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column
            prop="firstName"
            label="安全类"
            width="180"
            max-height="100"
          >
            <template slot-scope="scope">
              <div :style="scope.row.objNum==438?'background:red':''">
                {{ scope.row.firstName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="安全控制点"> </el-table-column>
          <el-table-column prop="controlFraction" label="控制点得分"> </el-table-column>

          <el-table-column prop="accordSituation" label="符合"> 
            <template slot-scope="scope">
              <div>
                {{ scope.row.accordSituation==1 ? '√' :''}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="accordSituation" label="部分符合">
            <template slot-scope="scope">
              <div>
                {{ scope.row.accordSituation==2 ? '√' :''}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="accordSituation" label="不符合">
            <template slot-scope="scope">
              <div>
                {{ scope.row.accordSituation==3 ? '√' :''}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="accordSituation" label="不适用">
            <template slot-scope="scope">
              <div>
                {{ scope.row.accordSituation==4 ? '√' :''}}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </d2-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      imitateData: [{
      extendedStandard:'aaa',
      extendedStandardItemSizeSUM:1,
      extendedStandardItemTotalSizeSUM:0,
      extendedStandardObjSizeSUM:100,
      resData:[
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
      ]
      }], //模拟数据
      tableImitateDate: [],
      tableImitateIndex: [],
    };
  },
  computed: {
    ...mapState("d2admin", {
      info: (state) => state.user.info,
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  created() {
    // console.log('项目信息',this.xmu_info)
    
  },
  mounted() {
    this.func_get_config()
  },
  methods: {
    arrengeData(res) {
      let imitateData = res
      let groupIndex = 0;

      // console.log('res',res)

      for(let a=0;a<imitateData.length;a++){
        let item = imitateData[a]
        let paramsFirst = {
          firstName:item.extendedStandard,
          name:'',
          controlFraction:'',
          accordSituation:'',
          colspan:2
        }
        this.tableImitateDate.push(paramsFirst)
        // 最外层遍历获取.然后进内部继续遍历(做到这里)
        for(let j=0;j<item.resultData.length;j++){
          let list = item.resultData[j],secondName = item.resultData[j].sceneCheckName
          for(let k=0;k<list.sceneCheckData.length;k++){
            let value = list.sceneCheckData[k]
            let valueControlFraction = value.controlFraction
            if(typeof value.controlFraction == 'string') valueControlFraction = '-'
            let params = {
              firstName:secondName,
              name:value.safetyControlSpot,
              controlFraction:value.controlFraction,
              accordSituation:value.accordSituation,
            }
            if(k == 0) params.rowspan = list.sceneCheckData.length
            this.tableImitateDate.push(params)
          }
        }
        
      }

      // console.log('result',this.tableImitateDate)
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if(row.colspan >= 1){
          if(columnIndex == 0){
            return {
              rowspan: 1,
              colspan: row.colspan,
            };
          }else if(columnIndex < row.colspan){
            return {
              rowspan: 0,
              colspan: 0,
            }
          }
          
        }
        // 仅限第一行
        if (columnIndex === 0) {
          if (row.rowspan >= 1) {
            return {
              rowspan: row.rowspan,
              colspan: 1,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        }
    },
    async func_get_config() {

      let res = await this.$api.API_CalculateFractionCalculateControlSpotFraction();
      
      let {data} = res
      this.arrengeData(data)

      // this.xmu_info.level  等保等级
    // standardExtends
    },
  },
};
</script>

<style lang="scss">
.mude_is {
  margin: 20px 0;
}
</style>
