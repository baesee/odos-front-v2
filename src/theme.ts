import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'NanumSquareRound, sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'NanumSquareRound';
          src: url('/fonts/NanumSquareRoundR.ttf') format('woff2');
        }
        @font-face {
          font-family: 'NanumSquareRoundEB';
          src: url('/fonts/NanumSquareRoundEB.ttf') format('woff2');
        }
      `,
        },
    },
});

export default theme;
