/**
 * ------------------------------------------------------------------
 * 工具函数封装
 * ------------------------------------------------------------------
 */
import { escapeRe, convert } from './util';

// 实践类
const Time = {
	/** 当前时间到传入时间的倒计时
	 * @param time
	 * @return {String}
	 */
	countDown(time) {
		// 处理传入时间，兼容iOS
		let _time = (() => {
			let _strTime = new Date(time);
			if (_strTime == 'Invalid Date') {
				time = time.replace(/T/g, ' ');
				time = time.replace(/-/g, '/');
				_strTime = new Date(time);
			}
			return _strTime;
		})();
		let _countDown = '00:00:00';
		let _d = 0,
			_h = 0,
			_i = 0,
			_s = 0;
		// 补零
		let addZero = (num) => (num < 10 ? '0' : '') + num;
		let _now = new Date();
		let _diff = _time - _now;
		if (_diff <= 0) {
			_countDown = '00:00:00';
			return 'STOP';
		} else {
			_d = Math.floor(_diff / 1000 / 3600 / 24);
			_h = addZero(Math.floor((_diff / 1000 / 60 / 60) % 24));
			_i = addZero(Math.floor((_diff / 1000 / 60) % 60));
			_s = addZero(Math.floor((_diff / 1000) % 60));
			if (_d > 0) {
				_countDown = `${_d}天${_h}:${_i}:${_s}`;
			} else if (_h === 0) {
				_countDown = `${_i}:${_s}`;
			} else {
				_countDown = `${_h}:${_i}:${_s}`;
			}
			return _countDown;
		}
	},
	/** 日期格式化
 * @param {String} time 
 * @param {String} format 
 */
	format(time, format) {
		if (!time) {
			return '-';
		}
		let _format = format || 'y/m/d h:i:s';
		let _date = time ? new Date(time.split('-').join('/').split('T').join(' ')) : new Date();
		let formatObj = {
			y: _date.getFullYear(),
			m: _date.getMonth() + 1,
			d: _date.getDate(),
			h: _date.getHours(),
			i: _date.getMinutes(),
			s: _date.getSeconds(),
		};
		let time_str = _format.replace(/(y|m|d|h|i|s)/g, (result, key) => {
			let value = formatObj[key];
			if (result.length > 0 && value < 10) {
				value = '0' + value;
			}
			return value || 0;
		});
		return time_str;
	},
	/** 距离当前时间
 * @param {String} time 
 */
	formTheCurrentTime(time) {
		// 处理传入时间，兼容iOS
		let _time = (() => {
			let _strTime = new Date(time);
			if (_strTime == 'Invalid Date') {
				time = time.replace(/T/g, ' ');
				time = time.replace(/-/g, '/');
				_strTime = new Date(time);
			}
			return _strTime;
		})();
		// 补零
		let addZero = (num) => (num < 10 ? '0' : '') + num;
		let _now = new Date();
		let _diff = _now - _time; // 相差
		let formatObj = {
			y: _time.getFullYear(),
			m: _time.getMonth() + 1,
			d: _time.getDate(),
			h: addZero(_time.getHours()),
			i: addZero(_time.getMinutes())
		};
		let diffObj = {
			d: Math.floor(_diff / 1000 / 3600 / 24),
			h: addZero(Math.floor((_diff / 1000 / 60 / 60) % 24)),
			i: addZero(Math.floor((_diff / 1000 / 60) % 60))
		};
		if (diffObj.d > 2) {
			return `${formatObj.y}/${formatObj.m}/${formatObj.d} ${formatObj.h}:${formatObj.i}`;
		}
		if (diffObj.d > 0) {
			if (diffObj.d === 1) {
				return '昨天';
			} else if (diffObj.d === 2) {
				return '前天';
			}
			return;
		}
		if (diffObj.d === 0) {
			if (diffObj.h < 1) {
				return diffObj.i + '分钟前';
			}
			if (diffObj.h >= 1) {
				return diffObj.h + '小时' + diffObj.i + '分钟前';
			}
		}
	},
	/**
	 * 时间演算
	 * 获取当前日期 + - 前后的日期
	 * @param {*} addDayCount  -- 需要推移的日期 正数为加 负数为减
	 * @param {*} format -- 格式
	 */
	getTimeCalculation(addDayCount,format){
		let _date = new Date()
		let _format = format || 'y/m/d h:i:s';
		_date.setDate(_date.getDate() + addDayCount) //获取AddDayCount天后的日期
		let formatObj = {
			y: _date.getFullYear(),
			m: _date.getMonth() + 1,
			d: _date.getDate(),
			h: _date.getHours(),
			i: _date.getMinutes(),
			s: _date.getSeconds(),
		};
		let time_str = _format.replace(/(y|m|d|h|i|s)/g, (result, key) => {
			let value = formatObj[key];
			if (result.length > 0 && value < 10) {
				value = '0' + value;
			}
			return value || 0;
		});
		return time_str;
	}
}
// 文本类
const Char = {
   /** 获得字符串实际长度，中文2，英文1
     * @param str
     * @returns {number}
     */
    realLength(str) {
      let _realLen = 0,
        _len = str.length,
        _charCode = -1;
      for (let i = 0; i < _len; i++) {
        _charCode = str.charCodeAt(i);
        if (_charCode >= 0 && _charCode <= 128) _realLen += 1;
        else _realLen += 2;
      }
      return _realLen;
    },
    /** 生成随机字符串
     * @param len
     * @returns {string}
     */
    random(len) {
      len = len || 16;
      let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      let pwd = '';
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return pwd;
    },
    /** 截取字符串
     * @param {String} str
     * @param {String} cutLen
     */
    cut(str, cutLen) {
      let str_length = Char.realLength(str); // 字符串真实长度
      if (str_length >= cutLen) {
        return str.substring(0, cutLen) + '...';
      } else {
        return str;
      }
    },
    /** html转txt 并可以截取字符串长度
     * @param {*} value
     * @param {*} cutLen
     */
    stripHtml(value, cutLen) {
      let _cutLen = cutLen || false;
      let _result = value.replace(/<(?:.|\n)*?>/gm, '');
      if (_cutLen) {
        Char.cut(_result, _cutLen);
      }
      return _result;
    },
    /** 生成 uuid */
    generateUUID() {
      let d = new Date().getTime();
      let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = ((d + Math.random() * 16) % 16) | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16);
    	}) ;
      return uuid;
    },
    /** 货币格式化
     * @param {*} price
     * @param {*} fixed
     */
    priceFormat(price, fixed = 2) {
      if (price) {
        return '￥' + (price / 100).toFixed(fixed);
      } else {
        return '￥0';
      }
		}
}
// Cookies类
const Cookies = {
		/**
		 * 设置cookies
		 * @param {*} key 
		 * @param {*} value 
		 * @param {*} encoder 
		 * @param {*} options 
		 */
		set(key, value, encoder = encodeURIComponent, options) {
			if (typeof encoder === 'object' && encoder !== null) {
				options = encoder;
				encoder = encodeURIComponent;
			}
			const attrsStr = convert(options || {});
			const valueStr = typeof encoder === 'function' ? encoder(value) : value;
			const newCookie = `${key}=${valueStr}${attrsStr}`;
			document.cookie = newCookie;
		},

		/** 获取Cookie
		 * @param {String} key
		 */
		get(key,decoder = decodeURIComponent) {
			if ((typeof key !== 'string') || !key) {
				return null;
			}
			const reKey = new RegExp(`(?:^|; )${escapeRe(key)}(?:=([^;]*))?(?:;|$)`);
			const match = reKey.exec(document.cookie);
			if (match === null) {
				return null;
			}
			return typeof decoder === 'function' ? decoder(match[1]) : match[1];
		},

		/** 移除Cookie
		 * @param {String} key
		 * @param {Object} options
		 */
		remove(key,options) {
			const opts = { expires: -1 };
			if (options && options.domain) {
				opts.domain = options.domain;
			}

			return Cookies.set(key, 'a', opts);
		}
}
// 验证类
const Verify = {
		/** 判断参数是否是其中之一
		 * @param val
		 * @param arr
		 * @returns {boolean}
		 */
		oneOf(val, arr) {
			if (arr.indexOf(val) !== -1) {
				return true;
			}
			return false;
		},
		/** 检测数据类型
		* @param obj
		* @param type
		* @returns {*}
		*/
		istype(o, type) {
			if (!type) {
				return Object.prototype.toString.call(o);
			}
			switch (type.toLowerCase()) {
				case 'string':
					return Object.prototype.toString.call(o) === '[object String]';
				case 'number':
					return Object.prototype.toString.call(o) === '[object Number]';
				case 'boolean':
					return Object.prototype.toString.call(o) === '[object Boolean]';
				case 'undefined':
					return Object.prototype.toString.call(o) === '[object Undefined]';
				case 'null':
					return Object.prototype.toString.call(o) === '[object Null]';
				case 'function':
					return Object.prototype.toString.call(o) === '[object Function]';
				case 'array':
					return Object.prototype.toString.call(o) === '[object Array]';
				case 'object':
					return Object.prototype.toString.call(o) === '[object Object]';
				case 'nan':
					return isNaN(o);
				case 'elements':
					return Object.prototype.toString.call(o).indexOf('HTML') !== -1;
				default:
					return;
			}
		},
		/** 检测滚动条是否滚动到页面底部
		 * @param callback
		 */
		isScrollToPageBottom(callback) {
			let loadState = null; //记录加载状态的变量
			window.onscroll = function() {
				let documentHeight = document.body.offsetHeight; // 文档高度
				let viewPortHeight = window.innerHeight; //可视区域高度
				let scrollHeight = document.body.scrollTop; // 文档距离顶部位置
				//如果接近底部
				if (documentHeight - viewPortHeight - scrollHeight < 20) {
					//如果加载状态为null,则可以继续加载
					if (!loadState) {
						loadState = setTimeout(() => {
							callback();
							clearTimeout(loadState);
							loadState = null; //设置为空,否则清除掉也没用
						}, 2000);
					}
				}
			};
		}
}
// 工具类
const Utils = {
	/**
	 * 节流函数(在时间长度为delay的一段时间内，至少触发事件一次)
	 * 语法：throttle(delay[, noTrailing], callback[, debounceMode])
	 * @param {Number} delay 延迟的时间
	 * @param {Boolean} noTrailing 最后一次是否执行（不能与 debounceMode 同时设置）
	 * @param {Function} callback 回调函数
	 * @param {Boolean} debounceMode 是否一开始就执行（不能与 noTrailing 同时设置） 给debounce函数专用
	 */
	throttle(delay, noTrailing, callback, debounceMode){
		let timeoutID, // TAG 防抖不断
			lastExec = 0 // TAG 上一次执行的时间戳

		if (typeof noTrailing !== 'boolean') {
			debounceMode = callback
			callback = noTrailing
			noTrailing = undefined
		}

		function wrapper() {
			// eslint-disable-next-line no-invalid-this
			let self = this,
				elapsed = Number(new Date()) - lastExec,
				args = arguments

			function exec() {
				lastExec = Number(new Date())
				callback.apply(self, args)
			}

			function clear() {
				timeoutID = undefined
			}

			if (debounceMode && !timeoutID) {
				// TAG 防抖，（直接执行回调，并更新时间戳）
				exec()
			}
			if (timeoutID) {
				clearTimeout(timeoutID)
			}

			if (debounceMode === undefined && elapsed > delay) {
				// TAG 节流，本次操作距离上次的操作，时间上大于delay，则可以执行，（第一次会直接执行）
				exec()
			} else if (noTrailing !== true) {
				// TAG 防抖，noTrailing 始终是 undefined，timeoutID(clear/exec, delay)
				// TAG 节流，这么使用 throttle(delay[, noTrailing], callback) ，当本次操作距离上次的操作，时间上小于delay，设置 delay - elapsed 毫秒后执行
				timeoutID = setTimeout(
					debounceMode ? clear : exec,
					debounceMode === undefined ? delay - elapsed : delay // TAG 这个参数是节流和防抖不同的关键所在
				)
			}
		}

		return wrapper
	},

	/**
	 * 防抖函数（多次触发，在最后一次触发的时间点往后delay毫秒内，只执行一次回调，可以在开始时执行，也可以在结束时执行）
	 * 语法：debounce(time[, atBegin], callback)
	 * @param {Number} delay 延迟时间
	 * @param {Boolean} atBegin 是否一开始就执行回调
	 * @param {Function} callback 回调函数
	 */
	debounce(delay, atBegin, callback) {
		// eslint-disable-next-line prettier/prettier
		return callback === undefined ? this.throttle(delay, atBegin, false) : this.throttle(delay, callback, atBegin !== false)
	},
	
	/**
	下载base64格式文件
	* @param {*} b64 - b64文件编码
	* @param {String} file_name - 命名的名称
	*/
	downloadBase64Img(b64, file_name){
		// 创建隐藏的可下载链接
		let eleLink = document.createElement('a')

		eleLink.download = file_name
		eleLink.style.display = 'none'
		eleLink.href = b64
		eleLink.click()
	},

	/**
	 * 复制
	 * @param {*} param0 
	 */
	copy({ targetId = null, content = '', success = Function }) {
		const btn = document.querySelector(targetId)
		let listener = btn.addEventListener('click', () => {
			const input = document.createElement('input')

			input.setAttribute('readonly', 'readonly')
			input.setAttribute('value', content)
			document.body.appendChild(input)
			input.select()
			// 手机上要用这个方法
			input.setSelectionRange(0, 9999)

			if (document.execCommand('copy')) {
				document.execCommand('copy')
				success()
			}
			document.body.removeChild(input)
		})
		btn.removeEventListener('click',listener,true)
  }
}

class PDo {
	constructor() {
		this.Date = Time;
		this.String = Char;
		this.Cookies = Cookies;
		this.Verify = Verify;
		this.Utils = Utils;
	}
}
export default new PDo;