import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DownloadIcon from '@mui/icons-material/Download';
import LinkIcon from '@mui/icons-material/Link';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  Typography,
  Button as MuiButton,
  ButtonGroup,
  Stack,
  ImageListItemBar,
  IconButton
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from 'simple-react-lightbox';
import Pagination from '@mui/material/Pagination';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import axios from 'axios';
import queryString from 'query-string';
import Skeleton from '@mui/material/Skeleton';

const Root = styled('div')(({ theme }) => ({
  margin: '10px 24px',
  [theme.breakpoints.down('md')]: {
    margin: '88px 10px'
  }
}));

const useStyles = makeStyles({
  wrap: {
    overflow: 'hidden',
    borderRadius: '24px',
    margin: '10px 10px'
  },
  item: {
    transition: '0.3s',
    position: 'relative',
    borderRadius: '24px',
    backgroundColor: '#ccc',
    cursor: 'zoom-in',
    '&:hover': {
      zIndex: 1,
      transform: 'scale(1.2)'
    }
  }
});

// const Div = styled('div')(({ theme }) => ({
//   ...theme.typography.button,
//   backgroundColor: 'transparent',
//   color: '#000',
//   borderRadius: '20px',
//   padding: theme.spacing(1)
// }));

const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

export default function PageGallery() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const largeScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [state, setState] = useState({ isOpen: false, photoIndex: 0, photoUrl: '' });
  const [loading, setLoading] = useState(true);
  // const [loadimg, setLoadimg] = useState(true);
  // const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const [page, setPage] = React.useState(1);

  const [filters, setFilters] = useState({
    page: 1,
    size: 12
  });
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setFilters({
      ...filters,
      page: value
    });
    console.log(filters);
  };

  useEffect(() => {
    // convert filters to page=1&size=10
    const paramsString = queryString.stringify(filters);
    axios
      .get(`https://api-sale.reso.vn/api/v1/order-medias?order-code=${orderId}&${paramsString}`)
      .then((res) => {
        console.log(res);
        const { data, metadata } = res.data;
        setListEvent(data);
        setMetaData(metadata);
        console.log('success with listEvent');
      })
      .catch((err) => {
        console.log(err);
        console.log('error');
      });
  }, [filters]);

  useEffect(() => {
    setTimeout(() => {
      //api
      setLoading(false);
    }, 2000);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     //api
  //     setLoadimg(false);
  //   }, 1000);
  // }, []);
  const [listEvent, setListEvent] = React.useState(images);
  const [metaData, setMetaData] = useState({
    page: 1,
    size: 1,
    total: 1
  });
  const totalPages = Math.ceil(metaData.total / metaData.size);

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

  const url = new URL(window.location.href);

  let params = new URLSearchParams(url.search);

  let orderId = params.get('orderId');

  return (
    <div style={{ marginTop: '88px', textAlign: 'center' }}>
      <Typography gutterBottom variant="h2" align="center">
        <div style={{ padding: '4rem 0' }}>{'Hình ảnh mã đơn hàng #' + orderId}</div>
      </Typography>

      <SimpleReactLightbox>
        <Root>
          <Stack spacing={1}>
            {/* {loading ? (
              <Skeleton variant="rectangular" />
            ) : (
              <ButtonGroup
                style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}
              >
                <MuiButton size="large" startIcon={<DownloadIcon />}>
                  Tải Về
                </MuiButton>
                <MuiButton size="large" startIcon={<LinkIcon />}>
                  Chia Sẻ
                </MuiButton>
              </ButtonGroup>
            )} */}
            <ButtonGroup
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginRight: '10px',
                marginBottom: '10px'
              }}
            >
              <MuiButton size="large" startIcon={<DownloadIcon />}>
                Tải Về
              </MuiButton>
              <MuiButton size="large" startIcon={<LinkIcon />}>
                Chia Sẻ
              </MuiButton>
            </ButtonGroup>
            <Box>
              <SRLWrapper>
                <ImageList
                  variant="masonry"
                  cols={mobile ? 2 : fullScreen ? 3 : 4}
                  gap={1}
                  sx={{ overflow: 'visible' }}
                >
                  {listEvent.map((item) => (
                    <ImageListItem
                      // sx={{
                      //   '& .MuiImageListItem-img': {
                      //     maxWidth: '100%',
                      //     height: 'auto',
                      //     padding: '10px 10px',
                      //     // margin: '10px 10px 0px 0px',
                      //     borderRadius: '24px'
                      //   }
                      // }}
                      className={classes.wrap}
                      key={item.pic_url}
                    >
                      <div>
                        {loading ? (
                          <Skeleton
                            animation="wave"
                            variant="rectangular"
                            width={mobile ? 200 : largeScreen ? 220 : 350}
                            height={mobile ? 200 : largeScreen ? 250 : 400}
                          />
                        ) : (
                          <>
                            <img
                              src={item.pic_url}
                              alt={item.title}
                              loading="lazy"
                              style={{
                                maxWidth: '100%',
                                height: 'auto',
                                // padding: '10px 10px',
                                // margin: '10px 10px 0px 0px',
                                borderRadius: '24px'
                              }}
                              onClick={() => {
                                let updateState = { ...state };
                                updateState.isOpen = true;
                                updateState.photoUrl = item.pic_url;
                                setState(updateState);
                                handleClickOpen();
                              }}
                              className={classes.item}
                            />
                            <ImageListItemBar
                              title={item.timestamp.substring(0, 19)}
                              style={{ zIndex: 1 }}
                              actionIcon={
                                <IconButton
                                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                  aria-label={`info about ${item.title}`}
                                >
                                  <CloudDownloadIcon />
                                </IconButton>
                              }
                              sx={{ borderRadius: '24px' }}
                            />
                          </>
                        )}
                      </div>
                    </ImageListItem>
                  ))}
                </ImageList>
              </SRLWrapper>
            </Box>
          </Stack>
        </Root>
      </SimpleReactLightbox>
      <Stack spacing={1}>
        <Pagination
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '20px 0'
          }}
          count={totalPages}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          size="large"
        />
      </Stack>
    </div>
  );
}

const images: any[] = [];
