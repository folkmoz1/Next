import React, {useContext, useEffect, useState} from 'react';
import styled from "@material-ui/core/styles/styled";
import axios from "axios";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Layout, {
    getContent,
    getFooter,
    getHeader,
    getInsetContainer,
    getInsetSidebar,
    Root,
} from '@mui-treasury/layout';
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Backdrop, Button, Fab, FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery, Card, CardContent, CardActions, Grow, Slide} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search'

import {GlobalContext} from "../../Context/Context";
import {ResultSearch} from "../../components/ResultSearch";

const Header = getHeader(styled);
const InsetContainer = getInsetContainer(styled);
const InsetSidebar = getInsetSidebar(styled);
const Content = getContent(styled);
const Footer = getFooter(styled);

const scheme = Layout();

scheme.configureHeader(builder => {
    builder.registerConfig('xs', {
        position: 'sticky',
    });
});

scheme.configureInsetSidebar(builder => {
    builder
        .create('insetSidebar', {anchor: 'left'})
        .registerFixedConfig('sm', {
            width: 256,
        });
});


const listCategories = [
    'ATTRACTION',
    'RESTAURANT',
    'ACCOMMODATION',
    'SHOP',
    'OTHER'
]

const Index = ({result}) => {
    const matches = useMediaQuery('(min-width: 600px)')

    const {resultSearch, apiSearch, setResultSearch} = useContext(GlobalContext)

    const [searchValue, setSearchValue] = useState('');
    const [provincesValue, setProvincesValue] = useState('')
    const [search, setSearch] = useState(null)

    const [list, setList] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        let active = true
        if (active && search) {
            const fetch = async () => {
                const res = await apiSearch(search.value1, search.value2, search.value3);
                setResultSearch(res);
            }
            fetch();
        }

        return () => {
            active = false
        }

    }, [search])

    function onSubmit() {

        if (searchValue || provincesValue) {
            if (!matches) {
                setOpen(!open)
            }
            setSearch({value1: provincesValue, value2: searchValue, value3: list});
            setSearchValue('')
        }


    }

    function onKeyDown(e) {
        if (e.key === 'Enter')
            onSubmit()
    }

    const toggleDrawer = (state) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(state);
    };


    return (
        <Root scheme={scheme}>
            <Header color={'secondary'} elevation={4}>
                <Container maxWidth={'md'}>
                    <Toolbar disableGutters>
                        <Typography variant={'h4'} ><b>{`Search`}</b></Typography>
                    </Toolbar>
                </Container>
            </Header>
            <Content>
                <InsetContainer
                    maxWidth={'lg'}
                    leftSidebar={
                        <InsetSidebar sidebarId={'insetSidebar'}>
                            <Box mt={2} pr={1}>
                                <Autocomplete
                                    options={result}
                                    getOptionLabel={(option => option)}
                                    fullWidth
                                    onInputChange={(e, newValue) => setProvincesValue(newValue)}
                                    renderInput={(params) => <TextField
                                        {...params}
                                        color={"secondary"}
                                        label={'จังหวัด'}
                                        value={provincesValue}
                                        variant={"outlined"}
                                    />}
                                />
                            </Box>
                            <Box mt={2} pr={1}>
                                <TextField
                                    color={"secondary"}
                                    label={'search it'}
                                    variant={"outlined"}
                                    value={searchValue}
                                    onChange={e => setSearchValue(e.target.value)}
                                    onKeyDown={onKeyDown}
                                />
                            </Box>
                            <Box mt={2} pr={1}>
                                <FormControl fullWidth variant={"outlined"} color={"secondary"}>
                                    <InputLabel id={'categories'}>ประเภท</InputLabel>
                                    <Select
                                        labelId={'categories'}
                                        value={list}
                                        onChange={e => setList(e.target.value)}
                                        label={'ประเภท'}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            listCategories.map(list =>
                                                <MenuItem key={list} value={list}>
                                                    {list}
                                                </MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box mt={5} pr={1}>
                                <Button
                                    type={"button"}
                                    variant={"contained"}
                                    onClick={onSubmit}
                                    fullWidth
                                    color={"secondary"}
                                >
                                    Search
                                </Button>
                            </Box>
                        </InsetSidebar>
                    }
                >
                    <Box display={'flex'} flexWrap={'wrap'}>
                        {resultSearch ? resultSearch.slice(0, 50).map((place, index) => {
                            return (
                                <ResultSearch place={place} key={index}/>
                            )
                        }) : null}
                    </Box>
                </InsetContainer>
            </Content>
            {
                (!matches && open) ?
                    (
                        <Slide direction={"up"} in={open} mountOnEnter unmountOnExit >
                                <Box zIndex={'modal'} position={'fixed'} bottom={'0'} width={'100%'} >
                                    <Card style={{borderRadius:'24px 24px 0 0'}}>
                                        <CardContent>
                                            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                                <Box mt={2} width={'300px'}>
                                                    <Autocomplete
                                                        options={result}
                                                        getOptionLabel={(option => option)}
                                                        fullWidth
                                                        onInputChange={(e, newValue) => setProvincesValue(newValue)}
                                                        renderInput={(params) => <TextField
                                                            {...params}
                                                            color={"secondary"}
                                                            label={'จังหวัด'}
                                                            value={provincesValue}
                                                            variant={"outlined"}
                                                        />}
                                                    />
                                                </Box>
                                                <Box mt={2} width={'300px'}>
                                                    <TextField
                                                        color={"secondary"}
                                                        label={'search it'}
                                                        variant={"outlined"}
                                                        value={searchValue}
                                                        onChange={e => setSearchValue(e.target.value)}
                                                        onKeyDown={onKeyDown}
                                                        fullWidth
                                                    />
                                                </Box>
                                                <Box mt={2} width={'300px'}>
                                                    <FormControl fullWidth variant={"outlined"} color={"secondary"}>
                                                        <InputLabel id={'categories'}>ประเภท</InputLabel>
                                                        <Select
                                                            labelId={'categories'}
                                                            value={list}
                                                            onChange={e => setList(e.target.value)}
                                                            label={'ประเภท'}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {
                                                                listCategories.map(list =>
                                                                    <MenuItem key={list} value={list}>
                                                                        {list}
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                        <CardActions>
                                            <Box my={2} mx={'auto'} >
                                                <Button
                                                    type={"button"}
                                                    variant={"contained"}
                                                    onClick={onSubmit}
                                                    fullWidth
                                                    color={"secondary"}
                                                >
                                                    Search
                                                </Button>
                                            </Box>
                                        </CardActions>
                                    </Card>
                                </Box>
                        </Slide>
                    )
                    : null
            }
            {
                !matches ?
                    (
                        <Grow in={!open}>
                            <Box zIndex={'modal'} style={{transition:'.3s ease-in'}} position={'fixed'} right={'5%'} bottom={'5%'}>
                                <Fab color="secondary" aria-label="add" onClick={() => setOpen(!open)}>
                                    <SearchIcon/>
                                </Fab>
                            </Box>
                        </Grow>
                    )
                    : null
            }
            { !matches && open && <Backdrop open={open} onClick={toggleDrawer(false)} style={{zIndex: '1200',userSelect:'none'}}/> }
            <Container>
                <Footer>
                </Footer>
            </Container>
        </Root>
    );
};

export const getStaticProps = async () => {
    let result;

    try {
        const res = await axios.get(`https://opend.data.go.th/govspending/bbgfmisprovince`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            params: {
                'api-key': 'IQGH0T9PRxHOv1UBVXUQhq3iVOmL5x15',
            }
        })

        if (!res) throw new Error('Cannot fetch data.')

        result = res.data.result.map(item => `${item.prov_name}`)
    } catch (err) {
        console.log(err)
    }


    return {
        props: {
            result
        }
    }

}

export default Index;
