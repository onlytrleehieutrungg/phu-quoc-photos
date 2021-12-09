import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DownloadIcon from '@mui/icons-material/Download';
import LinkIcon from '@mui/icons-material/Link';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Button as MuiButton,
  ButtonGroup,
  Stack,
  ImageListItemBar,
  IconButton
} from '@mui/material';
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from 'simple-react-lightbox';
import Pagination from '@mui/material/Pagination';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
const Root = styled('div')(({ theme }) => ({
  margin: '88px 60px',
  [theme.breakpoints.down('md')]: {
    margin: '88px 10px'
  }
}));

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: 'transparent',
  color: '#000',
  borderRadius: '20px',
  padding: theme.spacing(1)
}));

const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

export default function PageGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [state, setState] = useState({ isOpen: false, photoIndex: 0, photoUrl: '' });
  // const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const [id, setID] = useState(generateOrderNumber());
  // const maxSteps = images.length;
  return (
    <div style={{ alignItems: 'center', marginTop: '88px' }}>
      <Typography gutterBottom variant="h2" align="center">
        Hình ảnh mã đơn hàng #{id}
      </Typography>
      <ButtonGroup style={{ float: 'right', marginRight: '80px' }}>
        <MuiButton size="large" startIcon={<DownloadIcon />}>
          Tải Về
        </MuiButton>
        <MuiButton size="large" startIcon={<LinkIcon />}>
          Chia Sẻ
        </MuiButton>
      </ButtonGroup>
      <SimpleReactLightbox>
        <Root>
          <Box>
            <SRLWrapper>
              <ImageList variant="masonry" cols={mobile ? 2 : fullScreen ? 3 : 4} gap={6}>
                {images.map((item) => (
                  <ImageListItem
                    sx={{
                      '& .MuiImageListItem-img': {
                        maxWidth: '100%',
                        height: 'auto',
                        padding: '10px 10px',
                        borderRadius: '30px'
                      }
                    }}
                    key={item.img}
                  >
                    <img
                      src={item.img}
                      srcSet={item.img}
                      alt={item.title}
                      loading="lazy"
                      onClick={() => {
                        let updateState = { ...state };
                        updateState.isOpen = true;
                        updateState.photoUrl = item.img;
                        setState(updateState);
                        handleClickOpen();
                      }}
                    />
                    <ImageListItemBar
                      title={item.title}
                      actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about ${item.title}`}
                        >
                          <CloudDownloadIcon />
                        </IconButton>
                      }
                      sx={{ margin: '0px 10px 10px', borderRadius: '30px' }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </SRLWrapper>
            <Stack spacing={5}>
              <Pagination
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '20px 0'
                }}
                count={10}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </Box>
        </Root>
      </SimpleReactLightbox>
    </div>
  );
}

const images = [
  {
    img: 'http://wiki-travel.com.vn/Uploads/picture/hieuhieu-193223023247-phan-biet-snorkeling-va-diving.jpg',
    title: 'Bed'
  },
  {
    img: 'http://wiki-travel.com.vn/Uploads/picture/hieuhieu-193323023318-Snorkeling.jpg',
    title: 'Books'
  },
  {
    img: 'http://wiki-travel.com.vn/Uploads/picture/hieuhieu-193323023336-Diving.jpg',
    title: 'Sink'
  },
  {
    img: 'http://wiki-travel.com.vn/Uploads/picture/hieuhieu-193423023413-cac-buoc-can-chuan-bi-doi-voi-nguoi-khong-biet-boi.jpg',
    title: 'Kitchen'
  },
  {
    img: 'http://wiki-travel.com.vn/Uploads/picture/hieuhieu-193423023452-nhung-luu-y-truoc-khi-lan-bien.jpg',
    title: 'Blinds'
  },
  {
    img: 'http://wiki-travel.com.vn/Uploads/picture/hieuhieu-193523023518-phai-dam-bao-suc-khoe.jpg',
    title: 'Chairs'
  },
  {
    img: 'http://wiki-travel.com.vn/Uploads/picture/hieuhieu-193523023545-thoi-diem-nen-di-lan-bien.jpg',
    title: 'Laptop'
  },
  {
    img: 'https://toplist.vn/images/800px/con-dao-166396.jpg',
    title: 'Doors'
  },
  {
    img: 'https://toplist.vn/images/800px/phu-quoc-166397.jpg',
    title: 'Coffee'
  },
  {
    img: 'https://toplist.vn/images/800px/nha-trang-166398.jpg',
    title: 'Storage'
  },
  {
    img: 'https://toplist.vn/images/800px/cu-lao-cham-166400.jpg',
    title: 'Candle'
  },
  {
    img: 'https://toplist.vn/images/800px/vinh-vinh-hy-166401.jpg',
    title: 'Coffee table'
  }
];
