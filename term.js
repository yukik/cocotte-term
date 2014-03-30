/*
 * cocotte-term
 * Copyright(c) 2013 Yuki Kurata <yuki.kurata@gmail.com>
 * MIT Licensed
 */

/*
 * dependencies
 */
var is = require('cocotte-is');

/**
 * @method term
 * @param  {String|Array} value
 * @return {Array} rtn
 */
var term = function term (value) {
	'use strict';

	var sFrom // 開始日時（文字列）
	  , sTo   // 終了日時（文字列）
	  , from  // 開始日時（日時）
	  , to;   // 終了日時（日時）

	// 文字列の場合
	if (is(String, value)) {
		sFrom = value;
		sTo = null;

	// 配列の場合
	} else if (is.allString(value) && value.length === 2) {
		sFrom = value[0];
		sTo = value[1];
	}

	// 引数エラー
	if (!sFrom) {
		throw new TypeError('引数が不明です');
	}

	var f = sFrom.match(/\d{1,4}/g).map(function(x, i) {return i === 1 ? x - 1 : x * 1;});

	switch (f.length) {

	case 1:
		from = new Date(f[0], 0, 1);
		break;

	case 2:
		from = new Date(f[0], f[1], 1);
		break;

	case 3:
		from = new Date(f[0], f[1], f[2]);
		break;

	case 4:
		from = new Date(f[0], f[1], f[2], f[3], 0, 0);
		break;

	case 5:
		from = new Date(f[0], f[1], f[2], f[3], f[4], 0);
		break;

	case 6:
		from = new Date(f[0], f[1], f[2], f[3], f[4], f[5]);
		break;

	default:
		throw new TypeError('引数が不明です');
	}

	if (sTo) {

		// 終了時刻指定時
		var t = sTo.match(/\d{1,4}/g).map(function(x, i) {return i === 1 ? x - 1 : x * 1;});

		switch (t.length) {

		case 1:
			to = new Date(t[0], 11, 31, 23, 59, 59, 999);
			break;

		case 2:
			to = new Date(t[0], t[1] + 1, 0, 23, 59, 59, 999);
			break;

		case 3:
			to = new Date(t[0], t[1], t[2], 23, 59, 59, 999);
			break;

		case 4:
			to = new Date(t[0], t[1], t[2], t[3] - 1, 59, 59, 999);
			break;

		case 5:
			to = new Date(t[0], t[1], t[2], t[3], t[4] - 1, 59, 999);
			break;

		case 6:
			to = new Date(t[0], t[1], t[2], t[3], t[4], t[5] - 1, 999);
			break;

		default:
			throw new TypeError('引数が不明です');
		}

	} else {
		// 終了時刻未指定時
		switch (f.length) {

		case 1:
			to = new Date(f[0], 11, 31, 23, 59, 59, 999);
			break;

		case 2:
			to = new Date(f[0], f[1] + 1, 0, 23, 59, 59, 999);
			break;

		case 3:
			to = new Date(f[0], f[1], f[2], 23, 59, 59, 999);
			break;

		case 4:
			to = new Date(f[0], f[1], f[2], f[3], 59, 59, 999);
			break;

		case 5:
			to = new Date(f[0], f[1], f[2], f[3], f[4], 59, 999);
			break;

		case 6:
			to = new Date(f[0], f[1], f[2], f[3], f[4], f[5], 999);
			break;

		default:
			throw new TypeError('引数が不明です');
		}
	}

	return [from, to];
};

module.exports = exports = term;

