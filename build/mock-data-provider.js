const fs = require('fs');
const _ = require('lodash');

const baseDir = process.cwd();
const mockDir = `${baseDir}/mockData/`;

let mockData = {};
const loadData = (dataFilePath) => {
  if (fs.existsSync(dataFilePath)) {
    const data = require(dataFilePath);
    mockData = { ...mockData, ...data };
  }
};


module.exports = function getMockData() {
  mockData = {};
  let mockFiles;
  try {
    mockFiles = fs.readdirSync(mockDir);
  } catch (e) {
    return console.log('加载mock文件失败', e);
  }
  _.each(mockFiles, (file) => {
    loadData(mockDir + file);
  });

  return mockData;
};

