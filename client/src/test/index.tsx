import React from 'react';

interface ChildrenProps {
    title: string;
    phone: number;
}

interface IProps {
    Children: (props: ChildrenProps) => JSX.Element;
}

const Component = (props: IProps) => {
    const {Children} = props;
    return (
        <Children title="MyNewTitle" phone={88005553535} />
    )
}

const Wrapper = () => {
    return (
        <>
            <Component 
                Children={(props) => <CustomChildren custom="aka" {...props} />} 
            />
        </>
    );
}

const CustomChildren = (props: ChildrenProps & {custom: string}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <h1>{props.title}</h1>
            <p>{props.phone}</p>
        </div>
    );
}

const initialState: IState = {
    orderid: 1,
    name: 'Dima'
}

interface IState {
    orderid: number,
    name: string;
}

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;

// type InferActionsTypes<T extends {[k: string]: (...arg: any[]) => any}> = ReturnType<PropertiesTypes<T>>;

type InferActionsTypes<T> = T extends {[k: string]: (...arg: any[]) => infer U} ? U : never;

const Types = {
    GET_ORDER: 'GET_ORDER',
    DELETE_USER: 'DELETE_USER',
} as const

const actionCreators = {
    get: (orderid: number) => ({type: Types.GET_ORDER, orderid}),
    delete: (name: string) => ({type: Types.DELETE_USER, name}),
}


const reducer = (state = initialState, actions: InferActionsTypes<typeof actionCreators>): IState => {
    switch (actions.type) {
        case "GET_ORDER":
            return {
                ...state,
                orderid: actions.orderid,
            }
        case "DELETE_USER": 
            return {
                ...state,
                name: actions.name,
            }
        default:
            return state;
    }
}


export default Wrapper;
