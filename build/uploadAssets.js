const qiniu = require('qiniu');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const argv = process.argv;

if (argv.length < 4) {
  console.log(chalk.red('Error: You need to provide accessKey and secretKey'));
  console.log(chalk.red('Like this: npm run upload accessKey secretKey'));
  return;
}

const accessKey = argv[2];
const secretKey = argv[3];

const {bucket, assetsPrefix} = require('../config').build.qiniuConfigs;

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;

// bucket管理器
const bucketManager = new qiniu.rs.BucketManager(mac, config);
// 获取指定前缀的文件，用于删除原有文件
const options = {
  limit: 300,
  prefix: `${assetsPrefix}/`,
};

// 删除旧文件业务
const deleteOldFiles = new Promise((doneResolve, doneReject) => {

  new Promise((resolve, reject) => {
    // 找到相应的文件列表
    let oldFilePaths = [];
    bucketManager.listPrefix(bucket, options, function (err, respBody, respInfo) {
      if (err) {
        doneReject(err);
      }
      if (respInfo.statusCode === 200) {
        //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
        //指定options里面的marker为这个值
        const nextMarker = respBody.marker;
        const commonPrefixes = respBody.commonPrefixes;
        console.log('nextMarker', nextMarker);
        console.log('commonPrefixes', commonPrefixes);
        const items = respBody.items;
        oldFilePaths = items.map((item) => {
          return item.key;
        });
        resolve(oldFilePaths);
      } else {
        console.log('statusCode', respInfo.statusCode);
        console.log('respBody', respBody);
      }
    });
  }).then(oldFilePaths => {
    const deleteOperations = oldFilePaths.map((oldFilePath) => {
      return qiniu.rs.deleteOp(bucket, oldFilePath)
    });
    // 删除文件
    bucketManager.batch(deleteOperations, function (err, respBody, respInfo) {
      if (err) {
        doneReject(err);
      } else {
        // 200 is success, 298 is part success
        if (parseInt(respInfo.statusCode / 100) === 2) {
          respBody.forEach(function (item) {
            if (item.code === 200) {
              console.log(item.code + "\t delete old file success");
            } else {
              console.log(item.code + "\t" + item.data.error);
            }
          });
          doneResolve(respInfo.statusCode);
        } else {
          console.log(respInfo.deleteusCode);
          console.log(respBody);
        }
      }
    });
  });
});

const doUpload = (key, file) => {
  const options = {
    scope: bucket
  };
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
      if (err) {
        return reject(err)
      }
      if (info.statusCode === 200) {
        resolve(body)
      } else {
        reject(body)
      }
    })
  });
};


// dist/resource/client/...
const uploadAll = (dir, prefix) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const key = prefix ? `${prefix}/${file}` : file;
    if (fs.lstatSync(filePath).isDirectory()) {
      return uploadAll(filePath, key)
    }
    doUpload(`${assetsPrefix}/${key}`, filePath)
      .then(resp => console.log(resp))
      .catch(err => console.error(err))
  });
};

// 删除旧文件并上传新文件
const distPath = path.join(__dirname, '../dist');
deleteOldFiles.then(code => {
  console.log(code);
  uploadAll(distPath);
}).catch(error => {
});
