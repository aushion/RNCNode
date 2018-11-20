## 步骤
- react-native init RNCNode
- cd RNCNode
- npm i
- 若是iOS，直接：react-native run-ios 
- 若是 Android,需要先 react-native run-android 下载gradle, 再打开 Android studio，用 Android studio 跑项目
- 加入Git(git init; git commit -m "first commit"; git remote add origin https://github.com/fengyinchao/RNCNode.git; git push -u origin master)
- 建立分支 feature/launch，制作启动屏（react-native-splash-screen）,解决白屏问题
- npm i react-native-splash-screen --save
- react-native link react-native-splash-screen
- 具体使用参见 https://github.com/crazycodeboy/react-native-splash-screen/blob/master/README.zh.md
- 接入 Typescript
参考：http://bbs.reactnative.cn/topic/4483/%E4%BD%BF%E7%94%A8typescript%E7%BC%96%E5%86%99react-native-%E9%AB%98%E6%95%88%E7%89%88
## 遇到的问题
- 用 Android studio 跑项目时，有个 error： Please select android sdk
点进去重写下载一波依赖就 OK
- 引入ts 时，import React from 'react'; 报错
增加配置："allowSyntheticDefaultImports":true