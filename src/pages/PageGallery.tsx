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
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

const Root = styled('div')(({ theme }) => ({
  margin: '10px 24px 10px',
  [theme.breakpoints.down('md')]: {
    margin: '88px 10px'
  },
  [theme.breakpoints.down('sm')]: {
    margin: '88px 0'
  }
}));

const Head = styled('div')(({ theme }) => ({
  padding: '60px 0',
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
      <div style={{ marginTop: '88px', textAlign: 'center' }}>
        <Typography gutterBottom variant="h2" position="absolute" left="5px" right="5px">
          <Head>
            <div>{'Hình ảnh mã đơn hàng #' + orderId}</div>
            {/* <Typography variant="caption" sx={{ display: 'flex', justifyContent: 'center' }}>
              Chia sẻ
            </Typography> */}
            <Divider>
              <Chip label="Chia sẻ" />
            </Divider>
            {/* https://www.facebook.com/sharer/sharer.php?u=${window.location.href} */}
            <IconButton sx={{ color: 'blue' }}>
              <FacebookShareButton url={`${window.location.href}`} quote={undefined}>
                <FacebookIcon />
              </FacebookShareButton>
            </IconButton>
            <IconButton sx={{ color: 'blue' }}>
              <TwitterShareButton url={`${window.location.href}`}>
                <TwitterIcon />
              </TwitterShareButton>
            </IconButton>
          </Head>
        </Typography>

        <SimpleReactLightbox>
          <Root>
            <Stack spacing={1} sx={{ paddingTop: { xs: '220px', sm: '300px' } }}>
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
                    marginBottom: '10px'
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
                        key={item.pic_url}
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
