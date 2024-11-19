import {
  createNavigationContainerRef,
  StackActions,
} from "@react-navigation/native";

/**
 * Reference to the navigation container.
 */
export const navigationRef = createNavigationContainerRef();

/**
 * Pushes a new route onto the navigation stack.
 *
 * @param name - The name of the route to push.
 * @param params - Optional parameters to pass to the route.
 */
export function push(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.current?.dispatch(StackActions.push(name, params));
  }
}

/**
 * Pops the specified number of screens from the navigation stack.
 *
 * @param count - The number of screens to pop from the stack.
 */
export function pop(count) {
  if (navigationRef.isReady()) {
    navigationRef.current?.dispatch(StackActions.pop(count));
  }
}

/**
 * Navigates to a specific route in the app.
 *
 * @param name - The name of the route to navigate to.
 * @param params - Optional parameters to pass to the route.
 */
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

/**
 * Navigates back to the previous screen.
 */
export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.current?.goBack();
  }
}
