import { request } from "@/network/request";

export function _PhoneVerify(phone) {
  return request({
    url: "/cellphone/existence/check",
    params: {
      phone: phone,
    },
  });
}
//登出
export function _logout() {
  return request({
    url: "/logout",
    withCredentials: true,
  });
}

export function _login(phone, password) {
  return request({
    url: "/login/cellphone",
    //登录状态
    withCredentials: true,
    params: {
      phone: phone,
      password: password,
    },
  });
}

// /**获取用户详细信息 */
export function _getUserDetail(id) {
  return request({
    url: "/user/detail",
    params: {
      uid: id,
    },
  });
}

/**获取用户歌单 */
export function _getSongList(id) {
  return request({
    url: "/user/playlist",
    params: {
      uid: id,
    },
  });
}
//获取用户粉丝
export function _getUserFollowed(id) {
  return request({
    url: "/user/followeds",
    params: {
      uid: id,
    },
  });
}
//获取用户关注数
export function _getUserFollows(id) {
  return request({
    url: "/user/follows",
    params: {
      uid: id,
    },
  });
}

export class PlayList {
  constructor(playlist) {
    this.name = playlist.name; //为了方便menu使用
    this.id = playlist.id;
    this.cover = playlist.coverImgUrl;
  }
}
