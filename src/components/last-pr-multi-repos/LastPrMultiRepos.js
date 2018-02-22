import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WidgetLabel, TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody } from '@mozaik/ui';
import GithubIcon from 'react-icons/lib/fa/github-alt'
import PullRequest from '../pull-requests/PullRequest'

export default class LastPrMultiRepos extends Component {
    static PropTypes = {
        repositories: PropTypes.arrayOf(PropTypes.string).isRequired,
        owner: PropTypes.string.isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            LastPrMultiRepos: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
        }),
        apiError: PropTypes.object
    }

    static getApiRequest({ repositories, owner }) {
        return {
            id: `github.pullRequestsMultiRepos.${repositories}.${owner}`,
            params: { repositories, owner }
        }
    }

    render() {
        const { repository, title, apiData, apiError } = this.props;

        let body = <WidgetLoader/>;
        let count = 0;
        if (apiData) {
            let lastPullRequests = apiData.filter(repo => repo.pullRequests.length).map(repo => repo.pullRequests[0])
            console.log(lastPullRequests);
            count = lastPullRequests.length;
            body = (
                <div>
                    {lastPullRequests.map(pullRequest =>
                        <div>
                            <WidgetLabel
                                label={
                                    <a href={`${pullRequest.base.repo.html_url}`} target="_blank">
                                        {pullRequest.base.repo.name}
                                    </a>
                                }
                                style={{ width: '100%', marginBottom: '1vmin' }}
                            />
                            <PullRequest key={pullRequest.id} pullRequest={pullRequest} />
                        </div>
                    )}
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Last Pull Requests'}
                    icon={GithubIcon}
                    count={count}
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}