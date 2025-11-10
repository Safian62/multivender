import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LocalizedLink = ({ to, children, ...rest }) => {
  const { i18n } = useTranslation();
  const lng = i18n.language || 'en';


  if (typeof to === 'string' && /^(https?:)?\/\//.test(to)) {
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    );
  }

  const normalized = typeof to === 'string' ? `/${lng}${to.startsWith('/') ? to : '/' + to}` : to;
  return (
    <Link to={normalized} {...rest}>
      {children}
    </Link>
  );
};

export default LocalizedLink;
