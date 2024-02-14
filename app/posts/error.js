'use client';

import { useEffect } from "react";

const Error = ({ error, reset }) => {

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>something went wrong!</h2>
            <button onClick={ () => reset()
            }
            >
                Try again
            </button>
        </div>
    );
}
export default Error;