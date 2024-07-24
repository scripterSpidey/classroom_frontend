// theme.js or theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat', // Your custom font
      'Arial',      // Fallback fonts
      'sans-serif',
    ].join(','),
  },
});

export default theme;
