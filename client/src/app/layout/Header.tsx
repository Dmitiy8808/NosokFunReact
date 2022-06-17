import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks = [
    {title: 'Все', path: '/catalog'},
    {title: 'Короткие', path: '/short'},
    {title: 'Наборы', path: '/sets'}
]

const rightLinks = [
    {title: 'Логин', path: '/login'},
    {title: 'Регистрация', path: '/register'}
]

const navStyles = {
    textDecoration: 'none',
    color: 'inherit', 
    typography: 'h6',
    '&:hover': {
        color: 'grey.500' // Цвет ссылки при наведении
    },
    '&.active': {
        color: 'text.secondary'
    }
}

export default function Header() {
    return (
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' component={NavLink} to={'/'} sx={navStyles}>
                    NosokFun
                    </Typography>
                </Box>
                
                <List sx={{display: 'flex'}}>
                    {midLinks.map(({title, path}) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                            
                        >
                            {title}
                        </ListItem>
                    ))}
                </List>
                <Box display='flex' alignItems='center'>
                    <IconButton size='large' sx={{color: 'inherit'}}>
                    <Badge badgeContent={4} color='secondary'>
                        <ShoppingCart />
                    </Badge>
                    </IconButton>
                    <List sx={{display: 'flex'}}>
                        {rightLinks.map(({title, path}) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                
            </Toolbar>
        </AppBar>
    )
}