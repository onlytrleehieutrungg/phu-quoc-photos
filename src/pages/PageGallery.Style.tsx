import { Box, Grid, IconButton, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { makeStyles } from '@mui/styles';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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
const Head = styled('div')(({ theme }) => ({
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
    zIndex: 99,
    padding: '10px 0'
  }
}));

const Item0 = styled('div')(({ theme }) => ({
  position: 'absolute',
  fontWeight: 100,
  top: '33%',
  boxSizing: 'inherit',
  lineHeight: 1.2,
  visibility: 'inherit',
  marginLeft: '10%',
  display: 'inline-block',
  marginTop: '-1px',
  width: '70px',
  height: '2px',
  background: 'black',
  color: '#000',
  fontSize: '18px',
  zIndex: 2,
  textRendering: 'optimizeLegibility'
}));

const Item1 = styled('span')(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  fontFamily: FONT_PRIMARY,
  position: 'absolute',
  top: '30%',
  display: 'inline-block',
  textRendering: 'optimizeLegibility',
  textTransform: 'uppercase',
  fontSize: '15px',
  letterSpacing: '2px',
  marginLeft: '16%',
  textAlign: 'center'
}));

const Item2 = styled(Typography)(({ theme }) => ({
  ...theme.typography.h1,
  position: 'absolute',
  fontSize: '88px',
  marginLeft: '9%',
  bottom: '2%',
  height: '100%',
  display: 'flex',

  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  overflow: 'hidden',
  padding: theme.spacing(1),
  textAlign: 'center'
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
  textRendering: 'optimizeLegibility'
}));

const Item4 = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  fontFamily: FONT_PRIMARY,
  display: 'block',
  position: 'absolute',
  top: '80%',
  zIndex: 2,
  height: '100%',
  fontSize: '12px',
  justifyContent: 'center',
  marginLeft: '9%',
  color: 'black',
  alignItems: 'flex-start',
  overflow: 'hidden'
}));

const ShareButton = styled('div')(({ theme }) => ({
  display: 'block',
  position: 'absolute',
  bottom: '15.5%',
  justifyContent: 'center',
  zIndex: 8,
  marginLeft: '12%',
  alignItems: 'flex-start',
  overflow: 'hidden'
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
  height: '100%'
}));
export default function Header() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const scrollToRef = (ref: any) => window.scrollTo(0, 700);
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  useEffect(() => {
    axios
      .get(`https://api.phuquocphoto.com/api/v1/orders/${orderId}`)
      .then((res) => {
        const { data } = res.data;

        var splitted = res.data.customer_name.split(' ', 2);
        setUsername(splitted[1]);
      })
      .catch((err) => {
        console.log('error' + err);
      });
  }, []);

  const url = new URL(window.location.href);

  let params = new URLSearchParams(url.search);

  let orderId = params.get('ma-don-hang');
  return (
    <Head>
      <WhiteBackround />
      <BackgroundImage
        style={{
          backgroundImage: `url("https://livefromearth.media/assets/img/inspiration-in.jpg")`
        }}
      />
      <Box sx={{ zIndex: 99, color: 'black' }}>
        <Grid container spacing={2} columns={8}>
          <Grid item xs={4}>
            <Item0 />
          </Grid>
          <Grid item xs={4}>
            <Item1>PhuQuoc Photos</Item1>
          </Grid>
          <Grid item xs={8}>
            <Item2>Chào {username}</Item2>
          </Grid>
          <Grid item xs={8}>
            <Item3>Đây Là Hình Ảnh Từ Chuyến Đi Của Bạn</Item3>
          </Grid>
          <Grid item xs={8}>
            <Item4>Chia Sẻ: </Item4>
            <ShareButton>
              <IconButton sx={{ color: '#000' }}>
                <FacebookShareButton url={`${window.location.href}`} quote={undefined}>
                  <FacebookIcon />
                </FacebookShareButton>
              </IconButton>
              <IconButton sx={{ color: '#000' }}>
                <TwitterShareButton url={`${window.location.href}`}>
                  <TwitterIcon />
                </TwitterShareButton>
              </IconButton>
            </ShareButton>
          </Grid>
        </Grid>
      </Box>
      <KeyboardDoubleArrowDownIcon
        className={classes.animatedItem}
        fontSize="large"
        sx={{
          position: 'absolute',
          zIndex: 8,
          bottom: '3%',
          justifyContent: 'center',
          left: '50%',
          fontSize: 100
        }}
      />{' '}
      <Link
        color="black"
        variant="caption"
        onClick={executeScroll}
        sx={{
          position: 'absolute',
          zIndex: 8,
          bottom: '3%',
          justifyContent: 'center',
          left: '49%'
        }}
      >
        Xem Ảnh
      </Link>
      <div ref={myRef}></div>
    </Head>
  );
}
