import '../../App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addCoin } from '../../api/Coin';

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
            const t= await fileUploadHandler(files[i]);
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

    return (
        <>
            <Form>
                < img style={{ height: "200px", width: "200px" }} src={image[0]} />
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Coin Image</Form.Label>
                    <Form.Control type="file" onChange={fileSelectedHandler} multiple />
                </Form.Group>

                <Form.Group className="mb-3" controlIc="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>description</Form.Label>
                    <Form.Control type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={(e) => {
                    e.preventDefault();
                    onSubmitHandler();
                }}>
                    Submit
                </Button>
            </Form>
        </>
    )
}


export default AddCoin;