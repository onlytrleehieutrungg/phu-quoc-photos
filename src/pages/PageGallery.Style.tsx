import FacebookIcon from '@mui/icons-material/Facebook';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Link, Stack, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

const Root = styled('div')(({ theme }) => ({
  margin: '200px 24px 10px',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    margin: '40px 10px'
  },
  [theme.breakpoints.down('sm')]: {
    margin: '2px 0'
  }
}));

export { Root };
const useStyles = makeStyles({
  animatedItem: {
    animation: `$myEffect`,
    animationDuration: '2s',
    animationDelay: '1s',
    animationFillMode: 'backwards',
    animationIterationCount: 'infinite',
    animationDirection: 'alternateReverse'
  },
  '@keyframes myEffect': {
    from: {
      top: '85%'
    },
    to: {
      top: '90%'
    }
  }
});

const FONT_PRIMARY = 'Be Vietnam Pro'; // Google Font
const Head = styled(Box)(({ theme }) => ({
  height: '100vh',
  [theme.breakpoints.down('md')]: {
    padding: '30px 0'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 0'
  }
}));

const BackgroundImage = styled('div')(({ theme }) => ({
  backgroundColor: '#cccccc',
  transform: 'translate3d(0px, 0px, 0px)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'absolute',
  // zIndex: mobile ? 0 : 8,
  right: 0,
  top: 0,
  width: '75%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '75%',
    padding: '30px 0'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    zIndex: 97,
    padding: '10px 0'
  }
}));

const Item0 = styled(Box)(({ theme }) => ({
  fontWeight: 100,
  lineHeight: 1.2,
  width: '70px',
  height: '2px',
  background: 'black',
  color: '#000',
  fontSize: '18px'
}));

const Item1 = styled('span')(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  fontFamily: FONT_PRIMARY,
  position: 'absolute',
  top: '29vh',
  display: 'inline-block',
  textRendering: 'optimizeLegibility',
  textTransform: 'uppercase',
  fontSize: '15px',
  letterSpacing: '2px',
  marginLeft: '17%',
  textAlign: 'center',
  zIndex: 99,
  [theme.breakpoints.down('md')]: {
    marginLeft: '19%'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '24%'
  }
}));

const Item2 = styled(Typography)(({ theme }) => ({
  ...theme.typography.h1,
  fontSize: '88px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '50px'
  }
}));
const Item3 = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  padding: theme.spacing(1),
  position: 'absolute',
  height: '100%',
  top: '13%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxSizing: 'inherit',
  marginLeft: '9%',
  fontSize: '16px',
  textRendering: 'optimizeLegibility',
  zIndex: 99
}));

const Item4 = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  fontFamily: FONT_PRIMARY,
  display: 'block',
  position: 'absolute',
  top: '80%',
  zIndex: 99,
  height: '100%',
  fontSize: '12px',
  justifyContent: 'center',
  marginLeft: '10%',
  color: 'black',
  alignItems: 'flex-start',
  overflow: 'hidden'
}));

const ShareButton = styled('div')(({ theme }) => ({
  display: 'block',
  position: 'absolute',
  bottom: '15.8%',
  justifyContent: 'center',
  zIndex: 99,
  marginLeft: '13%',
  alignItems: 'flex-start',
  overflow: 'hidden',
  [theme.breakpoints.down('xl')]: {
    marginLeft: '14.5%',
    bottom: '15vh'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '20%',
    bottom: '15%'
  }
}));

const WhiteBackround = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  zIndex: 0,
  opacity: 0,
  transform: 'translate3d(0px, 0px, 0px)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'absolute',
  right: 0,
  top: 0,
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    opacity: 0.7,
    zIndex: 4
  }
}));
export default function Header() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const scrollToRef = (ref: any) => window.scrollTo(0, 750);
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  useEffect(() => {
    axios
      .get(`https://api.phuquocphoto.com/api/v1/orders/${orderId}`)
      .then((res) => {
        const { data } = res.data;

        var splitted = res.data.customer_name?.split(' ', 2);
        setUsername(splitted && splitted[1]);
      })
      .catch((err) => {
        console.log('error' + err);
      });
  }, []);

  const url = new URL(window.location.href);

  let params = new URLSearchParams(url.search);

  let orderId = params.get('ma-don-hang');
  return (
    <Head sx={{ justifyContent: 'left', alignItems: 'center', display: 'flex' }}>
      <WhiteBackround />
      <Box>
        <KeyboardDoubleArrowDownIcon
          className={classes.animatedItem}
          fontSize="large"
          sx={{
            position: 'absolute',
            zIndex: 99,
            bottom: '3%',
            justifyContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            right: 0,
            left: 0,
            fontSize: 100
          }}
        />
        <Link
          color="black"
          variant="caption"
          onClick={executeScroll}
          sx={{
            position: 'absolute',
            zIndex: 99,
            bottom: '3%',
            justifyContent: 'center',
            textAlign: 'center',
            left: 0,
            right: 0
          }}
        >
          Xem Ảnh
        </Link>
      </Box>
      <Container maxWidth="lg" sx={{ zIndex: 9 }}>
        <Box mb={12}>
          <Stack direction="row" spacing={2} alignItems="center" mb={4}>
            <Item0 />
            <Typography
              variant="h6"
              sx={{
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 200
              }}
            >
              PhuQuoc Photos
            </Typography>
          </Stack>
          <Item2
            variant="h1"
            mb={5}
            mt={3}
            sx={{
              fontSize: '88px'
            }}
          >
            Chào {username}
          </Item2>
          <Typography variant="caption">Đây là hình ảnh từ chuyến đi của bạn</Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Chia Sẻ: </Typography>
          <Box>
            <FacebookShareButton url={`${window.location.href}`} quote={undefined}>
              <FacebookIcon />
            </FacebookShareButton>
            <TwitterShareButton url={`${window.location.href}`}>
              <TwitterIcon />
            </TwitterShareButton>
          </Box>
        </Stack>
      </Container>

      <Box
        sx={{
          width: { xs: '100%', sm: '75%' },
          height: '100%',
          position: 'absolute',
          right: 0,
          top: 0
        }}
      >
        <Box
          component="img"
          src="https://livefromearth.media/assets/img/inspiration-in.jpg"
          alt=""
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    </Head>
  );
}
