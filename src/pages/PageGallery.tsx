import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import DownloadIcon from '@mui/icons-material/Download';
import { CircularProgress, IconButton, ImageListItemBar, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { isNull } from 'lodash';
import React from 'react';
import { useInfiniteQuery } from 'react-query';
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
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  let orderId = params.get('ma-don-hang');

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      'projects',
      async ({ pageParam: nextToken }) => {
        const res = await axios.get(
          `https://api.phuquocphoto.com/api/v1/orders/${orderId}/google-photo-medias`,
          {
            params: {
              'page-token': nextToken
            }
          }
        );
        return res.data;
      },
      {
        getNextPageParam: (lastPage, pages) => lastPage.next_page_token ?? false
      }
    );

  console.log(`data`, data);

  return (
    <Page title="Kho Ảnh">
      <div>
        <Header />

        <Box>
          {isLoading ? (
            <CircularProgress />
          ) : error ? (
            <Typography>Không tìm thấy dữ liệu {(error as any).message}</Typography>
          ) : (
            <Stack spacing={1}>
              <SimpleReactLightbox>
                <Root>
                  <Stack spacing={1}>
                    <Box>
                      <SRLWrapper>
                        {data?.pages ? (
                          // TODO: CHECK THIS IMAGE LIST (NOT RERENDERs)
                          <ImageList
                            variant="masonry"
                            cols={mobile ? 2 : fullScreen ? 3 : 4}
                            gap={1}
                            sx={{ overflow: 'visible' }}
                          >
                            {data?.pages.map(({ media_items: medias }, i) => (
                              <React.Fragment key={`group-${i}`}>
                                {medias?.map((item: any) => (
                                  <ImageListItem className={classes.wrap} key={item.id}>
                                    <div>
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
                                          onClick={() => {}}
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
                                    </div>
                                  </ImageListItem>
                                ))}
                              </React.Fragment>
                            ))}
                          </ImageList>
                        ) : (
                          <Typography>Không tìm thấy hình ảnh của bạn</Typography>
                        )}
                      </SRLWrapper>
                    </Box>
                    <button
                      type="button"
                      onClick={() => fetchNextPage()}
                      disabled={!hasNextPage || isFetchingNextPage}
                    >
                      {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                        ? 'Load More'
                        : 'Nothing more to load'}
                    </button>
                  </Stack>
                </Root>
              </SimpleReactLightbox>
            </Stack>
          )}
        </Box>
      </div>
    </Page>
  );
}
