/* 
   "license": "BSD"
*/

#include "../rcib.h"
#include "vm.h"

extern base::LazyInstance<rcib::ArrayBufferAllocator> array_buffer_allocator_;

//constructor
VmHelper::VmHelper(){
  Init();
}

void VmHelper::Init() {
}

//static
VmHelper* VmHelper::GetInstance(){
  static VmHelper This;
  return &This;
}

void VmHelper::RunCode(const std::string &code, const std::string &param, rcib::async_req * req){
  v8::Isolate::CreateParams params;
  params.array_buffer_allocator = &array_buffer_allocator_.Get();
  v8::Isolate* isolate = v8::Isolate::New(params);
  VMRe *hre = reinterpret_cast<VMRe *>(req->out);
  do {
    v8::Locker locker(isolate);

    v8::Isolate::Scope isolate_scope(isolate);
    // Create a stack-allocated handle scope.
    v8::HandleScope handle_scope(isolate);

    // Create a new context.
    v8::Local<v8::Context> context = v8::Context::New(isolate);

    // Enter the context for compiling and running the hello world script.
    v8::Context::Scope context_scope(context);

    v8::TryCatch catcher(isolate);
    catcher.SetVerbose(false);
    // Create a string containing the JavaScript source code.
    v8::Local<v8::String> source =
      v8::String::NewFromUtf8(isolate, code.c_str());
    // Compile the source code.
    v8::Local<v8::Script> script = v8::Script::Compile(context, source).ToLocalChecked();

    // Run the script to get the result.
    v8::Local<v8::Value> result = script->Run(context).ToLocalChecked();

    if (catcher.HasCaught()){
      std::string errMsg;
      v8::Local<v8::Message> message = catcher.Message();
      if (!message.IsEmpty()) {
        v8::Local<v8::String> rawError = message->Get();
        errMsg.resize(1 + rawError->Utf8Length());
        rawError->WriteUtf8(const_cast<char *>(errMsg.data()));
      }
      rcib::RcibHelper::EMark2(req, errMsg);
      break;
    }

    v8::Handle<v8::Object> globalObj = isolate->GetCurrentContext()->Global();
    v8::Handle<v8::Value>  globalFunction = globalObj->Get(v8::String::NewFromUtf8(isolate, "main"));
    if (globalFunction.IsEmpty() || !globalFunction->IsFunction()){
      std::string errMsg;
      errMsg = "error: no function main";
      rcib::RcibHelper::EMark2(req, errMsg);
      break;
    }
    v8::Handle<v8::Function> func = v8::Handle<v8::Function>::Cast(globalFunction);
    v8::Local<v8::Value> v1 = v8::String::NewFromUtf8(isolate, param.c_str());
    v8::Handle<v8::Value> args[1] = { v1 };
    v8::Handle<v8::Value> tmpCallVal = func->Call(globalObj, 1, args);

    if (catcher.HasCaught()){
      std::string errMsg;
      v8::Local<v8::Message> message = catcher.Message();
      if (!message.IsEmpty()) {
        v8::Local<v8::String> rawError = message->Get();
        errMsg.resize(1 + rawError->Utf8Length());
        rawError->WriteUtf8(const_cast<char *>(errMsg.data()));
      }
      rcib::RcibHelper::EMark2(req, errMsg);
      break;
    }

    v8::Local<v8::String> V8String = tmpCallVal->ToString();
    int len = 1 + V8String->Utf8Length();
    char *p = (char *)malloc(len);
    V8String->WriteUtf8(p);
    hre->_data = (uint8_t *)p;
    req->result = 1;
  } while (false);
  rcib::RcibHelper::GetInstance()->Uv_Send(req, NULL);
  // Dispose the isolate
  isolate->Dispose();
}
