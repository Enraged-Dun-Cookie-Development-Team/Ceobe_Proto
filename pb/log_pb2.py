# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: log.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\tlog.proto\x12\x02pb\"\x8b\x02\n\nLogRequest\x12(\n\x06server\x18\x01 \x01(\x0e\x32\x18.pb.LogRequest.ServeType\x12%\n\x05level\x18\x02 \x01(\x0e\x32\x16.pb.LogRequest.LogType\x12\x0e\n\x06manual\x18\x03 \x01(\x08\x12\x0c\n\x04info\x18\x04 \x01(\t\x12\r\n\x05\x65xtra\x18\x05 \x01(\t\"?\n\tServeType\x12\x08\n\x04RUST\x10\x00\x12\x0b\n\x07\x46\x45TCHER\x10\x01\x12\x0c\n\x08\x41NALYZER\x10\x02\x12\r\n\tSCHEDULER\x10\x03\">\n\x07LogType\x12\t\n\x05TRACE\x10\x00\x12\t\n\x05\x44\x45\x42UG\x10\x01\x12\x08\n\x04INFO\x10\x02\x12\x08\n\x04WARN\x10\x03\x12\t\n\x05\x45RROR\x10\x04\"\x1e\n\x0bLogResponse\x12\x0f\n\x07success\x18\x01 \x01(\x08\x32\x33\n\x03Log\x12,\n\x07PushLog\x12\x0e.pb.LogRequest\x1a\x0f.pb.LogResponse\"\x00\x42\x06Z\x04./pbb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'log_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'Z\004./pb'
  _globals['_LOGREQUEST']._serialized_start=18
  _globals['_LOGREQUEST']._serialized_end=285
  _globals['_LOGREQUEST_SERVETYPE']._serialized_start=158
  _globals['_LOGREQUEST_SERVETYPE']._serialized_end=221
  _globals['_LOGREQUEST_LOGTYPE']._serialized_start=223
  _globals['_LOGREQUEST_LOGTYPE']._serialized_end=285
  _globals['_LOGRESPONSE']._serialized_start=287
  _globals['_LOGRESPONSE']._serialized_end=317
  _globals['_LOG']._serialized_start=319
  _globals['_LOG']._serialized_end=370
# @@protoc_insertion_point(module_scope)
