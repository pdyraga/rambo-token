import React from 'react';

export default ({ isFetching, children }) => isFetching ? <div id="loader" /> : children;
