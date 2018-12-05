# 常用工具封装
如果发现bug请及时提出
## 使用方法
`package.json`文件中增加如下:
``` json
dependencies:{
  'PDo':"git+https://github.com/interval-design/utils-js.git"
}
或 
dependencies:{
  'PDo':"git+https://github.com/PonyC/PDo.git"
}

npm install
```
```js
 // 全局引入
 import PDo from 'PDo'
 Vue.prototype.$PDo = PDo;

 // 单个方法注册为过滤器
 Vue.filter('dateFormat', this.$PDo.Date.format);

 // 不要将PDo方法全部注册为过滤器，因为PDo并不是filter性质的封装。如果需要，请通过新建filters文件解构后再做处理
```

## Api
### 1. Date
``` js
/** 倒计时
* @param time
* @returns {String}
*/ 
this.$PDo.Date.countDown(time)
```
``` js
/** 日期格式化
 * @param {String} time 
 * @param {String} format - 可选 默认格式为:'y/m/d h:i:s'
 * @returns {String}
 */
this.$PDo.Date.format(time,format)
```
``` js
/** 距离当前时间
* @param {String} time 
* @returns {String}
*/
this.$PDo.Date.formTheCurrentTime(time)
```

### 2. String
``` js
/** 获得字符串实际长度，中文2，英文1
* @param str
* @returns {Number}
*/
this.$PDo.String.realLength(str)
```
``` js
/** 截取字符串并附加省略号
 * @param {String} str 
 * @param {String} cutLen - 需要截取的长度
 * @returns {String}
 */
this.$PDo.String.cut(str, cutLen)
```
``` js
/** html转txt 并可以截取字符串长度
 * @param {*} value 
 * @param {*} cutLen 
 * @returns {String}
 */
this.$PDo.String.stripHtml(value, cutLen)
```
``` js
/** 生成 uuid
 * @returns {String}
 */
this.$PDo.String.generateUUID()
```
``` js
/** 货币格式化
 * @returns {String}
 * @param {Number} price
 * @param {Number} fixed - 可选 默认为2
 */
 this.$PDo.String.priceFormat(price,fixed)
```

### 3. Cookies
该方法搬运自 [tiny-cookie](https://github.com/Alex1990/tiny-cookie/tree/f20831f9c74cec38d57ed022c8ec3946af7ea472)
只选取了3个常用功能

设置一个名称为key的 cookie，使用`encodeURIComponent`编码。options参数是一个对象，其属性可以是合法的 cookie 属性值，比如`path`（默认：根路径/）、`domain`、`expires/max-age`、`samesite`或`secure`。（备注：如果`secure`的值为一个真值，比如true，就会被设置，否则不会被设置）
``` js
/** 设置Cookie
 * @param {String} key 
 * @param {String} value 
 * @param {*} options 
 */
this.$PDo.Cookies.set(key, value, options)
```
`expires`属性值可以是一个`Date`对象，一个可被`Date.parse()`解析的日期字符串，一个整数（单位：天），或者一个带时间后缀的数值字符串。

| 单位后缀     | 含义            |
| ----------- | -------------- |
| Y           | 年             |
| M           | 月             |
| D           | 天             |
| h           | 日             |
| m           | 分             |
| s           | 秒             |
``` js
/** 获取Cookie
 * @param {String} key 
 */
this.$PDo.Cookies.get(key)
```
``` js
/** 移除Cookie
 * @param {String} key 
 */
this.$PDo.Cookies.remove(key)
```

### 4. Verify
``` js
/** 判断参数是否是其中之一
 * @param val
 * @param arr
 * @returns {Boolean}
 */
this.$PDo.Verify.oneOf(val, arr)
```
``` js
/** 检测数据类型
* @param obj
* @param type
* @returns {*}
*/
this.$PDo.Verify.istype(o, type)
```
``` js
/** 检测滚动条是否滚动到页面底部
 * @returns {Function} callback
 */
this.$PDo.Verify.isScrollToPageBottom((()=>{}))
```
