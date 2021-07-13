import { useReducer, useContext, createContext } from 'react';

const SidebarStateContext = createContext()
const SidebarDispatchContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOOGLE_SIDEBAR':
      if (state.expanded) return {
        expanded: false
      };
      return {
        expanded: true
      };
    
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const SidebarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    expanded: true
  });

  return (
    <SidebarDispatchContext.Provider value={dispatch}>
      <SidebarStateContext.Provider value={state}>
        {children}
      </SidebarStateContext.Provider>
    </SidebarDispatchContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarStateContext)
export const useDispatchSidebar = () => useContext(SidebarDispatchContext)