<!--概述-->
<template>
  <d2-container>
    
    <el-form ref="ruleForm" :model="form" label-width="110px" :rules="rules" class="mainForm">
      <el-alert title="概述" type="success" :closable="false"></el-alert>
      <el-form-item label="评估起止日期" prop="name">
        <el-date-picker
            v-model="form.name"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="评估结论" prop="name">
        <el-input size="medium" v-model="form.name" type="textarea" :rows="1"></el-input>
      </el-form-item>
      <el-form-item label="评估概述" prop="name">
        <el-input size="medium" v-model="form.name" type="textarea" :rows="1"></el-input>
      </el-form-item>
      <el-alert title="评估人员构成" type="success" :closable="false"></el-alert>  
      <el-table
        border
        :data="riskAssessorTable"
        style="width: 100%">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
          <template slot-scope="scope">
            <el-input size="medium" v-model="scope.row.name" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="项目角色" width="180"></el-table-column>
        <el-table-column prop="job" label="参与内容"></el-table-column>
      </el-table>
      <el-alert title="重要资产清单" type="success" :closable="false"></el-alert>
      <h5>硬件资产</h5>
      <el-table
        border
        :data="propertyTable.hardware"
        style="width: 100%">
        <el-table-column prop="sn" label="资产标识" width="70"></el-table-column>
        <el-table-column prop="name" label="资产名称"></el-table-column>
        <el-table-column prop="size"label="规格型号" width="90"></el-table-column>
        <el-table-column prop="ip" label="ip地址"></el-table-column>
        <el-table-column prop="people" label="负责人" width="70"></el-table-column>
        <el-table-column prop="security" label="保密性" width="80">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.security" maxlength="1" @keydown.native="checkNumber"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="integrity" label="完整性" width="80">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.integrity" maxlength="1" @keydown.native="checkNumber"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="usability" label="可用性" width="80">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.usability" maxlength="1" @keydown.native="checkNumber"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="资产价值" width="80">
          <template slot-scope="scope">
            {{getMax(scope.row.security,scope.row.integrity,scope.row.usability)}}
          </template>
        </el-table-column>
      </el-table>
      <el-alert title="威胁识别" type="success" :closable="false"></el-alert>
      <el-table
        border
        :data="threatIdentification"
        style="width: 100%">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="sn" label="资产编号" width=""></el-table-column>
        <el-table-column prop="name" label="资产名称" width=""></el-table-column>
        <el-table-column prop="thr1" label="THR-01软硬件故障" width="60">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.thr1"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="thr2" label="THR-02物理环境影响" width="60">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.thr2"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="thr3" label="THR-03无作为或操作失误" width="60">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.thr3"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="thr4" label="THR-04管理不到位" width="60">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.thr4"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="thr5" label="THR-05恶意代码" width="60">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.thr5"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="thr6" label="THR-06越权或滥用" width="60">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.thr6"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="thr7" label="THR-07网络攻击" width="60">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.thr7"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="thr8" label="THR-08物理攻击" width="60">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.thr8"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="thr9" label="THR-09泄密" width="60">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.thr9"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="thr10" label="THR-10篡改" width="60">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.thr10"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="thr11" label="THR-11抵赖" width="60">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.thr11"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-alert title="脆弱性赋值表" type="success" :closable="false"></el-alert>
      <el-table ref="multipleTable" border :span-method="objectSpanMethod" :cell-class-name="tableRowClassName"
        @cell-mouse-leave="cellMouseLeave"  @cell-mouse-enter="cellMouseEnter" :data="fragility.tableData">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="资产标识" align="center" prop="id" width="110"></el-table-column>
        <el-table-column label="资产名称" align="center" prop="name" width="110"></el-table-column>
        <el-table-column label="脆弱性类别" align="center" prop="type" width="110"></el-table-column>
        <el-table-column label="脆弱性描述" align="center" prop="typeName"></el-table-column>
        <el-table-column label="严重程度" prop="severity" align="center"  width="110">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.severity" placeholder="请选择">
              <el-option label="很高" value="很高"></el-option>
              <el-option label="高" value="高"></el-option>
              <el-option label="中" value="中"></el-option>
              <el-option label="低" value="低"></el-option>
              <el-option label="很低" value="很低"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="赋值" align="center" prop="num"  width="70">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.num"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-alert title="风险计算表" type="success" :closable="false"></el-alert>
      <el-table ref="multipleTable" border :span-method="objectSpanMethod" :cell-class-name="tableRowClassName"
        @cell-mouse-leave="cellMouseLeave"  @cell-mouse-enter="cellMouseEnter" :data="risk.tableData">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="资产标识" align="center" prop="id" width="90"></el-table-column>
        <el-table-column label="资产名称" align="center" prop="name" width="90"></el-table-column>
        <el-table-column label="威胁种类" align="center" prop="menace" width="90"></el-table-column>
        <el-table-column label="脆弱性问题" align="center" prop="fragility" width="90"></el-table-column>
        <el-table-column label="资产赋值A" prop="a" align="center" width="50"></el-table-column>
        <el-table-column label="威胁赋值T" prop="t" align="center" width="50"></el-table-column>
        <el-table-column label="脆弱性赋值V" prop="v" align="center" width="50"></el-table-column>
        <el-table-column label="安全事件发生的可能性L（L=T*V）" prop="l" align="center" width="50">
          <template slot-scope="scope">
            {{scope.row.t*scope.row.v}}
          </template>
        </el-table-column>
        <el-table-column label="安全事件发生的损失F（F=A*V）" prop="f" align="center" width="50">
          <template slot-scope="scope">
            {{scope.row.a*scope.row.v}}
          </template>
        </el-table-column>
        <el-table-column label="风险值" prop="sum" align="center"  width="50">
          <template slot-scope="scope">
            {{scope.row.a*scope.row.v*scope.row.a*scope.row.v}}
          </template>
        </el-table-column>
        <el-table-column label="风险等级" prop="level" align="center"  width="50"></el-table-column>
        <el-table-column label="风险标识" prop="sign" align="center"  width="50"></el-table-column>
         <el-table-column label="是否可接受" prop="accept" align="center"  width="50"></el-table-column> 
         <el-table-column label="风险控制建议" prop="suggest" align="center"  width="150"></el-table-column>
      </el-table>
    </el-form>
  </d2-container>
