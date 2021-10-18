export const debounce = (fn, delay) => {
  let timer = null;

  //返回的函数是用户每次实际调用的函数
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn && fn.apply(this, args);
    }, delay);
  };
};

// 时间戳方案--节流
export function throttle(fn, wait) {
  var pre = Date.now();
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - pre >= wait) {
      fn.apply(context, args);
      pre = Date.now();
    }
  };
}

/**时间格式化函数
 * @param date          @new Date()一个Date对象
 * @param fmt           时间格式化时间，'yy-MM-dd'
 */
export function formatDate(date, fmt) {
  // 利用/(y+)/（匹配大于等于1以上的y）的正则表达式来测试fmt,返回一个bool，检测是否匹配成功
  if (/(y+)/.test(fmt)) {
    //RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个子匹配(以括号为标志)字符串
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    ); //匹配多少个字符，就将RegExp.$1,替换成date.getFullYear()，利用substr抽出date.getFullYear()的内容，抽取起始字符4 - RegExp.$1.length
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      // console.log(o[k]);
      let str = o[k] + ""; //匹配成功，返回date的值（利用getMonth()+1等方法）
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str) //一般来说都是MM等格式，因此会进入padLeftZero()函数
      );
      // padLeftZero 零补全
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length); //假设传入的为7，那么为007.subsrt(1),返回07，假设为12，那么为0012.subsrt(2)，返回12，相当巧妙
}
