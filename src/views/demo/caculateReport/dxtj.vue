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
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="安全控制点">
                </el-table-column>
                <el-table-column
                  prop="cpxs"
                  label="测评项数">
                </el-table-column>
                <el-table-column
                  prop="objNum"
                  label="测评对象数">
                </el-table-column>
                <el-table-column
                  prop="totalNum"
                  label="测评项总数">
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
              cpxs:211,
              objNum:431,
              totalNum:1411,
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
              cpxs:211,
              objNum:431,
              totalNum:1411,
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
              cpxs:211,
              objNum:431,
              totalNum:1411,
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
              cpxs:211,
              objNum:431,
              totalNum:1411,
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
              cpxs:211,
              objNum:431,
              totalNum:1411,
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
              cpxs:211,
              objNum:431,
              totalNum:1411,
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
              cpxs:211,
              objNum:431,
              totalNum:1411,
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
              cpxs:211,
              objNum:431,
              totalNum:1411,
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
    // this.func_get_config()
  },
  mounted() {
    this.arrengeData()
  },
  methods: {
    arrengeData(){
      let imitateData = this.imitateData
      let groupIndex = 0,groupItemIndex = 0
      for(let i=0;i<imitateData.length;i++){
        let groupName = imitateData[i].groupName
        // groupIndex += imitateData[i].group.length
        this.tableImitateIndex.push(groupIndex)
        

        for(let j=0;j<imitateData[i].group.length;j++){
          let name = imitateData[i]['group'][j].name
          
          
          groupIndex += imitateData[i]['group'][j].item.length

          
          this.tableImitateItemIndex.push(groupItemIndex)
          groupItemIndex += imitateData[i]['group'][j].item.length

          for(let k=0;k<imitateData[i]['group'][j].item.length;k++){
            
            let paramsJson = {
              groName:groupName,
              name:name,
              itemName:imitateData[i]['group'][j]['item'][k].itemName,
              cpobjNum:imitateData[i]['group'][j].cpxs,
              pass:imitateData[i]['group'][j].objNum,
              halfPass:imitateData[i]['group'][j].totalNum,
              noPass:imitateData[i]['group'][j].totalNum,
              notUse:imitateData[i]['group'][j].totalNum,
            }
            // 处理插入的数据
            this.tableImitateDate.push(paramsJson)
          }
          
        }
        
        
      }
        this.tableImitateIndex.push(groupIndex)
        this.tableImitateItemIndex.push(groupItemIndex)
        

        //将合并数量插入到对应合并首行的数据中(第一级合并)
        for(let i=0;i<this.tableImitateIndex.length - 1;i++){
          this.tableImitateDate[this.tableImitateIndex[i]].rowspan = this.tableImitateIndex[i+1] - this.tableImitateIndex[i]
        }

        for(let j=0;j<this.tableImitateItemIndex.length - 1;j++){
          this.tableImitateDate[this.tableImitateItemIndex[j]].rowspanItem = this.tableImitateItemIndex[j+1] - this.tableImitateItemIndex[j]
        }
        // 
        // for(let j=0;j<this.tableImitateItemIndex.length - 1)

      

        console.log(this.tableImitateDate)
        console.log(this.tableImitateIndex)
        console.log('二级合并',this.tableImitateItemIndex)
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      for(let i=0;i<this.tableImitateIndex.length - 1;i++){
        // 仅限第一行
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

        // if(columnIndex === 1){
        //   return {
        //     rowspan:2,
        //     colspan:0
        //   }
        // }
      }
    },
    async func_get_config(){
      let res = await this.$api.API_ProjectfindOverallEvaluation()
      console.log(res)
    } 
  },
}
</script>

<style lang="scss">
  .mude_is {
    margin:20px 0;
  }
</style>