</template>

<script>
  function onlyNum(value) {
    value=value.replace(/[^0-9.]/g,'')
  }
export default {
	data() {
	    return {
	    	form:{
            beginTime:'',
            endTime:'',
            result:'',
            summary:'',
	    	},
	    	rules:{
	    	  name:[
	    	    { required: true, message: '请输入评估起止日期', trigger: 'blur' },
	    	    { pattern:/^[\u4e00-\u9fa5]{2,6}$/, message: '请输入正确的评估起止日期', trigger: 'blur' },
	    	    
	    	  ],
	    	},
        riskAssessorTable:[//重点人员
          {name: '彭强',role: '甲方项目负责人',job: '被评估机构项目负责人。'}, 
          {name: '袁毅鸣',role: '乙方项目负责人',job: '评估机构项目负责人。'}, 
          {name: '董志成',role: '甲方项目联络人',job: '负责甲方项目协调工作，配合整体调研工作。'}, 
          {name: '卢焕镇',role: '项目经理',job: '负责项目方案、计划、总结、报告起草；资产调研与分析、人员、组织、策略、数据存储、现有措施的调研；差距分析、脆弱点、威胁风险、风险值计算。'}, 
          {name: '黎富鑫',role: '应用系统检测',job: '应用系统和服务器操作系统、数据库系统的配置策略；账号、权限、日志审计策略的调研。'}, 
          {name: '韦楚彦',role: '文档管理',job: '现状调研及信息资产表的收集整理、统计；文档归档。'}, 
          {name: '董志成',role: '甲方相关人员',job: '参与调研、访谈、问卷调查等。'}, 
        ],
        propertyTable:{//重点资产
          hardware:[
            {sn:'YJ01',name:'省调度数据网实时交换机',size:'H3C S5130',ip:'36.102.26.125',people:'董志成',security:'2',integrity:'2',usability:'3',cost:'3',}
          ]
        },
        threatIdentification:[//威胁识别
          {sn:'YJ01',name:'省调度数据网实时交换机',thr1:'2',thr2:'2',thr3:'2',thr4:'2',thr5:'2',thr6:'3',thr7:'2',thr8:'1',thr9:'1',thr10:'1',thr11:'1',
          }
        ],
        fragility:{
          tableData: [
            {id: "YJ01",name: "机房",type: '物理访问控制',typeName: "机房出入口未配置电子门禁系统。",severity:'',num:''},
            {id: "YJ01",name: "机房",type: '防火',typeName: "机柜上方部署了烟雾感应器，且机房配备了手提式干粉灭火器，发现火苗时，可人工进行灭火，但未部署火灾自动消防系统，未能自动检测火情、自动报警、自动灭火。",severity:'',num:'',},
            {id: "YJ01",name: "机房",type: '防火',typeName: "机房内部建筑材料使用的是普通建筑材料，未采用具有耐火等级的建筑材料。",severity:'',num:'',},
            {id: "YJ01",name: "机房",type: '防火',typeName: "机房未进行区域划分。",severity:'',num:'',},
            {id: "YJ01",name: "机房",type: '防水和防潮',typeName: "机房墙壁采取了必要的防渗防漏等防水保护措施，目前无对外窗户，机房的屋顶和墙壁等未出现过漏水、渗透和返潮现象。",severity:'',num:'',},
            {id: "YJ01",name: "机房",type: '-',typeName: "机房安装了1台美的空调，当前温度为22℃，未配备专用的精密空调来防止水蒸气结露，没有部署漏水检测装置，未能够防止地下积水的转移和渗透。",severity:'',num:'',},
            {id: "YJ01",name: "机房",type: '防静电',typeName: "机房安装了防静电地板，并且机房地板已通过接地设施安全接地。",severity:'',num:'',},
          ],
          mergeArr: [],
          mergeArr2:[],
          hoverOrderArr: [],
          rowIndex: '-1',
        },
        
        risk:{
          tableData: [
            {id:'YJ03',name:'H3c交换机',menace:'THR-03无作为或操作失误',fragility:'交换机未采用身份鉴别措施，未配置密码复杂度和密码有效期策略。',a:'1',t:'2',v:'3',l:'6',f:'3',sum:'18',level:'一级',sign:'很低',accept:'是',suggest:'建议交换机采用身份鉴别措施，使用用户名+密码进行身份鉴别和标识，配置密码复杂度要求，要求密码8位以上且包含3种不同类型的字符；配置密码有效期180天，每180天更换一次密码。',
            },
            {id:'YJ03',name:'H3c交换机',menace:'THR-03无作为或操作失误',fragility:'交换机未配置登录失败处理功能。',a:'1',t:'2',v:'2',l:'4',f:'2',sum:'8',level:'一级',sign:'很低',accept:'是',suggest:'建议交换机配置登录失败超过3次后锁定账户10分钟；配置空闲15分钟后自动退出账户。',
            },
            {id:'YJ03',name:'H3c交换机',menace:'THR-03无作为或操作失误',fragility:'交换机未采取措施防止鉴别信息在传输过程中被窃听。',a:'1',t:'2',v:'4',l:'8',f:'4',sum:'32',level:'一级',sign:'很低',accept:'是',suggest:'建议交换机采用ssh协议进行远程管理，防止鉴别信息在传输过程中被窃听。',
            },
          ],
          mergeArr: [],
          hoverOrderArr: [],
          rowIndex: '-1',
        }
      
	   }
	},
	created() {
    this.getData();
	},
  mounted() {
    this.getSameArr('fragility')
    this.getSameArr('risk')
  },
	methods: {
    checkNumber(e){//验证只能填数字
      const reg = /^[1-9]\d*$/;
      if (e.key === 'Backspace') {
          return true;
      }
      if (!reg.test(e.key)) {
          e.returnValue = false;
          return false;
      }
      return true;
    },
    getMax(num1,num2,num3) {
        var max = 0;
        if (num1 > num2) {
            max = num1;
            if (num1 > num3) {
                return max;
            } else {
                return num3;
            }
        } else {
            max = num2;
            if (num2 > num3) {
                return max;
            } else {
                return num3;
            }
        }
    },
    getSameArr(table) {// 获取相同编号的数组
      // 资产标识+资产名称合并
      let o = {}
      this[table].tableData.forEach((item, index) => {

          item.rowIndex = index
          if (o[item.id]) {
            o[item.id].push(index)
          } else {
            o[item.id] = []
            o[item.id].push(index)
          }
      })
      for (let k in o) {
        if (o[k].length > 1) {
          this[table].mergeArr.push(o[k])
        }
      }
      if(table=='fragility'){
        // 脆弱性类别合并
        var o2 = {};
        for(var i=0;i<this[table].mergeArr.length;i++){
          for(var r=0;r<this[table].mergeArr[i].length;r++){
            if (o2[i+'_'+this[table].tableData[this[table].mergeArr[i][r]].type]) {
              o2[i+'_'+this[table].tableData[this[table].mergeArr[i][r]].type].push(this[table].mergeArr[i][r])
            } else {
              o2[i+'_'+this[table].tableData[this[table].mergeArr[i][r]].type] = []
              o2[i+'_'+this[table].tableData[this[table].mergeArr[i][r]].type].push(this[table].mergeArr[i][r])
            }
          }
        }

        for (let k in o2) {
          if (o2[k].length > 1) {
            this[table].mergeArr2.push(o2[k])
          }
        }
      }
      
    },
    objectSpanMethod({row,column,rowIndex,columnIndex}) { // 合并单元格
      var table='fragility'
      if(row.suggest){table = 'risk'}

      if (columnIndex === 1||columnIndex === 2) {
        for (let i = 0; i < this[table].mergeArr.length; i++) {
          for (let r = 0; r < this[table].mergeArr[i].length; r++) {
            let item = this[table].mergeArr[i][r]
            if (rowIndex == item) {
              if (r == 0) {
                return {
                  rowspan: this[table].mergeArr[i].length,
                  colspan: 1
                }
              } else if (r != 0) {
                return {
                  rowspan: 0,
                  colspan: 0
                }
              }
            }
          }
        }
      }
      if(table=='fragility'){
        if (columnIndex === 3) {
          for (let i = 0; i < this[table].mergeArr2.length; i++) {
            for (let r = 0; r < this[table].mergeArr2[i].length; r++) {
              let item = this[table].mergeArr2[i][r]
              if (rowIndex == item) {
                if (r == 0) {
                  return {
                    rowspan: this[table].mergeArr2[i].length,
                    colspan: 1
                  }
                } else if (r != 0) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            }
          }
        }
      }
    },
    tableRowClassName({row,rowIndex}) {//设置hover样式
      var table='fragility'
      if(row.suggest){table = 'risk'}
      
      let arr = this[table].hoverOrderArr
      for (let i = 0; i < arr.length; i++) {
        if (rowIndex == arr[i]) {
          return 'hovered-row'
        }
      }
    },
    cellMouseEnter(row, column, cell, event) {//移进鼠标加上hover样式
      var table='fragility'
      if(row.suggest){table = 'risk'}
      
      this[table].rowIndex = row.rowIndex;
      this[table].hoverOrderArr = [];
      this[table].mergeArr.forEach(item => {
          if (item.indexOf(this[table].rowIndex) >= 0) {
            this[table].hoverOrderArr = item
          }
      })
    },

    cellMouseLeave(row, column, cell, event) {//移开鼠标去掉hover样式
      var table='fragility'
      if(row.suggest){table = 'risk'}
      this[table].rowIndex = '-1'
      this[table].hoverOrderArr = [];
    },

    async getData() {

      let res = await this.$api.rickReport_ProjectDetail();
      console.log(res);
      if(res.code==20000){

      }else{
        this.$message.error(res.messager);
      }
      let res1 = await this.$api.API_ProjectfindOverallEvaluation2();
      console.log(res1)

    },
    
	},

}


</script>

<style lang="scss" scoped>
.mainForm{
  // max-width: 1000px;
}
.el-table .hovered-row {
  background: #f5f7fa;
}
.el-input__inner{
  padding:0 5px;
  text-align: center;
}
</style>

<!-- 
/**
 * @description 软件资产
 * @param {Object} data 携带的信息
 */
async rickReport_findEquipAndServerAndTerminal(data = {}) {

  data.projectId = await this.get_info();
  data.projectId = 3757;
  return request({
    url: '/dbManageSys/findDbManageSys',
    method: 'get',
    params: data
  })
},
/**
 * @description 文档
 * @param {Object} data 携带的信息
 */
async rickReport_findSecurityManageFile(data = {}) {

  data.projectId = await this.get_info();
  data.projectId = 3757;
  return request({
    url: '/securityManageFile/findSecurityManageFile',
    method: 'get',
    params: data
  })
},
/**
 * @description 人员
 * @param {Object} data 携带的信息
 */
async rickReport_findSecurityPersonnel(data = {}) {

  data.projectId = await this.get_info();
  data.projectId = 3757;
  return request({
    url: '/securityPersonnel/findSecurityPersonnel',
    method: 'get',
    params: data
  })
},
/**
 * @description 服务应用资产
 * @param {Object} data 携带的信息
 */
async rickReport_findSoftWareAndPlatform(data = {}) {

  data.projectId = await this.get_info();
  data.projectId = 3757;
  return request({
    url: '/assets/findSoftWareAndPlatform',
    method: 'get',
    params: data
  })
}, -->