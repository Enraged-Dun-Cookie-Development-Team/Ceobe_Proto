# Ceobe_Proto

作为子模块使用时，为了使拉取主仓库代码时可以自动更新子模块，建议使用该命令将子模块设为自动更新`git config --global submodule.recurse true`  
注意: Jetbrains家的IDE在拉取代码时强行加上`--recurse-submodules=no`然后每个子模块单独更新，可能出现子模块更新失败的问题，需要手动执行`git submodule update`进行更新

## GO

- 依赖
  - `go install google.golang.org/protobuf/cmd/protoc-gen-go@latest`
  - `go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2`
- 命令
  - `protoc --go_out=<output-path> *.proto`
  - `protoc --go-grpc_out=<output-path> *.proto`

## nodejs

[使用教程](scripts/node/template/README.md)
