import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FunctionComponent, useState } from 'react';
import { AppBar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useLocation } from 'react-router-dom';


type SearchBarProps = {}

export const SearchBar: FunctionComponent<SearchBarProps> = () => {

    const nav = useLocation()
    const currentHeadLine = () => {
        switch (nav.pathname) {
            case '/':
                return "Home"
            case '/catalogue':
                return 'Catalogue'
            case '/order':
                return 'Order'
            default:
                return 'Product'
                break;
        }
    }
    console.log(nav);


    const cart = useAppSelector(state => state.persistedReducer.cartSlice)

    const data = useAppSelector(state => state.persistedReducer.dataSlice.data)

    const dispatcher = useAppDispatch()

    const [searchTitle, setSearchTitle] = useState<string>('')

    const searchState = useAppSelector(state => state.persistedReducer.dataSlice.search)
    console.log(searchTitle);

    const handleSearchInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTitle(event.target.value)


    }


    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            width: '100%',

        },
    }));
    const totalPrice = () => {
        let sum = 0;
        cart.forEach(cartEntry => {
            let dataElement = data.find(el => el.id === cartEntry.id)
            if (dataElement && cartEntry.quantity) {
                sum += dataElement.price * cartEntry.quantity
            }
        })
        if (sum === 0) { return 'Empty' }
        return sum + '$';
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        {currentHeadLine()}
                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: 'flex', mr: 5 }}
                    >
                        <ShoppingCartIcon color='action' fontSize='large' sx={{ mr: 2 }} /> {totalPrice()}
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearchInputChange}
                            value={searchTitle}
                            autoFocus={true}
                        />

                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    )
}