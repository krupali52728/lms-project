import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  theme: 'dark',
  language: 'en'
};

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_ERROR: 'SET_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false
      };
    
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    
    case actionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    
    case actionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Actions
  const actions = {
    setLoading: (loading) => dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    
    setUser: (user) => dispatch({ type: actionTypes.SET_USER, payload: user }),
    
    setError: (error) => dispatch({ type: actionTypes.SET_ERROR, payload: error }),
    
    login: async (credentials) => {
      try {
        actions.setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const user = {
          id: 1,
          email: credentials.email,
          name: 'John Doe',
          avatar: null,
          role: 'student',
          enrolledCourses: [],
          preferences: {
            theme: 'dark',
            language: 'en'
          }
        };
        
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: user });
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true };
      } catch (error) {
        actions.setError(error.message);
        return { success: false, error: error.message };
      }
    },
    
    logout: () => {
      dispatch({ type: actionTypes.LOGOUT });
      localStorage.removeItem('user');
    },
    
    setTheme: (theme) => {
      dispatch({ type: actionTypes.SET_THEME, payload: theme });
      localStorage.setItem('theme', theme);
    },
    
    setLanguage: (language) => {
      dispatch({ type: actionTypes.SET_LANGUAGE, payload: language });
      localStorage.setItem('language', language);
    },
    
    clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR })
  };

  // Initialize user from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem('user');
        const savedTheme = localStorage.getItem('theme') || 'dark';
        const savedLanguage = localStorage.getItem('language') || 'en';
        
        if (savedUser) {
          const user = JSON.parse(savedUser);
          dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: user });
        } else {
          actions.setLoading(false);
        }
        
        actions.setTheme(savedTheme);
        actions.setLanguage(savedLanguage);
      } catch (error) {
        console.error('Error initializing auth:', error);
        actions.setError('Failed to initialize authentication');
        actions.setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const contextValue = {
    ...state,
    ...actions
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;