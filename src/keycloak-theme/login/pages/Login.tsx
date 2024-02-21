import { useState, FormEvent } from "react";
import { Form, Button } from "react-bootstrap";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { kcContext, i18n, Template } = props;
  const {
    social,
    realm,
    url,
    login,
    registrationDisabled,
  } = kcContext;
  const { msg } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoginButtonDisabled(true);
    const formElement = e.currentTarget as HTMLFormElement;
    formElement
      .querySelector("input[name='email']")
      ?.setAttribute("name", "username");
    formElement.submit();
  };

  return (
    <Template
      displayInfo={
        realm.password && realm.registrationAllowed && !registrationDisabled
      }
      displayWide={realm.password && social.providers !== undefined}
      headerNode={msg("doLogIn")}
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={false}
    >
      <Form onSubmit={onSubmit} action={url.loginAction} method="post">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            {/* {msg(
                    realm.loginWithEmailAllowed ? "usernameOrEmail" : "username"
                  )} */}
            Username
          </Form.Label>
          <Form.Control
            type="text"
            name="username"
            defaultValue={login.username ?? ""}
            autoFocus
            autoComplete="off"
            placeholder="Username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>
            {/* {msg("password")} */}
            Password
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
          />
        </Form.Group>

        {realm.rememberMe && (
          <Form.Group className="mb-3" controlId="rememberMe">
            <Form.Check
              type="checkbox"
              // label={msg("rememberMe")}
              label="Remember Me"
              name="rememberMe"
              defaultChecked={login.rememberMe === "on"}
            />
          </Form.Group>
        )}

        <Button
          variant="success"
          type="submit"
          className="w-100"
          disabled={isLoginButtonDisabled}
        >
          Login
        </Button>
        <div className="d-flex justify-content-center mt-4">
          <span className="me-2">New User?</span>
          <a href={url.registrationUrl}>Register</a>
        </div>
      </Form>
    </Template>
  );
}
