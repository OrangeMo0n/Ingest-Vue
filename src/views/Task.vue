<template>
  <div>
    <el-row type="flex" align="bottom" :gutter="20">
      <el-col :span="8">
        <el-card shadow="always" style="text-align: center; font-size: 20px">
          <div slot="header">
            <span>Batch ID: {{ batchID }}</span>
          </div>
          <div>
            <span>类型: {{ dataType }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="14">
        <el-button type="primary" icon="el-icon-arrow-left" @click="goHome"
          >返回</el-button
        >
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col>
        <el-table
          :data="taskData"
          style="width: 100%"
          :cell-class-name="statusCellClassName"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="taskID" label="任务id" width="520">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="260"
            :filters="[
              { text: '初始化', value: 'init' },
              { text: '下载中', value: 'download_doing' },
              { text: '下载成功', value: 'download_success' },
              { text: '下载失败', value: 'download_fail' },
              { text: '预处理中', value: 'prepro_doing' },
              { text: '预处理成功', value: 'prepro_success' },
              { text: '预处理失败', value: 'prepro_fail' },
              { text: '上传中', value: 'upload_doing' },
              { text: '上传成功', value: 'upload_success' },
              { text: '上传失败', value: 'upload_fail' },
              { text: '已确认', value: 'confirmed' },
            ]"
            :filter-method="filterStatus"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag :type="scope.row.stateType" effect="dark">{{
                scope.row.state
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="substate" label="子状态" width="260">
          </el-table-column>
          <el-table-column prop="exceptionStatus" label="异常退出" width="230">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Loading from "./Loading";

export default {
  name: "Task",
  components: { Loading },
  data() {
    return {
      taskData: [],
      batchID: "",
      dataType: "",
      isLoading: true,
    };
  },
  mounted() {
    let self = this;
    self.dataType = this.$route.query.type;
    self.batchID = this.$route.query.id;
    console.log(self.dataType);
    console.log(self.batchID);
    this.getQueryData();
  },
  beforeRouteEnter(to, from, next) {
    console.log("加载task查询页面");
    next((vm) => {
      //vm.getQueryData();
    });
  },
  methods: {
    statusCellClassName: function ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex != 4) {
        return "";
      }
      if (row.exception == true) {
        console.log("Exception cell");
        return "exception-cell";
      } else if (row.exception == false) {
        return "normal-cell";
      }
      return "unkown-cell";
    },
    filterStatus(value, row) {
      return row.state === value;
    },
    goHome() {
      console.log("跳转到batch页面");
      this.$router.go(-1);
    },
    getQueryData: function () {
      let self = this;
      let url =
        "http://161.189.202.63:9718/engine_ingest/query/task/list?type=" +
        self.dataType +
        "&id=" +
        self.batchID;
      console.log(url);
      this.axios({
        method: "get",
        url: url,
      })
        .then(function (repos) {
          for (var i = 0, len = repos.data.data.length; i < len; i++) {
            let taskState = repos.data.data[i].state;
            let taskException = repos.data.data[i].exception;
            if (
              taskState == "download_doing" ||
              taskState == "prepro_doing" ||
              taskState == "upload_doing"
            ) {
              if (taskException == true) {
                repos.data.data[i].stateType = "danger";
              } else if (taskException == false) {
                repos.data.data[i].stateType = "warning";
              }
            } else if (taskState == "confirmed") {
              repos.data.data[i].stateType = "primary";
            } else if (taskState == "init") {
              repos.data.data[i].stateType = "info";
            } else if (taskState == "upload_success") {
              repos.data.data[i].stateType = "success";
            } else if (
              taskState == "download_fail" ||
              taskState == "prepro_fail" ||
              taskState == "upload_fail"
            ) {
              repos.data.data[i].stateType = "danger";
            } else {
              repos.data.data[i].stateType = "warning";
            }

            if (taskException == true) {
              repos.data.data[i].exceptionStatus = "Exception";
            } else {
              repos.data.data[i].exceptionStatus = "Normal";
            }

            self.taskData.push(repos.data.data[i]);
          }
        })
        .then(function () {
          //self.isLoading = false;
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
.el-table >>> .normal-cell {
  color: #67c23a;
}
.el-table >>> .exception-cell {
  color: #f56c6c;
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