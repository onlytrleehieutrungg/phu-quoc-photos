import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import DownloadIcon from '@mui/icons-material/Download';
import { IconButton, ImageListItemBar, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { isNull } from 'lodash';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import Page from '../components/Page';
import Header, { Root } from '../pages/PageGallery.Style';

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

export default function PageGallery() {
  const classes = useStyles();
  const [notimage, setNotImage] = useState('');
  const images: any[] = [];
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const largeScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [state, setState] = useState({ isOpen: false, photoIndex: 0, photoUrl: '' });
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(true);
  const [listEvent, setListEvent] = React.useState(images);
  const [listError, setListError] = React.useState('');
  const [listEmpty, setListEmpty] = React.useState(false);
  const [haveImage, setHaveImage] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [metaData, setMetaData] = useState({
    page: 1,
    size: 1,
    total: 1
  });
  const totalPages = Math.ceil(metaData.total / metaData.size);
  const url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  let orderId = params.get('ma-don-hang');

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
    const paramsString = queryString.stringify(filters);
    axios
      .get(`https://api.phuquocphoto.com/api/v1/orders/${orderId}/google-photo-medias`)
      .then((res) => {
        console.log(res);
        setListEvent(res.data.media_items);
        console.log('success with listEvent');
      })
      .catch((err) => {
        setListError(err);
        console.log('error' + err);
      });
  }, [filters]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoadingButton(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (listError !== '') {
      setListEmpty(true);
    } else {
      setListEmpty(false);
    }
  }, [listError]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Page title="Kho Ảnh">
      <div>
        <Header />

        <Box>
          {loadingButton ? (
            ''
          ) : haveImage ? (
            ''
          ) : listEmpty ? (
            ''
          ) : (
            <Stack spacing={1}>
              <SimpleReactLightbox>
                <Root>
                  <Stack spacing={1}>
                    {loadingButton ? (
                      ''
                    ) : listEmpty ? (
                      <h3 style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center' }}>
                        Không tìm thấy dữ liệu
                      </h3>
                    ) : haveImage ? (
                      <h3 style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center' }}>
                        {notimage}
                      </h3>
                    ) : (
                      <Box>
                        <SRLWrapper>
                          <ImageList
                            variant="masonry"
                            cols={mobile ? 2 : fullScreen ? 3 : 4}
                            gap={1}
                            sx={{ overflow: 'visible' }}
                          >
                            {listEvent.map((item) => (
                              <ImageListItem className={classes.wrap} key={item.id}>
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
                                        src={item.base_url}
                                        alt={`${isNull(item.title) ? '' : item.title} ${
                                          isNull(item.timestamp) ? '' : item.timestamp
                                        }`}
                                        loading="lazy"
                                        style={{
                                          maxWidth: '100%',
                                          height: 'auto',
                                          borderRadius: '12px',
                                          backgroundColor: 'black'
                                        }}
                                        onClick={() => {
                                          let updateState = { ...state };
                                          updateState.isOpen = true;
                                          updateState.photoUrl = item.base_url;
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
                                                {item.tags?.split(',').map((tag: string) => (
                                                  <Chip
                                                    key={tag}
                                                    label={tag}
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
                                                ))}
                                              </Stack>
                                            </>
                                          }
                                          style={{ zIndex: 2 }}
                                          actionIcon={
                                            <IconButton
                                              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                              aria-label={`info about ${item.title}`}
                                              href={item.base_url}
                                              download
                                              target="_blank"
                                              onClick={() => download(item.base_url)}
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
                    )}
                  </Stack>
                </Root>
              </SimpleReactLightbox>
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
        </Box>
      </div>
    </Page>
  );
}
