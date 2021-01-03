<template>
  <div id="home">
    <el-row>
      <el-col :span="16" :offset="4">
        <el-container>
          <el-header style="text-align: center; font-size: 30px">
            <i class="el-icon-upload">数据总量: </i>
            <span>800 TB | 66 Datasets | 1,780,235 Scenes</span>
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
            <span>12 TB | 1 Datasets | 9823 Scenes</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span>本周新增</span>
          </div>
          <div>
            <span>80 TB | 3 Datasets | 19823 Scenes</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span>昨日新增</span>
          </div>
          <div>
            <span>312 TB | 5 Datasets | 119823 Scenes</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="datatype" label="数据集类型" width="320">
          </el-table-column>
          <el-table-column prop="size" label="数据总量(GB)" width="260">
          </el-table-column>
          <el-table-column prop="scene" label="数据景数" width="260"> 
          </el-table-column>
          <el-table-column prop="init" label="初始化任务数" width="170"> 
          </el-table-column>
          <el-table-column prop="running" label="运行中任务数" width="170"> 
          </el-table-column>
          <el-table-column prop="success" label="成功任务数" width="170"> 
          </el-table-column>
          <el-table-column prop="failed" label="失败任务数" width="170"> 
          </el-table-column>
          <el-table-column prop="confirmed" label="已确认任务数" width="170"> 
          </el-table-column>
          <el-table-column prop="all" label="总任务数" width="170"> 
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
  
<script>
export default {
  name: "Home",
  data() {
    return {
      tableData:[{
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      },
      {
        datatype: 'landsat8_toa',
        size: '198245.23',
        scene: '129342',
        init: '10',
        running: '50',
        success: '200',
        failed: '2',
        confirmed: '300',
        all: '362'
      }
      ]
    }
  }
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
</style>