import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Index = () => {
    return (
        <div>
            <Head>
                <title>Reactjs with redux-saga</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="../static/favicon.ico" />
            </Head>
            <div className="wrap-error">
                <div className="logo">
                    <h1>404</h1>
                    <p>Error occurred! - File not Found</p>
                    <div className="sub">
                        <Link href="/">
                            <a>Back</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;