
export const login = async (username: string, password: string) => {
    return { success: true, token: "simulated_token" }; 
  };
  
  
  export const logout = async (token: string) => {
    return { success: true };
  };
  