/* 
   "license": "BSD"
*/

#ifndef RCIB_VM_
#define RCIB_VM_

class VMRe : public rcib::Param {
public:
  explicit VMRe(base::WeakPtr<base::Thread> thr){
    _data = nullptr;
    _thr = thr;
    if(thr.get()) thr->IncComputational();
  }
  virtual ~VMRe(){
    // to free mem
    if(_data) free(_data);
    // to dec num of tasks in this thr
    if (_thr.get()) _thr->DecComputational();
  }
  uint8_t * _data;
  base::WeakPtr<base::Thread> _thr;
};

class VmHelper {
public:
  //constructor
  explicit VmHelper();
  //static
  static VmHelper* GetInstance();
  
  void RunCode(const std::string &code, const std::string &param, rcib::async_req * req);
private:
  void Init();
};

#endif
