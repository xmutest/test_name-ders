<template>
  <div class="province-city">
    <div>
      <span>所属省：</span>

      <el-select
        size="small"
        v-model="province"
        placeholder="请选择"
        @change="provinceChanged"
      >
        <el-option :key="''" :label="'全部'" :value="''"> </el-option>
        <el-option
          v-for="item in provinces"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        >
        </el-option>
      </el-select>
    </div>
    <div>
      <span>所属市：</span>
      <el-select
        size="small"
        v-model="city"
        :loading="loadingCity"
        @change="cityChanged"
        placeholder="请选择"
      >
        <el-option :key="''" :label="'全部'" :value="''"> </el-option>
        <el-option
          v-for="item in cities"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>
 
<script>
import provinceCity from "./provinceCity";
export default {
  name: "provinceCity",
  props: {
    provinceCode: {
      type: String,
      default: "",
    },
    cityCode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loadingCity: false,
      province: "",
      city: "",
      provinces: [],
      cities: [],
      provinceName:'',
      cityNmae :""
    };
  },
  created() {
    this.provinces = provinceCity.provinces;
  },
  computed: {},
  mounted() {
    this.province = this.provinceCode;
    this.provinceChanged(this.provinceCode);
    this.city = this.cityCode;
  },

  methods: {
    provinceChanged(value) {
      if (value !== "") {
        this.loadingCity = true;
        for (var item of this.provinces) {
          if (item.code === value) {
            this.provinceName=item.name;
            this.cities = item.cities;
            this.city = "";
            this.loadingCity = false;
            break;
          } else {
            continue;
          }
        }
      } else {
        this.cities = [];
        this.city = "";
      }
      this.$emit("selectChange", this.provinceName, this.cityNmae);
    },
    cityChanged(value) {
      if (value !== "") {
        for (var item of this.cities) {
          if (item.code === value) {
            this.cityNmae = item.name;
            break;
          } else {
            continue;
          }
        }
      }
      this.$emit("selectChange", this.provinceName, this.cityNmae);
    },
    resetProviceCity(province, city) {
      this.cities = [];
      if (province && city) {
        this.province = province;
        this.provinceChanged(this.province);
        this.city = city;
      } else {
        this.province = "";
        this.city = "";
      }
    },
  },
};
</script>
 
<style lang="scss" scoped>
.province-city {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .el-select {
    display: inline-block;
  }
}
</style>