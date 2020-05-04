import React, { useContext } from 'react';
import classes from './styles.module.scss';
import { Button } from '@material-ui/core';
import { AuthContext } from '../../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Formik } from 'formik';
import createHelpers from './form';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { dd } from './pdfExample';
import { sum_letters } from './number2Text';
import { useHttp } from '../../hooks/http.hook';
import Wrapper from './../../../test/index';
import Observable from './../../../test/observable/Observable'
import createEvent from './../../../test/observable/createEvent';
import useStore from './../../../test/observable/useStore';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const FormValues = {

}

const CreatePage = () => {

    const initialState = {
        name: 'Julia',
        age: 20
    }
    
    const store = new Observable<typeof initialState>(initialState);

    const firstEvent = createEvent();

    console.log(store.on(firstEvent, (state, payload) => ({
        ...state,
        age: 19,
        name: 'Dima'
    })))

    const auth = useContext(AuthContext);
    const logout = () => {
        auth.logout();
    }

    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty(),
    );
    const { loading, error, request, clearError } = useHttp();

    return (
        <div>
            <Formik
                initialValues={createHelpers.defaultValues}
                onSubmit={(values: any) => console.log(values)}
            >
                {({ values, setFieldValue, handleBlur, isValid, handleSubmit }) => {
                    if (convertToRaw(editorState.getCurrentContent()).blocks[0].text.length === 0) {
                        isValid = false;
                    }
                    return (
                        <form onSubmit={handleSubmit} id="FORMA">
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '400px', height: '200px' }}>
                                    <Editor
                                        editorState={editorState}
                                        onEditorStateChange={setEditorState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        wrapperStyle={{
                                            // width: '400px',
                                            height: '200px',
                                        }}
                                        editorStyle={{
                                            border: '2px solid #F5F5F5',

                                        }}
                                        onBlur={() => console.log('qwdqwd')}
                                    />
                                </div>
                                <Button
                                    onClick={() => pdfMake.createPdf(dd).download()}>
                                    Генерировать
                            </Button>
                                <Wrapper />
                                <Button
                                // onClick={getFavorite}
                                >
                                    Получить
                            </Button>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default CreatePage;