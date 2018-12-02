import {
  I18nManager
} from 'react-native';

function forInitial(props: Object): Object {
  const {
    navigation,
    scene
  } = props;

  const focused = navigation.state.index === scene.index;
  const opacity = focused ? 1 : 0;

  // If not focused, move the scene to the far away.
  const translate = focused ? 0 : 1000000;
  return {
    opacity,
    transform: [{
        translateX: translate
      },
      {
        translateY: translate
      }
    ]
  };
}

function forHorizontal(props: Object, options: Object): Object {
  const {
    layout,
    position,
    scene
  } = props;


  if (!layout.isMeasured) {
    return forInitial(props);
  }
  const index = scene.index;

  const inputRange: Array < number > = [index - 1, index - 0.999, index, index + 0.999, index + 1];
  const width = layout.initWidth;
  const outputRange = I18nManager.isRTL ^ !!(options && options.revertTransition) ? [-width, -width, 0, 0.3 * width, 0.3 * width] : [width, width, 0, -0.3 * width, -0.3 * width];


  const opacity = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1, 1, 0]: Array < number > )
  });

  const translateY = 0;
  const translateX = position.interpolate({
    inputRange,
    outputRange
  });

  return {
    opacity,
    transform: [{
        translateX
      },
      {
        translateY
      }
    ]
  };
}

function forVertical(props: Object, options: Object): Object {
  const {
    layout,
    position,
    scene
  } = props;

  if (!layout.isMeasured) {
    return forInitial(props);
  }

  const index = scene.index;
  const inputRange: Array < number > = [index - 1, index - 0.999, index, index + 0.999, index + 1];
  const height = layout.initHeight;

  const opacity = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1, 1, 0]: Array < number > )
  });

  const scale = position.interpolate({
    inputRange,
    outputRange: ([1, 1, 1, 0.95, 0.95]: Array < number > )
  });

  const translateX = 0;
  const translateY = position.interpolate({
    inputRange,
    outputRange: (options && options.revertTransition) ? [-height, -height, 0, -10, -10] : [height, height, 0, 10, 10]
  });

  return {
    opacity,
    transform: [{
        scale
      },
      {
        translateX
      },
      {
        translateY
      }
    ]
  };
}

export default () => {
  return {
    screenInterpolator: sceneProps => {
      const {
        scene
      } = sceneProps
      const {
        route
      } = scene
      const params = route.params || {}
      const transition = params.transition || 'forHorizontal'
      return transition === 'vertical' ? forVertical(sceneProps) : forHorizontal(sceneProps);
    }
  };
};
