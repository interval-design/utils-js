# 常用工具封装
如果发现bug请及时提出……
## 使用方法
`package.json`文件中增加如下:
``` json
dependencies:{
  'PDo':"git+https://github.com/interval-design/utils-js.git"
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
``` js
/** 设置Cookie
 * @param {String} name 
 * @param {String} value 
 * @param {*} date 
 */
this.$PDo.Cookies.set(name, value, date)
```
``` js
/** 获取Cookie
 * @param {String} name 
 */
this.$PDo.Cookies.get(name)
```
``` js
/** 移除Cookie
 * @param {String} name 
 */
this.$PDo.Cookies.remove(name)
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
