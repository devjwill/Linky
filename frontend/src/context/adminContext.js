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
                        links: [action.payload._id, ...state.admin.user.links]
                    },
                    links: [action.payload, ...state.admin.links]
                }
            }
        case 'DELETE_LINK':
            return {
                admin: {
                    ...state.admin,
                    user: {
                        ...state.admin.user,
                        links: state.admin.user.links.filter(link => link !== action.payload._id)
                    },
                    links: state.admin.links.filter(link => link._id !== action.payload._id)
                }
            }
        case 'EDIT_LINK':
            const updatedLinks = state.admin.links.map(link => {
                if (link._id === action.payload._id) {
                    return {...link, ...action.payload}
                }
                return link
            })

            return {
                admin: {
                    ...state.admin,
                    links: updatedLinks
                }
            }
            case 'EDIT_ORDER': {
                return {
                    admin: {
                        ...state.admin,
                        user: {
                            ...state.admin.user,
                            links: action.payload.userLinks
                        },
                        links: action.payload.links
                    }
                }
            }
            case 'EDIT_BACKGROUND': {
                return {
                    admin: {
                        ...state.admin,
                        user: {
                            ...state.admin.user,
                            appearance: {
                                ...state.admin.user.appearance,
                                background: action.payload
                            }
                        }
                    }
                }
            }
            case 'EDIT_PROFILE_TITLE': {
                return {
                    admin: {
                        ...state.admin,
                        user: {
                            ...state.admin.user,
                            appearance: {
                                ...state.admin.user.appearance,
                                profileTitle: action.payload 
                            }
                        }
                    }
                }
            }
            case 'EDIT_BIO': {
                return {
                    admin: {
                        ...state.admin,
                        user: {
                            ...state.admin.user,
                            bio: action.payload
                        }
                    }
                }
            }
            case 'EDIT_PROFILE_PICTURE': {
                return {
                    admin: {
                        ...state.admin,
                        user: {
                            ...state.admin.user,
                            profilePicture: action.payload
                        }
                    }
                }
            }
            case 'EDIT_BUTTON_DESIGN': {
                return {
                    admin: {
                        ...state.admin,
                        user: {
                            ...state.admin.user,
                            appearance: {
                                ...state.admin.user.appearance,
                                buttons: {
                                    ...state.admin.user.appearance.buttons,
                                    design: action.payload
                                }
                            }
                        }
                    } 
                }
            }
            case 'EDIT_BUTTON_COLOR': {
                return {
                    admin: {
                        ...state.admin,
                        user: {
                            ...state.admin.user,
                            appearance: {
                                ...state.admin.user.appearance,
                                buttons: {
                                    ...state.admin.user.appearance.buttons,
                                    color: action.payload
                                }
                            }
                        }
                    }
                }
            }
            case 'EDIT_BUTTON_SHADOW_COLOR': {
                return {
                    admin: {
                        ...state.admin,
                        user: {
                            ...state.admin.user,
                            appearance: {
                                ...state.admin.user.appearance,
                                buttons: {
                                    ...state.admin.user.appearance.buttons,
                                    shadowColor: action.payload
                                }
                            }
                        }
                    }
                }
            }
            case 'EDIT_BUTTON_FONT_COLOR': {
                return {
                    admin: {
                        ...state.admin,
                        user: {
                            ...state.admin.user,
                            appearance: {
                                ...state.admin.user.appearance,
                                buttons: {
                                    ...state.admin.user.appearance.buttons,
                                    fontColor: action.payload
                                }
                            }
                        }
                    }
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