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
        <el-table :data="batchData" stripe style="width: 100%">
          <el-table-column prop="batchID" label="批次任务id" width="320">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="260">
          </el-table-column>
          <el-table-column prop="batchTag" label="别称" width="260">
          </el-table-column>
          <el-table-column prop="createBatchTime" label="创建时间" width="230">
          </el-table-column>
          <el-table-column prop="startProTime" label="开始时间" width="230">
          </el-table-column>
          <el-table-column prop="endProTime" label="结束时间" width="230">
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
    getQueryData: function () {
      let self = this;
      this.axios({
        method: "get",
        url:
          "http://127.0.0.1:8780/engine_ingest/query/batch/list?type=landsat8_sr",
      })
        .then(function (repos) {
          for (var i = 0, len = repos.data.data.length; i < len; i++) {
            console.log(repos.data.data[i]);
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

<style scoped>
</style>