https://github.com/yjhjstz/deep-into-node/blob/master/chapter2/chapter2-1.md
#### Node.js体系架构
* Node Standard Library 标准库，包括Http,Buffer等模块
* Node Bindings 沟通JS和C++的桥梁，封装V8和Libuv的细节，向上层提供基础API服务
* 底层由C/C++实现
	* V8提供JavaScript运行环境
	* Libuv提供跨平台异步I/O能力
	* C-ares提供异步处理DNS相关能力
	* Http_parser、OpenSSL、Zlib等提供Http解析、SSL、数据压缩等其他能力