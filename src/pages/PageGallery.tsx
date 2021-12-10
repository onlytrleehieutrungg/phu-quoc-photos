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
  // Stack,
  ImageListItemBar,
  IconButton
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from 'simple-react-lightbox';
// import Pagination from '@mui/material/Pagination';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import axios from 'axios';

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

  useEffect(() => {
    axios
      .get(
        'https://api-sale.reso.vn/api/v1/order-medias?order-code=' + localStorage.getItem('Code')
      )
      .then((res) => {
        console.log(res);
        setListEvent(res.data);
        console.log('success with listEvent');
      })
      .catch((err) => {
        console.log(err);
        console.log('error');
      });
  }, []);
  const [listEvent, setListEvent] = React.useState(images);

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
    <div style={{ marginTop: '88px', textAlign: 'center' }}>
      <Typography gutterBottom variant="h2" align="center">
        Hình ảnh mã đơn hàng #{localStorage.getItem('Code')}
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
                {listEvent.map((item) => (
                  <ImageListItem
                    sx={{
                      '& .MuiImageListItem-img': {
                        maxWidth: '100%',
                        height: 'auto',
                        padding: '10px 10px',
                        borderRadius: '30px'
                      }
                    }}
                    key={item.pic_url}
                  >
                    <img
                      src={item.pic_url}
                      srcSet={item.pic_url}
                      alt={item.title}
                      loading="lazy"
                      onClick={() => {
                        let updateState = { ...state };
                        updateState.isOpen = true;
                        updateState.photoUrl = item.pic_url;
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
            {/* <Stack spacing={5}>
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
            </Stack> */}
          </Box>
        </Root>
      </SimpleReactLightbox>
    </div>
  );
}

const images: any[] = [];
