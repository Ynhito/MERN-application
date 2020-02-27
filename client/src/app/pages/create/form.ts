import {EditorState} from "draft-js";

export interface FormValues {
    editorState: EditorState;
    name: string;
}

export const defaultValues: FormValues = {
    editorState: EditorState.createEmpty(),
    name: '',
}

const createHelpers = {
    defaultValues
}

export default createHelpers;