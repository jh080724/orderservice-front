import React, { useEffect, useState } from 'react';

// UserContex 생성 (새로운 전역 컨텍스트 생성)

const AuthContext = React.createContext({
  isLoggedIn: false, // 로그인 했는지의 여부
  onLogin: () => {},
  onLogout: () => {},
  userRole: '',
});

// 위에서 생성한 Context 제공하는 Provider 선언
// 이 Provider를 통해 자식 컴포넌트(consumer)에게 인증 상태와 관련된 값, 함수를 전달할 수 있음.
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLogginedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  // 로그인 핸들러
  const loginHandler = (token, id, role) => {
    // 백앤드가 응답한 JSON 인증 정보를 클라이언트 쪽에 보관하자.
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('USER_ID', id);
    localStorage.setItem('USER_ROLE', role);

    setIsLogginedIn(true);
    setUserRole(role);
  };

  // 로그아웃 핸들러
  const logoutHandler = () => {
    localStorage.clear(); // 로컬 스토리지 내용 전체 삭제
    setIsLogginedIn(false);
    setUserRole('');
  };

  useEffect(() => {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      setIsLogginedIn(true);
      setUserRole(localStorage.getItem('USER_ROLE'));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        userRole,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
