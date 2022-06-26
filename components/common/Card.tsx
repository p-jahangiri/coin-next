import * as React from 'react';
import { CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { useTranslation } from '@lib/hooks/useTranslation';
// interface Props {
//     title?: string;
//     image?: string;
//     description?: string;
//     link?: string;
//     hoverText?: string;
// }

export default function MultiActionAreaCard() {
    const { t } = useTranslation();
    const [isHovering, setIsHovered] = React.useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    return (
        <Card
            sx={{
                maxWidth: 420,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '5px 0 20px 5px rgb(0 0 0 / 0.10)',
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <CardActionArea sx={{ position: 'relative', transition: 'all 0.5s ease' }}>
                <CardMedia
                    component="img"
                    image="https://images.cointelegraph.com/images/370_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDYvMTVjYjBjYTAtMmVmNy00YjllLTkxYzctZjk5YTVmNzlkNjQ3LmpwZw==.jpg"
                    alt="green iguana"
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {t(
                            'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
                        )}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {isHovering ? (
                <Typography
                    p={2}
                    mt={4}
                    fontSize={14}
                    width={280}
                    position={'absolute'}
                    sx={{
                        backgroundColor: 'rgba(30, 29, 29, 0.8)',
                        borderRadius: '5px',
                        color: 'whitesmoke',
                    }}
                >
                    {t('SEC chair warns about good to be true returns amid market downturn')}
                </Typography>
            ) : (
                ''
            )}
            <CardActions
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    {t('by Turner Wright')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {t('19 HOURS AGO')}
                </Typography>
            </CardActions>
        </Card>
    );
}
