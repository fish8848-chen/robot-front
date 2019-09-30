<template>
  <div class="app-container">
    <el-tabs type="card" value="first">
      <el-tab-pane label="基础设置" name="first">
        <el-form ref="base" :model="baseInfo" label-width="140px">
          <el-form-item label="btfun策略名称:">
            <el-col :span="6">
              <el-input v-model="baseInfo.strategyName" placeholder="请不要些重名"/>
            </el-col>
          </el-form-item>

          <el-form-item label="周期时间:">
            <el-row>
              <el-col>
                <el-input-number v-model="baseInfo.minSleep" :min="0.1" :max="100"></el-input-number>
                <span>—</span>
                <el-input-number v-model="baseInfo.maxSleep" :min="0" :max="100"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="价格精度:">
            <el-row>
              <el-col>
                <el-input-number v-model="baseInfo.pricePrecision" :min="1" :max="32"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="数量的精度:">
            <el-row>
              <el-col>
                <el-input-number v-model="baseInfo.amountPrecision" :min="1" :max="32"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

        </el-form>
      </el-tab-pane>

      <el-tab-pane label="N档做市" name="second">
        <el-form ref="ngears" :model="setting1" label-width="120px" :rules="makeMarketRules">
          <el-form-item label="是否开启:">
            <el-switch
              v-model="setting1.able"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="开启"
              inactive-text="关闭"
            ></el-switch>
          </el-form-item>

          <el-form-item label="买卖挡位:">
            <el-row>
              <el-input-number v-model="setting1.gears" :min="1" :max="1000"></el-input-number>
            </el-row>
          </el-form-item>

          <el-form-item label="盘口停留时间:">
            <el-row>
              <el-col>
                <el-input-number v-model="setting1.minWaitTime" :min="1" :max="1000"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting1.maxWaitTime" :min="1" :max="1000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="委托单数:">
            <el-row>
              <el-col>
                <el-input-number v-model="setting1.minEntrustAmount" :min="1" :max="1000"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting1.maxEntrustAmount" :min="1" :max="1000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="买比值:">
            <el-row>
              <el-col :span="5">
                <el-input v-model="setting1.buyRate"></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="卖比值:">
            <el-row>
              <el-col :span="5">
                <el-input v-model="setting1.sellRate"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="交易对:">
            <el-col :span="6">
              <el-input v-model="setting1.symbols" placeholder="交易对格式: eth/usdt"/>
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


          <el-form-item label="订单停留时间:">
            <el-row>
              <el-col>
                <el-input-number v-model="setting2.waitTimeMin" :min="1" :max="1000"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting2.waitTimeMax" :min="1" :max="1000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="委托单数:">
            <el-row>
              <el-col>
                <el-input-number v-model="setting2.amountMin" :min="1" :max="1000"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting2.amountMax" :min="1" :max="1000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>


          <el-form-item label="买卖比值:">
            <el-row>
              <el-col :span="5">
                <el-input v-model="setting2.range"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="交易对:">
            <el-col :span="6">
              <el-input v-model="setting2.symbol" placeholder="交易对格式: usdtotc,eoseth,"/>
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
          <el-form-item label="交易对1:">
            <el-col :span="6">
              <el-input v-model="setting3.sym1" placeholder="交易对格式: usdtotc,"/>
            </el-col>
          </el-form-item>
          <el-form-item label="交易对2:">
            <el-col :span="6">
              <el-input v-model="setting3.sym2" placeholder="交易对格式: usdtotc,"/>
            </el-col>
          </el-form-item>
          <el-form-item label="交易对3:">
            <el-col :span="6">
              <el-input v-model="setting3.sym3" placeholder="交易对格式: usdtotc,"/>
            </el-col>
          </el-form-item>

          <el-form-item label="数量1:">
            <el-col :span="6">
              <el-input v-model="setting3.q1"/>
            </el-col>
          </el-form-item>
          <el-form-item label="数量2:">
            <el-col :span="6">
              <el-input v-model="setting3.q2"/>
            </el-col>
          </el-form-item>
          <el-form-item label="数量3:">
            <el-col :span="6">
              <el-input v-model="setting3.q3"/>
            </el-col>
          </el-form-item>

          <el-form-item label="交易手续费:">
            <el-col :span="6">
              <el-input v-model="setting3.fee"/>
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

          <el-form-item label="交易对的买卖数量区间:">
            <el-row>
              <el-col >
                <el-input-number v-model="setting4.volMin" :min="1" :max="100000"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting4.volMax" :min="1" :max="100000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>


          <el-form-item label="默认执行买卖一档区间:">
            <el-row>
              <el-col>
                <el-input-number v-model="setting4.priceMin" :min="1" :max="100000"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting4.priceMax" :min="1" :max="100000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="买卖一档的价格区间过小则不交易:">
            <el-row>
              <el-col>
                <el-input-number v-model="setting4.thresholdMin" :min="1" :max="100000"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting4.thresholdMax" :min="1" :max="100000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>


          <el-form-item label="交易对:">
            <el-col :span="6">
              <el-input v-model="setting4.symbol" placeholder="交易对格式: usdtotc"/>
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

          <el-form-item label="交易量（买）:">
            <el-row>
              <el-input v-model="setting7.buyNum"></el-input>
            </el-row>
          </el-form-item>

          <el-form-item label="交易量（卖）:">
            <el-row>
              <el-input v-model="setting7.sellNum"></el-input>
            </el-row>
          </el-form-item>

          <el-form-item label="总交易量（买）:">
            <el-row>
              <el-input v-model="setting7.buyTotalNum"></el-input>
            </el-row>
          </el-form-item>

          <el-form-item label="总交易量（卖）:">
            <el-row>
              <el-input v-model="setting7.sellTotalNum"></el-input>
            </el-row>
          </el-form-item>

          <el-form-item label="买入交易价格倍数:">
            <el-row>
              <el-input v-model="setting7.buyRate"></el-input>
            </el-row>
          </el-form-item>


          <el-form-item label="卖出交易价格倍数:">
            <el-row>
              <el-input v-model="setting7.sellRate"></el-input>
            </el-row>
          </el-form-item>

          <el-form-item label="实时价格最低最高限买（买）:">
            <el-row>
              <el-input v-model="setting7.buyPriceLimit"></el-input>
            </el-row>
          </el-form-item>

          <el-form-item label="实时价格最低最高限制（卖）:">
            <el-row>
              <el-input v-model="setting7.sellPriceLimit"></el-input>
            </el-row>
          </el-form-item>


          <el-form-item label="交易对:">
            <el-col :span="6">
              <el-input v-model="setting7.symbol" placeholder="交易对格式: eoseth,"/>
            </el-col>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- <el-tab-pane :label="title" name="last">

      </el-tab-pane>-->


      <el-tab-pane label="主流币价格对标" name="eight">
        <el-form ref="setting8" :model="setting8" label-width="120px">
          <el-form-item label="是否开启:">
            <el-switch
              v-model="setting8.able"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="开启"
              inactive-text="关闭"
            ></el-switch>
          </el-form-item>
          <el-form-item label="交易对:">
            <el-col :span="6">
              <el-input v-model="setting8.symbol" placeholder="交易对格式: eth/usdt,"/>
            </el-col>
          </el-form-item>
          <el-form-item label="跟踪误差:">
            <el-col :span="6">
              <el-input v-model="setting8.traceError" placeholder="最好不要超过两个平台手续费之和，不会调节此处可以设0"/>
            </el-col>
          </el-form-item>
          <el-form-item label="交易数量最小值:">
            <el-col :span="6">
              <el-input v-model="setting8.amountMin"/>
            </el-col>
          </el-form-item>

          <el-form-item label="交易数量最大值:">
            <el-col :span="6">
              <el-input v-model="setting8.amountMax"/>
            </el-col>
          </el-form-item>
          <el-form-item label="对标平台手续费:">
            <el-col :span="6">
              <el-input v-model="setting8.templateFee"/>
            </el-col>
          </el-form-item>

          <el-form-item label="本平台手续费:">
            <el-col :span="6">
              <el-input v-model="setting8.monitorFee"/>
            </el-col>
          </el-form-item>

        </el-form>
      </el-tab-pane>


      <el-tab-pane label="btfun的N档做市" name="five">
        <el-form ref="setting5" :model="setting5" label-width="120px" :rules="makeMarketRules">
          <el-form-item label="是否开启:">
            <el-switch
              v-model="setting5.able"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="开启"
              inactive-text="关闭"
            ></el-switch>
          </el-form-item>

          <el-form-item label="买卖挡位:">
            <el-row>
              <el-input-number v-model="setting5.gears" :min="1" :max="1000"></el-input-number>
            </el-row>
          </el-form-item>

          <el-form-item label="每档买卖单的价差范围:">
            <el-row>
              <el-col>
                <el-input v-model="setting5.priceXmin"></el-input>
                <span>—</span>
                <el-input v-model="setting5.priceXmax"></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="委托单数:">
            <el-row>
              <el-col>
                <el-input v-model="setting5.minEntrustAmount"></el-input>
                <span>—</span>
                <el-input v-model="setting5.maxEntrustAmount"></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="交易对:">
            <el-col :span="6">
              <el-input v-model="setting5.symbols" placeholder="交易对格式: eth/usdt"/>
            </el-col>
          </el-form-item>
        </el-form>
      </el-tab-pane>


    </el-tabs>
    <el-row>
      <el-col :offset="10">
        <el-button type="warning" @click="onSubmit()">{{title}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { addOrUpdateStrategy, getStrategyById } from '@/api/strategy.js'

  export default {
    data() {
      return {
        id: '',
        title: '创建',
        baseInfo: {
          strategyName: '',
          minSleep: '0',
          maxSleep: '1',
          type: 1,
          pricePrecision:4,
          amountPrecision:4

        },

        setting1: {
          able: false,
          gears: 20,
          minWaitTime: 1,
          maxWaitTime: 10,
          minEntrustAmount: 1,
          maxEntrustAmount: 1000,
          buyRate: '0.5',
          sellRate: '1.2',
          symbols: ''
        },
        setting2: {
          buyOrderUsdt: '',
          sellOrderUsdt: '',
          buyWeights: 0,
          sellWeights: 0
        },
        setting3: {
          buyDownSecond: '',
          buyDownPercent: '',
          sellDownSecond: '',
          sellDownPercent: '',
          buyWeights: 0,
          sellWeights: 0
        },

        setting8: {
          able: false,
          symbol: '',
          traceError: '0',
          amountMin: '0',
          amountMax: '1000',
          templateFee: '0.002',
          monitorFee: '0.002'

        },

        setting7: {
          able: false,
          symbol: '',
          buyNum: '',
          sellNum: '',
          buyTotalNum: '',
          sellTotalNum: 0,
          buyRate: 0,
          sellRate: 0.2,
          buyPriceLimit: 2,
          sellPriceLimit: 2
        },

        setting4: {
          able:false,
          symbol: '',
          volMax: 1000,
          volMin: 1,
          priceMin: 0.1,
          priceMax: 10000,
          thresholdMax: 9,
          thresholdMin: 0

        },

        setting5: {
          gears: 3,
          priceXmin: '',
          priceXmax: '',
          minEntrustAmount: '',
          maxEntrustAmount: '',
          symbols: ''
        },
        setting6: {
          isAble: false,
          takeProfit: 0,
          stopLoss: 0
        },
        //1min, 5min, 15min, 30min, 60min, 1day, 1mon, 1week, 1year
        klines: [
          {
            value: '1min',
            label: '1min'
          },
          {
            value: '5min',
            label: '5min'
          },
          {
            value: '15min',
            label: '15min'
          },
          {
            value: '30min',
            label: '30min'
          },
          {
            value: '60min',
            label: '60min'
          },
          {
            value: '1day',
            label: '1day'
          },
          {
            value: '1mon',
            label: '1mon'
          },
          {
            value: '1week',
            label: '1week'
          },
          {
            value: '1year',
            label: '1year'
          }
        ],
        increS5Buy: 1,
        increS5Sell: 1
      }
    },
    created() {
      const id = this.$route.query.id
      this.id = id
      if (this.id !== undefined) {
        this.title = '修改'
        var params = {
          id: this.id
        }
        const data = getStrategyById(params).then(data => {
          data = data.data
          this.setting1 = JSON.parse(data.setting1)
          this.setting2 = JSON.parse(data.setting2)
          this.setting3 = JSON.parse(data.setting3)
          this.setting4 = JSON.parse(data.setting4)
          this.setting5 = JSON.parse(data.setting5)
          this.setting6 = JSON.parse(data.setting6)
          this.baseInfo.strategyName = data.strategyName
          this.baseInfo.buyAllWeights = data.buyAllWeights
          this.baseInfo.sellAllWeights = data.sellAllWeights
          this.baseInfo.profit = data.profit
          this.baseInfo.sleep = data.sleep
          this.baseInfo.type = 1
          console.log(this.setting5)
          if (this.setting6.isAble == 1) {
            this.setting6.isAble = true
          }

          if (data.isLimitPrice === 1) {
            //限价
            this.baseInfo.isLimitPrice = true
            this.baseInfo.buyPrice = data.buyPrice
            this.baseInfo.sellPrice = data.sellPrice

            if (data.isAllBuy === 1) {
              //全部买
              this.baseInfo.isAllBuy = true
            } else {
              this.baseInfo.isAllBuy = false
              this.baseInfo.buyAmount = data.buyAmount
            }
          } else {
            //市价 没有购买 卖出 价格设置
            this.baseInfo.isLimitPrice = false
            if (data.isAllBuy === 1) {
              //全部买
              this.baseInfo.isAllBuy = true
            } else {
              this.baseInfo.isAllBuy = false
              this.baseInfo.buyQuotaPrice = data.buyQuotaPrice
            }
          }

          if (data.isAllSell === 1) {
            //全部卖
            this.baseInfo.isAllSell = true
          } else {
            this.baseInfo.isAllSell = false
            this.baseInfo.sellAmount = data.sellAmount
          }
        })
      } else {
        title: '创建'
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
          setting5: this.setting5,
          setting6: this.setting6
        }
        const data = await addOrUpdateStrategy(requestData)
        if (data.code === 20000) {
          this.$notify({
            title: '操作成功',
            message: this.id === undefined ? '创建成功！！！' : '修改成功！！！',
            type: 'success',
            duration: 2000
          })
          this.id = data.data
          this.title = '修改'
          // this.$router.push({ path: "/strategy/list" });
        }
      },
      handleCreate(type) {
        if (type === 1) {
          this.increS5Buy = this.increS5Buy + 1
          const newNode = {
            id: this.increS5Buy,
            buyKlineOption: '1',
            buyKline: '1min',
            buyWeights: 0,
            buyPercent: ''
          }
          this.setting5.buyStrategy.push(newNode)
        }
        if (type === 2) {
          this.increS5Sell = this.increS5Sell + 1
          const newNode = {
            id: this.increS5Sell,
            sellKlineOption: '1',
            sellKline: '1min',
            sellWeights: 0,
            sellPercent: ''
          }
          this.setting5.sellStrategy.push(newNode)
        }
      },
      handleDelete(value, type) {
        if (type === 1) {
          if (this.setting5.buyStrategy.length === 1) {
            this.$notify({
              title: '警告',
              message: '必须保留一个策略',
              type: 'warning'
            })
            return
          }
          this.setting5.buyStrategy.splice(value - 1, 1)
        }
        if (type === 2) {
          if (this.setting5.sellStrategy.length === 1) {
            this.$notify({
              title: '警告',
              message: '必须保留一个策略',
              type: 'warning'
            })
            return
          }
          this.setting5.sellStrategy.splice(value - 1, 1)
        }
      }
    }
  }
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
