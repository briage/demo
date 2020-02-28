import fs from 'fs';
import path from 'path';
import glob from 'glob';

const ns = {
  // [serviceClassName]: 'namespace'
};

glob.sync(path.join(path.resolve(__dirname), './**/*.thrift'))
  .map((filename) => {
    const content = fs.readFileSync(filename, {encoding: 'utf-8'});
    const namespaceMatched = content.match(/namespace\s+\w+\s+(.+)/);
    if (!namespaceMatched) return null;
    const namespace = namespaceMatched[1];
    const serviceMatched = content.match(/service\s+[\w_]+(?=\s+.*\n?{)/g);
    if (serviceMatched) {
      serviceMatched.map((snippet) => {
        const [, serviceClassName] = snippet.match(/service\s+([\w_]+)/);
        ns[serviceClassName] = namespace;
      });
    }
  });


export default function getNamespace(serviceClassName) {
  return ns[serviceClassName];
};
