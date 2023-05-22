

App.icons({
  'android_mdpi': 'public/images/horserace.png',
  'android_hdpi': 'public/images/horserace.png',
  'android_xhdpi': 'public/images/horserace.png',
  'android_xxhdpi': 'public/images/horserace.png',
  'android_xxxhdpi': 'public/images/horserace.png',
});

App.accessRule('http://10.5.50.29:3000');


// App.appendToConfig(`
//   <platform name="android">
//   <preference name="android-targetSdkVersion" value="28" />
//     <allow-unsupported-gradle-version />
//     <framework src="androidx.core:core:1.7.0-alpha02" />
//     <framework src="androidx.appcompat:appcompat:1.4.1" />
//     <framework src="androidx.constraintlayout:constraintlayout:2.1.1" />
//     <framework src="androidx.legacy:legacy-support-v4:1.0.0" />
//   </platform>
// `);