import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useKeenSlider } from 'keen-slider/react';
import { ImgData } from 'static/data';

import 'keen-slider/keen-slider.min.css';

export default function App() {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
        breakpoints: {
            '(max-width: 928px)': { slides: { perView: 2, spacing: 20 } },
            '(max-width: 768px)': { slides: { perView: 1, spacing: 20 } },
        },
        slides: {
            perView: 3,
            spacing: 10,
        },
    });

    return (
        <>
            <Box position={'relative'}>
                <Box ref={sliderRef} className="keen-slider" sx={{ backgroundColor: 'red' }}>
                    {ImgData.map((item, idx) => {
                        return (
                            <Box
                                key={idx}
                                className="keen-slider__slide "
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                sx={{ cursor: 'pointer', objectFit: 'contain' }}
                            >
                                <img width={'100%'} src={item.url} alt="img" />
                            </Box>
                        );
                    })}
                </Box>
                {loaded && instanceRef.current && (
                    <>
                        <Arrow
                            left
                            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                            disabled={currentSlide === 0}
                        />

                        <Arrow
                            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                            disabled={
                                currentSlide === instanceRef.current.track.details.slides.length - 1
                            }
                        />
                    </>
                )}
            </Box>
            {loaded && instanceRef.current && (
                <Box display={'flex'} justifyContent={'center'} py={2}>
                    {[...Array(instanceRef.current.track.details.slides.length).keys()].map(
                        (idx) => {
                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        instanceRef.current?.moveToIdx(idx);
                                    }}
                                    className={'dot' + (currentSlide === idx ? ' active' : '')}
                                ></button>
                            );
                        },
                    )}
                </Box>
            )}
        </>
    );
}

function Arrow(props: { disabled: boolean; left?: boolean; onClick: (e: any) => void }) {
    const disabeld = props.disabled ? ' arrow--disabled' : '';
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'} ${disabeld}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
        </svg>
    );
}
