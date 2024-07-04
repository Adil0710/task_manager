// authStore.js
import axios from 'axios';
import { create } from 'zustand';

const authStore = create((set) => ({
  loggedIn: null, // Initialize loggedIn to false
  userData: null,

  loginForm: {
    email: '',
    password: ''
  },

  updateLoginForm: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      loginForm: {
        ...state.loginForm,
        [name]: value
      }
    }));
  },

  login: async () => {
    try {
      const { loginForm } = authStore.getState();
      const res = await axios.post('/auth/login', loginForm);
      
      localStorage.setItem('userData', JSON.stringify(res.data.user));
      set({
        loggedIn: true,
        loginForm: { email: '', password: '' },
        userData: res.data.user
      });
      
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  logout: async () => {
    try {
        const promise = axios.post('/auth/logout')
           
    

        const res = await promise;
        localStorage.removeItem('userData'); // Remove user data from localStorage
        console.log(res);
        console.log("Logged out Successfully")
        // Update state after successful logout
        set({ loggedIn: false });

    

    } catch (error) {
        console.log(error);
    }
},

checkAuth: async () => {
  try {
      await axios.get('/auth/checkAuth')
      set({loggedIn: true})  
  } catch (error) {
      set({loggedIn: false})
      console.log(error);
  }
},

}));

export default authStore;
