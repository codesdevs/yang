<template>
  <van-notice-bar
    left-icon="volume-o"
    text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。"
    background="#75c472"
    color="#ffffff"
  />
  <div class="home">
    <van-row justify="center" class="content">
      <van-col span="24" class="col1">
        <van-form class="form" @submit="getToken">
          <van-row justify="center" class="row">
            <van-col span="24" style="font-size: 14px" class="col1-border">
              打开羊羊小程序，<b>点击右上角设置</b>，把
              <b>UID</b> 记下来，在下面方输入自己的 <b>UID</b> ，
              <b>点击获取</b>，开始装逼，获取 token
              速度由羊羊服务器决定，慢的话多获取几遍。
            </van-col>
          </van-row>
          <van-row justify="center" class="row">
            <van-col span="24" style="font-size: 14px" class="col1-border">
              请输入你的 UID 让平台帮你进行刷关卡吧 <br /><b
                >最下方有获取教程</b
              >
            </van-col>
          </van-row>
          <van-row justify="space-between" align="bottom" class="row">
            <van-col :span="24">
              <van-field
                v-model="uid"
                type="digit"
                name="uid"
                placeholder="输入UID获取token"
                :rules="[{ required: true, message: '请填写uid' }]"
                clearable="true"
              >
                <template #button>
                  <van-button
                    size="small"
                    type="primary"
                    :loading="loading"
                    native-type="submit"
                    loading-text="获取中..."
                    color="#6c757d"
                    >获取token</van-button
                  >
                </template>
              </van-field>
            </van-col>
          </van-row>
        </van-form>
        <van-form class="form" @submit="onSubmit">
          <van-field
            v-model="token"
            type="textarea"
            name="token"
            placeholder="token"
            readonly
            autosize
            disabled
            :rules="[{ required: true, message: '请先获取token' }]"
          />
          <van-row justify="center" align="bottom" class="row">
            <van-col :span="24">
              <van-radio-group v-model="checked">
                <van-cell-group inset>
                  <van-cell title="通关" clickable @click="checked = '1'">
                    <template #right-icon>
                      <van-radio name="1" checked-color="#76c572" />
                    </template>
                  </van-cell>
                  <van-cell title="话题" clickable @click="checked = '2'">
                    <template #right-icon>
                      <van-radio name="2" checked-color="#76c572" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </van-col>
          </van-row>
          <van-row justify="space-between" align="bottom" class="row">
            <van-col :span="24">
              <van-slider
                v-model="daily_count"
                @change="onChange"
                active-color="#76c572"
                min="1"
                max="999"
              >
                <template #button>
                  <div class="custom-button">{{ daily_count }}</div>
                </template>
              </van-slider>
            </van-col>
          </van-row>

          <div style="margin: 16px">
            <van-button
              round
              block
              type="primary"
              native-type="submit"
              color="#75c472"
            >
              提交
            </van-button>
          </div>
        </van-form>
        <van-image lazy-load :src="require('../assets/jc.png')"></van-image>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { ref } from "vue";
import { getTokenApi, dailyCountApi, topicApi, getWxOpenId } from "@/api/index";
import { Notify } from "vant";
export default {
  setup() {
    const uid = ref("");
    var token = ref("");
    var loading = ref(false);
    var daily_count = ref(1);
    const checked = ref("1");
    const getToken = async (values) => {
      loading.value = true;
      var res = await getWxOpenId(values.uid);
      if (res.err_msg == "") {
        res = await getTokenApi(res.data.wx_open_id);
        if (res.err_msg == "") {
          token.value = res.data.token;
          Notify({ type: "success", message: "获取成功" });
          loading.value = false;
          return;
        }
      }
      Notify({ type: "danger", message: res.err_msg });
      loading.value = false;
    };
    const onSubmit = async (values) => {
      if (checked.value == "1") {
        for (var i = 1; i <= daily_count.value; i++) {
          dailyCountApi(values.token);
          Notify({
            type: "success",
            message: "提交成功，请在小程序中我的名片查看",
          });
        }
      } else {
        topicApi(values.token);
        Notify({
          type: "success",
          message: "提交成功，请在小程序中我的名片查看",
        });
      }
    };
    const onChange = (daily_count) => console.log(daily_count);

    return {
      uid,
      token,
      getToken,
      onSubmit,
      loading,
      daily_count,
      onChange,
      checked,
    };
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.home {
  // margin-top: 200px;
  padding-top: 80px;
  width: 100%;
  .content {
    background-color: #fff;
    width: 90%;
    margin: 0 auto;
    border-radius: 10px;
    .col1 {
      padding: 20px;
      .col1-border {
        padding: 10px;
        color: #0f5132;
        background-color: #d1e7dd;
        border-color: #badbcc;
        border-radius: 10px;
      }
    }
  }
}
.row {
  margin-bottom: 20px;
}
.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #76c572;
  border-radius: 100px;
}
</style>