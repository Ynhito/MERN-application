import React, { useState, useEffect } from 'react';
import { useHttp } from '../../../../hooks/http.hook';
import { withRouter } from 'react-router-dom';

const GiftView = (props: any) => {

    const { loading, error, request, clearError } = useHttp();

    const [data, setData] = useState<any | null>(null);
    const [image, setImage] = useState<any>(null);

    async function onGetData() {
        try {
            const data = await request(`/api/gifts/get/${props.match.params.id}`, 'GET')
            setData(data)
        } catch (e) { }
    }


    useEffect(() => {
        onGetData()
    }, [])

    const handleCapture = (e: any) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = (e) => {
            if (e.target) {
                setImage(e.target.result)
            }
        };
    };

    console.log(image)

    return (
        <div>
            {JSON.stringify(data)}
            <input
                accept="image/*"
                id="icon-button-photo"
                onChange={handleCapture}
                type="file"
            />
        </div>
    );
}

export default withRouter(GiftView);
