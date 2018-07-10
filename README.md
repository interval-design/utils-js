# 常用工具封装
## 使用方法
`package.json`文件中增加如下:
``` json
dependencies:{
  'itv-utils':"https://github.com/interval-design/utils-js.git"
}
```
随后 `npm install` 就好

## Api
### 1. itv.Date
``` js
/** 倒计时
* @param time
* @returns {String}
*/ 
itv.Date.countDown(time)
```
``` js
/** 日期格式化
 * @param {String} time 
 * @param {String} format - 可选 默认格式为:'{y}/{m}/{d} {h}:{i}:{s}'
 * @returns {String}
 */
itv.Date.format(time,format)
```
``` js
/** 距离当前时间
* @param {String} time 
* @returns {String}
*/
itv.Date.formTheCurrentTime(time)
```

### 2. itv.String
``` js
/** 获得字符串实际长度，中文2，英文1
* @param str
* @returns {number}
*/
itv.String.realLength(str)
```
``` js
/** 截取字符串并附加省略号
 * @param {String} str 
 * @param {String} cutLen - 需要截取的长度
 * @returns {String}
 */
itv.String.cut(str, cutLen)
```
``` js
/** html转txt 并可以截取字符串长度
 * @param {*} value 
 * @param {*} cutLen 
 * @returns {String}
 */
itv.String.stripHtml(value, cutLen)
```
``` js
/** 生成 uuid
 * @returns {String}
 */
itv.String.generateUUID()
```

### 3. itv.Cookies
``` js
/** 设置Cookie
 * @param {String} name 
 * @param {String} value 
 * @param {*} date 
 */
itv.Cookies.set(name, value, date)
```
``` js
/** 获取Cookie
 * @param {String} name 
 */
itv.Cookies.get(name)
```
``` js
/** 移除Cookie
 * @param {String} name 
 */
itv.Cookies.remove(name)
```

### 4. itv.Verify
``` js
/** 判断参数是否是其中之一
 * @param val
 * @param arr
 * @returns {boolean}
 */
itv.Verify.oneOf(val, arr)
```
``` js
/** 检测数据类型
* @param obj
* @param type
* @returns {*}
*/
itv.Verify.istype(o, type)
```
``` js
/** 检测滚动条是否滚动到页面底部
 * @returns {Function} callback
 */
itv.Verify.isScrollToPageBottom((()=>{}))
```
