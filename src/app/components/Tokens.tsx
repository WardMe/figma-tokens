/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import JSON5 from 'json5';
import {mergeDeep} from '@/plugin/helpers';
import {useTokenDispatch, useTokenState} from '../store/TokenContext';
import TokenListing from './TokenListing';
import Button from './Button';
import TokenSetSelector from './TokenSetSelector';

const mappedTokens = (tokens) => {
    const tokenObj = {};
    Object.assign(tokenObj, tokens);
    if (!tokens.color) {
        Object.assign(tokenObj, {colors: {}});
    }
    const properties = {
        sizing: {},
        spacing: {},
        borderRadius: {},
        borderWidth: {},
        opacity: {},
        fontFamilies: {},
        fontWeights: {},
        fontSizes: {},
        lineHeights: {},
        letterSpacing: {},
        paragraphSpacing: {},
        typography: {},
    };
    mergeDeep(tokenObj, properties);
    return Object.entries(tokenObj);
};

const Tokens = () => {
    const {tokenData, updatePageOnly, activeTokenSet} = useTokenState();
    const {updateTokens, toggleUpdatePageOnly} = useTokenDispatch();

    const handleUpdate = async () => {
        updateTokens(false);
    };

    if (tokenData.tokens[activeTokenSet].hasErrored) return <div>JSON malformed, check in Editor</div>;

    return (
        <div>
            <TokenSetSelector />
            {mappedTokens(JSON5.parse(tokenData.tokens[activeTokenSet].values)).map((tokenValues) => {
                switch (tokenValues[0]) {
                    case 'borderRadius':
                        return (
                            <TokenListing
                                key={tokenValues[0]}
                                label="Border Radius"
                                property="Border Radius"
                                type="borderRadius"
                                values={tokenValues}
                            />
                        );
                    case 'borderWidth':
                        return (
                            <TokenListing
                                key={tokenValues[0]}
                                label="Border Width"
                                explainer="Enter as a number, e.g. 4"
                                property="Border Width"
                                type="borderWidth"
                                values={tokenValues}
                            />
                        );
                    case 'opacity':
                        return (
                            <TokenListing
                                key={tokenValues[0]}
                                label="Opacity"
                                property="Opacity"
                                explainer="Set as 50%"
                                type="opacity"
                                values={tokenValues}
                            />
                        );
                    case 'colors':
                    case 'color':
                        return (
                            <div key={tokenValues[0]}>
                                <TokenListing
                                    showDisplayToggle
                                    createButton
                                    help="If a (local) style is found with the same name it will match to that, if not, will use hex value. Use 'Create Style' to batch-create styles from your tokens (e.g. in your design library). In the future we'll load all 'remote' styles and reference them inside the JSON."
                                    label="Colors"
                                    property="Color"
                                    type="color"
                                    schema={{
                                        value: 'color',
                                        options: {
                                            description: '',
                                        },
                                    }}
                                    values={tokenValues}
                                />
                            </div>
                        );
                    case 'sizing':
                        return (
                            <div key={tokenValues[0]}>
                                <TokenListing label="Sizing" property="Sizing" type="size" values={tokenValues} />
                            </div>
                        );
                    case 'spacing':
                        return (
                            <React.Fragment key={tokenValues[0]}>
                                <TokenListing property="Spacing" label="Spacing" type="space" values={tokenValues} />
                            </React.Fragment>
                        );
                    case 'typography':
                        return (
                            <div key={tokenValues[0]}>
                                <TokenListing
                                    createButton
                                    help="If a (local) style is found with the same name it will match to that, if not, will use raw font values. Use 'Create Style' to batch-create styles from your tokens (e.g. in your design library). In the future we'll load all 'remote' styles and reference them inside the JSON."
                                    label="Typography"
                                    property="Typography"
                                    type="typography"
                                    schema={{
                                        value: {
                                            fontFamily: '',
                                            fontWeight: '',
                                            lineHeight: '',
                                            fontSize: '',
                                            letterSpacing: '',
                                            paragraphSpacing: '',
                                        },
                                        options: {
                                            description: '',
                                        },
                                    }}
                                    values={tokenValues}
                                />
                            </div>
                        );
                    case 'fontFamilies':
                        return (
                            <div key={tokenValues[0]}>
                                <TokenListing
                                    help="Only works in combination with a Font Weight"
                                    label="Font Families"
                                    property="Font Family"
                                    type="fontFamilies"
                                    values={tokenValues}
                                />
                            </div>
                        );
                    case 'fontWeights':
                        return (
                            <div key={tokenValues[0]}>
                                <TokenListing
                                    help="Only works in combination with a Font Family"
                                    label="Font Weights"
                                    property="Font Weight"
                                    type="fontWeights"
                                    values={tokenValues}
                                />
                            </div>
                        );
                    case 'lineHeights':
                        return (
                            <div key={tokenValues[0]}>
                                <TokenListing
                                    label="Line Heights"
                                    explainer="e.g. 100% or 14"
                                    property="Line Height"
                                    type="lineHeights"
                                    values={tokenValues}
                                />
                            </div>
                        );
                    case 'fontSizes':
                    case 'fontSize':
                        return (
                            <div key={tokenValues[0]}>
                                <TokenListing
                                    label="Font Sizes"
                                    property="Font Size"
                                    type="fontSizes"
                                    values={tokenValues}
                                />
                            </div>
                        );
                    case 'letterSpacing':
                        return (
                            <div key={tokenValues[0]}>
                                <TokenListing
                                    label="Letter Spacing"
                                    property="Letter Spacing"
                                    type="letterSpacing"
                                    values={tokenValues}
                                />
                            </div>
                        );
                    case 'paragraphSpacing':
                        return (
                            <div key={tokenValues[0]}>
                                <TokenListing
                                    label="Paragraph Spacing"
                                    property="ParagraphSpacing"
                                    type="paragraphSpacing"
                                    values={tokenValues}
                                />
                            </div>
                        );
                    default:
                        return (
                            <TokenListing
                                key={tokenValues[0]}
                                property={tokenValues[0]}
                                label={tokenValues[0]}
                                values={tokenValues}
                                type="implicit"
                            />
                        );
                }
            })}
            <div className="fixed bottom-0 left-0 w-full bg-white flex justify-between items-center p-2 border-t border-gray-200">
                <div className="switch flex items-center">
                    <input
                        className="switch__toggle"
                        type="checkbox"
                        id="updatemode"
                        checked={updatePageOnly}
                        onChange={() => toggleUpdatePageOnly(!updatePageOnly)}
                    />
                    <label className="switch__label text-xs" htmlFor="updatemode">
                        Update this page only
                    </label>
                </div>
                <Button variant="primary" size="large" onClick={handleUpdate}>
                    Update {updatePageOnly ? 'page' : 'document'}
                </Button>
            </div>
        </div>
    );
};

export default Tokens;
