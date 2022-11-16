import { FunctionComponent, useState } from "react";
import { BsFillCaretDownFill, BsPerson, BsFillPersonFill, BsBoxArrowRight } from "react-icons/bs";
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useNavigate} from 'react-router-dom';

interface AccountProps {

}

const Account: FunctionComponent<AccountProps> = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    function handleLogout () {
        localStorage.removeItem('username');
        localStorage.removeItem('groupID');
        navigate('/login')
    }
    return (
        <div className='position-relative'>
            <div className="d-flex align-items-center gap-2 pointer" onClick={() => setShow(!show)}>
                <div style={{ backgroundImage: 'linear-gradient(180deg, #009FFD 10%, #2A2A72 100%)', height: '40px', width: '40px', lineHeight: ' 35px' }} className='rounded-circle text-center'>
                    <BsPerson className="text-white fs-4" />
                </div>
                <BsFillCaretDownFill style={{ color: 'gray' }} />
            </div>
            <div style={{ position: 'absolute', right: '0', opacity: `${show ? '1' : '0'}`, marginTop: `${show ? '10px' : '-5px'}`, transition: 'all 0.5s'}} className = 'shadow'>
                <List
                    sx={{ width: '100%', minWidth: 250, bgcolor: 'background.paper' }}
                    component="nav"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Xin chào, {localStorage.getItem('username')}
                        </ListSubheader>
                    }
                    style = {{zIndex: `${show ? 'auto' : '0'}`}}>
                    <ListItemButton disabled = {show ? false : true}>
                        <ListItemIcon>
                            <BsFillPersonFill size={30} />
                        </ListItemIcon>
                        <ListItemText primary="Hồ sơ" />
                    </ListItemButton>
                    <ListItemButton onClick={handleLogout} disabled = {show ? false : true}>
                        <ListItemIcon>
                            <BsBoxArrowRight size={30} className = 'ms-1'/>
                        </ListItemIcon>
                        <ListItemText primary="Đăng xuất" />
                    </ListItemButton>
                </List>
            </div>
        </div>
    );
}

export default Account;