<template>
  <div>
    <el-row type="flex" align="bottom" :gutter="20">
      <el-col :span="4">
        <el-card shadow="always" style="text-align: center; font-size: 20px">
          landsat8_toa
        </el-card>
      </el-col>
      <el-col :span="6" :offset="14">
        <el-button type="primary">创建</el-button>
        <el-button type="primary">选取</el-button>
        <el-button type="primary">执行</el-button>
        <el-button type="primary">删除</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col>
        <el-table
          :data="batchData"
          style="width: 100%"
          :default-sort="{ prop: 'createBatchTime', order: 'descending' }"
          :cell-class-name="statusCellClassName"
        >
          <el-table-column prop="batchID" label="批次任务id" width="320">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="260"
            :filters="[{ text: '初始化', value: 'INITITAL' }, { text: '成功', value: 'SUCCESS' },
              { text: '异常', value: 'ABORTED' }, { text: '运行中', value: 'RUNNING' }, { text: '已确认', value: 'CONFIRMED' }]"
            :filter-method="filterStatus"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === 'SUCCESS' ? 'primary' : 'success'"
                :color="scope.row.statusColor"
                :effect="plain"
                disable-transitions>{{scope.row.status}}</el-tag>
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
export default {
  name: "Batch",
  data() {
    return {
      batchData: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log("加载batch查询页面");
    next((vm) => {
      vm.getQueryData();
    });
  },
  methods: {
    "statusCellClassName": function({ row, column, rowIndex, columnIndex }) {
      if (columnIndex != 1) {
        return '';
      }
      if (row.status == 'SUCCESS') {
        console.log(rowIndex + row.status);
        return 'success-cell';
      } else if (row.status == "CONFIRMED") {
        console.log(rowIndex + row.status);
        return "confirmed-cell";
      } else if (row.status == "ABORTED") {
        return "aborted-cell";
      } else if (row.status == "INITITAL") {
        return "initial-cell";
      } else if (row.status == "RUNNING") {
        return "running-cell";
      }
      return 'unkown-cell';
    },
    filterStatus(value, row) {
      return row.status === value;
    },
    getQueryData: function () {
      let self = this;
      this.axios({
        method: "get",
        url:
          "http://127.0.0.1:8780/engine_ingest/query/batch/list?type=landsat8_sr",
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
            if (batchStatus == 'SUCCESS') {
              repos.data.data[i].statusColor = '#67c23a';
            } else if (batchStatus == "CONFIRMED") {
              repos.data.data[i].statusColor = '#409eff';
            } else if (batchStatus == "ABORTED") {
              repos.data.data[i].statusColor = 'red';
            } else if (batchStatus == "INITITAL") {
              repos.data.data[i].statusColor = 'gray';
            } else if (batchStatus == "RUNNING") {
              repos.data.data[i].statusColor = 'yellow';
            }

            self.batchData.push(repos.data.data[i]);
          }
          console.log(self.batchData);
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
</style>