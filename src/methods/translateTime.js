export default (timestamp) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  const time = new Date(timestamp * 1000).toLocaleString('zh-tw', options);
  return time;
};
