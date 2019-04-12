import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ViewSwitcherComponent from './components/view-switcher/view.switcher.component.js';
import ItemsListComponent from './components/items-list/items.list.component.js';
import NoItemsComponent from './components/no-items/no.items.component.js';
import Icon from '../common/icon/icon.js';


export default class CommonItemsModule extends Component {
    constructor(props) {
        super(props);

        this.switchView = this.switchView.bind(this);
        this.changePage = this.changePage.bind(this);

        this._refListViewWrapper = React.createRef();

        this.state = {
            activeView: props.activeView,
            activePageItems: props.items,
            contentTypesMap: props.contentTypesMap,
            totalCount: props.totalCount,
            activePageIndex: 0,
            listViewHeight: null,
        };
    }

    updateListViewHeight() {
        this.setState(() => ({
            listViewHeight: this._refListViewWrapper.current.offsetHeight,
        }));
    }

    /**
     * Switches active view
     *
     * @method switchView
     * @param {String} activeView
     * @memberof SubItemsModule
     */
    switchView(activeView) {
        this.setState(() => ({ activeView }));
    }

    changePage(pageIndex) {
        this.updateListViewHeight();
        this.setState(() => ({
            activePageIndex: pageIndex,
            activePageItems: null,
        }));
    }


    renderSpinner() {
        const { activePageItems } = this.state;
        const isActivePageLoaded = !!activePageItems;

        if (isActivePageLoaded) {
            return null;
        }

        const { listViewHeight } = this.state;
        const spinnerMinHeight = 90;
        const style = {
            height: listViewHeight && listViewHeight > spinnerMinHeight ? listViewHeight : spinnerMinHeight,
        };

        return (
            <div style={style}>
                <div className="m-sub-items__spinner-wrapper">
                    <Icon name="spinner" extraClasses="m-sub-items__spinner ez-icon--medium ez-spin" />
                </div>
            </div>
        );
    }

    renderNoItems() {
        if (this.state.totalCount) {
            return null;
        }

        return <NoItemsComponent />;
    }

    renderListView() {
        const { activePageItems } = this.state;
        const pageLoaded = !!activePageItems;

        if (!pageLoaded) {
            return null;
        }

        return (
            <ItemsListComponent
                activeView={this.state.activeView}
                contentTypesMap={this.state.contentTypesMap}
                handleEditItem={this.props.handleEditItem}
                items={activePageItems}
                generateLink={this.props.generateLink}
            />
        );
    }

    render() {
        const listTitle = Translator.trans(/*@Desc("Search results (%total%)")*/ 'search.header', {"total": this.state.totalCount});
        const { activeView, totalCount } = this.state;
        let listClassName = 'm-sub-items__list';

        return (
            <div className="m-sub-items">
                <div className="m-sub-items__header">
                    <div className="m-sub-items__title">
                        {listTitle}
                    </div>
                    <ViewSwitcherComponent onViewChange={this.switchView} activeView={activeView} isDisabled={!totalCount} />
                </div>
                <div ref={this._refListViewWrapper} className={listClassName}>
                    {this.renderSpinner()}
                    {this.renderListView()}
                    {this.renderNoItems()}
                </div>
            </div>
        );
    }
}

eZ.addConfig('modules.CommonItems', CommonItemsModule);

CommonItemsModule.propTypes = {
    restInfo: PropTypes.shape({
        token: PropTypes.string.isRequired,
        siteaccess: PropTypes.string.isRequired,
    }).isRequired,
    handleEditItem: PropTypes.func.isRequired,
    activeView: PropTypes.string,
    generateLink: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    contentTypesMap: PropTypes.object,
    totalCount: PropTypes.number
};

CommonItemsModule.defaultProps = {
    activeView: 'table',
    items: [],
    contentTypesMap: {},
    totalCount: 0,
};
