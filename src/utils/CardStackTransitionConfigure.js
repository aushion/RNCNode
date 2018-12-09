import {
  Easing,
  Animated
} from 'react-native';

export default () => ({
  transitionSpec: {
    duration: 750,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true
  },
  screenInterpolator: sceneProps => {
    const {
      position,
      layout,
      scene,
      index,
      scenes
    } = sceneProps

    const thisSceneIndex = scene.index
    const height = layout.initHeight
    const width = layout.initWidth

    // We can access our navigation params on the scene's 'route' property
    var thisSceneParams = scene.route.params || {}

    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [width, 0, 0]
    })

    const translateY = position.interpolate({
      inputRange: [thisSceneIndex - 0.9, thisSceneIndex, thisSceneIndex + 0.9],
      outputRange: [height, 0, 0]
    })

    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
      outputRange: [0, 1, 1],
    })

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 0.9, thisSceneIndex, thisSceneIndex + 0.9],
      outputRange: [.7, 1, .7]
    })

    const slideFromRight = {
      opacity,
      transform: [{
        translateX
      }]
    }

    const slideInFromBottom = {
      opacity,
      transform: [{
        translateY
      }, {
        scaleY: scale
      }]
    }

    if (thisSceneParams.transition === 'vertical')
      return slideInFromBottom
    else
      return slideFromRight
  }
})
