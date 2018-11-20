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
## 遇到的问题
- 用 Android studio 跑项目时，有个 error： Please select android sdk
点进去重写下载一波就 OK