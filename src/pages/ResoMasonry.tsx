/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  ImageListItem,
  Stack,
  Skeleton,
  ImageListItemBar,
  Chip,
  IconButton,
  Typography
} from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Img } from 'react-image';
import { isNull } from 'lodash';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme: any) => ({
  wrap: {
    overflow: 'hidden',
    borderRadius: '2px',
    margin: '10px 10px',
    position: 'relative',
    '&:hover': {
      boxShadow: '0 0px 14px #ccc'
    }
  },
  imgThumb: {
    '& span': {
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    },
    '&:hover': {
      '& span': {
        display: 'block'
      }
    }
  },
  item: {
    transition: 'all 0.3s ease-in-out',
    position: 'relative',
    borderRadius: '2px',
    backgroundColor: '#ccc',
    cursor: 'zoom-in',
    '&:hover': {
      [theme.breakpoints.up('sm')]: {
        zIndex: 1,
        transform: 'scale(1.1)'
      }
    }
  }
}));

function ResoMasonry({ data }: { data: any }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Stack
      sx={{
        marginRight: 0,
        paddingRight: 0,
        width: '100vw',
        position: 'relative',
        left: '50%',
        justifyContent: 'center',
        transform: 'translateX(-50%)',
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(auto-fill, 180px)',
          sm: 'repeat(auto-fill, 200px)',
          md: 'repeat(auto-fill, 220px)',
          lg: 'repeat(auto-fill, 300px)',
          xl: 'repeat(auto-fill, 360px)'
        },
        gridAutoRows: { xs: '4px', sm: '6px', lg: '10px' }
      }}
    >
      {data?.pages ? (
        data?.pages?.map(({ media_items: items }: any, index: any) => (
          <React.Fragment key={`group-${index}`}>
            {items.map((item: any) => (
              <Stack
                sx={{
                  margin: '5px 2px',
                  padding: 0,
                  borderRadius: '16px',
                  gridRowEnd: `span ${Math.max(
                    isMobile ? 30 : 25,
                    Math.min(
                      45,
                      Math.floor(28 / (item.media_metadata?.width / item.media_metadata?.height))
                    )
                  )}`
                }}
                key={item.id}
              >
                <ImageListItem className={[classes.wrap, 'img-responsive'].join(' ')}>
                  <div>
                    <div className={classes.imgThumb}>
                      <div>
                        <a
                          className="gallery-selector"
                          data-download-url={`${item.base_url}=w${1960}-d`}
                          data-src={`${item.base_url}=w${1960}-d`}
                          data-external-thumb-image={item.base_url}
                          data-responsive={`${item.base_url}=w${1960} 780, ${
                            item.base_url
                          }=w${1960} 1024`}
                          data-sub-html={`<h4>${item.filename} - ${
                            item.media_metadata.creationTime
                          }</h4> <p><a href="${
                            item.base_url
                          }=w${1960}-d" target="_blank" rel="noreferrer">
          Tải ảnh
        </a></p>`}
                        >
                          <Img
                            src={item.base_url}
                            loader={<Skeleton />}
                            alt={`${isNull(item.title) ? '' : item.title} ${
                              isNull(item.timestamp) ? '' : item.timestamp
                            }`}
                            loading="lazy"
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                              borderRadius: 'inherit',
                              backgroundColor: 'black'
                            }}
                            onClick={() => {}}
                            className={classes.item}
                          />
                        </a>
                      </div>
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
                            <a
                              href={`${item.base_url}=w${1960}-d`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.title}`}
                              >
                                <CloudDownloadIcon />
                              </IconButton>
                            </a>
                          }
                          sx={{
                            borderRadius: 'inherit',
                            background: 'linear-gradient(0, #000, transparent);'
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </ImageListItem>
              </Stack>
            ))}
          </React.Fragment>
        ))
      ) : (
        <Typography>Không tìm thấy hình ảnh của bạn</Typography>
      )}
    </Stack>
  );
}

export default ResoMasonry;
