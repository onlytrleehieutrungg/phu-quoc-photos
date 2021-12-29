/* eslint-disable jsx-a11y/anchor-has-content */
import Box from '@mui/material/Box';
import Page from '../components/Page';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DownloadIcon from '@mui/icons-material/Download';
// import LinkIcon from '@mui/icons-material/Link';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  Typography,
  Button as MuiButton,
  ButtonGroup,
  Stack,
  ImageListItemBar,
  IconButton,
  Link
} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SimpleReactLightbox from 'simple-react-lightbox';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { SRLWrapper } from 'simple-react-lightbox';
import Pagination from '@mui/material/Pagination';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import axios from 'axios';
import queryString from 'query-string';
import Skeleton from '@mui/material/Skeleton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import Chip from '@mui/material/Chip';

// import Divider from '@mui/material/Divider';

const Root = styled('div')(({ theme }) => ({
  margin: '10px 24px 10px',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    margin: '88px 10px'
  },
  [theme.breakpoints.down('sm')]: {
    margin: '88px 0'
  }
}));

const Head = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: '30px 0'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 0'
  }
}));

const useStyles = makeStyles({
  wrap: {
    overflow: 'hidden',
    borderRadius: '12px',
    margin: '10px 10px',
    position: 'relative',
    '&:hover': {
      boxShadow: '0 25px 40px rgba(0, 0, 0, 0.7)'
    }
  },
  imgThumb: {
    '& span': {
      display: 'none'
    },
    '&:hover': {
      '& span': {
        display: 'block'
      }
    }
  },
  item: {
    transition: '0.3s',
    position: 'relative',
    borderRadius: '12px',
    backgroundColor: '#ccc',
    cursor: 'zoom-in',
    '&:hover': {
      zIndex: 1,
      transform: 'scale(1.2)'
    }
  },
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
      top: '83%'
    },
    to: {
      top: '88%'
    }
  }
});

