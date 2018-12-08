import {
  Easing,
  Animated
} from 'react-native';

export default () => ({
  transitionSpec: {
    duration: 500,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const {
      layout,
      position,
      scene
    } = sceneProps
    const {
      index,
      route: {
        params
      }
    } = scene

    const {
      initHeight: height,
      initWidth: width
    } = layout

    const translateY = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [height, 0, 0]
    })

    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [width, 0, 0]
    })

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1]
    })

    const vertical = params && params.transition === 'vertical'

    return {
      opacity,
      transform: [vertical ? {
        translateY
      } : {
        translateX
      }]
    }
  }
})
