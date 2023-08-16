import { createContext, useReducer } from "react";

export const AdminContext = createContext()

export const adminReducer = (state, action) => {
    switch(action.type) {
        case 'SET_ADMIN':
            return {
                admin: action.payload
            }
        case 'ADD_LINK':
            return {
                admin: {
                    ...state.admin,
                    user: {
                        ...state.admin.user,
                        links: [...state.admin.user.links, action.payload._id]
                    },
                    links: [action.payload, ...state.admin.links]
                }
            }
        default:
            return state
    }
}

export const AdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(adminReducer, {
        admin: null
    })

    return (
        <AdminContext.Provider value={{...state, dispatch}}>
            { children }
        </AdminContext.Provider>
    )
}