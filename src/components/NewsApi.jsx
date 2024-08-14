import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, CircularProgress, Typography } from '@mui/material';
import NewsCard from './NewsCard';
import NoData from './NoData.jsx';
import ShowError from "./Error.jsx";

const NewsApi = ({ searchQuery, selectedCategory, selectedAuthor, selectedDate }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [articles, setArticles] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

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
                    apiKey: '319942280c2d4fa49a7f39d7ac0e1699',
                    q: debouncedQuery === '' ? 'world' : debouncedQuery,
                    ...(selectedDate && { from: selectedDate.toISOString().split('T')[0], to: selectedDate.toISOString().split('T')[0] })
                };

                const endpoint = selectedCategory ? 'https://newsapi.org/v2/top-headlines' : 'https://newsapi.org/v2/everything';

                if (selectedCategory) {
                    params.category = selectedCategory.toLowerCase();
                }

                const response = await axios.get(endpoint, { params });

                let filteredArticles = response.data.articles.slice(0, 9);

                if (selectedAuthor) {
                    filteredArticles = filteredArticles.filter(article =>
                        article.author && article.author.toLowerCase().includes(selectedAuthor.toLowerCase())
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
                Source: NewsApi
            </Typography>
            {loading ? <CircularProgress /> : articles.length === 0 ? <NoData /> : <Grid container spacing={3}>
                {articles.map((article, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <NewsCard
                            title={article.title}
                            image={article.urlToImage}
                            author={article.author}
                            date={new Date(article.publishedAt).toLocaleDateString()}
                            content={article.content}
                            url={article.url}
                        />
                    </Grid>
                ))}
            </Grid>}
        </Container>
    );
};

export default NewsApi;
