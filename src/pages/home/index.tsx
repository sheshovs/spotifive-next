import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import {
  // Backdrop,
  Box,
  Button,
  // SpeedDial,
  // SpeedDialAction,
  // SpeedDialIcon,
  Typography,
} from '@mui/material'
import { API } from '../../common/api/hello'
import TopTracks from '@/component/TopTracks'
import domtoimage from 'dom-to-image'

// import { Save, Print, Share, PaletteRounded } from '@mui/icons-material'

const initialState = {
  access_token: ``,
  token_type: ``,
  expires_in: ``,
}

// const actions = [
//   { icon: <PaletteRounded />, name: `Change Background Color` },
//   { icon: <Save />, name: `Save` },
//   { icon: <Print />, name: `Print` },
//   { icon: <Share />, name: `Share` },
// ]

const Home = () => {
  const router = useRouter()

  const [values, setValues] = React.useState(initialState)
  const [tracks, setTracks] = React.useState<any[]>([])
  const [user, setUser] = React.useState<any>({})
  // const [open, setOpen] = React.useState(false)
  // const handleDial = () => setOpen(!open)

  React.useEffect(() => {
    const path = router.asPath.split(`#`)[1]
    setValues({
      access_token: `${path.split(`&`)[0].split(`=`)[1]}`,
      token_type: `${path.split(`&`)[1].split(`=`)[1]}`,
      expires_in: `${path.split(`&`)[2].split(`=`)[1]}`,
    })
  }, [router.asPath])

  React.useEffect(() => {
    const getData = async () => {
      setUser(await API.getUser(values))
      setTracks(await API.getTopArtists(values))
    }
    getData()
  }, [values])

  const container = useRef(null)

  function exportToJPEG(dom: any) {
    domtoimage
      .toPng(dom)
      .then(function (dataUrl: string) {
        const link = document.createElement(`a`)
        link.href = dataUrl
        link.download = `image.jpeg`
        link.click()
      })
      .catch(function (error: any) {
        console.error(`oops, something went wrong!`, error)
      })
  }

  return (
    <>
      {/* <Backdrop
          open={open}
          sx={{
            zIndex: '2',
          }}
        /> */}
      {/* <SpeedDial
        ariaLabel="Settings"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        icon={<SpeedDialIcon />}
        onClick={handleDial}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
        ))}
      </SpeedDial> */}
      <Box
        sx={{
          display: `flex`,
          width: `100%`,
          minHeight: `100vh`,
          alignItems: `center`,
          flexDirection: `column`,
          marginTop: `0px`,
        }}
      >
        {user && (
          <Box
            sx={{
              width: `60%`,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                marginTop: `20px`,
                color: `#fff`,
                fontFamily: `Gotham-Bold`,
                fontWeight: 400,
                textTransform: `uppercase`,
                fontSize: `20px !important`,
              }}
            >
              USER: {user?.display_name}
            </Typography>
          </Box>
        )}

        <TopTracks ref={container} tracks={tracks} />

        <Button
          variant="contained"
          size="large"
          color="success"
          sx={{
            marginBottom: `10px`,
            zIndex: 1,
          }}
          onClick={() => exportToJPEG(container.current)}
        >
          Download
        </Button>
        <Button
          variant="contained"
          size="large"
          color="success"
          onClick={() => {
            router.push({
              pathname: `${process.env.ENV_URL}`,
            })
          }}
          sx={{
            marginBottom: `10px`,
            zIndex: 1,
          }}
        >
          Logout
        </Button>
      </Box>
    </>
  )
}

export default Home
