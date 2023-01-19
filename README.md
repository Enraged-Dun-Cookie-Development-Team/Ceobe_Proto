# Ceobe_Proto

### GO
- 依赖
    - `go get -u github.com/golang/protobuf/proto`
    - `go install google.golang.org/protobuf/cmd/protoc-gen-go`
    - `go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2`
- 命令
    - `protoc --go_out=<output-path> *.proto`
    - `protoc --go_out=<output-path> *.proto`