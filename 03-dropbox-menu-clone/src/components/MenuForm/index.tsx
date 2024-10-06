import React from 'react';

import { Container, Navigation, DropboxLogo, Form } from './styles';

const MenuForm: React.FC = () => {
  function handleToggle() {
    if (window.toggleActiveMenu) window.toggleActiveMenu();
  }

  return (
    <Container>
      <Navigation>
        <h1>
          <DropboxLogo />
          <span>Dropbox</span>
        </h1>
        {/* ✕ chacter in video description */}
        <button className="action--close" onClick={handleToggle}>
          ✕
        </button>
      </Navigation>

      <Form>
        <span className="title">Sign up</span>
        <span className="subtitle">or fill out the form below</span>

        <input type="text" placeholder="First name" />
        <input type="text" placeholder="Last name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button>Sign up</button>

        <span className="terms">
          This page is subject to the Privacy Policy and Terms of Service.
        </span>
      </Form>
    </Container>
  );
};

export default MenuForm;
