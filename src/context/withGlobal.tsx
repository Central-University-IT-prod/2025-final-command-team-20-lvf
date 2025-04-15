import React, { useContext, ReactNode, useState } from 'react';
import { GlobalContext, Global } from './context';
import { DEFAULT_GLOBAL } from '../config';


export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<Global>(DEFAULT_GLOBAL as Global);

  return (
    <GlobalContext.Provider
      value={{
        value: state,
        setter: setState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function withGlobal<TStateProps>(
  mapContextToProps: (state: Global) => TStateProps
) {
  return function <P extends TStateProps>(
    Component: React.ComponentType<P>
  ): React.FC<Omit<P, keyof TStateProps>> {
    return function WithGlobalComponent(props) {
      const globalState = useContext(GlobalContext);

      if (!globalState) {
        throw new Error('useContext must be used within a GlobalProvider');
      }

      const stateProps = mapContextToProps(globalState.value);

      // @ts-expect-error This is a workaround to avoid type errors in React
      return <Component {...(props as P)} {...stateProps} />;
    };
  };
}
