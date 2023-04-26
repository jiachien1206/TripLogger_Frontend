import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import axios from 'axios';
import api from '../../utils/api';
import { AuthContext } from '../../context/authContext';

const Quill = styled(ReactQuill)`
    /* margin: 20px; */
    background-color: #ffffff;

    .ql-container {
        min-height: 200px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        font-size: 16px;
        padding: 10px;
        line-height: 2;
    }
    .ql-toolbar {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 10px;
        display: flex;
    }
    .ql-snow .ql-picker.ql-header {
        width: 160px;
        font-size: 16px;
    }
    .ql-snow.ql-toolbar button {
        height: 30px;
        width: 37px;
    }
    .ql-picker-label {
        min-width: 34px;
        height: 30px;
    }
    .ql-editor.ql-blank::before {
        color: #515151;
        opacity: 0.4;
        padding-left: 14px;
    }
`;

const TextEditor = ({ originContent, editContent }) => {
    const [content, setContent] = React.useState('<p></p>');
    const [initialContent, setInitialContent] = React.useState();
    const quillRef = React.useRef(null);
    const { jwtToken } = React.useContext(AuthContext);

    const uploadImage = async (file) => {
        try {
            const res = await api.getPresignUrl(jwtToken);
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
            if (file.size > 2097152) {
                alert('檔案須小於2MB');
            } else {
                const imageUrl = await uploadImage(file);
                if (imageUrl) {
                    const range = quill.getSelection();
                    quill.insertEmbed(range.index, 'image', imageUrl);
                }
            }
        };
    };

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
            placeholder="寫點東西吧！"
            onChange={(value) => {
                setContent(value);
                editContent(value);
            }}
            ref={quillRef}
        />
    );
};

export default TextEditor;
