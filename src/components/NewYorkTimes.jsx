import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, CircularProgress, Typography } from '@mui/material';
import NewsCard from './NewsCard';
import NoData from './NoData.jsx';
import ShowError from "./Error.jsx";

const NYTimesNewsApi = ({ searchQuery, selectedCategory, selectedAuthor, selectedDate }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            setLoading(true);
            try {
                const params = {
                    'api-key': 'EX34de8WABtOHngXOuyoFAcH4J3NLmNs',
                    q: debouncedQuery || 'world',
                    fq: selectedCategory ? `section_name:("${selectedCategory.toLowerCase()}")` : '',
                    sort: 'newest',
                    page: 0
                };

                if (selectedDate) {
                    const formattedDate = selectedDate.toISOString().split('T')[0].replace(/-/g, '');
                    params.begin_date = formattedDate;
                    params.end_date = formattedDate;
                }

                const response = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', { params });
                let fetchedArticles = response.data.response.docs;

                if (selectedAuthor) {
                    fetchedArticles = fetchedArticles.filter(article =>
                        article.byline && article.byline.original.toLowerCase().includes(selectedAuthor.toLowerCase())
                    );
                }

                setArticles(fetchedArticles.slice(0, 9));
                setLoading(false);
                setError(null)
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
                Source: The New York Times
            </Typography>
            {loading ? <CircularProgress /> : articles.length === 0 ? <NoData /> : <Grid container spacing={3}>
                {articles.map((article, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <NewsCard
                            title={article.headline.main}
                            image={article.multimedia && article.multimedia.length > 0 ? `https://www.nytimes.com/${article.multimedia[0].url}` : ''}
                            author={article.byline ? article.byline.original : 'Unknown author'}
                            date={new Date(article.pub_date).toLocaleDateString()}
                            content={article.snippet}
                            url={article.web_url}
                        />
                    </Grid>
                ))}
            </Grid>}
        </Container>
    );
};

export default NYTimesNewsApi;
