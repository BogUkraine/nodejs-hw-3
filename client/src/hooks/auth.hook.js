import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';
const useAuth = () => {
    const [userId, setUserId] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [loginName, setLoginName] = useState(null);

    const login = useCallback((jwtToken, id, roleP, loginNameP) => {
        setToken(jwtToken)
        setUserId(id);
        setRole(roleP);
        setLoginName(loginNameP);
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, role: roleP, loginName: loginNameP
        }))
    }, []);

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null);
        setRole(null);
        setLoginName(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userId, data.role, data.loginName);
        }
        setIsReady(true);
    }, [login]);

    return { login, logout, token, userId, isReady, role, loginName };
}

export default useAuth;