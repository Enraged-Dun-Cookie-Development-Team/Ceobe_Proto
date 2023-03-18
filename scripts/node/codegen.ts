import * as path from 'path';
import * as fs from 'fs';
import fse from 'fs-extra';
import * as child_process from 'child_process';
import * as os from 'os';
import { ProtoMetadata } from './proto-types';


// ts-node启动的时候第一个参数从索引2开始
const workingDir = path.resolve(process.argv[2]);
const outputDir = path.resolve(process.argv[2]);
const protosDir = path.join(workingDir, 'protos');

function runProtoc() {
  const nodeModulesBinDir = path.join('..', 'node_modules', '.bin');
  let protocPlugin: string;
  if (os.platform() === 'win32') {
    protocPlugin = 'protoc-gen-ts_proto=' + path.join(nodeModulesBinDir, 'protoc-gen-ts_proto.cmd');
  } else {
    protocPlugin = path.join(nodeModulesBinDir, 'protoc-gen-ts_proto');
  }

  // 生成临时文件夹
  fs.rmSync('protos', {recursive: true, force: true});
  fse.copySync(protosDir, 'protos');
  fs.mkdirSync('protos/pb_meta', {recursive: true});
  fs.mkdirSync('protos/pb', {recursive: true});

  // 生成类型定义 用于代码生成
  const cmdMeta = `npx protoc --plugin=${protocPlugin} --ts_proto_out=pb_meta --ts_proto_opt=outputSchema=true,outputJsonMethods=false,outputClientImpl=false`;
  // 生成实际需要的内容
  const cmdPb = `npx protoc --plugin=${protocPlugin} --ts_proto_out=pb --ts_proto_opt=outputServices=grpc-js,outputJsonMethods=false,exportCommonSymbols=false,esModuleInterop=true`;

  // 命令必须要在protos文件所在目录运行，否则生成结果会相应的多一些目录结构不方便处理(例如输入文件是 protos/*.proto的话，生成结果就会变成 pb/protos/*.proto)
  child_process.execSync(cmdMeta + ' *.proto', {cwd: 'protos'});
  child_process.execSync(cmdPb + ' *.proto', {cwd: 'protos'});

  // 把临时文件夹的生成结果移出来然后删掉临时文件夹
  fs.rmSync('output', {recursive: true, force: true});
  fse.moveSync('protos/pb_meta', 'output/pb_meta');
  fse.moveSync('protos/pb', 'output/pb');
  fs.rmSync('protos', {recursive: true, force: true});
}

async function generateExportsForProto(protoName: string) {
  const meta = await import('./output/pb_meta/' + protoName);
  const protobufPackage = meta.protobufPackage as string;
  const protoMetadata = meta.protoMetadata as ProtoMetadata;
  let result = '';
  const prefix = '.' + protobufPackage + '.';
  const prefixLen = prefix.length;
  const types = Object.keys(protoMetadata.references).map(it => it.substring(prefixLen).replace('.', '_')).join(', ');
  result += `export { ${types} } from './pb/${protoName}';\n`;
  const services = protoMetadata.fileDescriptor.service;
  const clients = services.map((it: { name: string; }) => it.name + 'Client').join(', ');
  result += `export { ${clients} } from './pb/${protoName}';\n`;
  return result;
}

console.log('正在编译proto文件...');
runProtoc();
console.log('编译proto文件完成');

const protos = fs.readdirSync(protosDir)
  .filter(f => f.endsWith('.proto') && fs.lstatSync(path.join(protosDir, f)).isFile())
  .map(f => f.substring(0, f.length - '.proto'.length));

console.log('正在生成index文件...');
let indexFileOutput = '';
indexFileOutput += fs.readFileSync('template/grpc-helpers.ts').toString('utf-8');
indexFileOutput += '\n';
for (const proto of protos) {
  indexFileOutput += await generateExportsForProto(proto);
}
fs.writeFileSync('output/index.ts', indexFileOutput);
console.log('生成index文件完成');

console.log('正在拷贝生成结果...');
fse.copySync('template', 'output', {
  overwrite: true,
  filter: (src) => {
    return !src.includes('node_modules') && !src.includes('grpc-helpers.ts');
  }
});
fs.rmSync('output/pb_meta', {recursive: true, force: true});

// 清理旧文件
fs.readdirSync(outputDir)
  .filter(f => !['node_modules', 'scripts', 'protos', 'LICENSE'].includes(f))
  .map(f => path.join(outputDir, f))
  .forEach(f => fse.rmSync(f));
// 移动新文件
fse.copySync('output', outputDir, {
  overwrite: true,
});
fs.rmSync('output', {recursive: true, force: true});

console.log('拷贝生成结果完成');

