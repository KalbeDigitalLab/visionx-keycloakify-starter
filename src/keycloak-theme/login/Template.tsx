import { useState } from "react";
import {
  Container,
  Row,
  Card,
} from "react-bootstrap";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import keycloakifyLogoPngUrl from "./assets/logo-kalbe.png";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    kcContext,
    i18n,
    children,
  } = props;

  const { url } = kcContext;

  const { isReady } = usePrepareTemplate({
    doFetchDefaultThemeResources: false,
    "styles": [
      `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
      `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
      `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
      `${url.resourcesPath}/css/login.css`
  ],
  "htmlClassName": "kcHtmlClass",
  "bodyClassName": "kcBodyClass"
  });

  useState(() => {
    document.title = i18n.msgStr("loginTitle", kcContext.realm.displayName);
  });

  if (!isReady) {
    return null;
  }

  return (
    <Container>
      <Row>
        <Card
          style={{
            width: "500px",
          }}
          className="mx-auto my-5"
        >
          <Card.Body>
            <Card.Img
              variant="top"
              src={keycloakifyLogoPngUrl}
              style={{ marginBottom: "1rem", width: "200px" }}
              className="mx-auto d-block p-4"
            />
            <Card.Title className="fs-3 fw-bold mb-2">Welcome to DCM4CHEE</Card.Title>
            <Card.Subtitle className="mb-4 text-muted">
              Please sign-in to access DCM4CHEE Keycloak
            </Card.Subtitle>
            {children}
          </Card.Body>
        </Card>
      </Row>
      <Row className="d-flex justify-content-center text-muted">
        Copyright © 2024. All rights reserved.
      </Row>
    </Container>
  );
}
