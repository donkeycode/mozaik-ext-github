import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import { WidgetLabel, WidgetListItem, WidgetAvatar } from '@mozaik/ui'

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
                <div
                    style={{
                        display: 'flex'
                    }}>
                    {requested_reviewers.map((reviewer) =>
                        <div style={{
                            margin: '0 1vmin'
                        }}>
                            <a
                            style={{
                                border: '3px solid rgb(132, 16, 16)',
                                display: 'inline-block',
                                borderRadius: '30px',
                                boxShadow: '0px 0px 1px 2px #f5ecec'
                            }}
                            href={reviewer.html_url} target="_blank">
                                <WidgetAvatar href={reviewer.html_url} size="3vmin">
                                    <img src={reviewer.avatar_url} alt={reviewer.login} />
                                </WidgetAvatar>
                            </a>
                        </div>
                    )}
                </div>
            )
        }

        if (labels.length) {
            labelsBody = (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0 1vmin'
                    }}>
                    {labels.map((label) =>
                        <div
                            style={{
                                background: '#' + label.color,
                                textAlign: 'center',
                                padding: '0 1vmin'
                            }}>
                            <span>{label.name}</span>
                        </div>
                    )}
                </div>
            )
        }

        return (
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <WidgetAvatar href={user.html_url} size="4vmin" style={{ display: 'inlineBlock', marginLeft: '10px' }}>
                        <img src={user.avatar_url} alt={user.login} />
                    </WidgetAvatar>
                    <h2 style={{ marginLeft: '10px' }}>
                        <a href={`${pullRequest.base.repo.html_url}`} target="_blank">
                            {pullRequest.base.repo.name}
                        </a>
                    </h2>
                    <span style={{
                        marginLeft: '10px',
                        display: 'flex',
                        alignItems: 'center' }}>
                        <ClockIcon />&nbsp;
                        {moment(updated_at).fromNow()}
                    </span>
                </div>
                <div style={{ display: 'flex', marginLeft: '20px' }}>
                    <span>
                        <a href={html_url} target="_blank">
                            {title}
                        </a>
                    </span>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                        {labelsBody}
                        {reviewersBody}
                    </div>
                </div>
            </div>
        )
    }
}
