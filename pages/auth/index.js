import {
  request
} from "../../request/index.js";
import {
  login
} from "../../utils/asyncWx";

Page({
  async handleGetUserInfo(e) {
    try {
      const {
        encrypteData,
        rawData,
        iv,
        signature
      } = e.detail;
      const {
        code
      } = await login();
      const loginParams = {
        encrypteData,
        rawData,
        iv,
        signature,
        code
      };
      const {token} = await request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin",
        data: loginParams,
        method: "post"
      });
     wx.setStorageSync('token', token);
     wx.navigateBack({
      delta:1
     });
    } catch (error) {
      console.log(error);
    }
  }
})