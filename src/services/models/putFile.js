const qiniu = require('qiniu');
const path = require('path');

const accessKey = 'IxmVzoqgFkFvSQLqAaGkhNh_yrAmZQ1d6cMSMPL3';
const secretKey = 'KYjmRDbWP_Zk967MgHvOkWP63pmgWO662ABCTi4v';
const qiniuOptions = {
  scope: 'ultimavip-app',
};
const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;


/**
 * @desc 文件上传
 */
export default localPath => new Promise((resolve, reject) => {
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const putPolicy = new qiniu.rs.PutPolicy(qiniuOptions);
  const uploadToken = putPolicy.uploadToken(mac);
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();

  formUploader.putFile(
    uploadToken, path.posix.join('/mofang', path.basename(localPath)).slice(1),
    localPath, putExtra, (
      respErr,
      respBody, respInfo,
    ) => {
      if (respErr) {
        reject(respErr);
      }
      if (respInfo.statusCode === 200) {
        resolve(`https://img2.ultimavip.cn/${respBody.key}`);
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    },
  );
});
