export const TpIcon = (props) => {
	const {
		name,
		size = 20,
		style,
		className
	} = props;

	return (
		<div
			className={`tp-icon ${className}`}
			style={{ ...style }} >
      <img
				className="tp-icon-image"
        src={`${process.env.BASE_PATH}icons/${name}.svg`}
        alt="TP"
        witdth={size}
        height={size}
        layout='fill' />
    </div>
	)
}