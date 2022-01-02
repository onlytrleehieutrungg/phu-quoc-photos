import { AppBar, Box, Container, Link, Toolbar, Typography } from '@mui/material';
// material
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
// components
import Logo from '../../components/Logo';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';

// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';

// import { FacebookShareButton, TwitterShareButton } from 'react-share';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));

// ----------------------------------------------------------------------

export type MenuItemProps = {
  title: string;
  path: string;
  icon?: JSX.Element;
  to?: string;
  children?: {
    subheader: string;
    items: {
      title: string;
      path: string;
    }[];
  }[];
};

export type MenuProps = {
  isOffset: boolean;
  isHome: boolean;
  navConfig: MenuItemProps[];
};

export default function MainNavbar() {
  const isOffset = useOffSetTop(100);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent', zIndex: 200 }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: 'background.default',
            height: { md: APP_BAR_DESKTOP - 16 }
          })
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Link href="/">
            <Logo />
          </Link>

          <Box sx={{ flexGrow: 2 }} />
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              sx={{
                transition: 'all 300ms ease-in-out',
                color: isOffset ? 'black' : '#fff',
                '&:hover': {
                  borderBottom: '1px solid #fff'
                }
              }}
            >
              Hướng dẫn
            </Typography>
          </Link>
        </Container>
      </ToolbarStyle>
      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
