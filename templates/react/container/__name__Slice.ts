import {createSlice} from 'redux-toolkit';

const initialState = {};

const <%= Name %>Slice = createSlice({
    initialState,
    name: 'containers/<%= Name %>Slice',
    reducers: {},
});


export const {} = <%= Name %>Slice.actions;

export default <%= Name %>Slice.reducer;