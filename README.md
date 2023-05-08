# Ceobe_Proto

## GO

- 依赖
  - `go install google.golang.org/protobuf/cmd/protoc-gen-go@latest`
  - `go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2`
- 命令
  - `protoc --go_out=<output-path> *.proto`
  - `protoc --go-grpc_out=<output-path> *.proto`

## nodejs

[使用教程](scripts/node/template/README.md)
