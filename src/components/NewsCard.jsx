import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const NewsCard = ({ title, image, author, date, content, url }) => {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {image && (
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={title}
                />
            )}
            <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontSize: { xs: '1.35rem', md: '1rem' } }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ margin: '1.65rem', fontSize: { xs: '1rem', md: '0.875rem' } }}
                    color="textSecondary"
                >
                    By {author || 'Unknown'} on {date || 'Unknown date'}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginBottom: '2rem',
                        whiteSpace: 'normal',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 5,
                        flexGrow: 1,
                        fontSize: { xs: '1.25rem', md: '0.875rem' }
                    }}
                >
                    {content}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 'auto' }}
                    onClick={() => window.open(url, '_blank')}
                >
                    Read More
                </Button>
            </CardContent>
        </Card>
    );
};

export default NewsCard;
