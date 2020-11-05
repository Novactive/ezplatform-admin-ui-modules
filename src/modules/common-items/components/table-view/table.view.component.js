import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import TableViewItemComponent from './table.view.item.component';

const TABLE_CELL_CLASS = 'c-table-view__cell';
const TABLE_HEAD_CLASS = `${TABLE_CELL_CLASS} ${TABLE_CELL_CLASS}--head`;
export const headerLabels = {
    name: Translator.trans(/*@Desc("Name")*/ 'items_table.header.name', {}, 'sub_items'),
    modified: Translator.trans(/*@Desc("Modified")*/ 'items_table.header.modified', {}, 'sub_items'),
    contentType: Translator.trans(/*@Desc("Content type")*/ 'items_table.header.content_type', {}, 'sub_items'),
};

export default class TableViewComponent extends Component {
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this._refColumnsTogglerButton = createRef();
    }

    /**
     * Renders single list item
     *
     * @method renderItem
     * @param {Object} data
     * @returns {JSX.Element}
     * @memberof TableViewComponent
     */
    renderItem(data) {
        const {
            contentTypesMap,
            handleEditItem,
            generateLink,
        } = this.props;

        return (
            <TableViewItemComponent
                key={data.location.id}
                {...data}
                contentTypesMap={contentTypesMap}
                handleEditItem={handleEditItem}
                generateLink={generateLink}
            />
        );
    }

    renderModifiedHeader() {
        return (
            <th
                className={`${TABLE_HEAD_CLASS} ${TABLE_CELL_CLASS}--date`}
                tabIndex="-1">
                <span className="c-table-view__label">{headerLabels.modified}</span>
            </th>
        );
    }

    renderContentTypeHeader() {

        return (
            <th className={TABLE_HEAD_CLASS}>
                <span className="c-table-view__label">{headerLabels.contentType}</span>
            </th>
        );
    }

    /**
     * Renders table's head
     *
     * @method renderHead
     * @returns {JSX.Element|null}
     * @memberof GridViewComponent
     */
    renderHead() {
        const cellClass = 'c-table-view__cell';
        const { items } = this.props;
        let headClass = 'c-table-view__head';

        if (!items.length) {
            return null;
        }

        return (
            <thead className={headClass}>
                <tr className="c-table-view__row">
                    <th className={TABLE_HEAD_CLASS} />
                    <th
                        className={`${TABLE_HEAD_CLASS} ${TABLE_CELL_CLASS}--name`}
                        tabIndex="-1">
                        <span className="c-table-view__label">{headerLabels.name}</span>
                    </th>
                    {this.renderModifiedHeader()}
                    {this.renderContentTypeHeader()}
                </tr>
            </thead>
        );
    }

    render() {
        const { items } = this.props;
        const content = items.map(this.renderItem);

        return (
            <div className="c-table-view__wrapper">
                <div className="c-table-view__scroller">
                    <table className="c-table-view">
                        {this.renderHead()}
                        <tbody className="c-table-view__body">{content}</tbody>
                    </table>
                </div>
            </div>
        );
    }
}


TableViewComponent.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    contentTypesMap: PropTypes.object.isRequired,
    generateLink: PropTypes.func.isRequired,
    handleEditItem: PropTypes.func.isRequired,
};
