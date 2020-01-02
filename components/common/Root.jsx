import React, { Component } from 'react';
import Head from 'next/head';

class Root extends Component {
	render() {
		return (
			<div>
				<Head>
					<title>Reactjs with redux-saga</title>
					<meta charSet="utf-8" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<link rel="icon" href="../static/favicon.ico" />
				</Head>
				{this.props.children}
			</div>
		);
	}
}

export default Root;