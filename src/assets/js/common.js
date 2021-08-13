/**
 * 格式化时间 将秒转换成时分秒的格式展示
 * @param {*} _time 秒
 */
function formatDate(_time) {
  if (!_time) return ''
  if (_time >= 60 && _time <= 3600) {
    _time = parseInt(_time / 60) + "m" + _time % 60 + "s";
  } else if (_time > 3600){
    _time = parseInt(_time / 3600) + "h" + parseInt(((_time % 3600) / 60)) + "m" + _time % 60 + "s";
  } else {
    _time = _time + "s";
  }
  return _time;
}

/**
 * 格式化课程等级
 * 传入level
 */
function  setLevel(_level) {
  let str = '';
  switch(_level * 1) {
    case 1:
      str = '初级';
      break;
    case 2:
      str = '中级';
      break;
    case 3:
      str = '高级';
      break;
  }
  return str;
}

function isArrayEqual(a, b) {
  let m = new Map();
  a.forEach(o => m.set(o, (m.get(o) || 0) + 1));
  b.forEach(o => m.set(o, (m.get(o) || 0) - 1)); for (var value of m.values()) {
      if (value !== 0) { return false }
  } return true
}

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
      this.splice(index, 1);
  }
};

/**
 * 格式化日期
 * @param {*} _date 
 */
function formatTime(_date) {
  if (!_date) return ''
  let date = new Date(_date)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

function formatScore(_score) {
  if(_score <= 60) {
    return '继续努力'
  } else if(_score>60 && _score <=80) {
    return '再接再厉'
  } else {
    return '继续加油'
  }
}

export {
  isArrayEqual,
  formatDate,
  setLevel,
  formatTime,
  formatScore
}
