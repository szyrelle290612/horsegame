import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter } from "react-router-dom"
import Routes from "./routes"

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <Routes />
    </BrowserRouter>,
  );
});
