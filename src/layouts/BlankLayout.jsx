import React from 'react';
import { Inspector } from 'react-dev-inspector';
const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";
//
// Sentry.init({
//   dsn: "https://3aae2fc25b7e4d00bd3ee183750f27d9@o573575.ingest.sentry.io/5724129",
//   integrations: [new Integrations.BrowserTracing()],
//
//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });


const Layout = ({ children }) => {
  return <InspectorWrapper>{children}</InspectorWrapper>
};

// const Layout = ({ children }) => {
//   return <Sentry.ErrorBoundary fallback={"An error has occurred"}>
//     <InspectorWrapper>{children}</InspectorWrapper>
//   </Sentry.ErrorBoundary>;
// };

export default Layout;
