
<template>
  <d2-container>
    <div class="mude_is">
              <el-table
                :data="tableImitateDate"
                :span-method="objectSpanMethod"
                border
                style="width: 100%; margin-top: 20px"
                :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }"
                :cell-style="tableStyle"
              >
                <el-table-column
                  prop="firstName"
                  label="安全类"
                  width="150"
                  max-height="100"
                >
                </el-table-column>
                <el-table-column
                  prop="secondName"
                  label="安全控制点"
                  width="150"  
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="测评项"
                  width="400"
                >
                </el-table-column>
                <el-table-column
                  prop="objCount"
                  label="测评对象数"
                  width="80"
                >
                </el-table-column>
                <el-table-column
                  prop="accord"
                  label="符合率"
                  width="80"
                >
                </el-table-column>
                <el-table-column
                  prop="sectionAccord"
                  label="部分符合"
                  width="80"
                >
                </el-table-column>
                <el-table-column
                  prop="notAccord"
                  label="不符合率"
                  width="80"
                >
                </el-table-column>
                <el-table-column
                  prop="notBeApplicable"
                  label="不适用数"
                  width="80"
                >
                </el-table-column>
              </el-table>
    </div>
  </d2-container>
</template>

<script>
export default {
  data(){
    return {
      tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }],
      imitateData:[
        {
          groupName:'安全物理环境',
          group:[
            {
              name:'物理位置选择',
              item:[
                {
                  itemName:`a)机房场地应选择...`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
                {
                  itemName:`b)避免设在建筑物的顶层`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
                {
                  itemName:`z)zzzzz`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
              ],
            },
            {
              name:'物理访问控制',
              item:[
                {
                  itemName:`x)xxxxxxx...`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
                {
                  itemName:`v)vvvvvvv`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
              ],
            },
            {
              name:'防盗窃和防破坏',
              item:[
                {
                  itemName:`e)鹅鹅鹅曲项向天歌...`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
                {
                  itemName:`f)避免设在建筑物的顶层`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
              ],
            },
            {
              name:'防雷击',
              item:[
                {
                  itemName:`a)aaAaaaAAAaa...`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
                {
                  itemName:`b)bbbbbb`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
              ],
            },
          ]
        },
        {
          groupName:'安全物理环境',
          group:[
            {
              name:'物理位置选择',
              item:[
                {
                  itemName:`a)机房场地应选择...`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
                {
                  itemName:`b)避免设在建筑物的顶层`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
                {
                  itemName:`z)zzzzz`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
              ],
            },
            {
              name:'物理访问控制',
              item:[
                {
                  itemName:`x)xxxxxxx...`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
                {
                  itemName:`v)vvvvvvv`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
              ],
            },
            {
              name:'防盗窃和防破坏',
              item:[
                {
                  itemName:`e)鹅鹅鹅曲项向天歌...`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
                {
                  itemName:`f)避免设在建筑物的顶层`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
              ],
            },
            {
              name:'防雷击',
              item:[
                {
                  itemName:`a)aaAaaaAAAaa...`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
                {
                  itemName:`b)bbbbbb`,
                  cpobjNum:2,
                  pass:`20%`,
                  halfPass:'0%',
                  noPass:'50%',
                  notUse:'0'
                },
              ],
            },
          ]
        },
        
      ],  //模拟数据
      tableImitateDate:[],
      tableImitateIndex:[],
      tableImitateItemIndex:[],
    }
  },
  created() {
    this.func_get_config()
  },
  mounted() {

  },
  methods: {
    arrengeData(res){
      let imitateData = res
      for(let i=0;i<imitateData.length;i++){
        let list = imitateData[i]
        console.log(list)
        let paramsData = {
          firstName:list.extendedStandard,
          secondName:'',
          name:'',
          objCount:list.esObjSize,
          accord:'',
          sectionAccord:'',
          notAccord:'',
          notBeApplicable:list.esNotBeApplicable,
          colspan:3
        }
        this.tableImitateDate.push(paramsData)
        for(let j=0;j<list.resultData.length;j++){
          let item = list.resultData[j],firstName = item.sceneCheckName,rowNum = 0

          for(let g=0;g<item.sceneCheckData.length;g++){
              rowNum += item.sceneCheckData[g].controlEntriesData.length
          }

          for(let k=0;k<item.sceneCheckData.length;k++){
            let value = item.sceneCheckData[k],secondName = value.safetyControlSpot,
            shouldAdd = false
            
            if(k == 0) shouldAdd = true
            for(let n=0;n<value.controlEntriesData.length;n++){
              let pre = value.controlEntriesData[n]
              
              let params= {
                firstName:firstName,
                secondName:secondName,
                name:pre.controlEntries,
                objCount:pre.objCount,
                accord:pre.accord + '%',
                sectionAccord:pre.sectionAccord + '%',
                notAccord:pre.notAccord + '%',
                notBeApplicable:pre.notBeApplicable,
              }
              

              if(n == 0) params.rowspanItem = value.controlEntriesData.length

              if(shouldAdd && n == 0) params.rowspan = rowNum

              this.tableImitateDate.push(params)

            }
            
          }

          
        }

      }
      
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      
        // 仅限第一行
        if(row.colspan >= 1){
          if(columnIndex == 0){
            return{
              rowspan:1,
              colspan:row.colspan
            }
          }else if(columnIndex < row.colspan){
            return {
              rowspan:0,
              colspan:0
            }
          }
        }

        if(columnIndex === 0 ){
          if(row.rowspan>=1){
            return{
              rowspan:row.rowspan,
              colspan:1
            }
          }else{
            return {
              rowspan:0,
              colspan:0
            }
          }
        }
        
        if(columnIndex === 1){
          if(row.rowspanItem>=1){
            return{
              rowspan:row.rowspanItem,
              colspan:1
            }
          }else{
            return {
              rowspan:0,
              colspan:0
            }
          }
        }

    },
    
    async func_get_config(){
      let res = await this.$api.API_CalculateFractionAccordSituationStatistics()
      // console.log(res)
      if(res.code != 20000) return console.log(res.message)
      let {dataInfo} = res.data
      this.arrengeData(dataInfo)
    } ,
    
    tableStyle({ row, column, rowIndex, columnIndex }){
        if(row.colspan >= 1){
          return{
            background:'#A4D38A'
          }
        }
    }
  },
}
</script>

<style lang="scss">
  .mude_is {
    margin:20px 0;
  }
</style>
