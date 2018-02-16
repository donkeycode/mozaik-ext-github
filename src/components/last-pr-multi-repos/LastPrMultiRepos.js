import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody } from '@mozaik/ui';
import GithubIcon from 'react-icons/lib/fa/github-alt'

export default class LastPrMultiRepos extends Component {
    static PropTypes = {
        repositories: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            LastPrMultiRepos: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
        }),
        apiError: PropTypes.object
    }

    static getApiRequest({ repositories }) {
        return {
            id: `github.pullRequestsMultiCompte.${repositories}`,
            params: { repositories }
        }
    }

    render() {
        const { repository, title, apiData, apiError } = this.props;

        console.log(apiData);

        let body = <WidgetLoader/>;
        let count = 0;
        if (apiData) {
            // body = (
            //     <div>
            //         {this.repositories.map(PullRequests => {

            //         })}
            //     </div>
            // )
            body = (<div>Test last pull requests</div>);
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Last Pull Requests'}
                    icon={GithubIcon}
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