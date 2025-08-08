// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import Image from 'next/image';
// import useEmblaCarousel from 'embla-carousel-react';
// import Autoplay from 'embla-carousel-autoplay';
// import { Box, Button, IconButton } from '@mui/material';
// import CircleIcon from '@mui/icons-material/Circle';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PauseIcon from '@mui/icons-material/Pause';

// const EmblaCarousel = ({ slides, options }) => {
//   const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [scrollSnaps, setScrollSnaps] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const scrollTo = useCallback(
//     (index) => emblaApi && emblaApi.scrollTo(index),
//     [emblaApi]
//   );
//   const toggleAutoplay = useCallback(() => {
//     const autoplay = emblaApi?.plugins()?.autoplay;
//     if (!autoplay) return;

//     const play = () => autoplay.play(true);
//     const stop = () => autoplay.stop();

//     if (isPlaying) {
//       stop();
//     } else {
//       play();
//     }
//     setIsPlaying(!isPlaying);
//   }, [emblaApi, isPlaying]);

//   useEffect(() => {
//     if (!emblaApi) return;

//     const onSelect = () => {
//       setSelectedIndex(emblaApi.selectedScrollSnap());
//     };

//     const onSettle = () => {
//       setScrollSnaps(emblaApi.scrollSnapList());
//     };

//     emblaApi.on('select', onSelect);
//     emblaApi.on('settle', onSettle);
//     onSettle();

//     setIsPlaying(emblaApi.plugins().autoplay.isPlaying());
//   }, [emblaApi]);

//   return (
//     <Box
//       sx={{ position: 'relative', overflow: 'hidden', }}
//       ref={emblaRef}
//     >
//       <Box sx={{ display: 'flex' }}>
//         {slides.map((src, index) => (
//           <Box
//             sx={{ position: 'relative', flex: '0 0 100%', height: '500px' }}
//             key={index}
//           >
//             <Image
//               src={src}
//               alt={`Slide ${index + 1}`}
//               fill
//               style={{ objectFit: 'cover' }}
//             />
//           </Box>
//         ))}
//       </Box>
//       <Box
//         sx={{
//           position: 'absolute',
//           bottom: '1rem',
//           left: '50%',  
//           transform: 'translateX(-50%)',
//           display: 'flex',
//           gap: '1rem',
//         }}
//       >
//         {scrollSnaps.map((_, index) => (
//           <IconButton key={index} onClick={() => scrollTo(index)} size='small'>
//             <CircleIcon
//               sx={{
//                 color: index === selectedIndex ? '#111111' : '#fffaf3',
//                 fontSize: '12px',
//                 transition: 'color 0.2s',
//               }}
//             />
//           </IconButton>
//         ))}
//       </Box>
//       {/* <Button
//         onClick={toggleAutoplay}
//         sx={{
//           position: 'absolute',
//           bottom: '1rem',
//           right: '1rem',
//           color: 'white',
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           '&:hover': {
//             backgroundColor: 'rgba(0, 0, 0, 0.7)',
//           },
//         }}
//         startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
//       >
//         {isPlaying ? 'Pause' : 'Play'}
//       </Button> */}
//     </Box>
//   );
// };

// const ImageSlider = () => {
//   const slides = ['/image-1.jpg', '/image-2.png', '/image-3.png'];
//   const options = { loop: true };

//   return <EmblaCarousel slides={slides} options={options} />;
// };

// export default ImageSlider;

'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Box, Button, IconButton, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const EmblaCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const play = () => autoplay.play(true);
    const stop = () => autoplay.stop();

    if (isPlaying) {
      stop();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  }, [emblaApi, isPlaying]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      // Trigger animation on slide change
      setIsAnimating(false);
      setTimeout(() => setIsAnimating(true), 100);
    };

    const onSettle = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('settle', onSettle);
    onSettle();

    setIsPlaying(emblaApi.plugins().autoplay.isPlaying());
    
    // Initial animation trigger
    setTimeout(() => setIsAnimating(true), 500);
  }, [emblaApi]);

  return (
    <Box
      sx={{ position: 'relative', overflow: 'hidden' }}
      ref={emblaRef}
    >
      <Box sx={{ display: 'flex' }}>
        {slides.map((slide, index) => (
          <Box
            sx={{ position: 'relative', flex: '0 0 100%', height: '500px' }}
            key={index}
          >
            <Image
              src={slide.src}
              alt={`Slide ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
            />
            
            {/* Animated Text Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  transform: index === selectedIndex && isAnimating 
                    ? 'translateY(0) scale(1)' 
                    : 'translateY(50px) scale(0.8)',
                  opacity: index === selectedIndex && isAnimating ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transitionDelay: index === selectedIndex ? '0.2s' : '0s',
                }}
              >
                {slide.title}
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  maxWidth: '600px',
                  lineHeight: 1.6,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                  transform: index === selectedIndex && isAnimating 
                    ? 'translateY(0)' 
                    : 'translateY(30px)',
                  opacity: index === selectedIndex && isAnimating ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transitionDelay: index === selectedIndex ? '0.5s' : '0s',
                }}
              >
                {slide.description}
              </Typography>
              
              {slide.buttonText && (
                <Button
                  variant="contained"
                  sx={{
                    marginTop: '2rem',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    padding: '12px 32px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    transform: index === selectedIndex && isAnimating 
                      ? 'translateY(0) scale(1)' 
                      : 'translateY(20px) scale(0.9)',
                    opacity: index === selectedIndex && isAnimating ? 1 : 0,
                    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    transitionDelay: index === selectedIndex ? '0.8s' : '0s',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      transform: 'translateY(-2px) scale(1.05)',
                    },
                  }}
                  onClick={() => console.log(`Button clicked for slide ${index + 1}`)}
                >
                  {slide.buttonText}
                </Button>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Navigation Dots */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1rem',
          backgroundColor: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          padding: '8px 16px',
          borderRadius: '20px',
        }}
      >
        {scrollSnaps.map((_, index) => (
          <IconButton key={index} onClick={() => scrollTo(index)} size="small">
            <CircleIcon
              sx={{
                color:
                  index === selectedIndex ? '#8B4513' : 'common.white',
                color: index === selectedIndex ? '#ffffff' : 'rgba(255,255,255,0.5)',
                fontSize: '12px',
                transition: 'all 0.3s ease',
                transform: index === selectedIndex ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          </IconButton>
        ))}
      </Box>

      {/* Play/Pause Button */}
      {/* <Button
        onClick={toggleAutoplay}
        sx={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          minWidth: '48px',
          height: '48px',
          borderRadius: '50%',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </Button> */}
    </Box>
  );
};

const ImageSlider = () => {
  // Enhanced slides data with content for overlays
  const slides = [
    {
      src: '/image-1.jpg',
      title: 'Welcome to Paradise',
      description: 'Experience breathtaking views and unforgettable moments in this stunning destination.',
    },
    {
      src: '/image-2.png',
      title: 'Adventure Awaits',
      description: 'Discover new horizons and create memories that will last a lifetime.',
    },
    {
      src: '/image-3.png',
      title: 'Pure Serenity',
      description: 'Find your perfect escape in our tranquil and luxurious environment.',
    }
  ];
  
  const options = { loop: true };

  return <EmblaCarousel slides={slides} options={options} />;
};

export default ImageSlider;