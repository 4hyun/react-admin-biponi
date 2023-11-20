import Script from "next/script";
import { FC, Fragment } from "react";

const GoogleAnalytics: FC = () => {
  return (
    <Fragment>
      {/* Google analytics */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-FLCDXWTVMD"></Script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FLCDXWTVMD');
          `,
        }}
      ></script>
    </Fragment>
  );
};

export default GoogleAnalytics;
