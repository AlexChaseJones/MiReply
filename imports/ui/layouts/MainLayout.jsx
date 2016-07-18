import React from 'react';

export const MainLayout = ({ content }) => (
	<div className="wrapper">
		{content()}
	</div>
)