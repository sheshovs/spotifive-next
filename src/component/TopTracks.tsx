import { Box, IconButton, Slider, Typography } from '@mui/material'
import React from 'react'
import { FastRewindRounded, PlayArrowRounded, FastForwardRounded } from '@mui/icons-material'
import useWindowDimensions from '@/common/hooks/useWindowDimensions'

const breakpoints = {
  sm: 500,
  md: 900,
  lg: 1200,
}

interface TopTracksProps {
  tracks: any[]
}

const TopTracks = React.forwardRef(({ tracks }: TopTracksProps, ref) => {
  const { width } = useWindowDimensions()

  return (
    <>
      <Box
        ref={ref}
        id="top-10"
        sx={{
          width: width <= breakpoints.sm ? `100%` : width <= breakpoints.md ? `90%` : `50%`,
          padding: `10px`,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          background: `#212124`,
          zIndex: -1,
          marginBottom: `20px`,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            marginY: `10px`,
            color: `#fff`,
            fontFamily: `Gotham-Bold`,
            fontWeight: 400,
          }}
        >
          SpotiFive
          <Typography
            sx={{
              fontSize: `14px !important`,
              fontFamily: `Gotham-Light`,
              fontWeight: 400,
            }}
          >
            (last 6 months)
          </Typography>
        </Typography>
        {tracks?.map((track, i) => (
          <Box
            key={i}
            sx={{
              width: `100%`,
              height: `100px`,
              margin: `5px 0`,
              overflow: `hidden`,
              borderRadius: `20px`,
            }}
          >
            <Box
              sx={{
                width: `100%`,
                height: `100px`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
                borderRadius: `20px`,
                background: `url(${track.album.images[1].url})`,
                backgroundSize: `cover`,
                backgroundPosition: `center center`,
                filter: `blur(15px)`,

                '&::before': {
                  content: `''`,
                  width: `100%`,
                  height: `100px`,
                  position: `relative`,
                  background: `rgba(0,0,0,.3)`,
                  borderRadius: `20px`,
                },
              }}
            ></Box>
            <Box
              sx={{
                position: `relative`,
                top: `-100px`,
                width: `100%`,
                height: `100%`,
                display: `flex`,
                justifyContent: `space-evenly`,
                alignItems: `center`,
                border: `1px solid rgba(255,255,255,.15)`,
                borderRadius: `20px`,
                overflow: `hidden`,
                padding: `10px`,
              }}
            >
              <img
                src={`${track.album.images[1].url}`}
                style={{
                  width:
                    width <= breakpoints.sm ? `64px` : width <= breakpoints.md ? `70px` : `75px`,
                  height:
                    width <= breakpoints.sm ? `64px` : width <= breakpoints.md ? `70px` : `75px`,
                  borderRadius: `10px`,
                  border: `1px solid white`,
                  boxShadow: `0 0 5px 2px rgba(255,255,255,.2)`,
                }}
              />
              <Box
                sx={{
                  width: `80%`,
                  height: `100%`,
                  paddingLeft: `10px`,
                  display: `flex`,
                  justifyContent: `space-between`,
                }}
              >
                <Box
                  sx={{
                    width: `65%`,
                    display: `flex`,
                    flexDirection: `column`,
                    justifyContent: `center`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: width <= breakpoints.sm ? `15px` : `18px`,
                      color: `#fff`,
                      fontWeight: 700,
                    }}
                  >
                    {track.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: width <= breakpoints.sm ? `12px` : `14px`,
                      color: `#E3E3E3`,
                      fontWeight: `100 !important`,
                    }}
                  >
                    {track.artists.map((artist: { name: string }, i: number) =>
                      i === track.artists.length - 1 ? `${artist.name}` : `${artist.name}, `,
                    )}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: width <= breakpoints.sm ? `35%` : `30%`,
                    display: `flex`,
                    flexDirection: `column`,
                    justifyContent: `center`,
                    alignItems: `center`,
                  }}
                >
                  <Box
                    sx={{
                      width: `100%`,
                      display: `flex`,
                      justifyContent: `space-between`,
                      alignItems: `center`,
                    }}
                  >
                    <IconButton
                      sx={{
                        width: width <= breakpoints.sm ? `28px` : `34px`,
                        height: width <= breakpoints.sm ? `28px` : `34px`,
                      }}
                    >
                      <FastRewindRounded
                        sx={{ color: `#fff` }}
                        fontSize={width <= breakpoints.sm ? `medium` : `large`}
                      />
                    </IconButton>
                    <IconButton
                      sx={{
                        width: width <= breakpoints.sm ? `28px` : `34px`,
                        height: width <= breakpoints.sm ? `28px` : `34px`,
                      }}
                    >
                      <PlayArrowRounded
                        sx={{ color: `#fff` }}
                        fontSize={width <= breakpoints.sm ? `medium` : `large`}
                      />
                    </IconButton>
                    <IconButton
                      sx={{
                        width: width <= breakpoints.sm ? `28px` : `34px`,
                        height: width <= breakpoints.sm ? `28px` : `34px`,
                      }}
                    >
                      <FastForwardRounded
                        sx={{ color: `#fff` }}
                        fontSize={width <= breakpoints.sm ? `medium` : `large`}
                      />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      width: `90%`,
                    }}
                  >
                    <Slider
                      size="small"
                      defaultValue={Math.round(Math.random() * 100)}
                      sx={{
                        color: `#fff`,
                        paddingY: width <= breakpoints.sm ? `10px !important` : `14px !important`,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  )
})

TopTracks.displayName = `TopTracks`

export default TopTracks
