{'targets': [
  {
    'target_name': 'node-threadobject',
    'sources': [
        'src/rcib.cc',
        'src/rcib_object.cc',
        'src/globals.cc',
        'src/rcib/at_exist.cc',
        'src/rcib/lazy_instance.cc',
        'src/rcib/MessageLoop.cc',
        'src/rcib/MessagePumpDefault.cc',
        'src/rcib/PendingTask.cc',
        'src/rcib/ref_counted.cc',
        'src/rcib/Thread.cc',
        'src/rcib/util_tools.cc',
        'src/rcib/WeakPtr.cc',
        'src/rcib/Event/WaitableEvent.cc',
        'src/rcib/time/time.cc',
        'src/rcib/roler.cc',
        'src/hash/hash.cc',
        'src/hash/sha/sha.cc',
        'src/hash/sha/hmac_sha.cc',
        'src/file/file.cc',
        'src/delayed/delayed.cc',
        'src/ed25519/ed25519.cc',
        'src/rcib.h',
        'src/rcib_object.h',
        'src/hash/hash.h',
        'src/hash/sha/sha.h',
        'src/hash/sha/hmac_sha.h',
        'src/file/file.h',
        'src/delayed/delayed.h',
        'src/ed25519/ed25519.h',
        'src/ed25519/ed25519/keypair.c',
        'src/ed25519/ed25519/sign.c',
        'src/ed25519/ed25519/open.c',
        'src/ed25519/ed25519/crypto_verify_32.c',
        'src/ed25519/ed25519/ge_double_scalarmult.c',
        'src/ed25519/ed25519/ge_frombytes.c',
        'src/ed25519/ed25519/ge_scalarmult_base.c',
        'src/ed25519/ed25519/ge_precomp_0.c',
        'src/ed25519/ed25519/ge_p2_0.c',
        'src/ed25519/ed25519/ge_p2_dbl.c',
        'src/ed25519/ed25519/ge_p3_0.c',
        'src/ed25519/ed25519/ge_p3_dbl.c',
        'src/ed25519/ed25519/ge_p3_to_p2.c',
        'src/ed25519/ed25519/ge_p3_to_cached.c',
        'src/ed25519/ed25519/ge_p3_tobytes.c',
        'src/ed25519/ed25519/ge_madd.c',
        'src/ed25519/ed25519/ge_add.c',
        'src/ed25519/ed25519/ge_msub.c',
        'src/ed25519/ed25519/ge_sub.c',
        'src/ed25519/ed25519/ge_p1p1_to_p3.c',
        'src/ed25519/ed25519/ge_p1p1_to_p2.c',
        'src/ed25519/ed25519/ge_tobytes.c',
        'src/ed25519/ed25519/fe_0.c',
        'src/ed25519/ed25519/fe_1.c',
        'src/ed25519/ed25519/fe_cmov.c',
        'src/ed25519/ed25519/fe_copy.c',
        'src/ed25519/ed25519/fe_neg.c',
        'src/ed25519/ed25519/fe_add.c',
        'src/ed25519/ed25519/fe_sub.c',
        'src/ed25519/ed25519/fe_mul.c',
        'src/ed25519/ed25519/fe_sq.c',
        'src/ed25519/ed25519/fe_sq2.c',
        'src/ed25519/ed25519/fe_invert.c',
        'src/ed25519/ed25519/fe_tobytes.c',
        'src/ed25519/ed25519/fe_isnegative.c',
        'src/ed25519/ed25519/fe_isnonzero.c',
        'src/ed25519/ed25519/fe_frombytes.c',
        'src/ed25519/ed25519/fe_pow22523.c',
        'src/ed25519/ed25519/sc_reduce.c',
        'src/ed25519/ed25519/sc_muladd.c'
    ],
    'conditions':[
            [
            'OS=="win"', {
                'win_delay_load_hook': 'false',
                'libraries':[],
                'cflags':[]
            }],[
                'OS=="linux"', {
                        'libraries':[],
                        'cflags':[]
                }]
   ]}]}