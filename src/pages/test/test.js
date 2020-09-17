import React, {useContext, useEffect, useState} from 'react';
import styled from "@material-ui/core/styles/styled";
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
import {GlobalContext} from "../../Context/Context";
import {ResultSearch} from "../../components/ResultSearch";
import {FormControl, MenuItem, Select, TextField, InputLabel, Button} from "@material-ui/core";
import axios from "axios";

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

const Test = () => {
    const {resultSearch, apiSearch, setResultSearch} = useContext(GlobalContext)

    const [searchValue, setSearchValue] = useState('');
    const [provincesValue, setProvincesValue] = useState('')
    const [search, setSearch] = useState(null)
    const [list, setList] = useState([])


    useEffect(() => {
        if (search) {
            const fetch = async () => {
                const res = await apiSearch(search.value1, search.value2, search.value3 );
                setResultSearch(res);
            }
            fetch();
        }

        return () => {
            axios.Cancel
        }

    }, [search])

    function onSubmit() {
        if (searchValue || provincesValue) {
            setSearch({value1: provincesValue, value2: searchValue, value3: list});
            setSearchValue('')
        }
    }

    return (
        <Root scheme={scheme}>
            <Header color={'secondary'} elevation={4}>
                <Container maxWidth={'md'}>
                    <Toolbar disableGutters>
                        <Typography variant={'h6'}><b>My App</b></Typography>
                    </Toolbar>
                </Container>
            </Header>
            <Content>
                <InsetContainer
                    maxWidth={'lg'}
                    leftSidebar={
                        <InsetSidebar sidebarId={'insetSidebar'}>
                            <Box mt={2} pr={1}>
                                <TextField
                                    color={"secondary"}
                                    label={'จังหวัด'}
                                    onChange={e => setProvincesValue(e.target.value)}
                                />
                            </Box>
                            <Box mt={2} pr={1}>
                                <TextField
                                    color={"secondary"}
                                    label={'search it'}
                                    value={searchValue}
                                    onChange={e => setSearchValue(e.target.value)}
                                />
                            </Box>
                            <Box mt={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-controlled-open-select-label">ประเภท</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        value={list}
                                        onChange={e => setList(e.target.value)}
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
                            <Box mt={5}>
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
                        {resultSearch ? resultSearch.slice(0, 30).map((place, index) => {
                            return (
                                <ResultSearch place={place} key={index}/>
                            )
                        }) : null}
                    </Box>
                </InsetContainer>
            </Content>
            <Container>
                <Footer>
                </Footer>
            </Container>
        </Root>
    );
};

export default Test;
