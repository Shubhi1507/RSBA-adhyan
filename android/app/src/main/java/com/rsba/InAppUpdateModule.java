// public class InAppUpdateModule extends ReactContextBaseJavaModule implements InstallStateUpdatedListener, LifecycleEventListener {
//     private AppUpdateManager appUpdateManager;
//     private static ReactApplicationContext reactContext;
//     private static final int STALE_DAYS = 1;
//     private static final int MY_REQUEST_CODE = 0;


//     InAppUpdateModule(ReactApplicationContext context) {
//         super(context);
//         reactContext = context;
//         reactContext.addActivityEventListener(mActivityEventListener);
//         reactContext.addLifecycleEventListener(this);
//     }

//     @NonNull
//     @Override
//     public String getName() {
//         return "InAppUpdate";
//     }


//     @Override
//     public void onStateUpdate(InstallState state) {
//         if (state.installStatus() == InstallStatus.DOWNLOADED) {
           
//         }
//     }

//     @Override
//     public void onHostResume() {
        
//     }

//     @Override
//     public void onHostPause() {

//     }

//     @Override
//     public void onHostDestroy() {
       
//     }
    
//     private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
//         @Override
//         public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
//             if (requestCode == MY_REQUEST_CODE) {
//                 if (resultCode != RESULT_OK) {
//                     System.out.println("Update flow failed! Result code: " + resultCode);
//                     // If the update is cancelled or fails,
//                     // you can request to start the update again.
//                 }
//             }
//         }
//     };

// }
