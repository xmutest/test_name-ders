<!--基本指标-->
<template>
  <d2-container>
    <div class="mude_is">
      <el-table
        :data="tableImitateDate"
        :span-method="objectSpanMethod"
        border
        style="width: 100%;"
        :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }"
        :cell-style="tableStyle"
      >
        <el-table-column
          prop="firstName"
          label="安全类"
          width="180"
          max-height="100"
        >
          <template slot-scope="scope">
            <!-- <div :style="scope.row.objNum==438?'background:red':''"> -->
              {{ scope.row.firstName }}
            <!-- </div> -->
          
          </template>
        </el-table-column>
        <el-table-column prop="name" label="安全控制点"> </el-table-column>
        <el-table-column prop="itemSize" label="测评项数"> </el-table-column>
        <el-table-column prop="objSize" label="测评对象数"> </el-table-column>
        <el-table-column prop="itemTotalSize" label="测评项总数"></el-table-column>
      </el-table>
    </div>
  </d2-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
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
    
    
    
  },
  mounted() {
    this.func_get_config()
  },
  methods: {
    arrengeData(res) {
      let imitateData = res.dataList
      let groupIndex = 0;

      for(let a=0;a<imitateData.length;a++){
        let item = imitateData[a]
        let paramsFirst = {
          firstName:item.extendedStandard,
          name:'',
          itemSize:item.extendedStandardItemSizeSUM,
          itemTotalSize:item.extendedStandardItemTotalSizeSUM,
          objSize:item.extendedStandardObjSizeSUM,
          colspan:2
        }
        this.tableImitateDate.push(paramsFirst)
        // 最外层遍历获取.然后进内部继续遍历(做到这里)
        for(let j=0;j<item.resultData.length;j++){
          let list = item.resultData[j],secondName = item.resultData[j].sceneCheckName
          for(let k=0;k<list.sceneCheckData.length;k++){
            let value = list.sceneCheckData[k]
            let params = {
              firstName:secondName,
              name:value.controlSpot,
              objSize:value.objSize,
              itemSize:value.itemSize,
              itemTotalSize:value.itemTotalSize,
            }
            if(k == 0) params.rowspan = list.sceneCheckData.length
            this.tableImitateDate.push(params)
          }
        }

        
      }
      // res
      let totalParams = {
        firstName:'总计',
        name:'',
        itemSize:res.itemSizeSUM,
        itemTotalSize:res.itemTotalSizeSUM,
        objSize:res.objSizeSUM,
        colspan:2
      }

      this.tableImitateDate.push(totalParams)

      console.log('result',this.tableImitateDate)
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

      let res = await this.$api.API_CalculateFractionControlStatistics();
      
      let {data} = res
      this.arrengeData(data)
    },
    tableStyle({ row, column, rowIndex, columnIndex }){
        if(row.colspan >= 1){
          return{
            background:'#A4D38A'
          }
        }
    }
  },
};
</script>

<style lang="scss" scoped>

table th {
    color: #909399;
    height: 40px;
    border: 1px solid #cad9ea;
    font-size: 14px;
    font-weight: bold;
  }
</style>
