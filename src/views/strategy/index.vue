<template>
  <div class="app-container">
    <el-tabs type="card" value="first">
      <el-tab-pane label="基础设置" name="first">
        <el-form ref="base" :model="baseInfo" label-width="140px">
          <el-form-item label="火币策略名称:" prop="strategyName" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-col :span="6">
              <el-input v-model="baseInfo.strategyName" placeholder="请不要些重名"/>
            </el-col>
          </el-form-item>

          <el-form-item label="周期时间:">
            <el-row>
              <el-col>
                <el-input-number v-model="baseInfo.minSleep" :min="0" :max="100"></el-input-number>
                <span>—</span>
                <el-input-number v-model="baseInfo.maxSleep" :min="0" :max="100"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-tab-pane>


      <el-tab-pane label="N档做市" name="second">
        <el-form ref="setting1" :model="setting1" label-width="120px" :rules="gearRules" >
          <el-form-item label="是否开启:">
            <el-switch
              v-model="setting1.able"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="开启"
              inactive-text="关闭"
            ></el-switch>
          </el-form-item>

          <el-form-item label="买卖挡位:" prop="gears" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-input-number v-model="setting1.gears" :min="1" :max="1000" :step="0.5"></el-input-number>
            </el-row>
          </el-form-item>

          <el-form-item label="盘口停留时间:"prop="minWaitTime" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col>
                <el-input-number v-model="setting1.minWaitTime" :min="1" :max="1000"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting1.maxWaitTime" :min="1" :max="1000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="委托数量:"prop="minEntrustAmount" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col>
                <el-input-number v-model="setting1.minEntrustAmount" :min="0" :max="1000" :step="0.5"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting1.maxEntrustAmount" :min="0" :max="1000" :step="0.5"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="买比值:"prop="buyRate" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col :span="5">
                <el-input-number v-model="setting1.buyRate" :min="0.01" :max="1" :step="0.05"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="卖比值:" prop="sellRate" label-width='140px' >
            <el-row>
              <el-col :span="5">
                <el-input-number v-model="setting1.sellRate" :min="1.01" :max="10" :step="0.05"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>


          <el-form-item label="交易对选择:" prop="symbols" label-width='140px'  :rules="[
			      { required: true, message: '请选择交易对'}
			    ]">
            <el-select :filterable="true" v-model="setting1.symbols" placeholder="请选择交易对">
              <el-option
                v-for="item in symbols"
                :key="item.symbol"
                :label="item.symbol"
                :value="`${item.baseCurrency}/${item.quoteCurrency}`"
              ></el-option>
            </el-select>
          </el-form-item>



          <el-form-item>
            <el-col :offset="11">
              <el-button type="warning" @click="submitForm('setting1')">{{title}}</el-button>
            </el-col>
          </el-form-item>

        </el-form>
      </el-tab-pane>


      <el-tab-pane label="一档做市" name="third">
        <el-form ref="setting2" :model="setting2" label-width="120px">
          <el-form-item label="是否开启:">
            <el-switch
              v-model="setting2.able"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="开启"
              inactive-text="关闭"
            ></el-switch>
          </el-form-item>


          <el-form-item label="订单停留时间:" prop="waitTimeMin" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col>
                <el-input-number v-model="setting2.waitTimeMin" :min="1" :max="1000"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting2.waitTimeMax" :min="1" :max="1000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="委托数量:" prop="amountMin" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col>
                <el-input-number v-model="setting2.amountMin" :min="1" :max="1000"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting2.amountMax" :min="1" :max="1000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>


          <el-form-item label="买卖比值:" prop="range" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col :span="5">
                <el-input-number v-model="setting2.range" :min="0" :max="100"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>


          <el-form-item label="交易对选择:" prop="symbol" label-width='140px'  :rules="[
			      { required: true, message: '请选择交易对'}
			    ]">
            <el-select :filterable="true" v-model="setting2.symbol" placeholder="请选择交易对">
              <el-option
                v-for="item in symbols"
                :key="item.symbol"
                :label="item.symbol"
                :value="`${item.baseCurrency}/${item.quoteCurrency}`"
              ></el-option>
            </el-select>
          </el-form-item>



          <el-form-item>
            <el-col :offset="10">
              <el-button type="warning" @click="submitForm('setting2')">{{title}}</el-button>
            </el-col>
          </el-form-item>


        </el-form>
      </el-tab-pane>

      <el-tab-pane label="三角套利策略" name="fourth">
        <el-form ref="setting3" :model="setting3" label-width="120px">
          <el-form-item label="是否开启:">
            <el-switch
              v-model="setting3.able"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="开启"
              inactive-text="关闭"
            ></el-switch>
          </el-form-item>


          <el-form-item label="交易对1:" prop="sym1" label-width='140px'  :rules="[
			      { required: true, message: '请选择交易对'}
			    ]">
            <el-select :filterable="true" v-model="setting3.sym1" placeholder="请选择交易对">
              <el-option
                v-for="item in symbols"
                :key="item.symbol"
                :label="item.symbol"
                :value="`${item.baseCurrency}/${item.quoteCurrency}`"
              ></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="交易对2:" prop="sym2" label-width='140px'  :rules="[
			      { required: true, message: '请选择交易对'}
			    ]">
            <el-select :filterable="true" v-model="setting3.sym2" placeholder="请选择交易对">
              <el-option
                v-for="item in symbols"
                :key="item.symbol"
                :label="item.symbol"
                :value="`${item.baseCurrency}/${item.quoteCurrency}`"
              ></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="交易对3:" prop="sym3" label-width='140px'  :rules="[
			      { required: true, message: '请选择交易对'}
			    ]">
            <el-select :filterable="true" v-model="setting3.sym3" placeholder="请选择交易对">
              <el-option
                v-for="item in symbols"
                :key="item.symbol"
                :label="item.symbol"
                :value="`${item.baseCurrency}/${item.quoteCurrency}`"
              ></el-option>
            </el-select>
          </el-form-item>



          <el-form-item label="数量1:"  prop="q1" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting3.q1" :min="0" :max="100000"/>
            </el-col>
          </el-form-item>
          <el-form-item label="数量2:"  prop="q2" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting3.q2" :min="0" :max="100000"/>
            </el-col>
          </el-form-item>
          <el-form-item label="数量3:" prop="q3" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting3.q3" :min="0" :max="100000"/>
            </el-col>
          </el-form-item>

          <el-form-item label="交易手续费:" prop="fee" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting3.fee" :min="0" :max="3"/>
            </el-col>
          </el-form-item>

          <el-form-item label="交易对选择:" prop="currencys" label-width='140px'>
            <el-checkbox-group v-model="setting3.currencys">
              <el-checkbox label="1">usdt</el-checkbox>
              <el-checkbox label="2">第三个交易对的支付币</el-checkbox>
              <el-checkbox label="3">第三个交易对的交易币</el-checkbox>
            </el-checkbox-group>
          </el-form-item>


          <el-form-item>
            <el-col :offset="10">
              <el-button type="warning" @click="submitForm('setting3')">{{title}}</el-button>
            </el-col>
          </el-form-item>


        </el-form>
      </el-tab-pane>



      <el-tab-pane label="机器人策略" name="four">
        <el-form ref="setting4" :model="setting4" label-width="120px">
          <el-form-item label="是否开启:">
            <el-switch
              v-model="setting4.able"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="开启"
              inactive-text="关闭"
            ></el-switch>
          </el-form-item>

          <el-form-item label="交易对的买卖数量区间:" prop="volMin" label-width='240px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col >
                <el-input-number v-model="setting4.volMin" :min="0" :max="100000"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting4.volMax" :min="0" :max="100000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>


          <el-form-item label="价格区间(不填默认执行买卖一档区间):" prop="priceMin"  label-width='240px'>
            <el-row>
              <el-col>
                <el-input-number v-model="setting4.priceMin" :min="0" :max="100000"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting4.priceMax" :min="0" :max="100000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="买卖一档的价格区间过小则不交易:"  prop="thresholdMin"  label-width='240px'  :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col>
                <el-input-number v-model="setting4.thresholdMin" :min="0" :max="100000"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting4.thresholdMax" :min="0" :max="100000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>






          <el-form-item label="交易对选择:" prop="autosymbol" label-width='240px'  :rules="[
			      { required: true, message: '请选择交易对'}
			    ]">
            <el-select :filterable="true" v-model="setting4.symbol" placeholder="请选择交易对">
              <el-option
                v-for="item in symbols"
                :key="item.symbol"
                :label="item.symbol"
                :value="`${item.baseCurrency}/${item.quoteCurrency}`"
              ></el-option>
            </el-select>
          </el-form-item>


          <el-form-item>
            <el-col :offset="10">
              <el-button type="warning" @click="submitForm('setting4')">{{title}}</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-tab-pane>




      <el-tab-pane label="限价买入卖出">
        <el-form ref="setting7" :model="setting7" label-width="120px">
          <el-form-item label="是否开启:">
            <el-switch
              v-model="setting7.able"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="开启"
              inactive-text="关闭"
            ></el-switch>
          </el-form-item>

          <el-form-item label="交易量（买）:" prop="buyNum"  label-width='240px'  :rules="[
			      { required: true, message: '交易量（买）不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting7.buyNum" :min="0" :max="10000"></el-input-number>
            </el-col>
          </el-form-item>

          <el-form-item label="交易量（卖）:" prop="sellNum"  label-width='240px'  :rules="[
			      { required: true, message: '交易量（卖）不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting7.sellNum" :min="0" :max="10000"></el-input-number>
            </el-col>
          </el-form-item>

          <el-form-item label="总交易量（买）:" prop="buyTotalNum"  label-width='240px'  :rules="[
			      { required: true, message: '总交易量（买）不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting7.buyTotalNum"  :min="0" :max="10000"></el-input-number>
            </el-col>
          </el-form-item>

          <el-form-item label="总交易量（卖）:" prop="sellTotalNum"  label-width='240px'  :rules="[
			      { required: true, message: '总交易量（卖）不能为空'}
			    ]">
            <el-col :span ="6">
              <el-input-number v-model="setting7.sellTotalNum"  :min="0" :max="10000"></el-input-number>
            </el-col>
          </el-form-item>

          <el-form-item label="买入交易价格倍数:" prop="buyRate"  label-width='240px'  :rules="[
			      { required: true, message: '买入交易价格倍数不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting7.buyRate"  :min="0" :max="10000"></el-input-number>
            </el-col>
          </el-form-item>


          <el-form-item label="卖出交易价格倍数:" prop="sellRate"  label-width='240px'  :rules="[
			      { required: true, message: '卖出交易价格倍数不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting7.sellRate"  :min="0" :max="10000"></el-input-number>
            </el-col>
          </el-form-item>

          <el-form-item label="实时价格最低最高限买（买）:" prop="buyPriceLimit"  label-width='240px'  :rules="[
			      { required: true, message: '实时价格最低最高限买（买）不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting7.buyPriceLimit"  :min="0" :max="10000"></el-input-number>
            </el-col>
          </el-form-item>

          <el-form-item label="实时价格最低最高限制（卖）:" prop="sellPriceLimit"  label-width='240px'  :rules="[
			      { required: true, message: '实时价格最低最高限制（卖）不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting7.sellPriceLimit"  :min="0" :max="10000"></el-input-number>
            </el-col>
          </el-form-item>


          <el-form-item label="交易对选择:" prop="symbol" label-width='240px'  :rules="[
			      { required: true, message: '请选择交易对'}
			    ]">
            <el-select :filterable="true" v-model="setting7.symbol" placeholder="请选择交易对">
              <el-option
                v-for="item in symbols"
                :key="item.symbol"
                :label="item.symbol"
                :value="`${item.baseCurrency}/${item.quoteCurrency}`"
              ></el-option>
            </el-select>
          </el-form-item>


          <el-form-item>
            <el-col :offset="10">
              <el-button type="warning" @click="submitForm('setting7')">{{title}}</el-button>
            </el-col>
          </el-form-item>


        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane :label="title" name="last">

      </el-tab-pane>-->


    </el-tabs>
<!--    <el-row>-->
<!--      <el-col :offset="10">-->
<!--        <el-button type="warning" @click="onSubmit()">{{title}}</el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
</template>

<script>
import { addOrUpdateStrategy, getStrategyById } from "@/api/strategy.js";
export default {
  data() {
    return {
      id: "",
      title: "创建",
      baseInfo: {
        strategyName: "",
        minSleep: "0",
        maxSleep: "2",
        type:0,
        pricePrecision:4,
        amountPrecision:4
      },

      setting1: {
        able:false,
        gears: 20,
        minWaitTime: 1,
        maxWaitTime: 10,
        minEntrustAmount: 1,
        maxEntrustAmount: 1000,
        buyRate: "0.5",
        sellRate :"1.2",
        symbols: ""
      },

      setting2: {
        able: false,
        waitTimeMin: 0,
        waitTimeMax: 10,
        amountMin:1,
        amountMax:10,
        range:0.3,
        symbol: ""
      },


    setting3: {
        able: false,
        sym1: "",
        sym2: "",
        sym3: "",
        q1: "",
        q2: 0,
        q3: 0,
        fee:0.2,
        priceScale:2,
        volScale:2
      },


      setting7: {
        able:false,
        symbol: "",
        buyNum: "",
        sellNum: "",
        buyTotalNum: "",
        sellTotalNum: 0,
        buyRate: 0,
        sellRate:0.2,
        buyPriceLimit:2,
        sellPriceLimit:2
      },

      setting4: {
        able: false,
        symbol: "",
        volMin: "",
        volMax: "",
        intervalTimeMin: "",
        intervalTimeMax: 0,
        priceScale: 0,
        volScale:0,
        priceMin:0,
        priceMax:0,
        thresholdMin:0,
        thresholdMax:0
      },
      setting5: {
        buyStrategy: [
          {
            id: 1,
            buyKlineOption: "1",
            buyKline: "1min",
            buyWeights: 0,
            buyPercent: ""
          }
        ],
        sellStrategy: [
          {
            id: 1,
            sellKlineOption: "1",
            sellKline: "1min",
            sellWeights: 0,
            sellPercent: ""
          }
        ]
      },
      setting6: {
        isAble: false,
        takeProfit: 0,
        stopLoss: 0
      },
      //1min, 5min, 15min, 30min, 60min, 1day, 1mon, 1week, 1year
      klines: [
        {
          value: "1min",
          label: "1min"
        },
        {
          value: "5min",
          label: "5min"
        },
        {
          value: "15min",
          label: "15min"
        },
        {
          value: "30min",
          label: "30min"
        },
        {
          value: "60min",
          label: "60min"
        },
        {
          value: "1day",
          label: "1day"
        },
        {
          value: "1mon",
          label: "1mon"
        },
        {
          value: "1week",
          label: "1week"
        },
        {
          value: "1year",
          label: "1year"
        }
      ],
      increS5Buy: 1,
      increS5Sell: 1
    };
  },
  created() {
    const id = this.$route.query.id;
    this.id = id;
    if (this.id !== undefined) {
      this.title = "修改";
      var params = {
        id: this.id
      };
      const data = getStrategyById(params).then(data => {
        data = data.data;
        this.setting1 = JSON.parse(data.setting1);
        this.setting2 = JSON.parse(data.setting2);
        this.setting3 = JSON.parse(data.setting3);
        this.setting4 = JSON.parse(data.setting4);
        this.setting7 = JSON.parse(data.setting7);
        this.baseInfo.strategyName = data.strategyName;
        this.baseInfo.minSleep = data.minSleep;
        this.baseInfo.maxSleep = data.maxSleep;
        this.baseInfo.profit = data.profit;
        this.baseInfo.sleep = data.sleep;
        this.baseInfo.type = 0;
        console.log(this.setting5);
        if (this.setting6.isAble == 1) {
          this.setting6.isAble = true;
        }

        if (data.isLimitPrice === 1) {
          //限价
          this.baseInfo.isLimitPrice = true;
          this.baseInfo.buyPrice = data.buyPrice;
          this.baseInfo.sellPrice = data.sellPrice;

          if (data.isAllBuy === 1) {
            //全部买
            this.baseInfo.isAllBuy = true;
          } else {
            this.baseInfo.isAllBuy = false;
            this.baseInfo.buyAmount = data.buyAmount;
          }
        } else {
          //市价 没有购买 卖出 价格设置
          this.baseInfo.isLimitPrice = false;
          if (data.isAllBuy === 1) {
            //全部买
            this.baseInfo.isAllBuy = true;
          } else {
            this.baseInfo.isAllBuy = false;
            this.baseInfo.buyQuotaPrice = data.buyQuotaPrice;
          }
        }

        if (data.isAllSell === 1) {
          //全部卖
          this.baseInfo.isAllSell = true;
        } else {
          this.baseInfo.isAllSell = false;
          this.baseInfo.sellAmount = data.sellAmount;
        }
      });
    } else {
      title: "创建";
    }
  },
  methods: {
    async onSubmit() {
      var requestData = {
        id: this.id,
        baseInfo: this.baseInfo,
        setting1: this.setting1,
        setting2: this.setting2,
        setting3: this.setting3,
        setting4: this.setting4,
        setting7: this.setting7
      };
      const data = await addOrUpdateStrategy(requestData);
      if (data.code === 20000) {
        this.$notify({
          title: "操作成功",
          message: this.id === undefined ? "创建成功！！！" : "修改成功！！！",
          type: "success",
          duration: 2000
        });
        this.id = data.data;
        this.title = "修改";
        // this.$router.push({ path: "/strategy/list" });
      }
    },
    handleCreate(type) {
      if (type === 1) {
        this.increS5Buy = this.increS5Buy + 1;
        const newNode = {
          id: this.increS5Buy,
          buyKlineOption: "1",
          buyKline: "1min",
          buyWeights: 0,
          buyPercent: ""
        };
        this.setting5.buyStrategy.push(newNode);
      }
      if (type === 2) {
        this.increS5Sell = this.increS5Sell + 1;
        const newNode = {
          id: this.increS5Sell,
          sellKlineOption: "1",
          sellKline: "1min",
          sellWeights: 0,
          sellPercent: ""
        };
        this.setting5.sellStrategy.push(newNode);
      }
    },
    handleDelete(value, type) {
      if (type === 1) {
        if (this.setting5.buyStrategy.length === 1) {
          this.$notify({
            title: "警告",
            message: "必须保留一个策略",
            type: "warning"
          });
          return;
        }
        this.setting5.buyStrategy.splice(value - 1, 1);
      }
      if (type === 2) {
        if (this.setting5.sellStrategy.length === 1) {
          this.$notify({
            title: "警告",
            message: "必须保留一个策略",
            type: "warning"
          });
          return;
        }
        this.setting5.sellStrategy.splice(value - 1, 1);
      }
    }
  }
};
</script>
<style>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    margin-bottom: 6px;
  }
  .left {
    margin-left: 15px;
  }
  .create {
    margin-left: 600px;
    margin-top: 200px;
  }
</style>
