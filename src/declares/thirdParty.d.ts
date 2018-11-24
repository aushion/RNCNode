declare module 'react-native-default-preference';
declare module 'react-native-elements';
declare module 'react-native-splash-screen';
declare module 'react-native-vector-icons/Ionicons';

interface NavigationProps {
  navigation: {
    navigate: (path: string) => {};
    state: {};
    dispatch: () => {};
    goBack: () => {};
    dismiss: () => {};
  };
}
