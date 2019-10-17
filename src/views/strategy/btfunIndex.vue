<template>
  <div class="app-container">
    <el-tabs type="card" value="first">
      <el-tab-pane label="基础设置" name="first">
        <el-form ref="base" :model="baseInfo" label-width="140px">
          <el-form-item />
          <el-form-item label="btfun策略名称:" prop="strategyName" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-col :span="6">
              <el-input v-model="baseInfo.strategyName"  placeholder="请不要写重名" maxlength="30" show-word-limit/>
            </el-col>
          </el-form-item>


          <el-form-item label="周期时间(取整数):">
            <el-row>
              <el-col>
                <el-input-number v-model="baseInfo.minSleep" :precision="0" :min="0" :max="baseInfo.maxSleep"></el-input-number>
                <span>—</span>
                <el-input-number v-model="baseInfo.maxSleep" :precision="0" :min="baseInfo.minSleep" :max="10000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>


        </el-form>
      </el-tab-pane>

      <el-tab-pane label="N档委托" name="second">
        <el-form ref="setting1" :model="setting1" label-width="120px" :rules="gearRules" >
          <el-form-item />
          <el-form-item label="买卖挡位(取整数):"  prop="gears" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-input-number v-model="setting1.gears" :precision="0" :min="2" :max="1000" :step="1"></el-input-number>
            </el-row>
          </el-form-item>

          <el-form-item label="盘口停留时间(取整数):" prop="minWaitTime" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col>
                <el-input-number v-model="setting1.minWaitTime" :precision="0" :min="0" :max="setting1.maxWaitTime"/>
                <span>—</span>
                <el-input-number v-model="setting1.maxWaitTime" :precision="0" :min="setting1.minWaitTime" :max="1000"/>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="买档委托数量:"prop="minEntrustAmount" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col>
                <el-input-number v-model="setting1.minEntrustAmount" :min="0" :max="setting1.maxEntrustAmount" :step="0.1"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting1.maxEntrustAmount" :min="setting1.minEntrustAmount" :max="100000" :step="0.1"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="卖档委托数量:"prop="minEntrustAmount" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col>
                <el-input-number v-model="setting1.sellMinEntrustAmount" :min="0" :max="setting1.sellMaxEntrustAmount" :step="0.1"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting1.sellMaxEntrustAmount" :min="setting1.sellMinEntrustAmount" :max="100000" :step="0.1"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="N档(相对于一档)比值:"prop="buyRate" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col :span="5">
                <el-input-number v-model="setting1.buyRate" :min="0.01" :max="1" :step="0.05"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="卖N档(相对于卖一档)比值:" prop="sellRate" label-width='140px' >
            <el-row>
              <el-col :span="5">
                <el-input-number v-model="setting1.sellRate" :min="1" :max="10" :step="0.05"></el-input-number>
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
          <el-form-item />

          <el-form-item label="订单停留时间(取整数):"  prop="waitTimeMin" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col>
                <el-input-number v-model="setting2.waitTimeMin" :precision="0" :min="0" :max="setting2.waitTimeMax"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting2.waitTimeMax" :precision="0" :min="setting2.waitTimeMin" :max="1000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="委托数量:" prop="amountMin" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col>
                <el-input-number v-model="setting2.amountMin" :min="0" :max="setting2.amountMax"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting2.amountMax" :min="setting2.amountMin" :max="1000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>


          <el-form-item label="买卖比值(减一):" prop="range" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col :span="5">
                <el-input-number v-model="setting2.range" :min="0.0000000001" :max="1"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="价格每一跳精度:" prop="addition" label-width='140px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-col :span="7">
              <el-input-number v-model="setting2.addition" :min="0" :max="1"/>
              <span style="color: #C03639">*比如btc/usdt价格每一跳精度是0.01</span>
            </el-col>
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
          <el-form-item />
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
              <el-input-number v-model="setting3.fee" :min="0" :max="1"/>
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
          <el-form-item />
          <el-form-item label="交易对的买卖数量区间:" prop="volMin" label-width='240px' :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col >
                <el-input-number v-model="setting4.volMin" :min="0" :max="setting4.volMax"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting4.volMax" :min="setting4.volMin" :max="100000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>


          <el-form-item label="买卖一档价格的差超出区间则不交易:"  prop="thresholdMin"  label-width='240px'  :rules="[
			      { required: true, message: '该项不能为空'}
			    ]">
            <el-row>
              <el-col>
                <el-input-number v-model="setting4.thresholdMin" :min="0" :max="setting4.thresholdMax"></el-input-number>
                <span>—</span>
                <el-input-number v-model="setting4.thresholdMax" :min="setting4.thresholdMin" :max="100000"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>


          <el-form-item label="交易对选择:" prop="symbol" label-width='240px'  :rules="[
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
          <el-form-item />
          <el-form-item label="交易量（买）:" prop="buyNum"  label-width='240px'  :rules="[
			      { required: true, message: '交易量（买）不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting7.buyNum" :min="0" :max="100000"></el-input-number>&nbsp
              <span style="color: #C03639">   *默认0不执行买单</span>
            </el-col>
          </el-form-item>

          <el-form-item label="交易量（卖）:" prop="sellNum"  label-width='240px'  :rules="[
			      { required: true, message: '交易量（卖）不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting7.sellNum" :min="0" :max="100000"></el-input-number>&nbsp
              <span style="color: #C03639">*默认0不执行卖单</span>
            </el-col>
          </el-form-item>

          <el-form-item label="总交易量（买）:" prop="buyTotalNum"  label-width='240px'  :rules="[
			      { required: true, message: '总交易量（买）不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting7.buyTotalNum"  :min="0" :max="1000000"></el-input-number>
            </el-col>
          </el-form-item>

          <el-form-item label="总交易量（卖）:" prop="sellTotalNum"  label-width='240px'  :rules="[
			      { required: true, message: '总交易量（卖）不能为空'}
			    ]">
            <el-col :span ="6">
              <el-input-number v-model="setting7.sellTotalNum"  :min="0" :max="1000000"></el-input-number>
            </el-col>
          </el-form-item>

          <el-form-item label="买入交易价格倍数:" prop="buyRate"  label-width='240px'  :rules="[
			      { required: true, message: '买入交易价格倍数不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting7.buyRate"  :min="1" :max="10000"></el-input-number>
            </el-col>
          </el-form-item>


          <el-form-item label="卖出交易价格倍数:" prop="sellRate"  label-width='240px'  :rules="[
			      { required: true, message: '卖出交易价格倍数不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting7.sellRate"  :min="0" :max="1"></el-input-number>
            </el-col>
          </el-form-item>

          <el-form-item label="实时价格最低最高限制（买）:" prop="buyPriceLimit"  label-width='240px'  :rules="[
			      { required: true, message: '实时价格最低最高限买（买）不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting7.buyPriceLimit"  :min="0" :max="100000"></el-input-number>
            </el-col>
          </el-form-item>

          <el-form-item label="实时价格最低最高限制（卖）:" prop="sellPriceLimit"  label-width='240px'  :rules="[
			      { required: true, message: '实时价格最低最高限制（卖）不能为空'}
			    ]">
            <el-col :span="6">
              <el-input-number v-model="setting7.sellPriceLimit"  :min="0" :max="100000"></el-input-number>
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


      <el-tab-pane label="主流币价格对标" name="eight">
        <el-form ref="setting8" :model="setting8" label-width="120px">
          <el-form-item />

          <el-form-item label="交易对选择:" prop="symbol" label-width='240px'  :rules="[
			      { required: true, message: '请选择交易对'}
			    ]">
            <el-select :filterable="true" v-model="setting8.symbol" placeholder="请选择交易对">
              <el-option
                v-for="item in symbols"
                :key="item.symbol"
                :label="item.symbol"
                :value="`${item.baseCurrency}/${item.quoteCurrency}`"
              ></el-option>
            </el-select>
          </el-form-item>



          <el-form-item label="跟踪误差:" prop="traceError"  label-width='240px'  :rules="[
			      { required: true, message: '跟踪误差不能为空'}
			    ]">
            <el-col :span="6">
              <el-input v-model="setting8.traceError" placeholder="不要超过两个平台手续费之和"/>
            </el-col>
          </el-form-item>
          <el-form-item label="交易数量范围:" prop="amountMin"  label-width='240px'  :rules="[
			      { required: true, message: '交易数量不能为空'}
			    ]">
            <el-row>
            <el-col >
              <el-input-number v-model="setting8.amountMin" :min="0" :max="setting8.amountMax"/>
              <span>—</span>
              <el-input-number v-model="setting8.amountMax" :min="setting8.amountMin" :max="100000"/>
            </el-col>
            </el-row>
          </el-form-item>



          <el-form-item>
            <el-col :offset="10">
              <el-button type="warning" @click="submitForm('setting8')">{{title}}</el-button>
            </el-col>
          </el-form-item>

        </el-form>
      </el-tab-pane>


      <el-tab-pane label="btfun自动委托挂单" name="five">
        <el-form ref="setting5" :model="setting5" label-width="120px">
          <el-form-item />

          <el-form-item label="买卖挡位:" prop="gears"  label-width='140px'  :rules="[
			      { required: true, message: '买卖档位不能为空'}
			    ]">
            <el-row>
              <el-input-number v-model="setting5.gears" :precision="0" :min="1" :max="1000"></el-input-number>
            </el-row>
          </el-form-item>

          <el-form-item label="每档买卖单的价差范围:"prop="priceXmin"  label-width='140px'  :rules="[
			      { required: true, message: '每档买卖单的价差范围不能为空'}
			    ]">
            <el-row>
              <el-col>
                <el-input-number v-model="setting5.priceXmin" :min="0" :max="setting5.priceXmax"/>
                <span>—</span>
                <el-input-number v-model="setting5.priceXmax" :min="setting5.priceXmin" :max="1000"/>
                <span style="color: #C03639">*注意得到的买档最低价不要小于最小交易价格限制(一般不要小于0)</span>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="委托数量:" prop="minEntrustAmount"  label-width='140px'  :rules="[
			      { required: true, message: '委托数量不能为空'}
			    ]">
            <el-row>
              <el-col>
                <el-input-number v-model="setting5.minEntrustAmount" :min="0" :max="setting5.maxEntrustAmount"/>
                <span>—</span>
                <el-input-number v-model="setting5.maxEntrustAmount" :min="setting5.minEntrustAmount" :max="100000"/>
              </el-col>
            </el-row>
          </el-form-item>




          <el-form-item label="交易对选择:" prop="symbols" label-width='140px'  :rules="[
			      { required: true, message: '请选择交易对'}
			    ]">
            <el-select :filterable="true" v-model="setting5.symbols" placeholder="请选择交易对">
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
              <el-button type="warning" @click="submitForm('setting5')">{{title}}</el-button>
            </el-col>
          </el-form-item>



        </el-form>
      </el-tab-pane>


    </el-tabs>
    <!--<el-row>
      <el-col :offset="10">
        <el-button type="warning" @click="submitForm('setting4')">{{title}}</el-button>
      </el-col>
    </el-row>  之前的按钮，在公共部分-->
  </div>
