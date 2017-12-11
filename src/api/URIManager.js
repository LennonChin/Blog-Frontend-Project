/**
 * Created by qinly on 2017/12/11.
 */

export const formatPath = path => {
  if (path instanceof Array) {
    let resultPath = new StringBuffer();
    path.map(function (aPath) {
      resultPath.append(aPath);
    });
  }
};

// 去除前后空格及/
const trimBackSlant = originStr => {
  return originStr.replace(/(^\s*)|(\s*$)/g, "");
};
