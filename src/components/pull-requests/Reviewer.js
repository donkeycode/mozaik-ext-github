import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WidgetAvatar } from '@mozaik/ui'

export default class Reviewer extends Component {
    static propTypes = {
        reviewer: PropTypes.shape({
            html_url: PropTypes.string.isRequired,
            avatar_url: PropTypes.string.isRequired,
            login: PropTypes.string.isRequired
        }).isRequired,
        display_nb_request: PropTypes.bool
    }

    render() {
        const { reviewer, display_nb_request } = this.props
        const { html_url, avatar_url, login, nbRequest } = reviewer

        return (
            <div className="reviewer">
                { display_nb_request && <span className="nb-request">{ nbRequest }</span> }
                <a className="avatar" href={html_url} target="_blank">
                    <WidgetAvatar href={html_url} size="3vmin">
                        <img src={avatar_url} alt={login} />
                    </WidgetAvatar>
                </a>
            </div>
        )
    }
}