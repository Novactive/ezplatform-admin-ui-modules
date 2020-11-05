import React from 'react';
import PropTypes from 'prop-types';

import TableViewComponent from '../table-view/table.view.component.js';
import GridViewComponent from '../grid-view/grid.view.component.js';

const views = {
    table: TableViewComponent,
    grid: GridViewComponent,
};

const ItemsListComponent = (props) => {
    const Component = views[props.activeView];

    return <Component {...props} />;
};

ItemsListComponent.propTypes = {
    activeView: PropTypes.string.isRequired,
    generateLink: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
};

export default ItemsListComponent;
