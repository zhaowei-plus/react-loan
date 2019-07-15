/**
 * 工具类函数文件
 */

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!');  // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false;
    // 是否包含
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(routePath =>
    routePath.indexOf(path) === 0 && routePath !== path);

  routes = routes.map(item => item.replace(path, ''));

  const renderArr = getRenderArr(routes);

  const renderRoutes = renderArr.map((item) => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
      exact,
    };
  });
  return renderRoutes;
}

/**
 * 获取url参数的方法
 * @param qs
 * @returns {{}}
 */
export function getQueryParams(qs) {
  const params = {};
  const re = /[?&]?([^=]+)=([^&]*)/g;
  let tokens;
  if (qs) {
    qs = qs.split('+').join(' ');

    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
  }
  return params;
}

/**
 * 将数字格式化为金额格式
 *
 * @param { String } s 要格式化的数字
 * @param { Number } n 保留小数的位数
 * @param { String } c 分割的字符，默认是 ','
 *
 * @return { String } 格式化后的金额字符串
 * */
function fmoney(s, n, c = ',') {
  n = n > 0 && n <= 20 ? n : 2;
  /* eslint-disable no-useless-escape */
  s = `${parseFloat((`${s}`).replace(/[^\d\.-]/g, '')).toFixed(n)}`;
  const l = s.split('.')[0].split('').reverse();
  const r = s.split('.')[1];
  let t = '';
  for (let i = 0; i < l.length; i += 1) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? c : '');
  }
  return `${t.split('').reverse().join('')}.${r}`;
}
/**
 * 格式化金额
 * 注：金额精确到分，这里需要除以100
 * */
export function formatMoney(num, char = ',') {
  if (!num && num !== 0) {
    return '-';
  }
  if (isNaN(num)) {
    return '-';
  }
  return fmoney(num / 100, 2, char);
}

export function formatOutputString(str) {
  if (!str) {
    return '-';
  }
  return str;
}

export function formatOutputNumber(num) {
  if (!num && num !== 0) {
    return '-';
  }
  return num;
}

export function formatAmount(amount) {
  let rtn = '';
  const spaceCount = amount.length / 4;
  for (let i = 0; i < spaceCount; i += 1) {
    rtn += `${amount.substring(i * 4, (i * 4) + 4)} `;
  }
  return rtn.substring(0, rtn.length - 1);
}
