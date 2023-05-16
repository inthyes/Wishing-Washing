const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      url: require.resolve('url'),
    },
  },
  // 웹팩 구성 옵션 및 로더, 플러그인 등 추가 설정
};
