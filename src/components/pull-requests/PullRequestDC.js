import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import { WidgetLabel, WidgetListItem, WidgetAvatar } from '@mozaik/ui'
import Reviewer from './Reviewer';

export default class PullRequestDC extends Component {
    static propTypes = {
        pullRequest: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html_url: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            user: PropTypes.shape({
                html_url: PropTypes.string.isRequired,
                avatar_url: PropTypes.string.isRequired,
                login: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }

    render() {
        const { pullRequest } = this.props
        const { title, html_url, updated_at, user, requested_reviewers, labels } = pullRequest

        let reviewersBody = null;
        let labelsBody = null;
        if (requested_reviewers.length) {
            reviewersBody = (
                <div className="reviewers">
                    {requested_reviewers.map((reviewer) =>
                        <Reviewer reviewer={reviewer} />
                    )}
                </div>
            )
        }

        if (labels.length) {
            labelsBody = (
                <div className="labels">
                    {labels.map((label) =>
                        <div className="label" style={{ background: '#' + label.color }}>
                            <span>{label.name}</span>
                        </div>
                    )}
                </div>
            )
        }

        return (
            <div>
                <div className="pr-dc">
                    <WidgetAvatar href={user.html_url} size="4vmin" style={{ display: 'inlineBlock', marginLeft: '10px' }}>
                        <img src={user.avatar_url} alt={user.login} />
                    </WidgetAvatar>
                    <h2 className="repo-name">
                        <a href={`${pullRequest.base.repo.html_url}`} target="_blank">
                            {pullRequest.base.repo.name}
                        </a>
                    </h2>
                    <span className="clock">
                        <ClockIcon />&nbsp;
                        {moment(updated_at).fromNow()}
                    </span>
                </div>
                <div className="pr-title">
                    <span>
                        <a href={html_url} target="_blank">
                            {title}
                        </a>
                    </span>
                </div>
                <div className="pr-infos-more">
                    {labelsBody}
                    {reviewersBody}
                </div>
            </div>
        )
    }
}
