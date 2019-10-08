<template>
  <div class="app-container">
    <div class="filter-container">

    </div>
    <div style="magin:20px">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="robotId" label="机器人id"></el-table-column>
        <el-table-column prop="msg" label="详细日志"></el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | formatDate }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getLogs"
    />
  </div>
</template>

<script>
import { getLogsByRid } from "@/api/logs.js";
import Pagination from "@/components/Pagination";
import { formatDate } from "@/utils/date.js";
export default {
  components: { Pagination },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },

  },
  data() {
    return {
      robotId: "",
      tableData: [],
      total: 1,
      listQuery: {
        rid: "",
        page: 1,
        limit: 10
      }
    };
  },
  created() {
    const id = this.$route.query.id;
    console.log("robot====" + id);
    this.robotId = id;
    this.listQuery.rid = id;
    this.getLogs();
  },
  methods: {
    async getLogs() {
      const data = await getLogsByRid(this.listQuery);
      this.tableData = data.data.records;
      this.total = data.data.total;
    }
  }
};
</script>
