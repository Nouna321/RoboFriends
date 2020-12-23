import { CHANGE_SEARCH_FIELD } from './Constants'

export const setSearchField = (Text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: Text,
})
