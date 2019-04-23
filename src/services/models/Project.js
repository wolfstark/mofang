import fs from 'fs';
import _ from 'lodash';
import {
  stringifyComponent,
} from '@/utils/renderSfc';

export default {
  load(path, {
    encoding = 'utf8',
  } = {}) {
    const project = JSON.parse(fs.readFileSync(path, {
      encoding,
    }));

    return project;
  },

  save({
    path,
  }, data, cb) {
    // const fullPath = `${path}/${name}`
    const fullPath = path;
    // if (!fs.existsSync(fullPath)) {
    //   fs.mkdirSync(fullPath)
    // }
    // for (let page of data) {
    const {
      components,
    } = data;
    const code = stringifyComponent(components);
    fs.writeFile(`${fullPath}/index.vue`, code, (err) => {
      if (err) console.log(err);
    });
    // }
    fs.writeFile(`${fullPath}/index.json`, JSON.stringify(data), cb);
  },
};
