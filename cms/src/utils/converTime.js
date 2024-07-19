const converTime = (time) => {
  const date = new Date(time);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return (
    day +
    "-" +
    month +
    "-" +
    year +
    " - " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds
  );
};
export default converTime;
