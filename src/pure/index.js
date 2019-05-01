// export function managerProDataFormatter(res) {
//   let dataList = [];

//   for (const key in res.managerDtoList) {
//     dataList.push({
//       processName: key,
//       data: res.managerDtoList[key],
//     })
//   }

//   return dataList;
// }
export function managerFormatter(res) {
  const isApprove = res.filter((item) => item.state === '已审批')
  const notApprove = res.filter((item) => item.state === '未审批')

  return {
    isApprove,
    notApprove,
    sum: res.length
  }
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
  let result = {
    ...data
  };
  delete result.pathFirst;
  delete result.pathSecond;
  delete result.pathThird;

  return result;
}