/* eslint-disable jsx-a11y/anchor-has-content */
import Box from '@mui/material/Box';
import Page from '../components/Page';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DownloadIcon from '@mui/icons-material/Download';
// import LinkIcon from '@mui/icons-material/Link';
// import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import {
  // Typography,
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
import Chip from '@mui/material/Chip';
import Header from '../pages/PageGallery.Style';

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

function download(e: any) {
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
  const [username, setUsername] = useState('');
  const [notimage, setNotImage] = useState('');
  const [ordermedia, setOrdermedia] = useState([]);
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
      .get(
        `https:///api.phuquocphoto.com/api/v1/order-medias?order-code=${orderId}&${paramsString}`
      )
      .then((res) => {
        console.log(res);
        const { data, metadata } = res.data;
        setListEvent(data);
        setMetaData(metadata);
        console.log('success with listEvent');
      })
      .catch((err) => {
        setListError(err);
        console.log('error' + err);
      });
  }, [filters]);

  useEffect(() => {
    axios
      .get(`https://api.phuquocphoto.com/api/v1/orders/${orderId}`)
      .then((res) => {
        const { data } = res.data;
        if (res.data.order_media == '') {
          setHaveImage(true);
          setNotImage('Ảnh của bạn chưa được upload!');
        }
        var splitted = res.data.customer_name.split(' ', 2);
        setUsername(splitted[1]);
      })
      .catch((err) => {
        setListError(err);
        console.log('error' + err);
      });
  }, []);
  console.log('username: ' + username);
  console.log('notImage: ' + notimage);
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
  const [haveImage, setHaveImage] = React.useState(false);

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

  const url = new URL(window.location.href);

  let params = new URLSearchParams(url.search);

  let orderId = params.get('ma-don-hang');

  return (
    <Page title="Kho Ảnh">
      <div>
        <SimpleReactLightbox>
          <Root>
            <Header />
            <Stack spacing={1} sx={{ paddingTop: { xs: '450px', sm: '700px' } }}>
              {loadingButton ? (
                ''
              ) : haveImage ? (
                <h3 style={{ position: 'absolute', left: '45%' }}>{notimage}</h3>
              ) : listEmpty ? (
                <h3 style={{ position: 'absolute', left: '45%' }}>Không tìm thấy dữ liệu</h3>
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
                        <div>
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
        ) : haveImage ? (
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
