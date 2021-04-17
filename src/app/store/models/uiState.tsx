/* eslint-disable import/prefer-default-export */
import {createModel} from '@rematch/core';
import {RootModel} from '.';

export interface SelectionValue {
    borderRadius: string | undefined;
    horizontalPadding: string | undefined;
    verticalPadding: string | undefined;
    itemSpacing: string | undefined;
}

interface UIState {
    selectionValues: object;
    disabled: boolean;
}

export const uiState = createModel<RootModel>()({
    state: {
        selectionValues: {},
        disabled: false,
    } as UIState,
    reducers: {
        setDisabled: (state, data: boolean) => {
            return {
                ...state,
                disabled: data,
            };
        },
        setSelectionValues: (state, data: SelectionValue) => {
            return {
                ...state,
                selectionValues: data,
            };
        },
        resetSelectionValues: (state) => {
            return {
                ...state,
                selectionValues: {},
            };
        },
    },
});
