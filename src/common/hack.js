
/**
 * 帮助中心接口
 */

const BLOCK_IDENTITY = [
  '/help-center/',
];

const needBlock = (url) => {
  let result = false;

  BLOCK_IDENTITY.forEach((item) => {
    if (url.includes(item)) {
      result = true;
    }
  });

  return result;
};

/**
 * 屏蔽部分接口的 报错提示
 * @param e
 * @returns {boolean}
 */
const responseErrHandleBlockHack = (e) => {
  if (e.config) {
    return needBlock(e.config.url);
  }

  return false;
};

export default responseErrHandleBlockHack;
