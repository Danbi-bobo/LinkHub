// Lark OAuth Configuration
export const LARK_CONFIG = {
    clientId: (import.meta as any).env?.VITE_LARK_CLIENT_ID || '',
    clientSecret: (import.meta as any).env?.VITE_LARK_CLIENT_SECRET || '',
    redirectUri: `http://localhost:3000/auth/callback`,
    authUrl: 'https://accounts.larksuite.com/open-apis/authen/v1/authorize',
    tokenUrl: 'https://open.larksuite.com/open-apis/authen/v2/oauth/token',
    userInfoUrl: 'https://open.larksuite.com/open-apis/authen/v1/user_info',
    scope: 'contact:user.base:readonly contact:user.email:readonly',
  };
  
  // Generate random state for CSRF protection
  export const generateState = (): string => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };
  
  // Build authorization URL
  export const getAuthorizationUrl = (): string => {
    const state = generateState();
    sessionStorage.setItem('lark_oauth_state', state);
    
    const params = new URLSearchParams({
      client_id: LARK_CONFIG.clientId,
      redirect_uri: LARK_CONFIG.redirectUri,
      scope: LARK_CONFIG.scope,
      state: state,
    });
    
    return `${LARK_CONFIG.authUrl}?${params.toString()}`;
  };
  
  // Exchange authorization code for access token
  export const getAccessToken = async (code: string): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token?: string;
  }> => {
    const response = await fetch(LARK_CONFIG.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: LARK_CONFIG.clientId,
        client_secret: LARK_CONFIG.clientSecret,
        code: code,
        redirect_uri: LARK_CONFIG.redirectUri,
      }),
    });
  
    const data = await response.json();
    
    if (data.code !== '0') {
      throw new Error(data.error_description || 'Failed to get access token');
    }
  
    return {
      access_token: data.access_token,
      expires_in: data.expires_in,
      refresh_token: data.refresh_token,
    };
  };
  
  // Get user information
  export const getUserInfo = async (accessToken: string): Promise<{
    name: string;
    email: string;
    avatar_url: string;
    open_id: string;
    user_id?: string;
  }> => {
    const response = await fetch(LARK_CONFIG.userInfoUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  
    const data = await response.json();
    
    if (data.code !== 0) {
      throw new Error(data.msg || 'Failed to get user info');
    }
  
    return data.data;
  };