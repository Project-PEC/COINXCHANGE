import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addCoin } from '../../api/Coin';
import Carousel from 'react-bootstrap/Carousel'
import './AddCoin.css';

function AddCoin(props) {

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const fileUploadHandler = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "mhabs7f9");

        return await axios.post("https://api.cloudinary.com/v1_1/dx0rf8u0t/image/upload", formData).then(async (res) => {
            // setImage([
            //     ...image,
            //     res.data.secure_url]);

            return res.data.secure_url;
        })
    }

    // console.log(image);

    const fileSelectedHandler = async (e) => {
        const files = e.target.files;
        const images = [];
        for (let i = 0; i < files.length; i++) {
            const t = await fileUploadHandler(files[i]);
            images.push(t);
        }
        setImage(images);

    }

    const onSubmitHandler = async () => {
        console.log(image);
        const data = {};
        data["publisher"] = props.username;
        data["title"] = title;
        data["image"] = image;
        data["description"] = description;

        const t = await addCoin(props.username, data);
        console.log(t);

    }

    const carous = [];

    for (let i = 0; i < image.length; i++) {
        carous.push(
            <Carousel.Item>
                <img
                    className="d-block w-100 img"
                    src={image[i]}
                    alt="First slide"
                />
            </Carousel.Item>);
    }

    const dp=[];
    if (image.length == 1)
        dp.push(< img className="img" src={image[0]} />);
    else
        dp.push(image[0] ? <Carousel fade className="size">{carous}</Carousel> : <img className="img" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDQ0NDQ0PDQ0NDw0NDg8ODRANDQ0NFREWFhURFRUYHSggGBolGxgTITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMkA+wMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAAAQUGBAMCB//EADYQAQACAAIFCAkEAwEAAAAAAAABAgMRBAUSITETFUFRUpLB0SIyM1NhcYKRokJyobGBsuFi/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP6EigCZKgKioCgAAAgqSAoAAAIoAAAAAigIqKAAAIoCKgCgAioAQoAAAACAAoAIoAAAAAgoAkqkgCoAoAAAIqAoACZKgKioCgACSoIBIKAACAqKgKIoCKgKCSBAQSCiKAAAioCgAIqAqKgKAAACEkkgoPvgaFiYnq0nLtW9GoPgtazM5REzPVEZy2NH1NWN+JabfCvox5tDDwqYUejFaR08I+8gxdH1TiX9bLDj477fZpYGq8KmUzG3PXbfH24PzpGtcOm6ueJP/n1fu8uja1vfFrFoitLTs5Rv3zwnMHy11gbGJFojKLx0dqOPgz3Ra1wOUwbZetX04/xxj7ZudAAASVSQICAFAAAARUBQAEVAVFQFBAUerR9XYuJv2dmOu27+OLT0fU+HXfeZvPdr9gYmHh2vOVazafhGbQ0fU17b72ikdUelbybNa1plWIisdERlD9g8uj6vwsPhXOe1b0pfrSNNw8P1rxn1Rvt9nz0jRMTEzice1YnorWIj78Xl5jj3s92AfPSNczO7Drs/G2+fszsbGviTne02+fD7cGrzJHvZ7sHMce9nuwDHTP79HzbPMce9nuwcxx72e7ANDQ8blcOt+uN/z4S53TMHk8S9OiJzr+2d8N/QdE5Gs125tEznGcZZbnz07V8Y1q22prMRluiJzgHPDY5kj3s92EtqWIiZ5Wd0TPqwDISSFBIJABQAAARUBQAAQFRUBX10XG5PEpfoid/y4S+SA67PdnG/p3dLCx9b4lt1IjDjvW8mjqjH28GvXT0J/wAcP4ZOtcHYxrdV/Tj5zx/kH61ZebaRSbTNp9LfM5z6stjWGkzg4cXiItviuUzlxYuqfb0+r/WWlrz2P118Qebnu3u696fI57v7uvenyZTUwNTWtXO99iZ/TFdrL57wOe7e7r3p8l57t7uvenyeLTNEtg2ytlMTviY4S84NXnu3u696fI57t7uvenyZaA1ee7e7r3p8jnu3u696fJlKDTnXdvd170+TYvOdJnrrP9OTng6ufU+nwBykKkAKhACiQoAACKgBkAECoBIAAqA0NS4+zi7E8MSMvqjh4vdrvB2sPbjjhzn9M7p8GHS01mLRxrMTHzh1FLRi4cT+m9f4mAYOqPb0+r/WWlrz2P118Wfq7DmmlVpPGs3j8Z3tDXnsfrr4gxtFtFcTDtO6IvWZ+EZuqchk9WDp+LSNmt93RFoi2X3Boa/vGxSv6traj4VymJ/uGK/WJebzNrTNrTxmX5AbWqdBjYm+JG/EiaxE9FJ8/J4tV6Jyt87R6FMpnqmeirogcppGFOHe1J/TOWfXHRL5urtg0m23NKzaIyzmImcmJrvC2cXa6Lxn/mN0+AM6eDrJ9T6fBykusn1Pp8AclEKQSAAAEKCAAZAAoACKgKioCgANrUWNnS2HPGk5x+2f+/2xXo1djcni1nPKJ9G3yn/uQNbGwMtKwsSOF4tWf3RWfD+k157H66+LQmsTlnHCc4+E5ZPBrz2Mfvr4gwRM2zqrV+WWLiRv40r1fGfiD8aPqjaw5m8zW876xx2Y6p63ivoOJXEjDmu+05VmPVmOvN0wD5aNgRhUileEdPTM9MvqADO13hZ4W100mJ/xO6fBovxj4e3S1Z/VEx94ByduDq59T6fByl4yzieMZxPzh1c+p9PgDlIJIAAgBRFAAARUBQSAVFQFRUBQQFQAdNq7H5TCpbpy2bfujc+GvPY/XXxePUmkRW1qWmIi0bUTM5RtR/z+mxy1O3XvQDla2ymJjjE574zh6+dMbt/hXyb/AC1O3TvQctTt070AwOdMbt/hXyOdMbt/hXyb/LU7dO9By1O3TvQDA50xu3+FfI50xu3+FfJv8tTt070HLU7dO9AMDnTG7f4V8jnTG7f4V8m/y1O3TvQctTt070A5XEtNptaeM5zO7Le6qfU+nwOWp26d6H5xMamzb068J/VHUDloVI4AEBACiKAAAioCgmYKioCoqAoICiKCGQSBl8DKFQDL4GRmAZQZfBUAyMoADL4GSoCpISAEEgKigAAIAKIAoICiAKIAogCoAKIAogCiAKIAogCiKAIAoigCAKgACoCoqAAACoACggAAAAqAAACoAAACggACooICggAEBABAQABIAAASSSAEgBkKCAQAAAEAAAAAAAAAAEAAA//Z" />)


    return (
        <>
            <div className="form-container">
                <Form className="form-wrapper shadow">
                    <div className="align">
                        {dp}
                    </div>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label><strong>Coin Image</strong></Form.Label>
                        <Form.Control type="file" onChange={fileSelectedHandler} multiple />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label><strong>Title</strong></Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label><strong>Description</strong></Form.Label>
                        <Form.Control type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="success" size="sm" type="submit" onClick={(e) => {
                            e.preventDefault();
                            onSubmitHandler();
                        }}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}


export default AddCoin;