function download(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  axios({
    method: 'GET',
    responseType: 'blob',
    url: `${e}`
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'image.jpg');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

const options = {
  caption: {
    captionColor: '#a6cfa5',
    captionFontFamily: 'Raleway, sans-serif',
    captionFontWeight: '300',
    captionTextTransform: 'uppercase'
  }
};

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
  const [loadingButton, setLoadingButton] = useState(true);
  // const [loadimg, setLoadimg] = useState(true);
  // const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const [page, setPage] = React.useState(1);
  const scrollToRef = (ref: any) => window.scrollTo(0, 650);
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  console.log('adssadsadasd' + myRef);
  const [filters, setFilters] = useState({
    page: 1,
    size: 12
  });
  const FONT_PRIMARY = 'Be Vietnam Pro'; // Google Font
  // const FONT_SECONDARY = 'CircularStd, sans-serif'; // Local Font
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
      .get(`https://api.phuquocphoto.com/api/v1/order-medias?order-code=${orderId}&${paramsString}`)
      .then((res) => {
        console.log(res);
        const { data, metadata } = res.data;
        setListEvent(data);
        setMetaData(metadata);
        console.log('success with listEvent');
      })
      .catch((err) => {
        setListError(err);
        console.log(err);
        console.log('error');
      });
  }, [filters]);

  useEffect(() => {
    setTimeout(() => {
      //api
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      //api
      setLoadingButton(false);
    }, 3000);
  }, []);

  function downloadAll() {
    // eslint-disable-next-line no-lone-blocks
    {
      // eslint-disable-next-line array-callback-return
      listEvent.map((item) => {
        download(item.pic_url);
      });
    }
  }

  const [listEvent, setListEvent] = React.useState(images);

  const [listError, setListError] = React.useState('');
  const [listEmpty, setListEmpty] = React.useState(false);

  useEffect(() => {
    if (listError !== '') {
      setListEmpty(true);
    } else {
      setListEmpty(false);
    }
  }, [listError]);

  // const [urlDownload, setUrlDownload] = React.useState('');
  // const download = (e: any) => {
  //   var element = document.createElement('a');
  //   var file = new Blob([`${e}`], { type: 'image/*' });
  //   element.href = URL.createObjectURL(file);
  //   element.download = 'image.jpg';
  //   element.click();
  // };

  const [metaData, setMetaData] = useState({
    page: 1,
    size: 1,
    total: 1
  });
  const totalPages = Math.ceil(metaData.total / metaData.size);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [id, setID] = useState(generateOrderNumber());

  const url = new URL(window.location.href);

  let params = new URLSearchParams(url.search);

  let orderId = params.get('ma-don-hang');

  return (
    <Page title="Kho Ảnh">
      <div>
        <Head>
          {' '}
          <div
            style={{
              backgroundColor: 'white',
              zIndex: mobile ? 9 : 0,
              opacity: 0.8,
              transform: 'translate3d(0px, 0px, 0px)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              position: 'absolute',
              right: 0,
              top: 0,
              width: '100%',
              height: '100%'
            }}
          ></div>
          <div
            style={{
              backgroundColor: '#cccccc',
              backgroundImage: `url("https://livefromearth.media/assets/img/inspiration-in.jpg")`,
              transform: 'translate3d(0px, 0px, 0px)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              position: 'absolute',
              // zIndex: mobile ? 0 : 8,
              right: 0,
              top: 0,
              width: mobile ? '100%' : '75%',
              height: '100%'
            }}
          ></div>
          <div style={{ zIndex: mobile ? 10 : 8 }}>
            <div
              style={{
                fontFamily: FONT_PRIMARY,
                display: 'inline-block'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  zIndex: mobile ? 10 : 8,
                  top: mobile ? '38%' : '30%',
                  display: 'inline-block',
                  textRendering: 'optimizeLegibility',
                  textTransform: 'uppercase',
                  fontSize: mobile ? '12px' : '15px',
                  letterSpacing: '2px',
                  marginLeft: mobile ? '25%' : fullScreen ? '20%' : '16%'
                }}
              >
                PhuQuoc Photos
              </span>

              <span
                style={{
                  position: 'absolute',
                  fontWeight: 100,
                  top: mobile ? '39.5%' : '32%',
                  boxSizing: 'inherit',
                  lineHeight: 1.2,
                  visibility: 'inherit',
                  marginLeft: mobile ? '9%' : '9%',
                  content: '',
                  left: 0,
                  display: 'inline-block',
                  marginTop: '-1px',
                  width: mobile ? '50px' : fullScreen ? '60px' : '70px',
                  height: '2px',
                  background: 'black',
                  color: '#000',
                  fontSize: '18px',
                  zIndex: mobile ? 10 : 8,
                  textRendering: 'optimizeLegibility'
                }}
              ></span>
            </div>
            <div
              style={{
                fontFamily: FONT_PRIMARY,
                display: 'block'
              }}
            >
              <Typography
                variant="h1"
                align="center"
                style={{
                  position: 'absolute',
                  fontSize: mobile ? '48px' : '88px',
                  marginLeft: '9%',
                  bottom: '2%',
                  height: '100%',
                  display: 'flex',
                  zIndex: mobile ? 10 : 8,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  overflow: 'hidden'
                }}
              >
                Chào Bạn
              </Typography>
            </div>
            <div
              style={{
                fontFamily: FONT_PRIMARY,
                display: 'block'
              }}
            >
              {' '}
              <span
                style={{
                  position: 'absolute',
                  height: '100%',
                  top: mobile ? '8%' : '13%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  zIndex: mobile ? 10 : 8,
                  boxSizing: 'inherit',
                  marginLeft: '9%',
                  fontSize: '16px',
                  textRendering: 'optimizeLegibility'
                }}
              >
                Đây Là Hình Ảnh Từ Chuyến Đi Của Bạn
              </span>
              <div>
                <div
                  style={{
                    fontFamily: FONT_PRIMARY,
                    display: 'inline-block'
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      position: 'absolute',
                      top: mobile ? '75%' : '80%',
                      zIndex: mobile ? 10 : 8,
                      height: '100%',
                      fontSize: '12px',
                      justifyContent: 'center',
                      marginLeft: '9%',
                      color: 'black',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      overflow: 'hidden'
                    }}
                  >
                    Chia Sẻ:
                  </span>
                </div>
                <div
                  style={{
                    display: 'block',
                    position: 'absolute',
                    bottom: mobile ? '20%' : '15.5%',
                    justifyContent: 'center',
                    zIndex: mobile ? 10 : 8,
                    marginLeft: mobile ? '20%' : '12%',
                    alignItems: 'flex-start',
                    overflow: 'hidden'
                  }}
                >
                  {' '}
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
                </div>
              </div>{' '}
              <KeyboardDoubleArrowDownIcon
                className={classes.animatedItem}
                fontSize="large"
                sx={{
                  position: 'absolute',
                  zIndex: mobile ? 10 : 8,
                  bottom: '3%',
                  justifyContent: 'center',
                  left: mobile ? '47%' : fullScreen ? '48%' : '50%',
                  fontSize: 100
                }}
              />
              <div ref={myRef}>
                {' '}
                <Link
                  color="black"
                  variant="h5"
                  onClick={executeScroll}
                  sx={{
                    position: 'absolute',
                    zIndex: mobile ? 10 : 8,
                    bottom: '3%',
                    justifyContent: 'center',
                    left: mobile ? '40%' : fullScreen ? '45%' : '48%'
                  }}
                >
                  Xem Ảnh
                </Link>
              </div>
            </div>
          </div>
        </Head>
        <SimpleReactLightbox>
          <Root>
            <Stack spacing={1} sx={{ paddingTop: { xs: '450px', sm: '700px' } }}>
              {loadingButton ? (
                ''
              ) : listEmpty ? (
                <h3>Không tìm thấy dữ liệu</h3>
              ) : (
                <ButtonGroup
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginRight: '10px',
                    marginBottom: '10px',
                    marginTop: mobile ? '50px' : ''
                  }}
                >
                  <MuiButton
                    size="large"
                    startIcon={<DownloadIcon />}
                    onClick={() => downloadAll()}
                  >
                    Tải Về
                  </MuiButton>
                  {/* <MuiButton size="large" startIcon={<LinkIcon />}>
                Chia Sẻ
              </MuiButton> */}
                </ButtonGroup>
              )}
              <Box>
                <SRLWrapper options={options}>
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
                        key={item.id}
                      >
                        <div ref={myRef}>
                          {loading ? (
                            <Skeleton
                              animation="wave"
                              variant="rectangular"
                              sx={{
                                width: {
                                  xs: 150, // theme.breakpoints.up('xs')
                                  sm: 180, // theme.breakpoints.up('sm')
                                  md: 200, // theme.breakpoints.up('md')
                                  xl: 340 // theme.breakpoints.up('xl')
                                },
                                height: {
                                  xs: 200,
                                  md: 250,
                                  xl: 350
                                }
                              }}
                            />
                          ) : (
                            <div className={classes.imgThumb}>
                              <img
                                src={item.pic_url}
                                alt={`${item.title} ${item.timestamp}`}
                                loading="lazy"
                                style={{
                                  maxWidth: '100%',
                                  height: 'auto',
                                  // padding: '10px 10px',
                                  // margin: '10px 10px 0px 0px',
                                  borderRadius: '12px',
                                  backgroundColor: 'black'
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
                              <span>
                                <ImageListItemBar
                                  title={
                                    <>
                                      <Stack direction="row" spacing={1}>
                                        <Chip
                                          label="abc"
                                          variant="outlined"
                                          clickable
                                          size="small"
                                          sx={{
                                            color: 'rgb(255, 255, 255)',
                                            marginRight: '2px',
                                            '& .MuiChip-label': {
                                              overflow: 'visible'
                                            }
                                          }}
                                        />
                                        <Chip
                                          label="abc"
                                          variant="outlined"
                                          clickable
                                          size="small"
                                          sx={{
                                            color: 'rgb(255, 255, 255)',
                                            marginRight: '2px',
                                            '& .MuiChip-label': {
                                              overflow: 'visible'
                                            }
                                          }}
                                        />
                                      </Stack>
                                    </>
                                  }
                                  style={{ zIndex: 2 }}
                                  actionIcon={
                                    <IconButton
                                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                      aria-label={`info about ${item.title}`}
                                      href={item.pic_url}
                                      download
                                      target="_blank"
                                      onClick={() => download(item.pic_url)}
                                    >
                                      <CloudDownloadIcon />
                                    </IconButton>
                                  }
                                  sx={{
                                    borderRadius: '12px',
                                    background: 'linear-gradient(0, #000, transparent);'
                                  }}
                                />
                              </span>
                            </div>
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
        {loadingButton ? (
          ''
        ) : listEmpty ? (
          ''
        ) : (
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
        )}
      </div>
    </Page>
  );
}

const images: any[] = [];
