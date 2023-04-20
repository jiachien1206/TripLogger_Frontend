import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import axios from 'axios';
import api from '../../utils/api';

const Quill = styled(ReactQuill)`
    margin: 20px;
    background-color: #ffffff;
    .ql-container {
        min-height: 400px;
    }
`;

const uploadImage = async (file) => {
    try {
        const res = await api.getPresignUrl();
        const url = res.data.data;
        await axios.put(url, file, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const imageUrl = url.split('?')[0];
        return imageUrl;
    } catch (error) {
        console.log(error);
    }
};

const imageHandler = (quill) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
        const file = input.files[0];
        if (file.size > 1048576) {
            alert('File is too big!');
        } else {
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
                const range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', imageUrl);
            }
        }
    };
};

const TextEditor = ({ originContent, editContent }) => {
    const [content, setContent] = React.useState();
    const [initialContent, setInitialContent] = React.useState();
    const quillRef = React.useRef(null);

    React.useEffect(() => {
        if (originContent) {
            setContent(originContent);
            setInitialContent(originContent);
        }
    }, [originContent]);

    React.useEffect(() => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            quill.getModule('toolbar').addHandler('image', () => {
                imageHandler(quill);
            });
        }
    }, [quillRef]);

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                ['blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                ['clean'],
            ],
        },
    };
    return (
        <Quill
            modules={modules}
            theme="snow"
            value={content}
            onChange={(value) => {
                setContent(value);
                editContent(value);
            }}
            ref={quillRef}
        />
    );
};

export default TextEditor;
