

import { Box } from '@mui/material';

import { VideoAsset } from '../../types/media';
import { getYoutubeFrame } from '@/utils/url';

function MainVideo({ video }: { video: VideoAsset }) {
  const url=getYoutubeFrame(video.url) as string
  console.log(url);
  
  if(!url) return null
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: "absolute",
          inset: "-40px",
          zIndex: 0,
           background:
            "radial-gradient(circle, rgba(229,9,20,.35) 0%, transparent 80%)",

          filter: "blur(60px)",
          transform: "scale(1.1)",
        }}
      />

      {/* Video */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,

          width: "100%",
          aspectRatio: "16/9",

          overflow: "hidden",

          borderRadius: "4%",

          boxShadow:
            "0 10px 40px rgba(0,0,0,.4)",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={url}
          title={video.name}
          allowFullScreen
          style={{
            border: 0,
          }}
        />
      </Box>
    </Box>
  );
}

export default MainVideo;