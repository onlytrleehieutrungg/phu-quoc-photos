// material
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export default function Logo({ sx }: BoxProps) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box
      component="img"
      src={'/static/logo.png'}
      sx={{ width: { xs: 40, md: 80 }, height: 'auto', p: 1, ...sx }}
    />
  );
}
