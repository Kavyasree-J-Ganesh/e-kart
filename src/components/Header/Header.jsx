import React from "react"
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import AddIcon from '@mui/icons-material/Add';
import "./Header.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { useState } from "react";
import AddProduct from "../AddProduct/AddProduct";
import { toaster } from "../../utils/toast";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "10px",
    backgroundColor: "#f3f3f3",
    '&:hover': {
        backgroundColor: "#ffffff"
    },
    marginLeft: 0,
    width: '100%',
    height: "2.5rem",
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    display: 'flex',
    alignItems: 'center',
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
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));



const Header = ({ search, setSearch }) => {
    const navigate = useNavigate()
    const {auth, cart} = useSelector(state => state)
    const dispatch = useDispatch();

    const [isAddProduct, setIsAddProduct] = useState(false)

    const navigateToHome = () => {
        if (auth.isLogin) {
            navigate("/home")
        }
    }

    const isAuthenticationRequired = () => {
        if (!auth.isLogin) {
            toaster("info", "login/signup to continue")
            dispatch({ type: "SET_LOGIN_REQUIRED" })
            return true
        }

        return false
    }

    const logout = () => {
        navigate("/")
        localStorage.removeItem("auth")
        localStorage.removeItem("isAdmin")
        dispatch({ type: "LOGOUT" })
        dispatch({type: "CLEAR_CART"})
    }

    const navigateToCart = () => {
        if (isAuthenticationRequired()) {
            return true
        }
        navigate("/cart")
    }

    const wishlist = () => {
        if (isAuthenticationRequired()) {
            return true
        }
        navigate("/wishlist")
    }

    const user = () => {
        if (isAuthenticationRequired()) {
            return true
        }
        navigate("/user")
    }

    const handleSubmit = (e) => {
        setSearch(e.target.value)
    }

    return (

        <div className="header">
            <Modal open={isAddProduct} close={() => setIsAddProduct(prev => !prev)} >
                <AddProduct isNew={true} close={() => setIsAddProduct(prev => !prev)} />
            </Modal>
            <h3 style={{ cursor: "pointer" }} onClick={navigateToHome}>E-KART</h3>
            <div className="header_search" onSubmit={handleSubmit}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon color="action" />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search', value: search, onChange: handleSubmit }}
                        // value={search}
                        // onChange={handleSubmit}
                    />
                </Search>
            </div>

            <div className="header_actions">
                {!auth.isLogin && <div className="header_login" onClick={() => isAuthenticationRequired()}>
                    Login
                </div>}
                {!auth.isAdmin && <div className="header_icons" onClick={wishlist}>
                    <FavoriteBorderOutlinedIcon title="add to wishlist" sx={{ fontSize: 25 }} />
                </div>}
                {!auth.isAdmin && <div className="header_icons" onClick={navigateToCart}>
                    <ShoppingBagOutlinedIcon color="white" sx={{ fontSize: 25 }} />
                    <span className="cart_quantity">{cart?.product?.length ? cart?.product?.length : "" }</span>
                </div>}

                {auth.isAdmin && <div className="header_icons" onClick={() => setIsAddProduct(prev => !prev)}>
                    Add Product<AddIcon sx={{ fontSize: 25 }} />
                </div>}

                {auth.isLogin && <div className="header_icons" onClick={logout}>
                    <PowerSettingsNewOutlinedIcon sx={{ fontSize: 25 }} />
                </div>}
            </div>

        </div>
    )
}



export default Header
