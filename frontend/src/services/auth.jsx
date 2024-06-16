//contante contendo o nome da variável que referencia o token
export const TOKEN_KEY = "mailshrimp-token";

//propriedade para validação de autenticação
export const isAutenticated = () => localStorage.getItem(TOKEN_KEY) != null;

//método para obter o token do localStorage
export const getToken = () => localStorage.getItem(TOKEN_KEY);

//método para salvar o token recebido após autenticação
export const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

//método para remover o token após logout
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}
