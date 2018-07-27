import queryString from 'query-string';

const urlHelper = {
  computeEncodedRedirectUrl() {
    const decodedParams = queryString.parse(window.location.search);
    const hasRedirectUrl = Boolean(decodedParams.redirectUrl);

    let redirectUrl;
    if (hasRedirectUrl) {
      // eslint-disable-next-line prefer-destructuring
      redirectUrl = decodedParams.redirectUrl;
    } else {
      redirectUrl = window.location.pathname + window.location.search + window.location.hash;
    }

    const encodedRedirectUrl = window.encodeURIComponent(redirectUrl);
    return encodedRedirectUrl;
  },
};

export default urlHelper;
