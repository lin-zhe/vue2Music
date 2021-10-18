export function randomStr() {
  const randomStr = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"; //大小写字母乱序
  let length = randomStr.length;
  let str = "";
  for (let i = 0; i < 6; i++) {
    str += randomStr.charAt(Math.floor(Math.random() * length));
  }
  return str + new Date().getTime();
}
