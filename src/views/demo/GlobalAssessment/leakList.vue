<!--安全控制间安全测评cmjaqcp-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">漏洞扫描报告</div>
            <div class="ScTlist">
              <div class="scanningTool">
                <span class="scanningToolName">(1)主机扫描工具</span>
                <el-select size="mini" v-model="toolName" placeholder="请选择">
                  <el-option
                    v-for="item in scanningTool"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <div class="scanningupload">
                  <DaoruLou :sonValue="{ toolName, api: 1 }"></DaoruLou>
                </div>
              </div>
              <div class="scanningTool">
                <span class="scanningToolName">(2)应用系统扫描工具</span>
                <el-select
                  size="mini"
                  v-model="ScantoolName"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in systemScanTool"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <div class="scanningupload">
                  <DaoruLou :sonValue="{ ScantoolName, api: 2 }"></DaoruLou>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="tijiaobaoc">
            <el-button type="primary" @click="submitReport">保存</el-button>
          </div> -->
        </el-card>
      </div>
      <!-- 图片 -->
    </div>
  </d2-container>
</template>

<script>
import DaoruLou from "./daorudou/daoruloudou.vue";
export default {
  data() {
    return {
      dataList: [],
      // 主机扫描工具
      scanningTool: [
        { id: 1, value: "绿盟" },
        { id: 2, value: "天镜" },
        { id: 3, value: "Nessus" },
      ],
      toolName: 1,
      //   应用系统扫描工具
      systemScanTool: [
        { id: 1, value: "绿盟" },
        { id: 2, value: "天镜" },
        { id: 3, value: "Nessus" },
        { id: 4, value: "AppScan" },
      ],
      ScantoolName: 2,
    };
  },
  created() {},
  components: {
    DaoruLou,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.mude_is {
  margin: 20px 0;
  .mude_is_left {
    margin: 20px 0;
  }
  .to_tim {
    margin-top: 5px;
    .el-tag {
      margin-right: 5px;
    }
  }
  .descTItle {
    @extend %unable-border-left;
  }
}
.el-card__header {
  border-bottom: 0px solid #ebeef5;
}
.ScTlist {
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .scanningTool {
    .scanningToolName {
      font-size: 14px;
      margin: 10px 10px 10px 0;
      font-family: "Courier New", Courier, monospace;
    }
    .scanningupload {
      margin: 20px 0;
    }
  }
}
</style>
