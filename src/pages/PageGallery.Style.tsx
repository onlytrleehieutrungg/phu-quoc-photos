import FacebookIcon from '@mui/icons-material/Facebook';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { varFadeInLeft, varFadeInUp, varFadeInDown } from 'components/animate';
import React, { useRef } from 'react';
import { Img } from 'react-image';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import MotionInView from '../components/animate/MotionInView';
import { motion } from 'framer-motion';

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

const Head = styled(Box)(({ theme }) => ({
  height: '100vh',
  [theme.breakpoints.down('md')]: {
    padding: '30px 0'
  },
  [theme.breakpoints.down('sm')]: {
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

const Item2 = styled(Typography)(({ theme }) => ({
  ...theme.typography.h1,
  fontSize: '88px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '50px'
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

const getLastName = (fullName?: string | null) => {
  if (!fullName) return 'Bạn';
  const lastName = fullName.split(/[ ]+/).slice(-1).join(' ');
  return lastName;
};

export default function Header({ order, gallery }: { order: any; gallery: any }) {
  const scrollToRef = (ref: any) => window.scrollTo({ top: 750, behavior: 'smooth' });
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));
  const quantity = gallery?.media_items_count;
  var username = getLastName(order.customer_name);

  return (
    <Head sx={{ justifyContent: 'left', alignItems: 'center', display: 'flex' }}>
      <WhiteBackround />
      <Box>
        <Link color="black" variant="caption" onClick={executeScroll}>
          <motion.div
            animate={{ y: [-20, 0, -20] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              position: 'absolute',
              zIndex: 99,
              bottom: '1rem',
              justifyContent: 'center',
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              right: 0,
              left: 0,
              fontSize: 40
            }}
          >
            <KeyboardDoubleArrowDownIcon fontSize="large" />
          </motion.div>
        </Link>
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
            <MotionInView variants={varFadeInDown}>
              <Item0 />
            </MotionInView>
            <Typography
              variant="h6"
              sx={{
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 200
              }}
            >
              <MotionInView variants={varFadeInDown}>PhuQuoc Photos</MotionInView>
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
            <MotionInView variants={varFadeInLeft}>Chào Bạn</MotionInView>
          </Item2>
          <Typography variant="caption">
            <MotionInView variants={varFadeInUp}>
              Chúng tôi đã lưu lại hơn <strong>{quantity ? quantity : 0}</strong> khoảnh khắc của
              bạn <p>Hãy cùng xem lại nhé!</p>
            </MotionInView>
          </Typography>
        </Box>
        <MotionInView variants={varFadeInUp}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption">Chia Sẻ: </Typography>
            <Box>
              <FacebookShareButton url={`${window.location.href}`} quote={undefined}>
                <FacebookIcon />
              </FacebookShareButton>
              <TwitterShareButton url={`${window.location.href}`}>
                <TwitterIcon />
              </TwitterShareButton>
            </Box>
          </Stack>
        </MotionInView>
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
        <Img
          src={
            gallery
              ? `${gallery?.cover_photo_base_url}=w${isMobile ? 360 : isLaptop ? 720 : 1960}`
              : 'https://livefromearth.media/assets/img/inspiration-in.jpg'
          }
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
      </Box>
    </Head>
  );
}
