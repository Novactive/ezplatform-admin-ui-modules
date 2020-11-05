import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../common/icon/icon';

export default class TableViewItemComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
    }

    /**
     * Handles edit action.
     *
     * @method handleEdit
     * @memberof TableViewItemComponent
     */
    handleEdit() {
        this.props.handleEditItem(this.props.content);
    }

    renderModifiedCell() {
        const { content } = this.props;
        const { formatShortDateTime } = window.eZ.helpers.timezone;

        return (
            <td className="c-table-view-item__cell c-table-view-item__cell--modified">
                <div className="c-table-view-item__text-wrapper">{formatShortDateTime(new Date(content.lastModificationDate))}</div>
            </td>
        );
    }

    renderContentTypeCell() {
        const { content, contentTypesMap } = this.props;
        const notAvailableLabel = Translator.trans(/*@Desc("N/A")*/ 'content_type.not_available.label', {}, 'sub_items');
        const contentType = contentTypesMap[content.ContentType._href];
        const contentTypeIdentifier = contentType ? contentType.identifier : null;
        const contentTypeName = contentTypeIdentifier ? window.eZ.adminUiConfig.contentTypeNames[contentTypeIdentifier] : notAvailableLabel;

        return (
            <td className="c-table-view-item__cell c-table-view-item__cell--content-type">
                <div className="c-table-view-item__text-wrapper">{contentTypeName}</div>
            </td>
        );
    }


    render() {
        const { content, location, contentTypesMap, generateLink } = this.props;
        const editLabel = Translator.trans(/*@Desc("Edit")*/ 'edit_item_btn.label', {}, 'sub_items');
        const contentType = contentTypesMap[content.ContentType._href];
        const contentTypeIdentifier = contentType ? contentType.identifier : null;
        const linkAttrs = {
            className: 'c-table-view-item__link c-table-view-item__text-wrapper',
            title: content.Name,
            href: generateLink(location.id),
        };
        const contentTypeIconUrl = eZ.helpers.contentType.getContentTypeIconUrl(contentTypeIdentifier);

        return (
            <tr className="c-table-view-item">
                <td className="c-table-view-item__cell c-table-view-item__cell--icon">
                    <Icon customPath={contentTypeIconUrl} extraClasses="ez-icon--small" />
                </td>
                <td className="c-table-view-item__cell c-table-view-item__cell--name">
                    <a {...linkAttrs}>{content.Name}</a>
                </td>
                {this.renderModifiedCell()}
                {this.renderContentTypeCell()}
                <td className="c-table-view-item__cell c-table-view-item__cell--actions">
                    <span
                        title={editLabel}
                        onClick={this.handleEdit}
                        className="c-table-view-item__btn c-table-view-item__btn--edit"
                        tabIndex="-1">
                        <div className="c-table-view-item__btn-inner">
                            <Icon name="edit" extraClasses="ez-icon--medium" />
                        </div>
                    </span>
                </td>
            </tr>
        );
    }
}

TableViewItemComponent.propTypes = {
    content: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    contentTypesMap: PropTypes.object.isRequired,
    handleEditItem: PropTypes.func.isRequired,
    generateLink: PropTypes.func.isRequired,
};
