import React, { useState } from 'react';
import {
    AppBar,
    Button,
    Container,
    Drawer,
    FormControl,
    Grid,
    List,
    ListItem,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import NewsApiPage from "./NewsApi";
import TheGuardian from "./TheGuardian";
import NewYorkTimes from "./NewYorkTimes";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FilterSelect from "./FilterSelect.jsx";

const categories = ['Technology', 'Health', 'Sports', 'Business'];
const sources = ['News Api', 'The Guardian', 'NY Times'];

const NewsFeedPage = () => {
    const savedSettings = JSON.parse(localStorage.getItem('newsFeedSettings')) || {};

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(savedSettings.selectedCategory || '');
    const [selectedSource, setSelectedSource] = useState(savedSettings.selectedSource || '');
    const [selectedAuthor, setSelectedAuthor] = useState(savedSettings.selectedAuthor || '');
    const [selectedDate, setSelectedDate] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleInputChange = (setter) => (event) => setter(event.target.value);
    const toggleDrawer = (open) => () => setDrawerOpen(open);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setSelectedSource('');
        setSelectedAuthor('');
        setSelectedDate(null);
    };

    const saveSettings = () => {
        const settings = {
            searchQuery,
            selectedCategory,
            selectedSource,
            selectedAuthor,
            selectedDate: selectedDate ? selectedDate.toISOString() : null,
        };
        localStorage.setItem('newsFeedSettings', JSON.stringify(settings));
        setDrawerOpen(false);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Button sx={{ marginInlineStart: 'auto' }} color="inherit" onClick={toggleDrawer(true)}>
                        Personalize Dashboard
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List sx={{ width: 350, padding: '1rem' }}>
                    <Typography sx={{ margin: '1rem' }} variant="h6" gutterBottom>
                        Customize Feed
                    </Typography>
                    <ListItem>
                        <FilterSelect
                            label="Category"
                            value={selectedCategory}
                            onChange={handleInputChange(setSelectedCategory)}
                            options={categories}
                        />
                    </ListItem>
                    <ListItem>
                        <FilterSelect
                            label="Source"
                            value={selectedSource}
                            onChange={handleInputChange(setSelectedSource)}
                            options={sources}
                            allOption
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            label="Author"
                            variant="outlined"
                            fullWidth
                            value={selectedAuthor}
                            onChange={handleInputChange(setSelectedAuthor)}
                        />
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" color="secondary" fullWidth onClick={clearFilters}>
                            Clear Filters
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" color="primary" fullWidth onClick={saveSettings}>
                            Save Settings
                        </Button>
                    </ListItem>
                </List>
            </Drawer>

            <Container>
                <Typography sx={{ margin: '3rem' }} variant="h4" gutterBottom>
                    News Aggregator
                </Typography>
                <Grid container spacing={2} marginBottom={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={handleInputChange(setSearchQuery)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FilterSelect
                            label="Category"
                            value={selectedCategory}
                            onChange={handleInputChange(setSelectedCategory)}
                            options={categories}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FilterSelect
                            label="Source"
                            value={selectedSource}
                            onChange={handleInputChange(setSelectedSource)}
                            options={sources}
                            allOption
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <DatePicker
                                selected={selectedDate}
                                onChange={setSelectedDate}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select Date"
                                className="date-picker"
                                isClearable
                                maxDate={new Date()}
                                customInput={<TextField fullWidth variant="outlined" label="Date" />}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outline" onClick={clearFilters}>
                            Clear Filters
                        </Button>
                    </Grid>
                </Grid>
            </Container>

            {(!selectedSource || selectedSource === 'The Guardian') && (
                <TheGuardian
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    selectedAuthor={selectedAuthor}
                    selectedDate={selectedDate}
                />
            )}
            {(!selectedSource || selectedSource === 'News Api') && (
                <NewsApiPage
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    selectedAuthor={selectedAuthor}
                    selectedDate={selectedDate}
                />
            )}
            {(!selectedSource || selectedSource === 'NY Times') && (
                <NewYorkTimes
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    selectedAuthor={selectedAuthor}
                    selectedDate={selectedDate}
                />
            )}
        </>
    );
};

export default NewsFeedPage;
