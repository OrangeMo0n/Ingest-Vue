<template>
  <div id="home">
    <div>
      <transition name="fade">
        <loading v-if="isLoading"></loading>
      </transition>
    </div>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-container>
          <el-header style="text-align: center; font-size: 30px">
            <i class="el-icon-upload">数据总量: </i>
            <span
              >{{ totalData.size }} TB | {{ totalData.datasets }} Datasets |
              {{ totalData.count }} Scenes</span
            >
          </el-header>
        </el-container>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span>昨日新增</span>
          </div>
          <div>
            <span
              >{{ dailyAddData.size }} TB | {{ dailyAddData.datasets }} Datasets
              | {{ dailyAddData.count }} Scenes</span
            >
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span>本周新增</span>
          </div>
          <div>
            <span
              >{{ weeklyAddData.size }} TB |
              {{ weeklyAddData.datasets }} Datasets |
              {{ weeklyAddData.count }} Scenes</span
            >
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span>本月新增</span>
          </div>
          <div>
            <span
              >{{ monthlyAddData.size }} TB |
              {{ monthlyAddData.datasets }} Datasets |
              {{ monthlyAddData.count }} Scenes</span
            >
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          :default-sort="{ prop: 'size', order: 'descending' }"
        >
          <el-table-column prop="name" label="数据集类型" sortable width="400">
            <template slot-scope="scope">
              <router-link
                :to="{ path: '/batch', query: { type: scope.row.name } }"
              >
                {{ scope.row.name }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" width="700">
          </el-table-column>
          <el-table-column
            prop="size"
            label="数据总量(GB)"
            sortable
            width="320"
          >
          </el-table-column>
          <el-table-column prop="count" label="数据景数" sortable width="320">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
  
<script>
import Loading from "./Loading";

export default {
  name: "Home",
  components: { Loading },
  data() {
    return {
      totalData: {},
      dailyAddData: {},
      weeklyAddData: {},
      monthlyAddData: {},
      tableData: [],
      isLoading: true,
    };
  },
  mounted() {
    let self = this;
    this.getQueryData();
  },
  methods: {
    formatValueString: function (s, n) {
      n = n >= 0 && n <= 20 ? n : 2;
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
      var t = "";
      for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
      }
      if (n == 0) return t.split("").reverse().join("");

      return t.split("").reverse().join("") + "." + r;
    },
    formatDatasetData: function (srcDatasetData) {
      let self = this;
      var formatDatasetData = srcDatasetData;
      formatDatasetData.size = formatDatasetData.size / 1024;
      formatDatasetData.size = self.formatValueString(
        formatDatasetData.size,
        2
      );
      formatDatasetData.count = self.formatValueString(
        formatDatasetData.count,
        0
      );
      return formatDatasetData;
    },
    getQueryData: function () {
      let self = this;
      let url = "http://engine.piesat.cn/ingest-stats/getList";
      console.log(url);
      this.axios({
        method: "get",
        url: url,
      })
        .then(function (repos) {
          console.log(repos);
          self.totalData = self.formatDatasetData(repos.data.total);

          self.dailyAddData = self.formatDatasetData(repos.data.daily);

          self.weeklyAddData = self.formatDatasetData(repos.data.weekly);

          self.monthlyAddData = self.formatDatasetData(repos.data.monthly);

          self.tableData = repos.data.datasets;
        })
        .then(function () {
          self.isLoading = false;
          console.log("加载完成，隐藏loading图片");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.el-header {
  background-color: #b3c0d1;
  color: rgb(34, 150, 165);
  line-height: 60px;
  border-radius: 5px;
  font-family: Arial;
}
.icon-warp {
  font-size: 50px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.fade-center,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>