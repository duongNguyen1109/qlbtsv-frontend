import { FunctionComponent } from "react";
import { BainopType } from "./Exercise";
import fileIcon from '../../../image/file-icon1.png';
import style from "./Exercise.module.css";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { FiX } from "react-icons/fi";

interface BainopItemProps {
    data: BainopType
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const BainopItem: FunctionComponent<BainopItemProps> = ({ data }) => {
    return (
        // <div className={`bg-white rounded p-2 border pointer ${style.bainopItem}`}>
        //     {
        //         data.LOAITL.split('/')[0] === 'image' ?
        //             <img src={"https://drive.google.com/uc?export=view&id=" + data.IDFILE}
        //                 className='w-100'
        //                 style={{ objectFit: 'contain', aspectRatio: '1/1' }} alt='fileImg'></img> :
        //             <img src={fileIcon} className='w-100'
        //                 style={{ objectFit: 'contain', aspectRatio: '1/1' }} alt='fileIcon' />
        //     }

        //     <div>
        //         <a href={'https://drive.google.com/uc?id=' + data.IDFILE} target='_blank' style={{textDecoration: 'none'}}>
        //             <h5 className="w-100 text-truncate">{data.TENFILE}</h5>
        //         </a>
        //         <span><b>Người nộp</b>: {data.MASV}</span><br></br>
        //         <span><b>Thời gian: </b>{new Date(data.THOIGIANNOP).toLocaleString('en-GB', { timeZone: 'UTC' })}</span>
        //     </div>
        // </div>
        <Card>
            <CardHeader
                avatar={
                    <Avatar >B</Avatar>
                }
                action={
                    <IconButton>
                        <FiX />
                    </IconButton>
                }
                title={data.MASV}
                subheader={new Date(data.THOIGIANNOP).toLocaleString('en-GB', { timeZone: 'UTC' })}
            >
            </CardHeader>
            <CardMedia
                component="img"
                style={{ aspectRatio: '1/1', objectFit: 'contain' }}
                image={data.LOAITL.split('/')[0] === 'image' ? "https://drive.google.com/uc?export=view&id=" + data.IDFILE : fileIcon}
                alt="Hinh anh tai lieu"
            />
            <CardContent>
                <h5 className="w-100 text-truncate">{data.TENFILE}</h5>
                <Typography variant="body2">
                    <Typography variant="subtitle2" component='span' style={{ fontWeight: 'bold' }}>
                        Loại tài liệu:
                    </Typography>
                    {data.LOAITL}
                </Typography>
                <Typography variant="body2">
                    <Typography variant="subtitle2" component='span' style={{ fontWeight: 'bold' }}>
                        Topic:
                    </Typography>
                    {data.IDTOPIC}
                </Typography>
                <Typography variant="body2">
                    <Typography variant="subtitle2" component='span' style={{ fontWeight: 'bold' }}>
                        Ghi chú:
                    </Typography>
                    {data.GHICHU}
                </Typography>
            </CardContent>
            <CardActions>
                <Button>Xem</Button>
            </CardActions>
        </Card>
    );
}

export default BainopItem;