/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import {useSelector} from 'react-redux';
import TokenListing from './TokenListing';
import TokensBottomBar from './TokensBottomBar';
import ToggleEmptyButton from './ToggleEmptyButton';
import {mappedTokens} from './createTokenObj';
import {RootState} from '../store';

interface TokenListingType {
    label: string;
    property: string;
    type: string;
    values: object;
    help?: string;
    explainer?: string;
    schema?: {
        value: object | string;
        options: object | string;
    };
}

const Tokens = ({isActive}) => {
    const {tokens, activeTokenSet} = useSelector((state: RootState) => state.tokenState);

    const memoizedTokens = React.useMemo(() => {
        if (tokens[activeTokenSet]?.values) {
            return mappedTokens(tokens[activeTokenSet]?.values);
        }
        return [];
    }, [tokens, activeTokenSet]);

    if (!isActive) return null;

    return (
        <div>
            {memoizedTokens.map(([key, group]: [string, TokenListingType]) => {
                return (
                    <div key={key}>
                        <TokenListing
                            tokenKey={key}
                            label={group.label}
                            explainer={group.explainer}
                            schema={group.schema}
                            help={group.help}
                            property={group.property}
                            tokenType={group.type}
                            values={group.values}
                        />
                    </div>
                );
            })}
            <ToggleEmptyButton />
            <TokensBottomBar />
        </div>
    );
};

export default Tokens;
