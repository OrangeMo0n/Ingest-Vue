<template>
  <div>
    <div>
      <transition name="fade">
        <loading v-if="isLoading"></loading>
      </transition>
    </div>
    <el-row type="flex" align="bottom" :gutter="20">
      <el-col :span="4">
        <el-card shadow="always" style="text-align: center; font-size: 20px">
          {{ dataType }}
        </el-card>
      </el-col>
      <el-col :span="6" :offset="14">
        <el-button type="primary">创建</el-button>
        <el-button type="primary">选取</el-button>
        <el-button type="primary">执行</el-button>
        <el-button type="primary">删除</el-button>
        <el-button type="primary" icon="el-icon-arrow-left" @click="goHome"
          >返回</el-button
        >
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col>
        <el-table
          :data="batchData"
          stripe
          style="width: 100%"
          :default-sort="{ prop: 'createBatchTime', order: 'descending' }"
          :cell-class-name="statusCellClassName"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="batchID" label="批次任务id" width="320">
            <template slot-scope="scope">
              <router-link
                :to="{
                  path: '/task',
                  query: {
                    type: scope.row.dataSourceType,
                    id: scope.row.batchID,
                  },
                }"
              >
                {{ scope.row.batchID }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="260"
            :filters="[
              { text: '初始化', value: 'INITITAL' },
              { text: '成功', value: 'SUCCESS' },
              { text: '异常', value: 'ABORTED' },
              { text: '运行中', value: 'RUNNING' },
              { text: '已确认', value: 'CONFIRMED' },
            ]"
            :filter-method="filterStatus"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag :type="scope.row.statusType" effect="dark">{{
                scope.row.status
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="batchTag" label="别称" width="260">
          </el-table-column>
          <el-table-column
            prop="createBatchTime"
            label="创建时间"
            sortable
            width="230"
          >
          </el-table-column>
          <el-table-column
            prop="startProTime"
            label="开始时间"
            sortable
            width="230"
          >
          </el-table-column>
          <el-table-column
            prop="endProTime"
            label="结束时间"
            sortable
            width="230"
          >
          </el-table-column>
          <el-table-column prop="progress" label="进度" width="260">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Loading from "./Loading";

export default {
  name: "Batch",
  components: { Loading },
  data() {
    return {
      batchData: [],
      dataType: "landsat7_toa",
      isLoading: true,
    };
  },
  mounted() {
    let self = this;
    self.dataType = this.$route.query.type;
    if (self.dataType == null || self.dataType == "") {
      console.log(self.dataType);
      self.dataType = "landsat7_toa";
    }
    console.log(self.dataType);
    this.getQueryData();
  },
  beforeRouteEnter(to, from, next) {
    console.log("加载batch查询页面");
    next((vm) => {
      //vm.getQueryData();
    });
  },
  methods: {
    statusCellClassName: function ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex != 1) {
        return "";
      }
      if (row.status == "SUCCESS") {
        return "success-cell";
      } else if (row.status == "CONFIRMED") {
        return "confirmed-cell";
      } else if (row.status == "ABORTED") {
        return "aborted-cell";
      } else if (row.status == "INITITAL") {
        return "initial-cell";
      } else if (row.status == "RUNNING") {
        return "running-cell";
      }
      return "unkown-cell";
    },
    filterStatus(value, row) {
      return row.status === value;
    },
    goHome() {
      console.log("跳转到home页面");
      this.$router.push("/home");
    },
    getQueryData: function () {
      let self = this;
      let url =
        "http://161.189.202.63:9718/engine_ingest/query/batch/list?type=" +
        self.dataType;
      console.log(url);
      this.axios({
        method: "get",
        url: url,
      })
        .then(function (repos) {
          for (var i = 0, len = repos.data.data.length; i < len; i++) {
            let batchProgress = "";
            batchProgress =
              repos.data.data[i].initCount +
              "/" +
              repos.data.data[i].runningCount +
              "/" +
              repos.data.data[i].successCount +
              "/" +
              repos.data.data[i].failedCount +
              "/" +
              repos.data.data[i].confirmedCount +
              "/" +
              repos.data.data[i].allCount;
            repos.data.data[i].progress = batchProgress;

            let batchStatus = repos.data.data[i].status;
            if (batchStatus == "SUCCESS") {
              repos.data.data[i].statusColor = "#67c23a";
              repos.data.data[i].statusType = "success";
            } else if (batchStatus == "CONFIRMED") {
              repos.data.data[i].statusColor = "#409eff";
              repos.data.data[i].statusType = "primary";
            } else if (batchStatus == "ABORTED") {
              repos.data.data[i].statusColor = "red";
              repos.data.data[i].statusType = "danger";
            } else if (batchStatus == "INITITAL") {
              repos.data.data[i].statusColor = "gray";
              repos.data.data[i].statusType = "info";
            } else if (batchStatus == "RUNNING") {
              repos.data.data[i].statusColor = "yellow";
              repos.data.data[i].statusType = "warning";
            }

            self.batchData.push(repos.data.data[i]);
          }
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
.el-table >>> .success-cell {
  color: #67c23a;
}
.el-table >>> .confirmed-cell {
  color: #409eff;
}
.el-table >>> .aborted-cell {
  color: #f56c6c;
}
.el-table >>> .initial-cell {
  background: #909399;
}
.el-table >>> .running-cell {
  background: #e6a23c;
}
.el-table >>> .unkown-cell {
  background: #ffffff;
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