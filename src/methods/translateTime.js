// parameter type
// string: Unix Timestamp to yyyy-mm-dd 上午00:00
// dash: Unix Timestamp to yyyy-mm-dd

export default (timestamp, type = 'string') => {
  let time = null;
  if (type === 'string') {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    time = new Date(timestamp * 1000).toLocaleString('zh-tw', options);
  } else if (type === 'dash') {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    let date = new Date(timestamp * 1000).toLocaleString('zh-TW', options);
    date = date
      .split('/')
      .map((num) => (num < 10 ? `0${num}` : num))
      .join('-');
    time = date;
  }
  return time;
};
