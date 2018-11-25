interface NavigationProps {
  navigation: {
    navigate: (path: string,params?:{}) => {};
    state: {};
    dispatch: () => {};
    goBack: () => {};
    dismiss: () => {};
  }
}
