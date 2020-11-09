<!--等级测评结论-->
<template>
  <d2-container>
    <div class="mude_is">
      <el-card class="box-card">
        <div class="gradeUpside">
          <div class="leftSide">
            <!-- <img src="@/views/demo/ControllerLink/img/structure01.jpg" class="gradeLogo" alt=""> -->
            <div class="gradeInfo">
              <div>指标符合率:67.61%</div>
              <div>指标部分符合率:67.61%</div>
              <div>指标不符合率:67.61%</div>
              <div>指标不适用数:67个</div>
            </div>
            <div class="gradeDesc">
              <p>测评结论:良</p>
              <p>综合得分:88分</p>
            </div>
          </div>
          <div class="rightSide">
            <ve-histogram ref="echartsArea" :data="chartData" :settings="chartSettings" id="main" ></ve-histogram>
          </div>
        </div>
        <div class="gradeDownside">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :cell-class-name="headerStyle"
          >
            <el-table-column
              prop="name"
              label="风险/结论/得分"
              width="180">
            </el-table-column>
            <el-table-column
              prop="section1"
              label="[0,70)"
              width="180">
            </el-table-column>
            <el-table-column
              prop="section2"
              label="[70,80)"
              width="180">
            </el-table-column>
            <el-table-column
              prop="section3"
              label="[80,90)"
              width="180">
            </el-table-column>
            <el-table-column
              prop="section4"
              label="[90,100)"
              width="180">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </d2-container>
</template>

<script>



export default {
    data(){
      this.chartSettings = {
        metrics: ['数值'],
        dimension: ['name'],
        
      }
      return{
        chartData: {
          columns: ['name', '数值'],
          rows: [
            // { 'name': '1/1', '数值': 1393},
            // { 'name': '1/2', '数值': 3530},
            // { 'name': '1/3', '数值': 2923},
            // { 'name': '1/4', '数值': 1723},
            // { 'name': '1/5', '数值': 3792},
            // { 'name': '1/6', '数值': 4593}
          ],
          xAxis:{
            axisLabel:{
              rotate:20,
            },
          }
        },
        tableData: [
          {
            name: '低',
            section1: '差',
            section2: '中',
            section3: '良',
            section4: '优'
          }, {
            name: '中',
            section1: '差',
            section2: '中',
            section3: '良',
            section4: '良'
          }, 
          {
            name: '高',
            section1: '差',
            section2: '差',
            section3: '差',
            section4: '差'
          }
        ],

      }
    },
    created() {
      this.func_getChartsData()
    },
    mounted() {
      setTimeout(() => {
        const el = document.getElementsByClassName('el-table--enable-row-hover')[0]
        // console.log(el)
        let newName = el.getAttribute('class')
        // console.log( newName)
        newName = newName.replace('el-table--enable-row-hover', '')
        // console.log( newName)
        el.setAttribute('class', newName)
        // console.log(el)
      }, 800)
    },
    methods:{
      headerStyle({row, column, rowIndex, columnIndex}){
        return `r${rowIndex}c${columnIndex}`
      },
      async func_getChartsData(){
        let that = this
        let res = await this.$api.API_CalculateFractionSummaryGraph()
        console.log('res',res)
        let {data} = res
        let mycharts = this.$refs.echartsArea
        data.map(result=>{
          let preName = result.sceneCheckName.length > 3? result.sceneCheckName.substr(0,3) : result.sceneCheckName

          let params = {
            name:result.sceneCheckName,
            '数值':result.sceneCheckFraction
          }
        
          that.chartData.rows.push(params)
        })
        
      }
    }
}
</script>

<style lang="scss" >
  .mude_is {
    margin: 20px 0;
    .gradeUpside{
      display:-webkit-flex;
      display:flex;
      margin-bottom:20px;
    }
    .leftSide{
      display:-webkit-flex;
      display:flex;
      -webkit-justify-content: space-between;
      justify-content: space-between;
      -webkit-flex-wrap:wrap;
      flex-wrap:wrap;
      width: 300px;
      .gradeInfo{
        display:-webkit-flex;
        display:flex;
        -webkit-flex-direction: column;
        flex-direction: column;
        -webkit-justify-content: space-around;
        justify-content: space-around;
      }
    }
    .gradeLogo{
      width: 90px;
      height: 120px;
      border:1px solid black;
    }
    .gradeDesc{
      width:100%;
      p{
        margin:10px auto;
      }
    }
    .gradeDownside{
      .el-table__header th{
        color:#fff;
        background:black;
      }
      
      // .el-table_4_column_16{
      //   color:#fff;
      //   background:black;
      // }  

    }

    .r0c0{
      color:#00B931;
      background:black;
    }

    .r1c0{
      color:#FF9000;
      background:black;
      font-weight:bold;
    }

    .r2c0{
      color:#FF2C00;
      background:black;
      font-weight:bold;
    }

    .r0c1,.r1c1,.r2c1,.r2c2,.r2c3,.r2c4{
      background:#DF7862;
      color:#fff;
    }

    .r0c2,.r1c2{
      background:#DFA962;
      color:#fff;
    }

    .r0c3,.r1c3,.r1c4{
      background:#447A8F;
      color:#fff;
    }

    .r0c4{
      background:#47A269;
      color:#fff;
    }

    .rightSide{
      width:calc(100% );
      height: 400px;
      padding: 0 20px;
      box-sizing:border-box;
      #main{
        width:100%;
        height:100%;
        border:1px solid black;
      }
    }
  }
</style>
