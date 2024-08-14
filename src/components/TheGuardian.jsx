import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, CircularProgress, Typography } from '@mui/material';
import NewsCard from './NewsCard';
import NoData from './NoData.jsx';
import ShowError from "./Error.jsx";

const GuardianNewsApi = ({ searchQuery, selectedCategory, selectedAuthor, selectedDate }) => {
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const params = {
                    'api-key': 'b6416ea1-9fe9-4340-b53b-9dd43f377349',
                    'show-fields': 'thumbnail,headline,short-summary,byline,bodyText',
                    q: debouncedQuery,
                    section: selectedCategory ? selectedCategory.toLowerCase() : 'world',
                };

                if (selectedDate) {
                    const formattedDate = selectedDate.toISOString().split('T')[0];
                    params['from-date'] = formattedDate;
                    params['to-date'] = formattedDate;
                }

                const response = await axios.get('https://content.guardianapis.com/search', { params });

                let filteredArticles = response.data.response.results.slice(0, 9);

                if (selectedAuthor) {
                    filteredArticles = filteredArticles.filter(article =>
                        article.fields.byline && article.fields.byline.toLowerCase().includes(selectedAuthor.toLowerCase())
                    );
                }

                setArticles(filteredArticles);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchArticles().then();
    }, [debouncedQuery, selectedCategory, selectedAuthor, selectedDate]);

    if (error) {
        return <ShowError error={error}/>
    }

    return (
        <Container sx={{ marginTop: '3rem' }}>
            <Typography sx={{ textAlign: 'left', marginBottom: '2rem' }} variant="h4" gutterBottom>
                Source: The Guardian News
            </Typography>
            {loading ? <CircularProgress /> : (articles.length === 0) ? <NoData /> : <Grid container spacing={3}>
                {articles.map((article, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <NewsCard
                            title={article.fields.headline}
                            image={article.fields.thumbnail}
                            author={article.fields.byline}
                            date={article.webPublicationDate ? new Date(article.webPublicationDate).toLocaleDateString() : 'Unknown date'}
                            content={article.fields.bodyText}
                            url={article.webUrl}
                        />
                    </Grid>
                ))}
            </Grid>}
        </Container>
    );
};

export default GuardianNewsApi;
