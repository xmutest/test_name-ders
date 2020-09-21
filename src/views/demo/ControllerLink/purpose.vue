<!--评测目的-->
<template>
  <d2-container>
    <template slot="header">评测目的和依据</template>
    <div class="mude_is">
      <div class="mude_is_left">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>评测目的</span>
          </div>
          <div class="mude_text_item">
            <d2-quill
              style="min-height: 200px; margin-bottom: 20px;"
              v-model="goal_value"
              @text-change="textChangeHandler"
            />
          </div>
        </el-card>
        <div class="baocun">
          <el-button type="primary">提交保存</el-button>
        </div>
      </div>
      <div class="mude_is_right">
        <div class="_is_right_yi">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>评测依据选项</span>
            </div>
            <div class="yi_text_item">
              <el-checkbox-group v-model="yijv_checkList">
                <el-checkbox label="复选框 Axsxxsxs xcxxxxxxxxxxxxxxxxxxxxx1"></el-checkbox>
                <el-checkbox label="复">复选框 B</el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-card>
        </div>
        <div class="_is_right_qita">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>其他评测依据</span>
            </div>
            <div class="qt_text_item">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                placeholder="请输入内容"
                v-model="qita_text"
              ></el-input>
              <div class="to_tim">
                <el-tag>提示</el-tag>
                <span>若输入多个其他评测依据请以逗号隔开为单项结束</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      //评测目的
      goal_value: "",
      //其他依据
      qita_text: "",
      // 依据选项
      yijv_checkList: [],
    };
  },
  created() {
    this.goal_value = `安全等级测评的目的是通过对目标系统在安全技术及管理方面的测评，对目标系统的安全技术状态及安全管理状况做出初步判断，给出目标系统在安全技术及安全管理方面与其相应安全等级保护要求之间的差距。测评结论作为委托方进一步完善系统安全策略及安全技术防护措施依据。
         <br>
        为进一步提高信息系统的保障能力，根据《信息安全等级保护管理办法》（公通字2007【43】号）的精神，广州泰康粤园医院有限公司委托广州华南信息安全测评中心（广州市中邦信息工程有限公司）（DJCP2010440126）对广州泰康粤园医院医院信息系统实施等级测评，以期发现信息系统和等级保护标准的差距以及存在的安全隐患，为后续的安全整改工作提供参考依据。`;
  },
  methods: {
    textChangeHandler(delta, oldDelta, source) {
      // console.group('QuillEditor textChangeHandler')
      // console.log(delta, oldDelta, source)
      // console.groupEnd()
      console.log(this.yijv_checkList);
    },
  },
};
</script>

<style lang="scss" scoped>
.mude_is {
  display: flex;
  .mude_is_left {
    min-width: 600px;
    width: 800px;
    .baocun{
      margin-top: 20px;
    }
  }
  .mude_is_right {
    margin-left: 20px;
    width: 400px;
    ._is_right_yi {
      .yi_text_item {
        overflow: auto;
        .el-checkbox {
          display: block;
          margin: 5px 0;
        }
      }
    }
    ._is_right_qita {
      margin-top: 20px;
      .qt_text_item {
        .to_tim {
          margin-top: 10px;
          font-size: 12px;
          span {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>

