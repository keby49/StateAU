export const initialState: IState = {
};

export interface IStatePageData {
    PageId?: string;
    OthersData?: string;
}

export interface IStatePage {
    SelectedPageId?: string;
    SelectedPage?: IStatePageData;
}

export interface IState {
    Page?: IStatePage;
}