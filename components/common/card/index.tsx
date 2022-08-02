import * as React from 'react';
import { CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import CardImg from 'assets/images/img.jpg';
import Image from 'next/image';

import { getResponseNewsData } from '@interfaces/news/news.interface';
import { useTranslation } from '@lib/hooks/useTranslation';
import Link from '@lib/Link';

interface Props {
    data?: getResponseNewsData & any;
    loading?: boolean;
}

export default function MultiActionAreaCard({ data, loading }: Props) {
    const { t } = useTranslation();
    const [isHovering, setIsHovered] = React.useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    return (
        <Card
            sx={{
                position: 'relative',
                maxWidth: 420,
                minHeight: 380,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '5px 0 20px 5px rgb(0 0 0 / 0.10)',
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <CardActionArea sx={{ position: 'relative', transition: 'all 0.5s ease' }}>
                {loading ? (
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                ) : (
                    <Link href="https://bitsomon.com/ " target="_blank">
                        <Image
                            src={CardImg}
                            alt="img"
                            width="100%"
                            height="67%"
                            layout="responsive"
                            objectFit="contain"
                        />
                    </Link>
                )}

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {data && data?.body}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Typography
                position={'absolute'}
                p={2}
                mt={{ xs: 24, lg: 29 }}
                ml={{ xs: 35, lg: 43 }}
                height={10}
                variant="h3"
                sx={{
                    paddingX: '4px',
                    textTransform: 'uppercase',
                    color: '#3d3d3d',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '5px',
                    backgroundColor: '#ffcd04',
                    boxShadow: '0 0 2px 0 rgb(0 0 0 / 75%',
                }}
            >
                News
            </Typography>
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
                    {data?.description}
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
                    by {data?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {t('19 HOURS AGO')}
                </Typography>
            </CardActions>
        </Card>
    );
}
