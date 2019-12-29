import React, { useState, useEffect } from "react";
import { default as styled } from "styled-components";
import { Button as AntdButton, Input } from "antd";
import { useStores } from "../../hooks";
import { useObserver } from "mobx-react";
import { reaction } from "mobx";

const { Password } = Input;

const LoginPage: React.FC = () => {
  const { auth } = useStores();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [animate, setAnimate] = useState(false);

  useEffect(
    () =>
      reaction(
        () => auth.loading,
        () => setAnimate(!auth.loading)
      ),
    [auth]
  );

  return useObserver(() => {
    const loading = auth.loading;

    return (
      <Background>
        <Card animate={animate}>
          <CardTitle>Entrar</CardTitle>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <Input
              placeholder="Usuário"
              style={{ width: 300 }}
              disabled={loading}
              value={username}
              onChange={({ target: { value } }) => setUsername(value)}
            />

            <Password
              disabled={loading}
              placeholder="Senha"
              style={{ width: 300, marginTop: 8 }}
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />

            <ActionsContainer>
              <Button
                type="primary"
                loading={loading}
                onClick={() => auth.login()}
              >
                Entrar
              </Button>
            </ActionsContainer>
          </div>
        </Card>
      </Background>
    );
  });
};

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  background: rgb(158, 208, 255);
  background: linear-gradient(
    135deg,
    rgba(158, 208, 255, 1) 0%,
    rgba(24, 144, 255, 1) 13%,
    rgba(0, 45, 87, 1) 100%
  );
`;

const Card = styled.div<{ animate?: boolean }>`
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 6px 9px 20px 4px #0000003d;
  ${({ animate }) =>
    animate && `animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;`}

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`;

const CardTitle = styled.h1`
  color: grey;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Button = styled(AntdButton)`
  width: 50%;
`;

export default LoginPage;
