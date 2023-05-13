import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import axios from 'axios';
import api from '../../utils/api';
import { AuthContext } from '../../context/authContext';
import { LinearWithValueLabel, PlaceHolder } from './Components';
import { Alerts } from '../../utils/alerts';

const Quill = styled(ReactQuill)`
    background-color: #ffffff;

    .ql-container {
        height: 500px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        font-size: 16px;
        padding: 10px;
        line-height: 2;
        overflow-y: auto;
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
    const [progress, setProgress] = React.useState(0);
    const quillRef = React.useRef(null);
    const { jwtToken, logout } = React.useContext(AuthContext);

    const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setProgress(percent);
    };

    const uploadImage = async (file) => {
        try {
            const res = await api.getPresignUrl(jwtToken);
            const url = res.data.data;
            await axios.put(url, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress,
            });
            const imageUrl = url.split('?')[0];
            return imageUrl;
        } catch (e) {
            if (e.response.status === 401) {
                const result = await Alerts.unauthorized();
                if (result.isConfirmed) {
                    logout();
                }
            } else {
                Alerts.serverError();
            }
        }
    };

    const imageHandler = (quill) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/png, image/jpeg');
        input.click();
        input.onchange = async () => {
            const file = input.files[0];
            if (!file || (file.type !== 'image/png' && file.type !== 'image/jpeg')) {
                return;
            }
            if (file.size > 2097152) {
                Alerts.imageTooBig();
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
        <>
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
            {progress !== 0 && progress < 100 ? (
                <LinearWithValueLabel variant="determinate" progress={progress} />
            ) : (
                <PlaceHolder></PlaceHolder>
            )}
        </>
    );
};

export default TextEditor;