</template>

<script>
  import { addOrUpdateStrategy, getStrategyById } from '@/api/strategy.js';
  import { getSymbols } from "@/api/symbol.js"

  export default {
    data() {


      var ruleNumber = (rule, value, callback) => {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (value === '') {
          callback(new Error('请输入乘车人手机号码'));
        } else if(!myreg.test(value)) {
          callback(new Error('请输入正确乘车人手机号码'));
        }else {
          callback();
        }
      };


      var sellRate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入卖的比值'));
        } else if(value<1 || value >2) {
          callback(new Error('卖的比值必须在1-2之间'));
        }else {
          callback();
        }
      };


      return {


        gearRules:{
          sellRate: [{ validator: sellRate, trigger: 'blur' }]
        },

        symbols: [],
        id: '',
        title: '创建',
        baseInfo: {
          strategyName: '',
          minSleep: 0,
          maxSleep: 1000,
          type: 1,
          pricePrecision:4,
          amountPrecision:4,
          checkType:''
        },
        setting1: {
          gears: 20,
          minWaitTime: 1,
          maxWaitTime: 10000,
          minEntrustAmount: 0,
          maxEntrustAmount: 100000,
          sellMinEntrustAmount: 0,
          sellMaxEntrustAmount: 100000,
          buyRate: '0.5',
          sellRate: '1.2',
          symbols: ''
        },
        setting2: {
          range: 0.001,
          addition: 0.001,
          amountMin: 0,
          amountMax: 100000,
          waitTimeMin: 1,
          waitTimeMax: 10,
          symbol: ''
        },
        setting3: {
          sym1: '',
          sym2: '',
          sym3: '',
          q1: 0,
          q2: 0,
          q3: 0,
          currencys: ['1'],
          fee: 0.002
        },

        setting8: {
          symbol: '',
          traceError: '',
          amountMin: 0,
          amountMax: 100000,
        },

        setting7: {
          symbol: '',
          buyNum: 0,
          sellNum: 0,
          buyTotalNum: 0,
          sellTotalNum: 0,
          buyRate: 1.1,
          sellRate: 0.9,
          buyPriceLimit: 2,
          sellPriceLimit: 2
        },

        setting4: {
          symbol: '',
          volMax: 100000,
          volMin: 0,
          thresholdMax: 1000,
          thresholdMin: 0

        },

        setting5: {
          gears: 3,
          priceXmin: 0,
          priceXmax: 1000,
          minEntrustAmount: 0,
          maxEntrustAmount: 100000,
          symbols: ''
        },
        setting6: {
          takeProfit: 0,
          stopLoss: 0
        },

        increS5Buy: 1,
        increS5Sell: 1
      }
    },
    created() {
      const id = this.$route.query.id
      this.id = id;
      this.getSymbols();
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
          this.setting7 = JSON.parse(data.setting7)
          this.setting8 = JSON.parse(data.setting8)


          this.baseInfo.strategyName = data.strategyName
          this.baseInfo.minSleep = data.minSleep
          this.baseInfo.maxSleep = data.maxSleep
          this.baseInfo.type = 1
          for(var i = 0; i< this.setting3.currencys.length; i++){
            this.setting3.currencys[i] = this.setting3.currencys[i] + '';
          }
          console.log(this.setting5)

        })
      } else {
        title: '创建'
      }
    },
    methods: {
      // changeInputNumber(mark){
      //   if((+this.setting1.maxWaitTime - +this.setting1.minWaitTime)<0){
      //     this.$notify({
      //       title: "警告",
      //       message: "后面的数必须大于等于前面的数",
      //       type: "warning",
      //       duration: 2000
      //     });
      //     this.setting1.maxWaitTime = this.setting1.minWaitTime
      //   }
      // },
      changeCheckbox (e) {
        console.log(e)
      },

      //获取交易对
      async getSymbols() {
        var symbolsParam = {
          symbolsType : 1
        }
        const data = await getSymbols(symbolsParam);

        this.symbols = data.data;
        console.log(this.symbols,data,"symbols");
      },
    	 submitForm(formName) {
	    	this.$refs[formName].validate( async (valid) => {
	        if (valid) {
//	          onSubmit () {

            if(this.baseInfo.strategyName.trim()==='')
            {
              this.$notify({
                title: '警告',
                message: '请输入策略的名称',
                type: 'error'
              })
              return false;
            }
            this.baseInfo.checkType = formName;
			        var requestData = {
			          id: this.id,
			          baseInfo: this.baseInfo,
			          setting1: this.setting1,
			          setting2: this.setting2,
			          setting3: this.setting3,
			          setting4: this.setting4,
			          setting5: this.setting5,
			          setting7: this.setting7,
                setting8: this.setting8
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
//			      }

	        } else {
	          console.log('error submit!!');
	          return false;
	        }
	     });
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
