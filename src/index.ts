import React from "react";
import ReactDOM from "react-dom/client";
import r2wc from "react-to-webcomponent";
import WidgetForm from "./WidgetForm";

const customElementName: string = "form-widget";

const FormWebComponent = r2wc(WidgetForm, React, ReactDOM, {
  props: {
    title: "string",
  },
  // shadow: "closed",
});

customElements.define(customElementName, FormWebComponent);
