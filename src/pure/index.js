export function managerProDataFormatter(res) {
  let dataList = [];

  for (const key in res.managerDtoList) {
    dataList.push({
      processName: key,
      data: res.managerDtoList[key],
    })
  }

  return dataList;
}
export function manageSubmitFormatter(key, item) {
  let result = [];
  
  for (const v in item) {
    result.push({
      key: v,
      level: item[v],
    })
  }

  return {
    [key]: result,
  }
}
export function editDataFormatter(data) {
  let result = { ...data };
  delete result.pathFirst;
  delete result.pathSecond;
  delete result.pathThird;

  return result;
}