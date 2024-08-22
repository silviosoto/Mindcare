import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return(
			<Html>
				<Head>
					<link rel="shortcut icon" href={`${process.env.BASE_PATH}favicon.ico`} />
					<link rel="stylesheet" href={`${process.env.BASE_PATH}assets/variables.css`} />
					<link rel="stylesheet" href={`${process.env.BASE_PATH}assets/styles.css`} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}