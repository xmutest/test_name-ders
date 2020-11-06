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
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="安全控制点">
                </el-table-column>
                <el-table-column
                  prop="spotGrade"
                  label="控制点得分">
                </el-table-column>
                <el-table-column
                  prop="totalGrade"
                  label="层面得分">
                </el-table-column>
              </el-table>
        </el-card>
    </div>
  </d2-container>
</template>

<script>
export default {
  data(){
    return {
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

      console.log(imitateData)

      for(let i=0;i<imitateData.length;i++){
        let list = imitateData[i],totalGrade = list.sceneCheckFraction,rowNum = 0

        for(let b=0;b<list.dataInfo.length;b++){
          for(let u=0;u<list.dataInfo[b].resultData.length;u++){
            rowNum += list.dataInfo[b].resultData[u].sceneCheckData.length
          }
        }
        

        for(let j=0;j<list.dataInfo.length;j++){
          let item = list.dataInfo[j]
          let paraArr = {
            firstName:item.extendedStandard,
            name:'',
            spotGrade:'',
            totalGrade:totalGrade,
            colspan:2
          }

          if(j == 0)  paraArr.rowspanSum = rowNum + list.dataInfo.length


          this.tableImitateDate.push(paraArr)

          for(let a=0;a<item.resultData.length;a++){
            let value = item.resultData[a],firstName = value.sceneCheckName,
                rowsLength = value.sceneCheckData.length,shouldAdd = false
            if(a == 0) shouldAdd = true
            for(let k=0;k<value.sceneCheckData.length;k++){
              let pre = value.sceneCheckData[k]
              let param = {
                firstName:firstName,
                name:pre.safetyControlSpot,
                spotGrade:pre.controlFraction,
                totalGrade:totalGrade
              }
              if(shouldAdd && k == 0) param.rowspan = rowsLength

              this.tableImitateDate.push(param)
            }
            
            
          }
        }
      }

      console.log(this.tableImitateDate)

      // for(let i=0;i<imitateData.length;i++){
      //   let list = imitateData[i]
      //   console.log(list)
      //   let paramsData = {
      //     firstName:list.extendedStandard,
      //     secondName:'',
      //     name:'',
      //     objCount:list.esObjSize,
      //     accord:'',
      //     sectionAccord:'',
      //     notAccord:'',
      //     notBeApplicable:list.esNotBeApplicable,
      //     colspan:3
      //   }
      //   this.tableImitateDate.push(paramsData)
      //   for(let j=0;j<list.resultData.length;j++){
      //     let item = list.resultData[j],firstName = item.sceneCheckName,rowNum = 0

      //     for(let g=0;g<item.sceneCheckData.length;g++){
      //         rowNum += item.sceneCheckData[g].controlEntriesData.length
      //     }

      //     for(let k=0;k<item.sceneCheckData.length;k++){
      //       let value = item.sceneCheckData[k],secondName = value.safetyControlSpot,
      //       shouldAdd = false
            
      //       if(k == 0) shouldAdd = true
      //       for(let n=0;n<value.controlEntriesData.length;n++){
      //         let pre = value.controlEntriesData[n]
              
      //         let params= {
      //           firstName:firstName,
      //           secondName:secondName,
      //           name:pre.controlEntries,
      //           objCount:pre.objCount,
      //           accord:pre.accord,
      //           sectionAccord:pre.sectionAccord,
      //           notAccord:pre.notAccord,
      //           notBeApplicable:pre.notBeApplicable,
      //         }
              

      //         if(n == 0) params.rowspanItem = value.controlEntriesData.length

      //         if(shouldAdd && n == 0) params.rowspan = rowNum

      //         this.tableImitateDate.push(params)

      //       }
      //     }
      //   }
      // }
      
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {

        if(columnIndex === 3){
          if(row.rowspanSum>=1){
            return{
              rowspan:row.rowspanSum,
              colspan:1
            }
          }else{
            return {
              rowspan:0,
              colspan:0
            }
          }
        }
      
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
        // rowspanSum

        // if(row.rowspanItem >= 1){
        //     if(columnIndex == 3){
        //       return{
        //         rowspan:row.rowspanItem,
        //         colspan:1
        //       }
        //     }else{
        //       return {
        //         rowspan:0,
        //         colspan:0
        //       }
        //     }
        //   }



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


        
        // if(columnIndex === 1){
        //   if(row.rowspanItem>=1){
        //     return{
        //       rowspan:row.rowspanItem,
        //       colspan:1
        //     }
        //   }else{
        //     return {
        //       rowspan:0,
        //       colspan:0
        //     }
        //   }
        // }

    },
    async func_get_config(){
      let res = await this.$api.API_CalculateFractionSafetyClassStatistics()
      
      if(res.code != 20000) return console.log(res.message)
      let {data} = res
      this.arrengeData(data)
    } 
  },
}
</script>

<style lang="scss">
  .mude_is {
    margin:20px 0;
  }
</style>
