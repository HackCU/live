import React from 'react';
import { css } from '@emotion/core';
import {
  Card as MaterialCard,
  CardContent,
  Typography
} from '@material-ui/core';

export const CardTitle = ({ css: customCss, children }) => (
  <Typography
    component="h1"
    css={css`
      font-weight: 300;
      ${customCss}
    `}
  >
    {children}
  </Typography>
);

export const Card = ({ css: customCss, children }) => (
  <MaterialCard
    css={theme => css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.text};
      ${customCss}
    `}
  >
    <CardContent>{children}</CardContent>
  </MaterialCard>
);
