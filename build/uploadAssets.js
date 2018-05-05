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

const { bucket, assetsPrefix }  = require('../config').build.qiniuConfigs;

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;

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

const distPath = path.join(__dirname, '../dist');

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

uploadAll(distPath);
